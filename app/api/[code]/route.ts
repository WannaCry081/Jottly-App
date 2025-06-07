import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { InitializeDatabase } from "@/data/db";

import * as schema from "@/data/schemas";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const db = await InitializeDatabase();

  const { code } = await params;

  const result = await db
    .select()
    .from(schema.urlSchema)
    .where(eq(schema.urlSchema.code, code));

  const originalUrl = result[0]?.originalUrl;

  if (!originalUrl) {
    return NextResponse.redirect(
      new URL("/404", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  return NextResponse.json({ originalUrl });
}
