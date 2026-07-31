import Link from "next/link";

type Booking = {
  id: number;
  bookingReference: string | null;
  totalAmount: number;
  finalAmount: number;
  paymentStatus: string;
  createdAt: Date;
  user: {
    name: string;
  };
  expedition: {
    title: string;
  };
};

export default function RecentBookings({
  bookings,
}: {
  bookings: Booking[];
}) {
  return (
    <div className="rounded-2xl border bg-white shadow">
      <div className="border-b p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Recent Bookings
        </h2>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden p-4 space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-xl border bg-white p-4 shadow-sm"
          >
            <div className="mb-3">
              <p className="text-sm text-gray-500">
                Reference
              </p>

              <p className="font-semibold">
                {booking.bookingReference}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-sm text-gray-500">
                Customer
              </p>

              <p>{booking.user.name}</p>
            </div>

            <div className="mb-2">
              <p className="text-sm text-gray-500">
                Expedition
              </p>

              <p>{booking.expedition.title}</p>
            </div>

            <div className="mb-2">
              <p className="text-sm text-gray-500">
                Amount
              </p>

              <p>₹{booking.finalAmount}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">
                Status
              </p>

              <p
                className={`font-medium ${
                  booking.paymentStatus === "PAID"
                    ? "text-green-600"
                    : booking.paymentStatus ===
                      "PENDING"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {booking.paymentStatus}
              </p>
            </div>

            <Link
              href={`/admin/bookings/${booking.id}`}
              className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              View Booking
            </Link>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
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
                Amount
              </th>

              <th className="p-4 text-left">
                Status
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
                className="border-t"
              >
                <td className="p-4">
                  {booking.bookingReference}
                </td>

                <td className="p-4">
                  {booking.user.name}
                </td>

                <td className="p-4">
                  {booking.expedition.title}
                </td>

                <td className="p-4">
                  ₹{booking.finalAmount}
                </td>

                <td className="p-4">
                  {booking.paymentStatus}
                </td>

                <td className="p-4">
                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}