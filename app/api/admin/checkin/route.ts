import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { bookingReference } = await req.json();

    if (!bookingReference) {
      return NextResponse.json(
        {
          error: "Booking reference is required.",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        bookingReference,
      },
      include: {
        user: true,
        expedition: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          error: "Invalid Ticket",
        },
        {
          status: 404,
        }
      );
    }

    if (booking.paymentStatus !== "PAID") {
      return NextResponse.json(
        {
          error: "Payment not completed.",
        },
        {
          status: 400,
        }
      );
    }

    if (booking.checkedIn) {
      return NextResponse.json(
        {
          error: "Already Checked In",
          booking,
        },
        {
          status: 400,
        }
      );
    }

    const updated = await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
      },
      include: {
        user: true,
        expedition: true,
      },
    });

    return NextResponse.json({
      success: true,
      booking: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}