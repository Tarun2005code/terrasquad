import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email/sendVerificationEmail";

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

    const existing =
      await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });

    if (existing) {
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

    const verificationToken =
      crypto.randomBytes(32).toString("hex");

    const user =
      await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          phone,
          password: hashedPassword,

          emailVerified: false,

          verificationToken,

          verificationTokenExpiry:
            new Date(
              Date.now() +
                24 * 60 * 60 * 1000
            ),
        },
      });

    await sendVerificationEmail(
      user.email,
      verificationToken
    );

    return NextResponse.json({
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
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