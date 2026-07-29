"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  expeditionId: number;
  departureDate?: {
    id: number;
    date: Date;
    seats: number;
    bookedSeats: number;
  };
};

export default function DepartureDateForm({
  expeditionId,
  departureDate,
}: Props) {
  const router = useRouter();

  const [date, setDate] = useState(
    departureDate
      ? new Date(departureDate.date)
          .toISOString()
          .split("T")[0]
      : ""
  );

  const [seats, setSeats] = useState(
    departureDate?.seats ?? 20
  );

  const [loading, setLoading] = useState(false);

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const url = departureDate
        ? `/api/admin/expeditions/${expeditionId}/dates/${departureDate.id}`
        : `/api/admin/expeditions/${expeditionId}/dates`;

      const method = departureDate ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          seats,
        }),
      });

      if (!res.ok) {
        const data = await res.json();

        alert(
          data.error ??
            "Failed to save departure date"
        );
        return;
      }

      router.push(
        `/admin/expeditions/${expeditionId}/dates`
      );
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-xl bg-white p-8 shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Departure Date
        </label>

        <input
          type="date"
          required
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Total Seats
        </label>

        <input
          type="number"
          min={1}
          required
          value={seats}
          onChange={(e) =>
            setSeats(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : departureDate
          ? "Update Departure Date"
          : "Create Departure Date"}
      </button>
    </form>
  );
}