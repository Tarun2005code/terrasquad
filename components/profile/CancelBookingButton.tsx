"use client";

import { useRouter } from "next/navigation";

type Props = {
  bookingId: number;
};

export default function CancelBookingButton({
  bookingId,
}: Props) {
  const router = useRouter();

  async function cancelBooking() {
    const ok = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!ok) return;

    const res = await fetch(
      `/api/bookings/${bookingId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: "Cancelled by user",
        }),
      }
    );

    if (!res.ok) {
      alert("Unable to cancel booking");
      return;
    }

    alert("Booking cancelled successfully");

    router.refresh();
  }

  return (
    <button
      onClick={cancelBooking}
      className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
}