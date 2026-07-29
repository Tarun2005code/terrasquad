import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { bookingReference } = await req.json();

    const booking = await prisma.booking.findUnique({
      where: {
        bookingReference,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.paymentStatus !== "PAID") {
      return NextResponse.json(
        { error: "Payment Pending" },
        { status: 400 }
      );
    }

    if (booking.checkedIn) {
      return NextResponse.json(
        { error: "Already Checked In" },
        { status: 400 }
      );
    }
if (booking.checkedIn) {
  return NextResponse.json(
    {
      error: "Already checked in.",
    },
    {
      status: 400,
    }
  );
}
    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}