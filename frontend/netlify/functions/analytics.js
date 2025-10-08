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
    const { event, data } = await req.json();

    if (!event) {
      return new Response(
        JSON.stringify({ error: { message: "Event name is required" } }), 
        { status: 400, headers }
      );
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(255) NOT NULL,
        event_data JSONB,
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

    // Insert the analytics event into the database
    await sql`
      INSERT INTO analytics_events (event_name, event_data, ip_address, user_agent, referrer)
      VALUES (${event}, ${JSON.stringify(data || {})}, ${ipAddress}, ${userAgent}, ${referrer})
    `;

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Event tracked successfully"
      }), 
      { status: 200, headers }
    );

  } catch (error) {
    console.error("Analytics tracking error:", error);
    
    // Don't fail the request if analytics fails
    return new Response(
      JSON.stringify({
        message: "Event tracking failed, but continuing..."
      }), 
      { status: 200, headers }
    );
  }
};

export const config = {
  path: "/api/analytics/track"
};