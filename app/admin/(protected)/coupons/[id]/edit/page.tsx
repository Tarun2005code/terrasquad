import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { updateCoupon } from "@/app/admin/(protected)/coupons/actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCouponPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const coupon = await prisma.coupon.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!coupon) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Coupon
          </h1>

          <p className="mt-2 text-gray-600">
            Update coupon details
          </p>
        </div>

        <Link
          href="/admin/coupons"
          className="rounded-lg bg-gray-600 px-5 py-3 text-white transition hover:bg-gray-700"
        >
          ← Back to Coupons
        </Link>
      </div>

      <form
        action={updateCoupon}
        className="space-y-6 rounded-2xl border bg-white p-6 shadow"
      >
        <input
          type="hidden"
          name="id"
          value={coupon.id}
        />

        <div>
          <label className="mb-2 block font-medium">
            Coupon Code
          </label>

          <input
            type="text"
            name="code"
            defaultValue={coupon.code}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            defaultValue={coupon.description ?? ""}
            rows={3}
            className="w-full rounded-lg border p-3"
          />
        </div>
<div>
  <label className="mb-2 block font-medium">
    Discount Type
  </label>

  <select
    name="type"
    defaultValue={coupon.type}
    className="w-full rounded-lg border p-3"
  >
    <option value="PERCENTAGE">
      Percentage
    </option>

    <option value="FIXED">
      Fixed Amount
    </option>
  </select>
</div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Discount Value
            </label>

            <input
              type="number"
              name="value"
              defaultValue={coupon.value}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Minimum Amount
            </label>

            <input
              type="number"
              name="minAmount"
              defaultValue={coupon.minAmount}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Usage Limit
            </label>

            <input
              type="number"
              name="usageLimit"
              defaultValue={coupon.usageLimit ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Max Discount
            </label>

            <input
              type="number"
              name="maxDiscount"
              defaultValue={coupon.maxDiscount ?? ""}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Expiry Date
          </label>

          <input
            type="datetime-local"
            name="expiresAt"
            defaultValue={
              coupon.expiresAt
                ? new Date(coupon.expiresAt)
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="active"
            defaultChecked={coupon.active}
            className="h-5 w-5"
          />

          <label className="font-medium">
            Active Coupon
          </label>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}