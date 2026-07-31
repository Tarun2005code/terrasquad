import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import RecentBookings from "@/components/admin/RecentBookings";
import DashboardCharts from "@/components/admin/DashboardCharts";
import CleanupBookingsButton from "@/components/admin/CleanupBookingsButton";
import { getDashboardData } from "@/lib/admin/dashboard";



export default async function AdminPage() {
  const dashboard = await getDashboardData();

  return (
    <div className="space-y-10 p-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage expeditions, bookings and customers.
          </p>
        </div>

        <CleanupBookingsButton />
      </div>

      {/* Quick Actions */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Link
          href="/admin/expeditions"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Expeditions
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage expeditions
          </p>
        </Link>

        <Link
          href="/admin/dates"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Dates
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Departure dates
          </p>
        </Link>

        <Link
          href="/admin/bookings"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            Bookings
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            View all bookings
          </p>
        </Link>

        <Link
          href="/admin/check-in"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">
            QR Check-In
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Scan customer tickets
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
            Moderate reviews
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
            Manage discount coupons
          </p>
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

      <DashboardCharts
        data={dashboard.chartData}
      />

      {/* Recent Bookings */}

      <RecentBookings
        bookings={dashboard.recentBookings}
      />
    </div>
  );
}