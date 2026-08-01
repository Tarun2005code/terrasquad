import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendResetEmail } from "@/lib/email/sendResetEmail";
import { randomBytes } from "crypto";
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    // Don't reveal whether email exists
    if (!user) {
      return NextResponse.json({
        success: true,
      });
    }
const token = randomBytes(32).toString("hex");

    console.log("RESET TOKEN CREATED:", token);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(
          Date.now() + 60 * 60 * 1000
        ), // 1 hour
      },
    });

    console.log(
      "TOKEN SAVED FOR USER:",
      user.email
    );

    await sendResetEmail(
      user.email,
      token
    );

    console.log(
      "RESET EMAIL SENT TO:",
      user.email
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}