import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signUserToken } from "@/lib/auth/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
console.log("USER FOUND:", user);
console.log("EMAIL VERIFIED:", user?.emailVerified);
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const valid = await bcrypt.compare(
      password,
      user.password
    );

    if (!valid) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    // ----------------------------------------
    // Email Verification Check
    // ----------------------------------------

    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error:
            "Please verify your email before logging in.",
        },
        {
          status: 401,
        }
      );
    }

    // ----------------------------------------
    // Create JWT
    // ----------------------------------------

    const token = signUserToken({
      id: user.id,
      email: user.email,
    });

    const cookieStore = await cookies();

    cookieStore.set(
      "user_token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}