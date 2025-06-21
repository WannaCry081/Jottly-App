import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Schemas
import * as schema from "./schemas";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing 'DATABASE_URL' env var");
}

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });
