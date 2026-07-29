"use client";

import { useRouter } from "next/navigation";

type Props = {
  expeditionId: number;
  imageId: number;
};

export default function DeleteGalleryImageButton({
  expeditionId,
  imageId,
}: Props) {
  const router = useRouter();

  async function remove() {
    if (!confirm("Delete image?")) return;

    const res = await fetch(
      `/api/admin/expeditions/${expeditionId}/gallery/${imageId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Failed");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={remove}
      className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}