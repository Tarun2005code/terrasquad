import { redirect } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

import LogoutButton from "@/components/auth/LogoutButton";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      expedition: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status !== "CANCELLED" &&
      new Date(booking.expeditionDate) > new Date()
  );

  const completedBookings = bookings.filter(
    (booking) =>
      booking.paymentStatus === "PAID" &&
      new Date(booking.expeditionDate) < new Date()
  );

  const totalSpent = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce(
      (sum, booking) =>
        sum + booking.finalAmount,
      0
    );

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="rounded-3xl bg-gradient-to-r from-[#2F5D50] to-[#4A7A6B] p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user.name}
              </h1>

              <p className="opacity-90">
                {user.email}
              </p>

              <p className="mt-1 text-sm opacity-80">
                Member since{" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString("en-GB")}
              </p>
            </div>

          </div>

          <LogoutButton />
        </div>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <StatCard
          title="Total Bookings"
          value={bookings.length}
        />

        <StatCard
          title="Upcoming Trips"
          value={upcomingBookings.length}
        />

        <StatCard
          title="Completed Trips"
          value={completedBookings.length}
        />

        <StatCard
          title="Total Spent"
          value={`₹${totalSpent}`}
        />

      </div>

      <div className="mt-8 rounded-3xl border bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Profile Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <Info
            label="Full Name"
            value={user.name}
          />

          <Info
            label="Email Address"
            value={user.email}
          />

          <Info
            label="Phone Number"
            value={
              user.phone ||
              "Not provided"
            }
          />

          <Info
            label="Account Role"
            value={user.role}
          />

        </div>

      </div>

      <div className="mt-8 rounded-3xl border bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            href="/my-bookings"
            className="rounded-xl bg-[#2F5D50] px-6 py-3 text-white transition hover:bg-[#3a7363]"
          >
            My Bookings
          </Link>

          <Link
            href="/expeditions"
            className="rounded-xl border px-6 py-3 transition hover:bg-gray-50"
          >
            Explore Expeditions
          </Link>

          <Link
            href="/forgot-password"
            className="rounded-xl border px-6 py-3 transition hover:bg-gray-50"
          >
            Change Password
          </Link>

        </div>

      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>
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