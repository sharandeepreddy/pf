import { neon } from "@netlify/neon";

const sql = neon();

export const handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "DELETE") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { id } = event.queryStringParameters || {};
    
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Certificate ID is required" }),
      };
    }

    // Generate user session ID for ownership verification
    const userIdentifier = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'anonymous';
    const userAgent = event.headers['user-agent'] || 'unknown';
    const userId = Buffer.from(`${userIdentifier}-${userAgent}`).toString('base64');

    // Delete certificate from database (only if user owns it)
    const result = await sql`
      DELETE FROM certificates
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING id
    `;

    if (result.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Certificate not found or you don't have permission to delete it" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Certificate deleted successfully",
      }),
    };

  } catch (error) {
    console.error("Error deleting certificate:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};