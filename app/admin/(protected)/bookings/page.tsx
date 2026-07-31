import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { getAllBookings } from "@/lib/admin/bookings";

import BookingFilters from "@/components/admin/BookingFilters";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import ExportBookingsButton from "@/components/admin/ExportBookingsButton";
import Pagination from "@/components/admin/Pagination";

type Props = {
  searchParams: Promise<{
    search?: string;
    status?: "ALL" | "PAID" | "PENDING" | "CANCELLED";
    page?: string;
    sort?:
      | "newest"
      | "oldest"
      | "amount_high"
      | "amount_low";
    date?: "ALL" | "TODAY" | "7D" | "30D";
  }>;
};

export default async function AdminBookingsPage({
  searchParams,
}: Props) {
  await requireAdmin();

  const params = await searchParams;

  const page = Math.max(
    1,
    Number(params.page ?? "1") || 1
  );

  const {
    bookings,
    totalPages,
    currentPage,
  } = await getAllBookings({
    search: params.search,
    status: params.status,
    page,
    sort: params.sort,
    date: params.date,
  });

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <div>
    <h1 className="text-4xl font-bold">
      All Bookings
    </h1>
  </div>

  <div className="flex flex-col gap-3 sm:flex-row">
    <Link
      href="/admin"
      className="rounded-lg bg-gray-600 px-5 py-3 text-center text-white transition hover:bg-gray-700"
    >
      ← Back to Dashboard
    </Link>

    <ExportBookingsButton
      bookings={bookings}
    />
  </div>
</div>

      <BookingFilters />

      {/* MOBILE CARDS */}
      <div className="mt-6 space-y-4 md:hidden">
        {bookings.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500 shadow">
            No bookings found.
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border bg-white p-4 shadow"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Reference
                  </p>

                  <p className="font-mono text-sm font-semibold">
                    {booking.bookingReference}
                  </p>
                </div>

                <PaymentStatusBadge
                  status={booking.paymentStatus}
                />
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">
                    Customer:
                  </span>{" "}
                  {booking.user.name}
                </p>

                <p>
                  <span className="font-semibold">
                    Expedition:
                  </span>{" "}
                  {booking.expedition.title}
                </p>

                <p>
                  <span className="font-semibold">
                    Participants:
                  </span>{" "}
                  {booking.participants}
                </p>

                <p>
                  <span className="font-semibold">
                    Amount:
                  </span>{" "}
                  ₹{booking.finalAmount}
                </p>

                <p>
                  <span className="font-semibold">
                    Check-In:
                  </span>{" "}
                  {booking.checkedIn
                    ? "✅ Checked In"
                    : "❌ Not Checked In"}
                </p>
              </div>

              <Link
                href={`/admin/bookings/${booking.id}`}
                className="mt-4 block rounded-lg bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
              >
                View Booking
              </Link>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="mt-6 hidden overflow-x-auto rounded-2xl border bg-white shadow md:block">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Reference
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Expedition
              </th>

              <th className="p-4 text-left">
                Participants
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Check-In
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-mono text-sm">
                  {booking.bookingReference}
                </td>

                <td className="p-4">
                  {booking.user.name}
                </td>

                <td className="p-4">
                  {booking.expedition.title}
                </td>

                <td className="p-4 text-center">
                  {booking.participants}
                </td>

                <td className="p-4 font-semibold">
                  ₹{booking.finalAmount}
                </td>

                <td className="p-4">
                  <PaymentStatusBadge
                    status={booking.paymentStatus}
                  />
                </td>

                <td className="p-4 text-center text-xl">
                  {booking.checkedIn
                    ? "✅"
                    : "❌"}
                </td>

                <td className="p-4">
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        search={params.search}
        status={params.status}
        sort={params.sort}
        date={params.date}
      />
    </div>
  );
}