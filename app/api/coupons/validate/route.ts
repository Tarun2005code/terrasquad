import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code, amount, userId } = await req.json();

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon code is required",
        },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code.trim().toUpperCase(),
      },
    });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid coupon",
        },
        { status: 404 }
      );
    }

    if (!coupon.active) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon is inactive",
        },
        { status: 400 }
      );
    }

    if (
      coupon.expiresAt &&
      coupon.expiresAt < new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon has expired",
        },
        { status: 400 }
      );
    }

    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon usage limit reached",
        },
        { status: 400 }
      );
    }

    if (amount < coupon.minAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum booking amount is ₹${coupon.minAmount}`,
        },
        { status: 400 }
      );
    }

    // Check whether this user has already used the coupon
    if (userId) {
      const alreadyUsed =
        await prisma.couponUsage.findUnique({
          where: {
            couponId_userId: {
              couponId: coupon.id,
              userId,
            },
          },
        });

      if (alreadyUsed) {
        return NextResponse.json(
          {
            success: false,
            error: "You have already used this coupon.",
          },
          { status: 400 }
        );
      }
    }

    let discount = 0;

    if (coupon.type === "FIXED") {
      discount = coupon.value;
    } else {
      discount = Math.floor(
        (amount * coupon.value) / 100
      );

      if (
        coupon.maxDiscount &&
        discount > coupon.maxDiscount
      ) {
        discount = coupon.maxDiscount;
      }
    }

    if (discount > amount) {
      discount = amount;
    }

    return NextResponse.json({
      success: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
      },
      discount,
      finalAmount: amount - discount,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to validate coupon",
      },
      { status: 500 }
    );
  }
}