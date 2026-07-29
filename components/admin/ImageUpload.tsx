"use client";

import { useRef } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    onChange(data.url);
  }

  return (
    <div className="space-y-4 md:col-span-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Upload Image
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            upload(e.target.files[0]);
          }
        }}
      />

      {value && (
        <img
          src={value}
          alt=""
          className="h-60 rounded-lg object-cover"
        />
      )}
    </div>
  );
}