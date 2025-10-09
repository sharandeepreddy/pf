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
    // Generate user session ID from client IP and user agent for basic user identification
    const userIdentifier = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'anonymous';
    const userAgent = event.headers['user-agent'] || 'unknown';
    const userId = Buffer.from(`${userIdentifier}-${userAgent}`).toString('base64');

    // Get certificates from database for this specific user only
    const certificates = await sql`
      SELECT id, name, issuer, date, credential, file_name, file_type, created_at
      FROM certificates
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    // Transform data to match frontend expectations
    const transformedCertificates = certificates.map(cert => ({
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      credential: cert.credential,
      fileName: cert.file_name,
      fileType: cert.file_type,
      createdAt: cert.created_at,
      // Add a URL to view the file
      fileUrl: `/.netlify/functions/get-certificate-file?id=${cert.id}`
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        certificates: transformedCertificates,
      }),
    };

  } catch (error) {
    console.error("Error fetching certificates:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};