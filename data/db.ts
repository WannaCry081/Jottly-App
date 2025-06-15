import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Schemas
import * as schema from "./schemas";

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_DATABASE_URL env var");
}

const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });
