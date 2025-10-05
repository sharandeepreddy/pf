from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

# Chat Models
class ChatMessage(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    session_id: str

class ChatSession(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    messages: List[ChatMessage] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_active: datetime = Field(default_factory=datetime.utcnow)

# Contact Models
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    status: str = "new"  # 'new', 'read', 'responded'
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None

# Analytics Models
class AnalyticsEvent(BaseModel):
    event: str
    data: Optional[Dict[str, Any]] = None
    session_id: Optional[str] = None

class AnalyticsRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event: str
    data: Dict[str, Any] = {}
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: Optional[str] = None
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None

# Response Models
class SuccessResponse(BaseModel):
    success: bool = True
    message: str = "Operation completed successfully"

class ErrorResponse(BaseModel):
    success: bool = False
    error: Dict[str, Any]
