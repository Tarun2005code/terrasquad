"use client";
import { exportBookings } from "@/lib/exportBookings";

type Props = {
  bookings: any[];
};

export default function ExportBookingsButton({
  bookings,
}: Props) {
  return (
    <button
      onClick={() => exportBookings(bookings)}
      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
    >
      Export CSV
    </button>
  );
}