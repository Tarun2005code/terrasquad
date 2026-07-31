import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export default async function CouponsPage() {
  await requireAdmin();

  const coupons = await prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const activeCoupons = coupons.filter(
    (c) => c.active
  ).length;

  const expiredCoupons = coupons.filter(
    (c) =>
      c.expiresAt &&
      new Date(c.expiresAt) < new Date()
  ).length;

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Coupons
        </h1>

        <p className="mt-2 text-gray-600">
          Manage discount coupons
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="rounded-lg bg-gray-600 px-5 py-3 text-white hover:bg-gray-700"
          >
            ← Back to Dashboard
          </Link>

          <Link
            href="/admin/coupons/new"
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            + New Coupon
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Coupons
          </p>

          <p className="mt-2 text-3xl font-bold">
            {coupons.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Active Coupons
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {activeCoupons}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Expired Coupons
          </p>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {expiredCoupons}
          </p>
        </div>
      </div>

      {coupons.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow">
          <p className="text-gray-500">
            No coupons found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="rounded-2xl border bg-white p-6 shadow"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {coupon.code}
                  </h2>

                  {coupon.description && (
                    <p className="mt-1 text-gray-500">
                      {coupon.description}
                    </p>
                  )}
                </div>

                <Link
                  href={`/admin/coupons/${coupon.id}/edit`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <Info
                  label="Type"
                  value={coupon.type}
                />

                <Info
                  label="Value"
                  value={coupon.value}
                />

                <Info
                  label="Used"
                  value={coupon.usedCount}
                />

                <Info
                  label="Status"
                  value={
                    coupon.active
                      ? "Active"
                      : "Inactive"
                  }
                />

                <Info
                  label="Min Amount"
                  value={`₹${coupon.minAmount}`}
                />

                <Info
                  label="Usage Limit"
                  value={
                    coupon.usageLimit ?? "Unlimited"
                  }
                />

                <Info
                  label="Max Discount"
                  value={
                    coupon.maxDiscount
                      ? `₹${coupon.maxDiscount}`
                      : "-"
                  }
                />

                <Info
                  label="Expires"
                  value={
                    coupon.expiresAt
                      ? new Date(
                          coupon.expiresAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "Never"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-semibold">
        {value}
      </p>
    </div>
  );
}