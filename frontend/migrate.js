import { neon } from "@netlify/neon";

const sql = neon();

async function migrate() {
  try {
    // Create certificates table
    await sql`
      CREATE TABLE IF NOT EXISTS certificates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        issuer VARCHAR(255) NOT NULL,
        date VARCHAR(50) NOT NULL,
        credential VARCHAR(255),
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        file_data BYTEA NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log("Certificate table created successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();