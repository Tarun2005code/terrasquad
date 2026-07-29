import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAdminToken } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    if (admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 403 }
      );
    }

    const valid = await verifyPassword(
      password,
      admin.password
    );

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}