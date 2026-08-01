"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
type Props = {
  expedition?: {
    id: number;
    slug: string;
    title: string;
    location: string;
    duration: string;
    difficulty: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    altitude: string | null;
    distance: string | null;
    pickup: string | null;
    meals: string | null;
    guide: boolean;
    featured: boolean;
  };
};

export default function ExpeditionForm({ expedition }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    slug: expedition?.slug ?? "",
    title: expedition?.title ?? "",
    location: expedition?.location ?? "",
    duration: expedition?.duration ?? "",
    difficulty: expedition?.difficulty ?? "Easy",
    price: expedition?.price ?? 0,
    image: expedition?.image ?? "",
    description: expedition?.description ?? "",
    rating: expedition?.rating ?? 4.9,
    altitude: expedition?.altitude ?? "",
    distance: expedition?.distance ?? "",
    pickup: expedition?.pickup ?? "",
    meals: expedition?.meals ?? "",
    guide: expedition?.guide ?? true,
    featured: expedition?.featured ?? false,
  });

  function update(name: string, value: unknown) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function uploadImage(file: File) {
    setUploading(true);

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });

    setUploading(false);

    if (!res.ok) {
      alert("Image upload failed");
      return;
    }

    const json = await res.json();
    <div className="space-y-4 md:col-span-2">

      <label className="block text-sm font-medium">
        Expedition Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            uploadImage(file);
          }
        }}
      />

      {uploading && (
        <p className="text-blue-600">
          Uploading image...
        </p>
      )}

      {form.image && (
        <Image
          src={form.image}
          alt="Preview"
          width={700}
          height={450}
          className="rounded-xl border"
        />
      )}

      <div className="md:col-span-2 space-y-3">

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (!e.target.files?.length) return;

            const data = new FormData();
            data.append("file", e.target.files[0]);

            setLoading(true);

            const res = await fetch("/api/admin/upload", {
              method: "POST",
              body: data,
            });

            const json = await res.json();

            setLoading(false);

            update("image", json.url);
          }}
        />

        {form.image && (
          <img
            src={form.image}
            className="h-52 rounded-lg object-cover"
            alt=""
          />
        )}

      </div>
    </div>
    update("image", json.url);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const url = expedition
      ? `/api/admin/expeditions/${expedition.id}`
      : "/api/admin/expeditions";

    const method = expedition ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    router.push("/admin/expeditions");
    router.refresh();
  }

  async function deleteExpedition() {
    if (!expedition) return;

    const confirmDelete = confirm(
      "Are you sure you want to archive this expedition?"
    );

    if (!confirmDelete) return;

    const res = await fetch(
      `/api/admin/expeditions/${expedition.id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Failed to Archive Expedition");
      return;
    }

    router.push("/admin/expeditions");
    router.refresh();
  }
  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-xl bg-white p-8 shadow"
    >
      <div className="grid gap-6 md:grid-cols-2">

        <input
          className="rounded border p-3"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Location"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => update("duration", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Difficulty"
          value={form.difficulty}
          onChange={(e) => update("difficulty", e.target.value)}
        />

        <input
          type="number"
          className="rounded border p-3"
          placeholder="Price"
          value={form.price}
          onChange={(e) => update("price", Number(e.target.value))}
        />

        <ImageUpload
          value={form.image}
          onChange={(url) => update("image", url)}
        />

        <textarea
          className="rounded border p-3 md:col-span-2"
          rows={5}
          placeholder="Description"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Altitude"
          value={form.altitude}
          onChange={(e) => update("altitude", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Distance"
          value={form.distance}
          onChange={(e) => update("distance", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Pickup"
          value={form.pickup}
          onChange={(e) => update("pickup", e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Meals"
          value={form.meals}
          onChange={(e) => update("meals", e.target.value)}
        />
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 text-lg font-medium">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                update("featured", e.target.checked)
              }
              className="h-5 w-5"
            />

            Show on Homepage (Featured Expedition)
          </label>
        </div>
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-black px-8 py-3 text-white"
      >
        {loading
          ? "Saving..."
          : expedition
            ? "Update Expedition"
            : "Create Expedition"}
      </button>
      {expedition && (
        <button
          type="button"
          onClick={deleteExpedition}
          className="ml-4 rounded-lg bg-red-600 px-8 py-3 text-white"
        >
          Archive Expedition
        </button>
      )}
    </form>
  );
}