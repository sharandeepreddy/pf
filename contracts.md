# API Contracts & Backend Integration Plan

## Overview
This document outlines the API contracts and backend integration plan for Sharandeep Reddy's AI-powered portfolio website.

## Current Frontend Mock Data (mock.js)
- **Personal Information**: Static data (name, title, location, contact, bio)
- **Education**: Array of education records with degrees, institutions, GPAs
- **Experience**: Array of work experience with achievements
- **Projects**: Array of projects with descriptions, tech stacks, GitHub links
- **Skills**: Categorized technical skills
- **Certifications**: Array of certifications with issuers and dates
- **Testimonials**: Array of testimonials (currently static)
- **Chatbot Responses**: Static responses for common questions

## Backend API Endpoints to Implement

### 1. AI Chatbot API
```
POST /api/chat
Request: { message: string, sessionId?: string }
Response: { reply: string, sessionId: string }
```
- **Integration**: Replace chatbotResponses in AIChatbot.jsx
- **Implementation**: Use Emergent LLM key for intelligent responses
- **Features**: Context-aware responses about Sharandeep's background

### 2. Contact Form API  
```
POST /api/contact
Request: { name: string, email: string, subject: string, message: string }
Response: { success: boolean, message: string }
```
- **Integration**: Replace mock submission in Contact.jsx handleSubmit
- **Implementation**: Send real emails, store in database
- **Features**: Email notifications, spam protection

### 3. Resume Generation API
```
GET /api/resume/download
Response: PDF file download
```
- **Integration**: Replace static /resume.pdf links 
- **Implementation**: Generate PDF from database/static data
- **Features**: Dynamic PDF generation with latest info

### 4. Analytics API
```
POST /api/analytics/track
Request: { event: string, data?: object }
Response: { success: boolean }
```
- **Integration**: Add tracking calls throughout frontend
- **Implementation**: Track page views, downloads, contact form submissions
- **Features**: Visitor analytics, popular sections tracking

### 5. Testimonials API (Future Enhancement)
```
GET /api/testimonials
Response: Array<{ id, name, title, content, avatar, approved }>
```
- **Integration**: Replace static testimonials in mock.js
- **Implementation**: Admin-approved testimonials system

## Database Models

### 1. ChatSessions
```javascript
{
  sessionId: String (UUID),
  messages: [{
    role: 'user' | 'assistant',
    content: String,
    timestamp: Date
  }],
  createdAt: Date,
  lastActive: Date
}
```

### 2. ContactMessages
```javascript
{
  id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  status: 'new' | 'read' | 'responded',
  createdAt: Date,
  ipAddress: String
}
```

### 3. Analytics
```javascript
{
  id: ObjectId,
  event: String,
  data: Object,
  timestamp: Date,
  sessionId: String,
  userAgent: String,
  ipAddress: String
}
```

### 4. PortfolioViews
```javascript
{
  id: ObjectId,
  section: String,
  timestamp: Date,
  sessionId: String,
  timeSpent: Number
}
```

## Frontend Integration Changes Required

### 1. AIChatbot.jsx
- Replace `getBotResponse()` with API call to `/api/chat`
- Add session management for conversation continuity
- Add loading states and error handling
- Implement retry mechanism

### 2. Contact.jsx  
- Replace mock submission with real API call to `/api/contact`
- Add form validation
- Implement success/error messaging
- Add rate limiting protection

### 3. Resume Links
- Update all resume download links to use `/api/resume/download`
- Add download tracking analytics
- Implement loading states for PDF generation

### 4. Analytics Integration
- Add page view tracking on route changes
- Track button clicks, form submissions, chatbot interactions
- Track resume downloads and project link clicks

## Environment Variables Required

### Backend (.env)
```
# Existing
MONGO_URL=mongodb://localhost:27017/portfolio_db
DB_NAME=portfolio_db

# New Required
EMERGENT_LLM_KEY=<to_be_provided>
EMAIL_SERVICE_API_KEY=<optional_for_contact_form>
SMTP_HOST=<optional_for_email>
SMTP_PORT=<optional_for_email>
SMTP_USER=<optional_for_email>
SMTP_PASS=<optional_for_email>
```

## Implementation Priority

### Phase 1 (High Priority)
1. **AI Chatbot API** - Core feature requiring Emergent LLM integration
2. **Contact Form API** - Essential for user engagement
3. **Basic Analytics** - Track portfolio usage

### Phase 2 (Medium Priority)  
4. **Resume PDF Generation** - Enhanced user experience
5. **Advanced Analytics** - Detailed insights

### Phase 3 (Future Enhancements)
6. **Admin Dashboard** - Manage contacts and testimonials
7. **Dynamic Testimonials** - User-submitted testimonials
8. **Blog/Articles** - Content management system

## API Error Handling

All APIs will return consistent error format:
```javascript
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'Human readable message',
    details?: any
  }
}
```

## Security Considerations

1. **Rate Limiting**: Implement on all endpoints
2. **Input Validation**: Sanitize all user inputs
3. **CORS**: Properly configured for frontend domain
4. **API Keys**: Securely stored and rotated
5. **Spam Protection**: reCAPTCHA or similar for contact form
6. **Data Privacy**: GDPR-compliant data handling

## Testing Strategy

1. **Backend APIs**: Unit tests for all endpoints
2. **Integration**: Test frontend-backend communication  
3. **AI Chatbot**: Test various question types and edge cases
4. **Contact Form**: Test email delivery and database storage
5. **Load Testing**: Test under high concurrent usage

This contract ensures seamless integration between the beautifully designed frontend and a robust, intelligent backend system.