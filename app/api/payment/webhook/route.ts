import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/email/sendBookingConfirmation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = req.headers.get(
      "x-razorpay-signature"
    );

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing signature",
        },
        {
          status: 400,
        }
      );
    }

    const secret =
      process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid webhook signature",
        },
        {
          status: 400,
        }
      );
    }

    const event = JSON.parse(body);

    // Only process successful captured payments
    if (event.event !== "payment.captured") {
      return NextResponse.json({
        success: true,
      });
    }

    const payment =
      event.payload.payment.entity;

    const razorpayOrderId = payment.order_id;
    const razorpayPaymentId = payment.id;

    const booking =
      await prisma.booking.findFirst({
        where: {
          razorpayOrderId,
        },
        include: {
          user: true,
          expedition: true,
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

    // Webhook may arrive multiple times
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json({
        success: true,
      });
    }

    const bookingReference =
      booking.bookingReference ??
      `TS-${Date.now()}-${booking.id}`;

    await prisma.$transaction(
      async (tx) => {
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
            paymentStatus: "PAID",
            status: "CONFIRMED",
            razorpayPaymentId,
            bookingReference,
            expiresAt: null,
          },
        });

        await tx.expeditionDate.update({
          where: {
            id: expeditionDate.id,
          },
          data: {
            bookedSeats: {
              increment:
                booking.participants,
            },
          },
        });

        await tx.bookingEvent.create({
          data: {
            bookingId: booking.id,
            action: "PAYMENT_SUCCESS",
          },
        });
      }
    );

    // Send confirmation email (do not fail webhook if email fails)
    try {
      await sendBookingConfirmation({
        email: booking.user.email,
        name: booking.user.name ?? "",
        expedition:
          booking.expedition.title,
        date:
          booking.expeditionDate.toLocaleDateString(
            "en-GB"
          ),
        participants:
          booking.participants,
        amount:
          booking.finalAmount,
        bookingReference,
      });
    } catch (emailError) {
      console.error(
        "Email sending failed:",
        emailError
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Webhook Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Webhook failed",
      },
      {
        status: 500,
      }
    );
  }
}