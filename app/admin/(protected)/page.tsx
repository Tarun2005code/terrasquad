import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import RecentBookings from "@/components/admin/RecentBookings";
import DashboardCharts from "@/components/admin/DashboardCharts";
import CleanupBookingsButton from "@/components/admin/CleanupBookingsButton";
import { getDashboardData } from "@/lib/admin/dashboard";

export default async function AdminPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage expeditions, bookings and customers.
          </p>
          <div className="mt-4">
  <Link
    href="/"
    className="rounded-lg bg-gray-600 px-5 py-3 text-white hover:bg-gray-700"
  >
    ← Back to Website
  </Link>
</div>
        </div>

        <CleanupBookingsButton />
      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Link
          href="/admin/expeditions/new"
          className="rounded-2xl border bg-green-600 p-4 text-white shadow transition hover:shadow-lg"
        >
          <h2 className="text-base font-bold sm:text-lg">
            + Add Expedition
          </h2>

          <p className="mt-1 text-xs text-green-100 sm:text-sm">
            Create a new expedition
          </p>
        </Link>

        <Link
          href="/admin/expeditions"
          className="rounded-2xl border bg-white p-4 shadow transition hover:shadow-lg"
        >
          <h2 className="text-base font-bold sm:text-lg">
            Expeditions
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Manage expeditions
          </p>
        </Link>

        

        <Link
          href="/admin/bookings"
          className="rounded-2xl border bg-white p-4 shadow transition hover:shadow-lg"
        >
          <h2 className="text-base font-bold sm:text-lg">
            Bookings
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            View all bookings
          </p>
        </Link>

        <Link
          href="/admin/check-in"
          className="rounded-2xl border bg-white p-4 shadow transition hover:shadow-lg"
        >
          <h2 className="text-base font-bold sm:text-lg">
            QR Check-In
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Scan customer tickets
          </p>
        </Link>
<Link
  href="/admin/coupons"
  className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
>
  <h2 className="text-xl font-bold">
    Coupons
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    Total Coupons: {dashboard.couponCount}
  </p>
</Link>
        <Link
  href="/admin/reviews"
  className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
>
  <h2 className="text-xl font-bold">
    Reviews
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    Manage customer reviews
  </p>
</Link>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          title="Revenue"
          value={`₹${dashboard.revenue}`}
        />

        <StatCard
          title="Bookings"
          value={dashboard.totalBookings}
        />

        <StatCard
          title="Paid"
          value={dashboard.paidBookings}
        />

        <StatCard
          title="Pending"
          value={dashboard.pendingBookings}
        />

        <StatCard
          title="Cancelled"
          value={dashboard.cancelledBookings}
        />

        <StatCard
          title="Checked In"
          value={dashboard.checkedIn}
        />

        <StatCard
          title="Occupancy"
          value={`${dashboard.occupancy}%`}
        />

        <StatCard
          title="Available Seats"
          value={
            dashboard.seats - dashboard.bookedSeats
          }
        />
      </div>

      {/* Charts */}

      <div className="overflow-x-auto rounded-2xl bg-white p-2 shadow">
        <DashboardCharts
          data={dashboard.chartData}
        />
      </div>

      {/* Recent Bookings */}

      <div className="overflow-x-auto">
        <RecentBookings
          bookings={dashboard.recentBookings}
        />
      </div>
    </div>
  );
}