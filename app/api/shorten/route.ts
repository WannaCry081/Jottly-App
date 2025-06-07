import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

// Database initialization
import { InitializeDatabase } from "@/data/db";

// Schemas
import * as schema from "@/data/schemas";

export async function POST(request: Request) {
  const code = nanoid(6);

  const db = await InitializeDatabase();
  const { url, password } = await request.json();

  await db.insert(schema.urlSchema).values({
    code: code,
    password: password ?? null,
    originalUrl: url,
  });

  return NextResponse.json({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${code}`,
  });
}
