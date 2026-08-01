import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } =
      await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          error:
            "Email and OTP are required",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            email.toLowerCase(),
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    if (
      !user.emailOtp ||
      user.emailOtp !== otp
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid OTP",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !user.emailOtpExpiry ||
      user.emailOtpExpiry <
        new Date()
    ) {
      return NextResponse.json(
        {
          error:
            "OTP expired",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
  emailVerified: true,

  emailOtp: null,
  emailOtpExpiry: null,
}
    });

    return NextResponse.json({
      success: true,
      message:
        "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}