import { NextResponse } from "next/server";
import { razorpay } from "@/lib/payments/razorpay";

export async function GET() {
  try {
    const order = await razorpay.orders.create({
      amount: 100, // ₹1.00
      currency: "INR",
      receipt: "test_receipt_1",
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Razorpay connection failed" },
      { status: 500 }
    );
  }
}