import { neon } from "@netlify/neon";

const sql = neon();

export const handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // For Netlify functions, the body is already parsed for form data
    // We need to handle this differently
    let certificateData = {};
    let fileData = null;
    let fileName = "";
    let fileType = "";

    // Try to parse JSON if it's JSON format
    try {
      const body = JSON.parse(event.body);
      certificateData = {
        name: body.name,
        issuer: body.issuer,
        date: body.date,
        credential: body.credential
      };
      
      if (body.fileData && body.fileName && body.fileType) {
        fileData = body.fileData;
        fileName = body.fileName;
        fileType = body.fileType;
      }
    } catch {
      // If not JSON, it might be multipart form data
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "Please use JSON format with base64 encoded file data" 
        }),
      };
    }

    // Validate required fields
    if (!certificateData.name || !certificateData.issuer || !certificateData.date || !fileData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "Missing required fields: name, issuer, date, and file are required" 
        }),
      };
    }

    // Validate file type (PDF or image)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(fileType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "File type not supported. Only PDF, JPEG, and PNG files are allowed." 
        }),
      };
    }

    // Convert base64 to buffer
    let fileBuffer;
    try {
      fileBuffer = Buffer.from(fileData, 'base64');
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: "Invalid file data format" 
        }),
      };
    }

    // Generate user session ID from client IP and user agent for basic user identification
    const userIdentifier = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'anonymous';
    const userAgent = event.headers['user-agent'] || 'unknown';
    const userId = Buffer.from(`${userIdentifier}-${userAgent}`).toString('base64');

    // Create table if it doesn't exist (with user_id column)
    await sql`
      CREATE TABLE IF NOT EXISTS certificates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        issuer VARCHAR(255) NOT NULL,
        date VARCHAR(100) NOT NULL,
        credential VARCHAR(255),
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(100) NOT NULL,
        file_data BYTEA NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert certificate into database with user_id
    const result = await sql`
      INSERT INTO certificates (name, issuer, date, credential, file_name, file_type, file_data, user_id)
      VALUES (${certificateData.name}, ${certificateData.issuer}, ${certificateData.date}, 
              ${certificateData.credential || ''}, ${fileName}, ${fileType}, ${fileBuffer}, ${userId})
      RETURNING id
    `;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        id: result[0].id,
        message: "Certificate uploaded successfully",
      }),
    };

  } catch (error) {
    console.error("Error uploading certificate:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};