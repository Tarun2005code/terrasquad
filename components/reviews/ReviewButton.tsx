"use client";

import { useState } from "react";

export default function ReviewButton({
  bookingId,
}: {
  bookingId: number;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    try {
      setLoading(true);

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
        alert(data.error || "Failed to submit review");
        return;
      }

      alert(
        "Thanks for sharing your experience with TerraSquad!"
      );

      setOpen(false);
      location.reload();
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#2F5D50] px-5 py-3 text-white"
      >
        Write Review
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">
              Write Review
            </h2>

            <div className="mb-4 flex gap-2 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                >
                  {star <= rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Share your experience..."
              className="h-32 w-full rounded-xl border p-3"
            />

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border py-3"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={submitReview}
                className="flex-1 rounded-xl bg-[#2F5D50] py-3 text-white"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}