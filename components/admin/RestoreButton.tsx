"use client";

import { useRouter } from "next/navigation";

export default function RestoreButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function restore() {
    const res = await fetch(
      `/api/admin/expeditions/${id}/restore`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      alert("Failed to restore");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={restore}
      className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
    >
      Restore
    </button>
  );
}