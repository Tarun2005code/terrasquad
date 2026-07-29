"use client";

import { useRouter } from "next/navigation";

type Props = {
  expeditionId: number;
  dateId: number;
};

export default function DeleteDepartureDateButton({
  expeditionId,
  dateId,
}: Props) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Delete this departure date?")) {
      return;
    }

    const res = await fetch(
      `/api/admin/expeditions/${expeditionId}/dates/${dateId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Unable to delete.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={remove}
      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}