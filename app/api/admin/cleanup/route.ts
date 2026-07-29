import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
export async function POST() {
    await requireAdmin();
  try {
    const now = new Date();

    // Find all expired pending bookings
    const expiredBookings = await prisma.booking.findMany({
      where: {
        paymentStatus: "PENDING",
        expiresAt: {
          lt: now,
        },
      },
    });

    let cancelled = 0;

    for (const booking of expiredBookings) {
      await prisma.$transaction([
        prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            paymentStatus: "CANCELLED",
          },
        }),

        prisma.expeditionDate.update({
          where: {
            id: booking.expeditionDateId,
          },
          data: {
            bookedSeats: {
              decrement: booking.participants,
            },
          },
        }),
      ]);

      cancelled++;
    }

    return NextResponse.json({
      success: true,
      cancelled,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Cleanup failed",
      },
      {
        status: 500,
      }
    );
  }
}