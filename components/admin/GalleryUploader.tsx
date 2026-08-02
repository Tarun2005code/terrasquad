"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  expeditionId: number;
};

export default function GalleryUploader({
  expeditionId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function upload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    try {
      const form = new FormData();

      form.append("file", file);

      form.append(
        "upload_preset",
        process.env
          .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      const uploaded = await uploadRes.json();

      console.log("UPLOADED:", uploaded);

      if (!uploaded.secure_url) {
        console.error(
          "Cloudinary upload failed:",
          uploaded
        );

        alert("Cloudinary upload failed.");
        return;
      }

      const payload = {
        image: uploaded.secure_url,
      };

      console.log(
        "PAYLOAD TO API:",
        payload
      );

      const save = await fetch(
        `/api/admin/expeditions/${expeditionId}/gallery`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const saveData = await save.json();

      console.log(
        "GALLERY SAVE RESPONSE:",
        saveData
      );

      if (!save.ok) {
        alert(
          saveData.error ||
            "Unable to save image."
        );
        return;
      }

      alert("Image uploaded successfully.");

      router.refresh();
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <label className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">
      {loading
        ? "Uploading..."
        : "Upload Image"}

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={upload}
      />
    </label>
  );
}