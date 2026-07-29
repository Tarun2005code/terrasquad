"use client";

import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function remove() {
    const ok = confirm("Delete this expedition?");

    if (!ok) return;

    const res = await fetch(`/api/admin/expeditions/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={remove}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}