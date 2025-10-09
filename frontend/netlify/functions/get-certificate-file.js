import { neon } from "@netlify/neon";

const sql = neon();

export const handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
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

    // Get certificate file from database (only if user owns it)
    const result = await sql`
      SELECT file_name, file_type, file_data
      FROM certificates
      WHERE id = ${id} AND user_id = ${userId}
    `;

    if (result.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Certificate not found" }),
      };
    }

    const certificate = result[0];

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": certificate.file_type,
        "Content-Disposition": `inline; filename="${certificate.file_name}"`,
        "Cache-Control": "public, max-age=3600",
      },
      body: certificate.file_data.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (error) {
    console.error("Error serving certificate file:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};