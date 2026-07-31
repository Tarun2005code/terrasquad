import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

import GalleryUploader from "@/components/admin/GalleryUploader";
import DeleteGalleryImageButton from "@/components/admin/DeleteGalleryImageButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GalleryPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

 const expedition = await prisma.expedition.findUnique({
  where: {
    id: Number(id),
  },
  include: {
    images: {
      orderBy: {
        id: "desc",
      },
    },
  },
});

  if (!expedition) {
    return (
      <div className="mx-auto max-w-6xl p-8">
        Expedition not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Gallery
          </h1>

          <p className="mt-2 text-gray-600">
            {expedition.title}
          </p>
        </div>

        <div className="flex gap-3">
          <GalleryUploader
            expeditionId={expedition.id}
          />

          <Link
            href={`/admin/expeditions/${expedition.id}`}
            className="rounded-lg bg-gray-700 px-6 py-3 text-white hover:bg-gray-800"
          >
            Back
          </Link>
        </div>
      </div>

      {expedition.images.length=== 0 ? (
        <div className="rounded-xl border bg-white p-16 text-center text-gray-500 shadow">
          No gallery images uploaded.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {expedition.images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border bg-white shadow"
            >
              <Image
                src={image.image}
                alt="Gallery"
                width={600}
                height={400}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <DeleteGalleryImageButton
                  expeditionId={expedition.id}
                  imageId={image.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}