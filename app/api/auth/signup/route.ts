import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/email/sendOtpEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      password,
      phone,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
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
      await bcrypt.hash(password, 10);

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    const user =
      await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          phone,
          password: hashedPassword,

          emailVerified: false,

          emailOtp: otp,

          emailOtpExpiry:
            new Date(
              Date.now() +
                10 * 60 * 1000
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
    console.error(error);

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