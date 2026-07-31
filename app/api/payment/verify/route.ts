import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing payment details.",
        },
        {
          status: 400,
        }
      );
    }

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature.",
        },
        {
          status: 400,
        }
      );
    }

    const booking = await prisma.booking.findFirst({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Prevent duplicate processing
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json({
        success: true,
        bookingReference: booking.bookingReference,
      });
    }

    if (
      booking.status === "CANCELLED" ||
      booking.paymentStatus === "CANCELLED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking expired.",
        },
        {
          status: 410,
        }
      );
    }

    if (
      booking.expiresAt &&
      booking.expiresAt < new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking expired.",
        },
        {
          status: 410,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      const expeditionDate =
        await tx.expeditionDate.findUnique({
          where: {
            id: booking.expeditionDateId,
          },
        });

      if (!expeditionDate) {
        throw new Error(
          "Expedition date not found."
        );
      }

      const availableSeats =
        expeditionDate.seats -
        expeditionDate.bookedSeats;

      if (
        availableSeats <
        booking.participants
      ) {
        throw new Error(
          "No seats available."
        );
      }

      await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          razorpayPaymentId:
            razorpay_payment_id,
          razorpaySignature:
            razorpay_signature,
          paymentStatus: "PAID",
          status: "CONFIRMED",
        },
      });

      await tx.expeditionDate.update({
        where: {
          id: booking.expeditionDateId,
        },
        data: {
          bookedSeats: {
            increment:
              booking.participants,
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      bookingReference:
        booking.bookingReference,
    });
  } catch (error) {
    console.error(
      "Payment Verify Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed.",
      },
      {
        status: 500,
      }
    );
  }
}