import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")?.trim();

  const expected = `Bearer ${process.env.BOOKING_CLEANUP_SECRET}`;

  console.log("Received Authorization:", auth);
  console.log("Expected Authorization:", expected);

  if (!process.env.BOOKING_CLEANUP_SECRET) {
    return NextResponse.json(
      {
        success: false,
        error: "BOOKING_CLEANUP_SECRET is not configured",
      },
      {
        status: 500,
      }
    );
  }

  if (auth !== expected) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const expiredBookings = await prisma.booking.findMany({
      where: {
        paymentStatus: "PENDING",
        expiresAt: {
          lt: new Date(),
        },
      },
      include: {
        coupon: true,
      },
    });

    let cleaned = 0;

    for (const booking of expiredBookings) {
      await prisma.$transaction(async (tx) => {
        await tx.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            paymentStatus: "CANCELLED",
            status: "CANCELLED",
            cancelledAt: new Date(),
            expiresAt: null,
          },
        });

        if (booking.couponId) {
          const coupon = await tx.coupon.findUnique({
            where: {
              id: booking.couponId,
            },
          });

          if (coupon && coupon.usedCount > 0) {
            await tx.coupon.update({
              where: {
                id: booking.couponId,
              },
              data: {
                usedCount: {
                  decrement: 1,
                },
              },
            });
          }

          await tx.couponUsage.deleteMany({
            where: {
              couponId: booking.couponId,
              userId: booking.userId,
            },
          });
        }

        await tx.bookingEvent.create({
          data: {
            bookingId: booking.id,
            action: "BOOKING_EXPIRED",
          },
        });
      });

      cleaned++;
    }

    return NextResponse.json({
      success: true,
      cleaned,
      message: `${cleaned} expired booking(s) cleaned.`,
    });
  } catch (error) {
    console.error("Cleanup Error:", error);

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