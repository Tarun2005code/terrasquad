import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItineraryPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const itinerary = await prisma.itineraryDay.findMany({
    where: {
      expeditionId: Number(id),
    },
    orderBy: {
      day: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Itinerary
          </h1>

          <p className="mt-2 text-gray-600">
            Manage expedition itinerary
          </p>
        </div>

        <Link
          href={`/admin/expeditions/${id}/itinerary/new`}
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          + Add Day
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">
        {itinerary.length === 0 ? (
          <p className="p-8 text-center text-gray-500">
            No itinerary added yet.
          </p>
        ) : (
          itinerary.map((day) => (
            <div
              key={day.id}
              className="border-b p-6 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#2F5D50]">
                  Day {day.day}
                </h2>

                <div className="space-x-2">
                  <Link
                    href={`/admin/expeditions/${id}/itinerary/${day.id}/edit`}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {day.title}
              </h3>

              <p className="mt-2 whitespace-pre-wrap text-gray-600">
                {day.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}