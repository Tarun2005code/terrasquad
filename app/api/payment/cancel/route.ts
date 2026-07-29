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

    if (
      booking.status === "CANCELLED" ||
      booking.paymentStatus === "CANCELLED"
    ) {
      return NextResponse.json({
        success: true,
      });
    }

    await prisma.$transaction(async (tx) => {
      // Release seats only if payment was completed
      if (booking.paymentStatus === "PAID") {
        await tx.expeditionDate.update({
          where: {
            id: booking.expeditionDateId,
          },
          data: {
            bookedSeats: {
              decrement: booking.participants,
            },
          },
        });
      }

      await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: "CANCELLED",
          paymentStatus: "CANCELLED",
          cancelledAt: new Date(),
        },
      });

      await tx.bookingEvent.create({
        data: {
          bookingId: booking.id,
          action: "PAYMENT_CANCELLED",
        },
      });
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Cancel Payment Error:", error);

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