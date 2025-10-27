
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { Client } from "pg";

async function setupDatabase() {
  console.log("Setting up database...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
  });

  try {
    await client.connect();
    await client.query("CREATE EXTENSION IF NOT EXISTS postgis;");
    console.log("PostGIS extension enabled.");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

setupDatabase();
