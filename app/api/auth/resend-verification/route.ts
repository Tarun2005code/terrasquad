import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email/sendVerificationEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    const token = crypto
      .randomBytes(32)
      .toString("hex");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verificationToken: token,
        verificationTokenExpiry: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ),
      },
    });

    await sendVerificationEmail(
      user.email,
      token
    );

    return NextResponse.json({
      success: true,
      message: "Verification email sent",
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