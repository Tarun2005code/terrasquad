import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      bookingReference,
      email,
    } = await req.json();

    const booking = await prisma.booking.findFirst({
      where: {
        bookingReference,
        user: {
          email,
        },
      },
      include: {
        expedition: true,
        user: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      bookingReference:
        booking.bookingReference,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}