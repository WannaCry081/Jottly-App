import { nanoid } from "nanoid";
import { NextResponse, type NextRequest } from "next/server";

// Database initialization
import { InitializeDatabase } from "@/data/db";

// Schemas
import * as schema from "@/data/schemas";
import { eq } from "drizzle-orm";

// Utility functions
import { encrypt } from "@/utils/password";

export async function POST(request: Request) {
  let newPassword: string | undefined;
  const code = nanoid(6);

  const db = await InitializeDatabase();
  const { ownerId, url, password } = await request.json();

  if (password) {
    newPassword = encrypt(password);
  }

  await db.insert(schema.urlSchema).values({
    ownerId: ownerId,
    code: code,
    password: newPassword ?? null,
    originalUrl: url,
  });

  return NextResponse.json({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${code}`,
  });
}

export async function PATCH(request: NextRequest) {
  const db = await InitializeDatabase();
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Code parameter is required" },
      { status: 400 }
    );
  }

  const existing = await db
    .select({ clicks: schema.urlSchema.clicks })
    .from(schema.urlSchema)
    .where(eq(schema.urlSchema.code, code))
    .limit(1);

  if (!existing.length) {
    return NextResponse.json(
      { error: "URL not found for given code" },
      { status: 404 }
    );
  }

  const newClicks = (existing[0].clicks ?? 0) + 1;

  const response = await db
    .update(schema.urlSchema)
    .set({ clicks: newClicks })
    .where(eq(schema.urlSchema.code, code));

  return NextResponse.json({
    success: response,
  });
}

export async function GET(request: NextRequest) {
  const db = await InitializeDatabase();
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");
  const ownerId = searchParams.get("ownerId");

  if (code) {
    const response = await db
      .select()
      .from(schema.urlSchema)
      .where(eq(schema.urlSchema.code, code));

    return NextResponse.json({ url: response[0] });
  }

  if (ownerId) {
    const response = await db
      .select()
      .from(schema.urlSchema)
      .where(eq(schema.urlSchema.ownerId, ownerId));

    return NextResponse.json({ urls: response });
  }

  return NextResponse.json(
    { error: "Invalid request parameters" },
    { status: 400 }
  );
}
