import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export default async function ExpeditionReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;

  const expedition = await prisma.expedition.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!expedition) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Reviews
          </h1>

          <p className="mt-2 text-gray-600">
            {expedition.title}
          </p>
        </div>

        <Link
          href={`/admin/expeditions/${expedition.id}`}
          className="rounded-lg bg-gray-600 px-5 py-3 text-white hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>

      {expedition.reviews.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500 shadow">
          No reviews found.
        </div>
      ) : (
        <div className="space-y-4">
          {expedition.reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border bg-white p-5 shadow"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-bold text-lg">
                    {review.title || "Review"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    By {review.user.name}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                    ⭐ {review.rating}/5
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      review.approved
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {review.approved
                      ? "Approved"
                      : "Pending"}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                {review.comment}
              </p>

              <p className="mt-4 text-sm text-gray-400">
                {new Date(
                  review.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}