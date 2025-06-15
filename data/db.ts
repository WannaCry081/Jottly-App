import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

// Schemas
import * as schema from "./schemas";

declare global {
  var __pgPool: Pool | undefined;
  var __db: ReturnType<typeof drizzle> | undefined;
}

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_DATABASE_URL env var");
}

const pool = (global.__pgPool ??= new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: process.env.NEXT_PUBLIC_ENV === "production",
}));

export const db = (global.__db ??= drizzle(pool, { schema }));

if (process.env.NEXT_PUBLIC_ENV !== "production") {
  migrate(db, { migrationsFolder: "./data/migrations" })
    .then(() => console.info("Migrations complete"))
    .catch((err) => console.error("Migration failed", err));
}
