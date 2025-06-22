import { NextResponse } from "next/server";

// Types
import type { Response } from "@/types/response";

export function apiResponse<T>({
  success = true,
  data,
  message = "",
  status,
}: Partial<Response<T>> & { status?: number }): ReturnType<
  typeof NextResponse.json
> {
  return NextResponse.json(
    {
      success,
      data: data ?? null,
      message,
    },
    {
      status: status ?? (success ? 200 : 500),
    },
  );
}
