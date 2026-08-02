import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email =
      body.email?.trim().toLowerCase();

    const otp =
      body.otp?.trim();

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

    // OTP must be exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          error: "Invalid OTP",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid email or OTP",
        },
        {
          status: 400,
        }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message:
          "Email already verified",
      });
    }

    if (
      !user.emailOtp ||
      !user.emailOtpExpiry
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid email or OTP",
        },
        {
          status: 400,
        }
      );
    }

    if (
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

    const validOtp =
      await bcrypt.compare(
        otp,
        user.emailOtp
      );

    if (!validOtp) {
      return NextResponse.json(
        {
          error:
            "Invalid email or OTP",
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
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Email verified successfully",
    });
  } catch (error) {
    console.error(
      "Verify OTP Error:",
      error
    );

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