import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  try {
    const { id } = await params;

    const body = await req.json().catch(() => ({}));
    const reason =
      body.reason || "Cancelled by user";

    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(id),
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
      return NextResponse.json(
        {
          success: false,
          error: "Booking already cancelled",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      // Release seats only if they were actually reserved
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
          paymentStatus: "CANCELLED",
          status: "CANCELLED",
          cancelledAt: new Date(),
          cancellationReason: reason,
        },
      });

      await tx.bookingEvent.create({
        data: {
          bookingId: booking.id,
          action: "BOOKING_CANCELLED",
        },
      });
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Booking Cancel Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to cancel booking",
      },
      {
        status: 500,
      }
    );
  }
}