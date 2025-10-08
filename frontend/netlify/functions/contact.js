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
    const { name, email, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: { message: "All fields are required" } }), 
        { status: 400, headers }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: { message: "Invalid email format" } }), 
        { status: 400, headers }
      );
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address INET,
        user_agent TEXT
      )
    `;

    // Get client info
    const ipAddress = req.headers.get("x-forwarded-for") || 
                     req.headers.get("cf-connecting-ip") || 
                     context.ip;
    const userAgent = req.headers.get("user-agent");

    // Insert the contact message into the database
    const result = await sql`
      INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
      VALUES (${name}, ${email}, ${subject}, ${message}, ${ipAddress}, ${userAgent})
      RETURNING id, created_at
    `;

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Thank you for reaching out! I'll get back to you within 24 hours.",
        id: result[0].id,
        timestamp: result[0].created_at
      }), 
      { status: 200, headers }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: { 
          message: "There was an error processing your message. Please try again later." 
        } 
      }), 
      { status: 500, headers }
    );
  }
};

export const config = {
  path: "/api/contact"
};