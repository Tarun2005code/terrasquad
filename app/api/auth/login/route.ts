import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signUserToken } from "@/lib/auth/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const emailNormalized =
      email?.trim().toLowerCase();

    if (!emailNormalized || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email: emailNormalized,
        },
      });

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

    const valid =
      await bcrypt.compare(
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

    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error:
            "Please verify your email before logging in.",
        },
        {
          status: 403,
        }
      );
    }

    const token = signUserToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const cookieStore =
      await cookies();

    cookieStore.set(
      "__Secure-user_token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        path: "/",
        maxAge:
          60 * 60 * 24 * 30,
        expires: new Date(
          Date.now() +
            1000 *
              60 *
              60 *
              24 *
              30
        ),
        priority: "high",
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Login successful",
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

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