import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBookingReference } from "@/lib/bookingReference";
import { getCurrentUser } from "@/lib/auth/session";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
  expeditionId,
  dateId,
  participants,
  couponCode,
} = body;

    if (
  !Number.isInteger(expeditionId) ||
  !Number.isInteger(dateId)
) {
  return NextResponse.json(
    {
      error: "Invalid expedition.",
    },
    {
      status: 400,
    }
  );
}
 
if (
  !Number.isInteger(participants) ||
  participants < 1 ||
  participants > 10
) {
  return NextResponse.json(
    {
      error:
        "Participants must be between 1 and 10.",
    },
    {
      status: 400,
    }
  );
}
// ----------------------------------------
// Authenticated User
// ----------------------------------------

const user = await getCurrentUser();

if (!user) {
  return NextResponse.json(
    {
      error: "Please login first",
    },
    {
      status: 401,
    }
  );
}
    // ----------------------------------------
    // Expedition
    // ----------------------------------------

    const expedition = await prisma.expedition.findUnique({
      where: {
        id: expeditionId,
      },
    });

    if (!expedition) {
      return NextResponse.json(
        {
          error: "Expedition not found",
        },
        {
          status: 404,
        }
      );
    }

    // ----------------------------------------
    // Date
    // ----------------------------------------

    const expeditionDate =
      await prisma.expeditionDate.findUnique({
        where: {
          id: dateId,
        },
      });

    if (!expeditionDate) {
      return NextResponse.json(
        {
          error: "Date not found",
        },
        {
          status: 404,
        }
      );
    }
// Date must belong to expedition
if (expeditionDate.expeditionId !== expedition.id) {
  return NextResponse.json(
    {
      error: "Invalid expedition date.",
    },
    {
      status: 400,
    }
  );
}

// Date should not be in the past
if (expeditionDate.date < new Date()) {
  return NextResponse.json(
    {
      error: "Booking for this date has closed.",
    },
    {
      status: 400,
    }
  );
}
    if (
      expeditionDate.bookedSeats + participants >
      expeditionDate.seats
    ) {
      return NextResponse.json(
        {
          error: "Not enough seats available",
        },
        {
          status: 400,
        }
      );
    }
const existingBooking =
  await prisma.booking.findFirst({
    where: {
      userId: user.id,
      expeditionDateId: dateId,
      paymentStatus: {
        in: ["PENDING", "PAID"],
      },
    },
  });

if (existingBooking) {
  return NextResponse.json(
    {
      error:
        "You already have a booking for this expedition.",
    },
    {
      status: 409,
    }
  );
}
    // ----------------------------------------
    // Pricing
    // ----------------------------------------

    const totalAmount =
      expedition.price * participants;

    let discountAmount = 0;
    let finalAmount = totalAmount;

    let couponId: number | null = null;
    let appliedCouponCode: string | null = null;

    if (couponCode) {
      const coupon =
        await prisma.coupon.findUnique({
          where: {
            code: couponCode.toUpperCase(),
          },
        });
const alreadyUsed =
  coupon
    ? await prisma.couponUsage.findFirst({
        where: {
          couponId: coupon.id,
          userId: user.id,
        },
      })
    : null;
      if (
  coupon &&
  !alreadyUsed &&
  coupon.active &&
  (!coupon.expiresAt ||
    coupon.expiresAt > new Date()) &&
  totalAmount >= coupon.minAmount &&
  (!coupon.usageLimit ||
    coupon.usedCount < coupon.usageLimit)
){
        if (coupon.type === "PERCENTAGE") {
          discountAmount = Math.floor(
            (totalAmount * coupon.value) / 100
          );

          if (
            coupon.maxDiscount &&
            discountAmount > coupon.maxDiscount
          ) {
            discountAmount =
              coupon.maxDiscount;
          }
        } else {
          discountAmount = coupon.value;
        }

        finalAmount = Math.max(
          totalAmount - discountAmount,
          0
        );

        couponId = coupon.id;
        appliedCouponCode = coupon.code;
      }
    }

    const bookingReference =
      generateBookingReference();

    // ----------------------------------------
    // Create Booking
    // ----------------------------------------

const booking = await prisma.$transaction(
  async (tx) => {
    const booking =
      await tx.booking.create({
        data: {
          bookingReference,

          expeditionId,

          expeditionDateId: dateId,

          userId: user.id,

          expeditionDate:
            expeditionDate.date,

          participants,

          totalAmount,

          discountAmount,

          finalAmount,

          couponId,

          couponCode:
            appliedCouponCode,

          paymentStatus: "PENDING",

          status: "PENDING",

          expiresAt: new Date(
            Date.now() +
              15 * 60 * 1000
          ),
        },
      });

    if (couponId) {
      await tx.couponUsage.create({
        data: {
          couponId,
          userId: user.id,
          bookingId: booking.id,
        },
      });

      await tx.coupon.update({
        where: {
          id: couponId,
        },
        data: {
          usedCount: {
            increment: 1,
          },
        },
      });
    }

    return booking;
  }
);
  



    // ----------------------------------------
    // Return
    // ----------------------------------------

    return NextResponse.json(booking);
  } catch (error) {
    console.error(
  "Booking API Error:",
  error
);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}