import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ExpeditionForm from "@/components/admin/ExpeditionForm";
import { requireAdmin } from "@/lib/admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExpeditionPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const expedition = await prisma.expedition.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!expedition) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Edit Expedition
        </h1>

        <p className="mt-2 text-gray-600">
          Update expedition details.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Link
          href={`/admin/expeditions/${expedition.id}/itinerary`}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
        >
          📍 Manage Itinerary
        </Link>

        <Link
          href={`/admin/expeditions/${expedition.id}/dates`}
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          📅 Manage Dates
        </Link>

        <Link
          href={`/admin/expeditions/${expedition.id}/gallery`}
          className="rounded-lg bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700"
        >
          🖼 Gallery
        </Link>

        <Link
          href={`/admin/expeditions/${expedition.id}/reviews`}
          className="rounded-lg bg-orange-600 px-6 py-3 text-white transition hover:bg-orange-700"
        >
          ⭐ Reviews
        </Link>

        <Link
          href="/admin/expeditions"
          className="rounded-lg bg-gray-600 px-6 py-3 text-white transition hover:bg-gray-700"
        >
          ← Back to Expeditions
        </Link>
      </div>

      <ExpeditionForm expedition={expedition} />
    </div>
  );
}