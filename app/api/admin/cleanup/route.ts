import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST() {
  await requireAdmin();

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        paymentStatus: {
          in: ["CANCELLED", "FAILED"],
        },
      },
      select: {
        id: true,
      },
    });

    const bookingIds = bookings.map((b) => b.id);

    if (bookingIds.length === 0) {
      return NextResponse.json({
        success: true,
        deleted: 0,
      });
    }

    // Delete child records first
    await prisma.bookingEvent.deleteMany({
      where: {
        bookingId: {
          in: bookingIds,
        },
      },
    });

    const result = await prisma.booking.deleteMany({
      where: {
        id: {
          in: bookingIds,
        },
      },
    });

    return NextResponse.json({
      success: true,
      deleted: result.count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Cleanup failed",
      },
      {
        status: 500,
      }
    );
  }
}