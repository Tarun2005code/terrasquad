"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  bookingId: number;
  bookingReference: string;
  status: string;
};

export default function BookingActions({
  bookingId,
  bookingReference,
  status,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function cancelBooking() {
    const ok = confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!ok) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/bookings/${bookingId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to cancel booking.");
        return;
      }

      alert("Booking cancelled successfully.");

      router.refresh();
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12 flex flex-wrap gap-4">
      <a
        href={`/api/bookings/reference/${bookingReference}/ticket`}
        className="rounded-xl bg-[#2F5D50] px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Download Ticket
      </a>

      {status !== "CANCELLED" && (
        <button
          onClick={cancelBooking}
          disabled={loading}
          className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {loading ? "Cancelling..." : "Cancel Booking"}
        </button>
      )}

      <Link
        href="/expeditions"
        className="rounded-xl border px-6 py-3 font-semibold"
      >
        Book Another Expedition
      </Link>

      <Link
        href="/"
        className="rounded-xl border px-6 py-3 font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}