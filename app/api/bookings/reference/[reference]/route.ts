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

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking reference is required",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        bookingReference: reference,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        expedition: true,

        coupon: true,

        events: {
          orderBy: {
            createdAt: "asc",
          },
        },
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
          error: "Booking has expired.",
        },
        {
          status: 410,
        }
      );
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        bookingReference: booking.bookingReference,

        status: booking.status,
        paymentStatus: booking.paymentStatus,

        participants: booking.participants,

        totalAmount: booking.totalAmount,
        discountAmount: booking.discountAmount,
        finalAmount: booking.finalAmount,

        couponCode: booking.couponCode,

        expeditionDate:
          booking.expeditionDate.toISOString(),

        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,

        user: booking.user,

        expedition: booking.expedition,

        coupon: booking.coupon,

        events: booking.events,
      },
    });
  } catch (error) {
    console.error("Booking API Error");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}