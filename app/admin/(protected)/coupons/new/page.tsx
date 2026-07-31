import Link from "next/link";
import { createCoupon } from "../actions";

export default function NewCouponPage() {
  return (
    <div className="mx-auto max-w-3xl p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Create Coupon
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new discount coupon
        </p>

        <Link
          href="/admin/coupons"
          className="mt-4 inline-block rounded-lg bg-gray-600 px-5 py-3 text-white transition hover:bg-gray-700"
        >
          ← Back to Coupons
        </Link>
      </div>

      <form
        action={createCoupon}
        className="space-y-6 rounded-2xl border bg-white p-6 shadow"
      >
        <div>
          <label className="mb-2 block font-medium">
            Coupon Code
          </label>

          <input
            name="code"
            type="text"
            required
            placeholder="WELCOME10"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            placeholder="10% off for new users"
            className="w-full rounded-lg border p-3"
            rows={4}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Discount Type
          </label>

          <select
            name="type"
            required
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

        <div>
          <label className="mb-2 block font-medium">
            Discount Value
          </label>

          <input
            name="value"
            type="number"
            required
            min={1}
            placeholder="10"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Minimum Order Amount
          </label>

          <input
            name="minAmount"
            type="number"
            min={0}
            defaultValue={0}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Maximum Discount
          </label>

          <input
            name="maxDiscount"
            type="number"
            min={0}
            placeholder="Optional"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Usage Limit
          </label>

          <input
            name="usageLimit"
            type="number"
            min={1}
            placeholder="Optional"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Expiry Date
          </label>

          <input
            name="expiresAt"
            type="date"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
}