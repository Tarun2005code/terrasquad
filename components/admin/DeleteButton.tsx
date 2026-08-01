"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function archiveExpedition() {
    const ok = confirm(
      "Archive this expedition? It will be hidden from the website."
    );

    if (!ok) return;

    const res = await fetch(`/api/admin/expeditions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to archive");
      return;
    }

    alert("Expedition archived successfully");
    router.refresh();
  }

  return (
    <button
      onClick={archiveExpedition}
      className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
    >
      Archive
    </button>
  );
}