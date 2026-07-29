"use client";

import { useState } from "react";
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
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        QR Check-In
      </h1>

      <QRScanner onDetected={verify} />

      {message && (
        <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {booking && (
        <div className="mt-8 rounded-2xl border bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Booking Verified
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {booking.user.name}
            </p>

            <p>
              <strong>Email:</strong> {booking.user.email}
            </p>

            <p>
              <strong>Phone:</strong> {booking.user.phone || "-"}
            </p>

            <p>
              <strong>Expedition:</strong> {booking.expedition.title}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                booking.expeditionDate
              ).toLocaleDateString("en-GB")}
            </p>

            <p>
              <strong>Participants:</strong>{" "}
              {booking.participants}
            </p>

            <p>
              <strong>Booking Reference:</strong>{" "}
              {booking.bookingReference}
            </p>

            <p>
              <strong>Checked In:</strong>{" "}
              <span className="font-semibold text-green-600">
                Yes
              </span>
            </p>

            <p>
              <strong>Check-In Time:</strong>{" "}
              {booking.checkedInAt
                ? new Date(
                    booking.checkedInAt
                  ).toLocaleString("en-GB")
                : "-"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}