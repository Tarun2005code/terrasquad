"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
  active,
}: {
  id: number;
  active: boolean;
}) {
  const router = useRouter();

  async function toggleExpedition() {
    const ok = confirm(
      active
        ? "Archive this expedition? It will be hidden from the website."
        : "Restore this expedition?"
    );

    if (!ok) return;

    const res = await fetch(`/api/admin/expeditions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert(
        active
          ? "Failed to archive"
          : "Failed to restore"
      );
      return;
    }

    alert(
      active
        ? "Expedition archived successfully"
        : "Expedition restored successfully"
    );

    router.refresh();
  }

  return (
    <button
      onClick={toggleExpedition}
      className={`rounded-lg px-4 py-2 text-white ${
        active
          ? "bg-orange-600 hover:bg-orange-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {active ? "Archive" : "Restore"}
    </button>
  );
}