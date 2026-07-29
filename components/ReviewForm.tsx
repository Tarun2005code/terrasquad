"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  bookingId: number;
  expeditionId: number;
};

export default function ReviewForm({
  bookingId,
}: Props) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to submit review.");
        return;
      }

      alert("Review submitted successfully.");

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
      className="rounded-xl border bg-white p-6 shadow space-y-5"
    >
      <h2 className="text-2xl font-bold">
        Leave a Review
      </h2>

      <div>
        <label className="mb-2 block font-medium">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-lg border p-3"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Review
        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}