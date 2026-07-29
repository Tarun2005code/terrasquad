import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = Promise<{
  reference: string;
}>;

export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { reference } = await params;

    const booking = await prisma.booking.findUnique({
      where: {
        bookingReference: reference,
      },
      include: {
        user: true,
        expedition: true,
      },
    });

    if (!booking) {
      return NextResponse.json({
        valid: false,
        message: "Booking not found",
      });
    }

    if (booking.paymentStatus !== "PAID") {
      return NextResponse.json({
        valid: false,
        message: "Payment pending",
      });
    }

    if (booking.status === "CANCELLED") {
      return NextResponse.json({
        valid: false,
        message: "Booking cancelled",
      });
    }

    return NextResponse.json({
      valid: true,
      booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        valid: false,
      },
      {
        status: 500,
      }
    );
  }
}