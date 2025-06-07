import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Database initialization
import { InitializeDatabase } from "@/data/db";

// Schemas
import * as schema from "@/data/schemas";

export async function POST(request: Request) {
  let newPassword: string | undefined;
  const code = nanoid(6);

  const db = await InitializeDatabase();
  const { url, password } = await request.json();

  if (password) {
    newPassword = await bcrypt.hash(password, 10);
  }

  await db.insert(schema.urlSchema).values({
    code: code,
    password: newPassword ?? null,
    originalUrl: url,
  });

  return NextResponse.json({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${code}`,
  });
}
