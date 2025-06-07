import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

import { InitializeDatabase } from "@/data/db";

import * as schema from "@/data/schemas";

export async function POST(request: Request) {
  const code = nanoid(6);

  const db = await InitializeDatabase();
  const { url } = await request.json();

  await db.insert(schema.urlSchema).values({
    code: code,
    originalUrl: url,
  });

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_API_URL}/${code}`,
  });
}
