"use client";

import { useRouter } from "next/navigation";

type Props = {
  expeditionId: number;
  dateId: number;
  active: boolean;
};

export default function DeleteDepartureDateButton({
  expeditionId,
  dateId,
  active,
}: Props) {
  const router = useRouter();

  async function toggleStatus() {
    const confirmed = confirm(
      active
        ? "Archive this departure date? It will no longer be available for booking."
        : "Restore this departure date?"
    );

    if (!confirmed) return;

    const res = await fetch(
      `/api/admin/expeditions/${expeditionId}/dates/${dateId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      const data = await res.json();

      alert(
        data.error ||
          (active
            ? "Unable to archive departure date."
            : "Unable to restore departure date.")
      );
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={toggleStatus}
      className={`rounded px-3 py-1 text-white ${
        active
          ? "bg-orange-600 hover:bg-orange-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {active ? "Archive" : "Restore"}
    </button>
  );
}