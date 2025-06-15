import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Schemas
import * as schema from "./schemas";

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_DATABASE_URL env var");
}

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: process.env.NEXT_PUBLIC_ENV === "production",
});

export const db = drizzle(pool, { schema });
