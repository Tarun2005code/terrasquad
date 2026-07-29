"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ItineraryForm({
  expeditionId,
}: {
  expeditionId: number;
}) {
  const router = useRouter();

  const [day, setDay] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      `/api/admin/expeditions/${expeditionId}/itinerary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day,
          title,
          description,
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save itinerary");
      return;
    }

    router.push(`/admin/expeditions/${expeditionId}/itinerary`);
    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-xl bg-white p-8 shadow"
    >

      <input
        type="number"
        value={day}
        onChange={(e) => setDay(Number(e.target.value))}
        className="w-full rounded border p-3"
        placeholder="Day"
      />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-3"
        placeholder="Title"
      />

      <textarea
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded border p-3"
        placeholder="Description"
      />

      <button
        disabled={loading}
        className="rounded-lg bg-blue-600 px-8 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Day"}
      </button>

    </form>
  );
}