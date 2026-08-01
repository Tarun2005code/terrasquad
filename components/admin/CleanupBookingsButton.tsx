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
console.log("STATUS:", res.status);
console.log("DATA:", data);
      if (!res.ok) {
        throw new Error(data.error || "Cleanup failed");
      }

      alert(`${data.deleted} bookings deleted.`);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Cleanup failed");
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