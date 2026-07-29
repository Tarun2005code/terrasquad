import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const user =
      await prisma.user.findFirst({
        where: {
          verificationToken: token,
          verificationTokenExpiry: {
            gt: new Date(),
          },
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token",
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
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
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