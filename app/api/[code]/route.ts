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
    return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_API_URL}/404` });
  }

  return NextResponse.json({ url: originalUrl });
}
