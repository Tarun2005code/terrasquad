import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";
import Link from "next/link";
export default async function AdminReviewsPage() {
  await requireAdmin();

  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      expedition: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">

      {/* Header */}
<div className="mb-8">
  <h1 className="text-3xl md:text-4xl font-bold">
    Reviews
  </h1>

  <p className="mt-2 text-gray-600">
    Manage customer reviews
  </p>

  <Link
    href="/admin"
    className="mt-4 inline-flex rounded-lg bg-gray-600 px-5 py-3 text-white transition hover:bg-gray-700"
  >
    ← Back to Dashboard
  </Link>
</div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Reviews
          </p>

          <p className="mt-2 text-3xl font-bold">
            {reviews.length}
          </p>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow">
          <p className="text-gray-500">
            No reviews found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border bg-white p-6 shadow"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {review.user.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {review.expedition.title}
                  </p>

                  <p className="mt-2 text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>

                <DeleteReviewButton
                  reviewId={review.id}
                />
              </div>

              {review.title && (
                <h3 className="mt-4 text-lg font-semibold">
                  {review.title}
                </h3>
              )}

              <p className="mt-3 text-gray-700">
                {review.comment}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                {new Date(
                  review.createdAt
                ).toLocaleDateString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}