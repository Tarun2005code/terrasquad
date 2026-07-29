import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/payments/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    if (
      !bookingId ||
      !Number.isInteger(Number(bookingId))
    ) {
      return NextResponse.json(
        {
          error: "Invalid booking ID.",
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
          error: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Booking cancelled
    if (
      booking.status === "CANCELLED" ||
      booking.paymentStatus === "CANCELLED"
    ) {
      return NextResponse.json(
        {
          error: "Booking has expired.",
        },
        {
          status: 410,
        }
      );
    }

    // Booking expired
    if (
      booking.expiresAt &&
      booking.expiresAt < new Date()
    ) {
      return NextResponse.json(
        {
          error: "Booking has expired.",
        },
        {
          status: 410,
        }
      );
    }

    // Already paid
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json(
        {
          error: "Booking is already paid.",
        },
        {
          status: 409,
        }
      );
    }

    // Invalid amount
    if (booking.finalAmount <= 0) {
      return NextResponse.json(
        {
          error: "Invalid payment amount.",
        },
        {
          status: 400,
        }
      );
    }

    // Reuse existing order
    if (booking.razorpayOrderId) {
      return NextResponse.json({
        orderId: booking.razorpayOrderId,
        amount: booking.finalAmount * 100,
        currency: "INR",
        key: process.env.RAZORPAY_KEY_ID,
      });
    }

    // Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: booking.finalAmount * 100,
      currency: "INR",
      receipt: `booking_${booking.bookingReference}`,
      notes: {
        bookingId: booking.id.toString(),
        bookingReference:
          booking.bookingReference,
      },
    });

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        razorpayOrderId: order.id,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: booking.finalAmount * 100,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(
      "Create Razorpay Order Error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to create payment order.",
      },
      {
        status: 500,
      }
    );
  }
}