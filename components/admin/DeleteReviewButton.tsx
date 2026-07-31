"use client";

import { useRouter } from "next/navigation";

export default function DeleteReviewButton({
  reviewId,
}: {
  reviewId: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this review?"
    );

    if (!confirmed) return;

    const res = await fetch(
      `/api/admin/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}