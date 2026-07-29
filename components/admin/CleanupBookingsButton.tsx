"use client";

import { useState } from "react";

export default function CleanupBookingsButton() {
  const [loading, setLoading] = useState(false);

  async function cleanup() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/cleanup", {
        method: "POST",
      });

      const data = await res.json();

      alert(`${data.cancelled} expired bookings cleaned.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={cleanup}
      disabled={loading}
      className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Cleaning..." : "Cleanup Expired Bookings"}
    </button>
  );
}