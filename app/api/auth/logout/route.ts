import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore =
    await cookies();

  cookieStore.delete("__Secure-user_token");
cookieStore.delete("user_token");

  return NextResponse.json({
    success: true,
  });
}