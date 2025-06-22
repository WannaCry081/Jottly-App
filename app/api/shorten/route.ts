import { nanoid } from "nanoid";
import { type NextRequest } from "next/server";
import { eq } from "drizzle-orm"; // Moved up per import/order

// Database initialization
import { db } from "@/data/db";

// Schemas
import * as schema from "@/data/schemas";

// Utility functions
import { encrypt } from "@/utils/password";
import { apiResponse } from "@/utils/response";

export async function POST(request: Request): Promise<Response> {
  const newCode = nanoid(6);

  const { ownerId, url, password } = await request.json();
  const newPassword = password ? encrypt(password) : null;

  try {
    await db.insert(schema.urlSchema).values({
      ownerId: ownerId,
      code: newCode,
      password: newPassword,
      originalUrl: url,
    });

    return apiResponse({
      data: `${process.env.NEXT_PUBLIC_APP_URL}/${newCode}`,
      message: "URL shortened successfully",
    });
  } catch (error) {
    console.error("Error shortening URL: ", error);
    return apiResponse({
      success: false,
      message: "Failed to shorten URL",
    });
  }
}

export async function PATCH(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  try {
    if (!code) {
      return apiResponse({
        success: false,
        message: "Code parameter is required",
        status: 400,
      });
    }

    const existing = await db
      .select({ clicks: schema.urlSchema.clicks })
      .from(schema.urlSchema)
      .where(eq(schema.urlSchema.code, code))
      .limit(1);

    if (!existing.length) {
      return apiResponse({
        success: false,
        message: "URL not found for given code",
        status: 404,
      });
    }

    const newClicks = (existing[0].clicks ?? 0) + 1;

    const response = await db
      .update(schema.urlSchema)
      .set({ clicks: newClicks })
      .where(eq(schema.urlSchema.code, code));

    return apiResponse({
      data: response,
      message: "Clicks updated successfully",
    });
  } catch (error) {
    console.error("Error shortening URL: ", error);
    return apiResponse({
      success: false,
      message: "Failed to update clicks",
      status: 500,
    });
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");
  const ownerId = searchParams.get("ownerId");

  try {
    if (code) {
      const response = await db
        .select()
        .from(schema.urlSchema)
        .where(eq(schema.urlSchema.code, code));

      return apiResponse({
        data: response[0],
        message: "URL retrieved successfully",
      });
    }

    if (ownerId) {
      const response = await db
        .select()
        .from(schema.urlSchema)
        .where(eq(schema.urlSchema.ownerId, ownerId));

      return apiResponse({
        data: response,
        message: "URLs retrieved successfully",
      });
    }

    return apiResponse({ status: 204 });
  } catch (error) {
    console.error("Error shortening URL: ", error);
    return apiResponse({
      success: false,
      message: "Failed to retrieve URLs",
      status: 500,
    });
  }
}
