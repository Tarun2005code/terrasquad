import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendOtpEmail } from "@/lib/email/sendOtpEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();

    const email = body.email
      ?.trim()
      .toLowerCase();

    const password = body.password;

    const phone =
      body.phone?.trim() || null;

    if (
      !name ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          error:
            "All required fields must be provided",
        },
        {
          status: 400,
        }
      );
    }

    if (
      name.length < 2 ||
      name.length > 100
    ) {
      return NextResponse.json(
        {
          error: "Invalid name",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(email)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid email address",
        },
        {
          status: 400,
        }
      );
    }

    if (
      password.length < 8
    ) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Email already registered",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    const otp = crypto
      .randomInt(
        100000,
        1000000
      )
      .toString();

    const hashedOtp =
      await bcrypt.hash(
        otp,
        10
      );

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password:
            hashedPassword,

          emailVerified:
            false,

          emailOtp:
            hashedOtp,

          emailOtpExpiry:
            new Date(
              Date.now() +
                10 *
                  60 *
                  1000
            ),
        },
      });

    await sendOtpEmail(
      user.email,
      otp
    );

    return NextResponse.json({
      success: true,
      email: user.email,
      message:
        "OTP sent to your email.",
    });
  } catch (error) {
    console.error(
      "Signup Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}