"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  bookingId: number;
  checkedIn: boolean;
};

export default function CheckInButton({
  bookingId,
  checkedIn,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function checkIn() {
    if (checkedIn) return;

    const ok = confirm(
      "Mark this customer as checked in?"
    );

    if (!ok) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/bookings/${bookingId}/checkin`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={checkedIn || loading}
      onClick={checkIn}
      className={`rounded-lg px-5 py-2 text-white ${
        checkedIn
          ? "bg-green-600"
          : "bg-indigo-600 hover:bg-indigo-700"
      }`}
    >
      {checkedIn
        ? "Checked In"
        : loading
        ? "Checking..."
        : "Check In"}
    </button>
  );
}