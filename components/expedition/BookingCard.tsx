"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  expeditionId: number;
  price: number;
  dates: {
    id: number;
    date: Date;
    seats: number;
    bookedSeats: number;
  }[];
};

export default function BookingCard({
  expeditionId,
  price,
  dates,
}: Props) {
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const [discount, setDiscount] = useState(0);

  const [couponLoading, setCouponLoading] =
    useState(false);

  const [couponApplied, setCouponApplied] =
    useState(false);
  const total = useMemo(
    () => participants * price,
    [participants, price]
  );

  const finalAmount = Math.max(
    total - discount,
    0
  );
  const selectedDateData = dates.find(
  (d) => d.id === selectedDate
);
  useEffect(() => {
    setCouponApplied(false);
    setDiscount(0);
  }, [participants, selectedDate]);
  useEffect(() => {
  async function loadUser() {
    try {
      const res = await fetch("/api/auth/me");

      const data = await res.json();

      setUser(data.user);
    } catch {
      setUser(null);
    }
  }

  loadUser();
}, []);
  async function applyCoupon() {
    if (!couponCode.trim()) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      setCouponLoading(true);

      const res = await fetch(
        "/api/coupons/validate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            code: couponCode,
            amount: total,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      setDiscount(data.discount);

      setCouponApplied(true);

      toast.success("Coupon Applied");
    } catch {
      toast.error(
        "Unable to apply coupon"
      );
    } finally {
      setCouponLoading(false);
    }
  }
  
  async function handleBooking() {
    if (!user) {
  toast.error("Please login to continue");

  window.location.href = "/login";

  return;
}
    if (loading) {
      return;
    }
    if (!selectedDate) {
      toast.error("Please select an expedition date.");
      return;
    }

    

    try {
      setLoading(true);

      // -----------------------------
      // Create Booking
      // -----------------------------
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  expeditionId,
  dateId: selectedDate,
  participants,
  couponCode:
    couponApplied
      ? couponCode
      : null,
}),
      });

      const booking = await bookingRes.json();

      if (!bookingRes.ok) {
        throw new Error(booking.error);
      }

      if (booking.paymentStatus === "PAID") {
        toast.error("Booking already paid.");
        return;
      }

      // -----------------------------
      // Create Razorpay Order
      // -----------------------------
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: booking.id,
        }),
      });

      const order = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(order.error);
      }

      if (!window.Razorpay) {
        toast.error("Unable to load Razorpay.");
        return;
      }

      const razor = new window.Razorpay({
        key: order.key,
        amount: booking.finalAmount * 100,
        currency: order.currency,
        name: "TerraSquad",
        description: "Expedition Booking",
        order_id: order.orderId,

        prefill: {
  name: user.name,
  email: user.email,
  contact: user.phone ?? "",
},

        notes: {
          bookingId: booking.id.toString(),
        },

        theme: {
          color: "#2F5D50",
        },

        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verify = await verifyRes.json();

          if (verify.success) {
            toast.success("Payment Successful!");

            window.location.href =
              `/booking/success?booking=${verify.bookingReference}`;
          } else {
            toast.error("Payment verification failed.");
          }
        },

        modal: {
          ondismiss: async function () {
            await fetch("/api/payment/cancel", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bookingId: booking.id,
              }),
            });

            toast.info("Payment cancelled");

            window.location.href = "/booking/failed";
          },
        },
      });

      razor.on("payment.failed", async function (response: any) {
        await fetch("/api/payment/failure", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: booking.id,
          }),
        });

        toast.error(response.error.description);

        window.location.href = "/booking/failed";
      });

      razor.open();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">
        <p className="text-gray-500">Starting From</p>

        <h2 className="mt-2 text-5xl font-black text-[#2F5D50]">
          ₹{price}
        </h2>

        <p className="text-gray-500">per person</p>
        {user && (
  <div className="mt-6 rounded-2xl bg-[#F4F8F6] p-4">
    <p className="font-semibold text-[#2F5D50]">
      Logged in as {user.name}
    </p>

    <p className="text-sm text-gray-600">
      {user.email}
    </p>
  </div>
)}

        <div className="mt-6 rounded-2xl bg-[#F4F8F6] p-4">
          <p className="text-sm text-gray-500">
            Secure Booking
          </p>

          <p className="font-semibold text-[#2F5D50]">
            Instant Confirmation
          </p>
        </div>

        {/* Date */}
        <div className="mt-8">
          <label className="text-sm font-semibold">
            Expedition Date
          </label>

          <select
            disabled={loading}
            className="mt-3 w-full rounded-2xl border p-4"
            value={selectedDate ?? ""}
            onChange={(e) => {
              setCouponApplied(false);

              setDiscount(0);

              setSelectedDate(Number(e.target.value));
            }}
          >
            <option value="">Select Date</option>

            {dates.map((date) => {
              const formattedDate = new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(date.date));

              return (
                <option
  key={date.id}
  value={date.id}
  disabled={date.bookedSeats >= date.seats}
>
  {date.bookedSeats >= date.seats
    ? `${formattedDate} (FULL)`
    : `${formattedDate} (${date.seats - date.bookedSeats} seats left)`}
</option>
              );
            })}
          </select>
          {selectedDateData && (
  <p className="mt-2 text-sm text-gray-500">
    {selectedDateData.seats -
      selectedDateData.bookedSeats}{" "}
    seats remaining
  </p>
)}
        </div>

        {/* Participants */}
        <div className="mt-8">
          <label className="text-sm font-semibold">
            Participants
          </label>

          <div className="mt-3 flex items-center justify-between rounded-2xl border p-4">
            <button
              type="button"
              disabled={loading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl font-bold hover:bg-gray-200"
              onClick={() => {
                setParticipants((p) => Math.max(1, p - 1));
                setCouponApplied(false);
                setDiscount(0);
              }}
            >
              −
            </button>

            <span className="text-2xl font-bold">
              {participants}
            </span>

            <button
              type="button"
              disabled={loading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl font-bold hover:bg-gray-200"
              onClick={() => {
                setParticipants((p) => p + 1);
                setCouponApplied(false);
                setDiscount(0);
              }}
            >
              +
            </button>
          </div>
        </div>



        


        {/* Coupon */}
        <div className="mt-8 mb-6">
          <label className="text-sm font-semibold">
            Coupon
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              disabled={loading || couponApplied}
              value={couponCode}
              onChange={(e) => {
                setCouponApplied(false);
                setDiscount(0);
                setCouponCode(
                  e.target.value.toUpperCase()
                );
              }}
              placeholder="Coupon Code"
              className="flex-1 rounded-2xl border p-4"
            />

            <Button
              type="button"
              className="w-full sm:w-auto whitespace-nowrap px-6"
              disabled={
                loading ||
                couponLoading ||
                couponApplied
              }
              onClick={applyCoupon}
            >
              {couponApplied
                ? "Applied"
                : couponLoading
                  ? "..."
                  : "Apply"}
            </Button>
          </div>
        </div>
<div className="mt-8 mb-10">
  <Button
    type="button"
    className="w-full min-h-[60px] text-lg font-bold"
    onClick={handleBooking}
    disabled={loading || selectedDate === null}
  >
    {loading
      ? "Opening Payment Gateway..."
      : `Pay ₹${finalAmount}`}
  </Button>
</div>
        {/* Booking Summary */}
        <div className="mt-12 border-t pt-8">

          <h3 className="mb-4 text-lg font-bold">
            Booking Summary
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between text-gray-600">
              <span>
                {participants} Participant
                {participants > 1 ? "s" : ""}
              </span>

              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Price Per Person</span>

              <span>₹{price}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>

              <span className="font-medium">
                ₹{total}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between font-medium text-green-600">
                <span>Discount</span>

                <span>-₹{discount}</span>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span className="text-[#2F5D50]">
                  ₹{finalAmount}
                </span>
              </div>
            </div>

            {couponApplied && (
              <p className="text-sm font-medium text-green-600">
                ✓ Coupon applied successfully
              </p>
            )}

          </div>
        </div>

        {discount > 0 && (
          <div className="flex justify-between font-medium text-green-600">
            <span>Discount</span>

            <span>-₹{discount}</span>
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span className="text-[#2F5D50]">
              ₹{finalAmount}
            </span>
          </div>
        </div>

        {couponApplied && (
          <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
            ✓ Coupon applied successfully
            <br />
            You saved ₹{discount}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="mt-6 mb-10 space-y-2 text-sm text-gray-600">
        <p>✓ Instant Confirmation</p>
        <p>✓ Secure Razorpay Payments</p>
        <p>✓ Professional Guides</p>
        <p>✓ 24/7 Support</p>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        ✓ Secure Razorpay Payment
        <br />
        ✓ Instant Booking Confirmation
      </div>
      <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
  <p>✓ Certified Trip Leaders</p>
  <p>✓ Safe & Verified Routes</p>
  <p>✓ Emergency Support</p>
</div>
    </>)
}
