"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function AddDepartureDatePage({
  params,
}: Props) {
  const { id } = use(params);

  const router = useRouter();

  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(30);
  const [loading, setLoading] = useState(false);

  async function saveDate(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!date) {
      alert("Please select a departure date.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/admin/expeditions/${id}/dates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date,
            seats,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.error ||
            "Unable to create departure date."
        );
        return;
      }

      router.push(
        `/admin/expeditions/${id}/dates`
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Add Departure Date
      </h1>

      <form
        onSubmit={saveDate}
        className="space-y-6 rounded-xl border bg-white p-8 shadow"
      >
        <div>
          <label className="mb-2 block font-semibold">
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
          <label className="mb-2 block font-semibold">
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
          className="w-full rounded-lg bg-green-600 py-3 text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Create Departure Date"}
        </button>
      </form>
    </div>
  );
}