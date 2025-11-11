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

  if (req.method !== "GET") {
    return new Response(
      JSON.stringify({ error: { message: "Method not allowed" } }), 
      { status: 405, headers }
    );
  }

  try {
    // Create table if it doesn't exist for tracking downloads
    await sql`
      CREATE TABLE IF NOT EXISTS resume_downloads (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address INET,
        user_agent TEXT,
        referrer TEXT
      )
    `;

    // Get client info
    const ipAddress = req.headers.get("x-forwarded-for") || 
                     req.headers.get("cf-connecting-ip") || 
                     context.ip;
    const userAgent = req.headers.get("user-agent");
    const referrer = req.headers.get("referer");

    // Track the download
    await sql`
      INSERT INTO resume_downloads (ip_address, user_agent, referrer)
      VALUES (${ipAddress}, ${userAgent}, ${referrer})
    `;

    return new Response(
      JSON.stringify({
        success: true,
        resumeUrl: "/Resume.pdf"
      }), 
      { 
        status: 200, 
        headers: {
          ...headers,
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error("Resume download error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: { 
          message: "There was an error processing your request. Please contact sharanreddy.adla@gmail.com directly." 
        } 
      }), 
      { status: 500, headers }
    );
  }
};

export const config = {
  path: "/api/resume/download"
};