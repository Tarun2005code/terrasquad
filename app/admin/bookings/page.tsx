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
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          All Bookings
        </h1>

        <ExportBookingsButton
          bookings={bookings}
        />
      </div>

      <BookingFilters />

      <div className="overflow-x-auto rounded-2xl border bg-white shadow">
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
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
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