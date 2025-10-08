import { neon } from "@netlify/neon";

const sql = neon();

export default async (req, context) => {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: { message: "Method not allowed" } }), 
      { status: 405, headers }
    );
  }

  try {
    const { message, session_id } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: { message: "Message is required" } }), 
        { status: 400, headers }
      );
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id SERIAL PRIMARY KEY,
        session_id UUID DEFAULT gen_random_uuid(),
        user_message TEXT NOT NULL,
        bot_response TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address INET,
        user_agent TEXT
      )
    `;

    // Generate session ID if not provided
    let currentSessionId = session_id;
    if (!currentSessionId) {
      const sessionResult = await sql`SELECT gen_random_uuid() as new_session_id`;
      currentSessionId = sessionResult[0].new_session_id;
    }

    // Simple chatbot responses based on keywords
    let botResponse = "I'm happy to help you learn more about Sharandeep! You can ask me about his experience, skills, projects, education, or contact information.";

    const messageLower = message.toLowerCase();

    if (messageLower.includes("experience") || messageLower.includes("work") || messageLower.includes("job")) {
      botResponse = "Sharandeep has worked as a Data Scientist Intern at Afame Technologies where he improved ML model accuracy by 20% and optimized inference speed by 30%. He also worked as an AI Engineer Intern at AWS, where he built and fine-tuned NLP models using Hugging Face and integrated OpenAI API for enhanced functionality.";
    } else if (messageLower.includes("skill") || messageLower.includes("technology") || messageLower.includes("tech")) {
      botResponse = "Sharandeep's expertise spans across Python, Machine Learning, NLP, Deep Learning, and cloud deployment. His technical skills include: Frontend (HTML, CSS, JavaScript, React.js), Backend (Python, SQL, FastAPI), AI/ML (Scikit-learn, Transformers, NLP, TensorFlow, Keras), Data Visualization (Matplotlib, Seaborn, Plotly), and Deployment (GitHub, Netlify, Heroku, Hugging Face).";
    } else if (messageLower.includes("project") || messageLower.includes("portfolio")) {
      botResponse = "Sharandeep has worked on several impressive projects: 1) Heart Disease Prediction using ML & XAI (published at ICOTET 2024), 2) Handwritten Digit & Facial Recognition with CNN achieving 98% accuracy, 3) SQL-Based Swimmer Club Management system handling 500+ members, and 4) AI-Powered Sentiment Analysis using transformer models.";
    } else if (messageLower.includes("education") || messageLower.includes("study") || messageLower.includes("university")) {
      botResponse = "Sharandeep is currently pursuing a Master's in Data Science (MPS) at University at Buffalo, NY with a GPA of 3.704. He completed his B.Tech in Electronics and Computer Engineering from Sreenidhi Institute of Science and Technology, Hyderabad with an 8.3 CGPA.";
    } else if (messageLower.includes("contact") || messageLower.includes("reach") || messageLower.includes("email") || messageLower.includes("phone")) {
      botResponse = "You can reach Sharandeep at sharanreddy.adla@gmail.com or +1 (716) 750-9326. He's also active on LinkedIn at https://www.linkedin.com/in/sharanreddyadla. Feel free to connect with him for opportunities, collaborations, or just to say hello!";
    } else if (messageLower.includes("hello") || messageLower.includes("hi") || messageLower.includes("hey")) {
      botResponse = "Hello! I'm Sharandeep's AI assistant. I'm here to help you learn about his background, skills, projects, and experience. What would you like to know about him?";
    } else if (messageLower.includes("publication") || messageLower.includes("research") || messageLower.includes("paper")) {
      botResponse = "Sharandeep has published research on 'Heart Disease Prediction Using ML & XAI' at the ICOTET 2024 conference. This work demonstrates his expertise in explainable AI and healthcare applications of machine learning.";
    } else if (messageLower.includes("certification") || messageLower.includes("certificate")) {
      botResponse = "Sharandeep holds several certifications including: Cognizant AI Virtual Experience (2023), Microsoft AI Skills Challenge (2023), and IBM ML with Python Level 1 (2022). These certifications showcase his continuous learning in AI and machine learning.";
    }

    // Get client info
    const ipAddress = req.headers.get("x-forwarded-for") || 
                     req.headers.get("cf-connecting-ip") || 
                     context.ip;
    const userAgent = req.headers.get("user-agent");

    // Store the chat interaction in the database
    await sql`
      INSERT INTO chat_sessions (session_id, user_message, bot_response, ip_address, user_agent)
      VALUES (${currentSessionId}, ${message}, ${botResponse}, ${ipAddress}, ${userAgent})
    `;

    // Return response
    return new Response(
      JSON.stringify({
        reply: botResponse,
        session_id: currentSessionId
      }), 
      { status: 200, headers }
    );

  } catch (error) {
    console.error("Chat API error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: { 
          message: "I'm having trouble processing your request right now. Please try again later." 
        } 
      }), 
      { status: 500, headers }
    );
  }
};

export const config = {
  path: "/api/chat"
};