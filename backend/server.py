from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
import uuid
from datetime import datetime

# Import our custom modules
from models import (
    ChatRequest, ChatResponse, ChatSession, ChatMessage,
    ContactRequest, ContactMessage, AnalyticsEvent, AnalyticsRecord,
    SuccessResponse, ErrorResponse
)
from ai_service import AIService
from email_service import EmailService
from pdf_service import PDFService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize services
ai_service = AIService()
email_service = EmailService()
pdf_service = PDFService()

# Create the main app without a prefix
app = FastAPI(title="Sharandeep Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to get client IP
def get_client_ip(request: Request) -> str:
    x_forwarded_for = request.headers.get('x-forwarded-for')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0]
    return request.client.host

# AI Chatbot Routes
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_request: ChatRequest, request: Request):
    try:
        # Get or create session
        session_id = chat_request.session_id or str(uuid.uuid4())
        
        # Get conversation history from database
        session_data = await db.chat_sessions.find_one({"session_id": session_id})
        conversation_history = []
        
        if session_data:
            conversation_history = [
                ChatMessage(**msg) for msg in session_data.get("messages", [])
            ]
        
        # Get AI response
        ai_response = ai_service.get_ai_response(
            chat_request.message, 
            conversation_history
        )
        
        # Create new messages
        user_message = ChatMessage(role="user", content=chat_request.message)
        assistant_message = ChatMessage(role="assistant", content=ai_response)
        
        # Update conversation history
        updated_messages = conversation_history + [user_message, assistant_message]
        
        # Save to database
        await db.chat_sessions.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "session_id": session_id,
                    "messages": [msg.dict() for msg in updated_messages],
                    "last_active": datetime.utcnow()
                },
                "$setOnInsert": {"created_at": datetime.utcnow()}
            },
            upsert=True
        )
        
        # Track analytics
        await track_analytics("chatbot_interaction", request, {
            "session_id": session_id,
            "message_length": len(chat_request.message),
            "response_length": len(ai_response)
        })
        
        return ChatResponse(reply=ai_response, session_id=session_id)
        
    except Exception as e:
        logging.error(f"Chat API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Chat service temporarily unavailable")

# Contact Form Routes
@api_router.post("/contact", response_model=SuccessResponse)
async def submit_contact_form(contact_request: ContactRequest, request: Request):
    try:
        # Create contact message record
        contact_message = ContactMessage(
            name=contact_request.name,
            email=contact_request.email,
            subject=contact_request.subject,
            message=contact_request.message,
            ip_address=get_client_ip(request)
        )
        
        # Save to database
        await db.contact_messages.insert_one(contact_message.dict())
        
        # Send email notifications
        contact_data = {
            "name": contact_request.name,
            "email": contact_request.email,
            "subject": contact_request.subject,
            "message": contact_request.message,
            "timestamp": datetime.utcnow().isoformat(),
            "ip_address": get_client_ip(request)
        }
        
        # Send notification and auto-reply
        email_service.send_contact_notification(contact_data)
        email_service.send_auto_reply(contact_request.email, contact_request.name)
        
        # Track analytics
        await track_analytics("contact_form_submission", request, {
            "subject": contact_request.subject,
            "message_length": len(contact_request.message)
        })
        
        return SuccessResponse(message="Message sent successfully! You'll hear back within 24 hours.")
        
    except Exception as e:
        logging.error(f"Contact API Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")

# Resume Download Route
@api_router.get("/resume/download")
async def download_resume(request: Request):
    try:
        # Generate PDF
        pdf_buffer = pdf_service.generate_resume_pdf()
        
        # Track analytics
        await track_analytics("resume_download", request, {
            "format": "pdf",
            "generated_at": datetime.utcnow().isoformat()
        })
        
        # Return PDF as streaming response
        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=Sharandeep_Reddy_Resume.pdf"}
        )
        
    except Exception as e:
        logging.error(f"Resume Download Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate resume")

# Analytics Routes
@api_router.post("/analytics/track", response_model=SuccessResponse)
async def track_event(analytics_event: AnalyticsEvent, request: Request):
    try:
        await track_analytics(
            analytics_event.event, 
            request, 
            analytics_event.data,
            analytics_event.session_id
        )
        return SuccessResponse(message="Event tracked successfully")
        
    except Exception as e:
        logging.error(f"Analytics API Error: {str(e)}")
        # Don't fail the request if analytics fails
        return SuccessResponse(message="Event tracking failed but request completed")

# Analytics Helper Function
async def track_analytics(event: str, request: Request, data: dict = None, session_id: str = None):
    try:
        analytics_record = AnalyticsRecord(
            event=event,
            data=data or {},
            session_id=session_id,
            user_agent=request.headers.get("user-agent"),
            ip_address=get_client_ip(request)
        )
        
        await db.analytics.insert_one(analytics_record.dict())
        
    except Exception as e:
        logging.error(f"Analytics tracking error: {str(e)}")

# Health Check and Status Routes
@api_router.get("/")
async def root():
    return {
        "message": "Sharandeep Portfolio API is running",
        "version": "1.0.0",
        "status": "healthy",
        "features": [
            "AI Chatbot",
            "Contact Form", 
            "Resume Download",
            "Analytics Tracking"
        ]
    }

@api_router.get("/health")
async def health_check():
    try:
        # Test database connection
        await db.command("ping")
        
        return {
            "status": "healthy",
            "database": "connected",
            "ai_service": "ready",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logging.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unavailable")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
