"use client";

import { useState } from "react";
import Link from "next/link";

import QRScanner from "@/components/admin/QRScanner";

export default function CheckInPage() {
  const [booking, setBooking] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function verify(reference: string) {
    try {
      setBooking(null);
      setMessage("");
      setError("");

      const res = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingReference: reference,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setBooking(data.booking);
      setMessage("✅ Check-In Successful");
    } catch {
      setError("Server Error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold md:text-4xl">
            QR Check-In
          </h1>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Scan participant ticket QR code
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex w-fit rounded-lg bg-gray-600 px-5 py-3 text-white transition hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Link>

      </div>

      {/* Scanner */}
      <QRScanner onDetected={verify} />

      {/* Success Message */}
      {message && (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Booking Details */}
      {booking && (
        <div className="mt-6 rounded-2xl border bg-white p-5 shadow md:p-8">

          <h2 className="mb-5 text-xl font-bold md:text-2xl">
            Booking Verified
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">

            <Info
              label="Name"
              value={booking.user.name}
            />

            <Info
              label="Email"
              value={booking.user.email}
            />

            <Info
              label="Phone"
              value={booking.user.phone || "-"}
            />

            <Info
              label="Participants"
              value={booking.participants}
            />

            <Info
              label="Expedition"
              value={booking.expedition.title}
            />

            <Info
              label="Booking Ref"
              value={booking.bookingReference}
            />

            <Info
              label="Date"
              value={new Date(
                booking.expeditionDate
              ).toLocaleDateString("en-GB")}
            />

            <Info
              label="Check-In Time"
              value={
                booking.checkedInAt
                  ? new Date(
                      booking.checkedInAt
                    ).toLocaleString("en-GB")
                  : "-"
              }
            />

          </div>

          <div className="mt-5 rounded-xl bg-green-50 p-4 text-center">
            <span className="font-bold text-green-700">
              ✓ Participant Checked In
            </span>
          </div>

        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words font-semibold">
        {value}
      </p>
    </div>
  );
}