import openai
import os
from typing import List, Dict
from models import ChatMessage

class AIService:
    def __init__(self):
        self.client = openai.OpenAI(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            base_url="https://api.emergent.sh/v1"
        )
        
        # Sharandeep's detailed context for AI responses
        self.context = """
        You are an AI assistant for Sharandeep Reddy's portfolio. Here's comprehensive information about him:
        
        PERSONAL:
        - Name: Adla Sharandeep Reddy
        - Title: AI/ML Engineer & Data Scientist
        - Location: Buffalo, NY, USA
        - Education: Master's in Data Science (MPS) at University at Buffalo (GPA: 3.704, Aug 2024–Present)
        - Previous: B.Tech in Electronics and Computer Engineering from Sreenidhi Institute, Hyderabad (CGPA: 8.3, 2020–2024)
        
        EXPERIENCE:
        1. Data Scientist Intern at Afame Technologies (Jan 2024 – Mar 2024):
           - Improved ML model accuracy by 20%
           - Optimized inference speed by 30%
           - Applied feature engineering and hyperparameter tuning
           - Enhanced big data scalability
           
        2. AI Engineer Intern at Amazon Web Services (AWS) (Dec 2022 – Feb 2023):
           - Built and fine-tuned NLP models using Hugging Face
           - Integrated OpenAI API for enhanced functionality
           - Deployed AI workflows in cloud environment
           - Collaborated with cross-functional teams
        
        PROJECTS:
        1. Heart Disease Prediction Using ML & XAI - Published at ICOTET 2024 conference
        2. Handwritten Digit & Facial Recognition - CNN achieved 98% accuracy, outperforming DNN by 12%
        3. SQL-Based Swimmer Club Management - Managed 500+ members and 100+ inventory items
        4. AI-Powered Sentiment Analysis - Real-time sentiment analysis using transformer models
        
        TECHNICAL SKILLS:
        - Frontend: HTML, CSS, JavaScript, React.js, Streamlit, Gradio
        - Backend: Python, SQL, DBMS, FastAPI, Node.js
        - AI/ML: Scikit-learn, Transformers, NLP, Predictive Modeling, XAI, TensorFlow, Keras
        - Visualization: Matplotlib, Seaborn, Plotly, D3.js
        - Deployment: GitHub, Netlify, PythonAnywhere, Heroku, Hugging Face
        
        CERTIFICATIONS:
        - Cognizant AI Virtual Experience (2023)
        - Microsoft AI Skills Challenge (2023)
        - IBM ML with Python Level 1 (2022)
        
        CONTACT:
        - Email: sharanreddy.adla@gmail.com, sharande@buffalo.edu
        - Phone: +1 (716) 750-9326
        - LinkedIn: www.linkedin.com/in/sharandeep-reddy
        - GitHub: https://github.com/sharan-555/
        
        PERSONALITY & APPROACH:
        - Passionate about AI/ML and creating intelligent solutions
        - Strong focus on explainable AI and real-world applications
        - Collaborative team player with proven results
        - Currently seeking full-time opportunities in AI/ML engineering
        
        Answer questions about Sharandeep professionally and enthusiastically. Be specific about his achievements and technical capabilities. If asked about availability for work, mention he's actively seeking full-time opportunities.
        """
    
    def get_ai_response(self, message: str, conversation_history: List[ChatMessage] = None) -> str:
        try:
            # Build conversation context
            messages = [
                {"role": "system", "content": self.context}
            ]
            
            # Add conversation history if available
            if conversation_history:
                for msg in conversation_history[-6:]:  # Last 6 messages for context
                    messages.append({
                        "role": "user" if msg.role == "user" else "assistant",
                        "content": msg.content
                    })
            
            # Add current message
            messages.append({"role": "user", "content": message})
            
            # Get AI response
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            print(f"AI Service Error: {str(e)}")
            # Fallback response
            return self._get_fallback_response(message)
    
    def _get_fallback_response(self, message: str) -> str:
        """Fallback responses when AI service is unavailable"""
        message_lower = message.lower()
        
        if any(word in message_lower for word in ['experience', 'work', 'internship', 'job']):
            return "Sharandeep has excellent experience as a Data Scientist Intern at Afame Technologies (improved ML model accuracy by 20%) and as an AI Engineer Intern at AWS (built NLP models with Hugging Face). He's currently pursuing his Master's in Data Science at University at Buffalo."
        
        elif any(word in message_lower for word in ['skill', 'technology', 'programming', 'tech']):
            return "Sharandeep's technical expertise includes Python, Machine Learning (Scikit-learn, TensorFlow), NLP, React.js, FastAPI, and cloud deployment. He's particularly strong in explainable AI and predictive modeling with proven results in production environments."
        
        elif any(word in message_lower for word in ['project', 'github', 'portfolio']):
            return "His notable projects include Heart Disease Prediction with XAI (published at ICOTET 2024), CNN vs DNN comparison achieving 98% accuracy, and a comprehensive swimmer club management system. All projects showcase his ability to deliver real-world AI solutions."
        
        elif any(word in message_lower for word in ['education', 'university', 'degree', 'study']):
            return "Sharandeep is currently pursuing a Master's in Data Science at University at Buffalo (GPA: 3.704) and holds a B.Tech in Electronics and Computer Engineering from Sreenidhi Institute, Hyderabad (CGPA: 8.3)."
        
        elif any(word in message_lower for word in ['contact', 'email', 'phone', 'reach', 'hire']):
            return "You can reach Sharandeep at sharanreddy.adla@gmail.com or +1 (716) 750-9326. He's also active on LinkedIn (linkedin.com/in/sharandeep-reddy) and GitHub (github.com/sharan-555). He's currently available for full-time opportunities in AI/ML engineering."
        
        elif any(word in message_lower for word in ['hello', 'hi', 'hey', 'greet']):
            return "Hello! I'm Sharandeep's AI assistant. I can tell you about his impressive experience as an AI/ML Engineer, his published research, internships at AWS and Afame Technologies, technical skills, or how to get in touch with him. What would you like to know?"
        
        else:
            return "That's a great question! I can help you learn about Sharandeep's experience (AWS, Afame Technologies), technical skills (AI/ML, Python, React), education (Master's at UB), projects (published research, 98% accuracy models), or contact information. He's an accomplished AI/ML Engineer currently seeking new opportunities. What specific area interests you?"
