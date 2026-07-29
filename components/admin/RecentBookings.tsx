import Link from "next/link";

type Booking = {
  id: number;
  bookingReference: string | null;
  totalAmount: number;
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

      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">
          Recent Bookings
        </h2>
      </div>

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

            <th className="p-4"></th>

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
                  className="text-blue-600"
                >
                  View
                </Link>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}