import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(bookingId),
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

    // Don't overwrite successful payments
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json({
        success: true,
      });
    }

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        paymentStatus: "FAILED",
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}