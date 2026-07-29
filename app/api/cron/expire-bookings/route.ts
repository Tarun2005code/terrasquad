import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const expiredBookings = await prisma.booking.findMany({
      where: {
        paymentStatus: "PENDING",
        status: "PENDING",
        expiresAt: {
          lt: new Date(),
        },
      },
      select: {
        id: true,
      },
    });

    if (expiredBookings.length === 0) {
      return NextResponse.json({
        success: true,
        expired: 0,
      });
    }

    await prisma.$transaction(async (tx) => {
      for (const booking of expiredBookings) {
        await tx.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: "CANCELLED",
            paymentStatus: "CANCELLED",
          },
        });

        await tx.bookingEvent.create({
          data: {
            bookingId: booking.id,
            action: "BOOKING_EXPIRED",
          },
        });
      }
    });

    return NextResponse.json({
      success: true,
      expired: expiredBookings.length,
    });
  } catch (error) {
    console.error("Expire Bookings Error:", error);

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