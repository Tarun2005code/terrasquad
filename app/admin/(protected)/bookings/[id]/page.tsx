import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DownloadTicketButton from "@/components/admin/DownloadTicketButton";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import { requireAdmin } from "@/lib/admin";
import CheckInButton from "@/components/admin/CheckInButton";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingDetailsPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
      expedition: true,
    },
  });

  if (!booking) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Booking Details
        </h1>

        <DownloadTicketButton
          booking={{
            bookingReference: booking.bookingReference!,
            user: {
              name: booking.user.name,
            },
            expedition: {
              title: booking.expedition.title,
            },
            expeditionDate: booking.expeditionDate.toLocaleDateString(
              "en-GB"
            ),
            participants: booking.participants,
            finalAmount: booking.finalAmount,
          }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Customer */}
        <div className="rounded-2xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Customer
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {booking.user.name}
            </p>

            <p>
              <strong>Email:</strong> {booking.user.email}
            </p>

            <p>
              <strong>Phone:</strong> {booking.user.phone ?? "-"}
            </p>
          </div>
        </div>

        {/* Expedition */}
        <div className="rounded-2xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Expedition
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Title:</strong> {booking.expedition.title}
            </p>

            <p>
              <strong>Location:</strong> {booking.expedition.location}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.expeditionDate.toLocaleDateString("en-GB")}
            </p>

            <p>
              <strong>Participants:</strong> {booking.participants}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-2xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Payment
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <strong>Status:</strong>

              <PaymentStatusBadge
                status={booking.paymentStatus}
              />
            </div>

            <p>
              <strong>Amount:</strong> ₹{booking.finalAmount}
            </p>

            <p>
              <strong>Order ID:</strong>{" "}
              {booking.razorpayOrderId ?? "-"}
            </p>

            <p>
              <strong>Payment ID:</strong>{" "}
              {booking.razorpayPaymentId ?? "-"}
            </p>

            <p>
              <strong>Booking Reference:</strong>{" "}
              {booking.bookingReference ?? "-"}
            </p>
          </div>
        </div>

        {/* Booking */}
        <div className="rounded-2xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Booking Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Booking ID:</strong> {booking.id}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {booking.createdAt.toLocaleString("en-GB")}
            </p>

            <p>
              <strong>Updated:</strong>{" "}
              {booking.updatedAt.toLocaleString("en-GB")}
            </p>

            <p>
              <strong>Checked In:</strong>{" "}
              <div className="pt-4">
  <CheckInButton
    bookingId={booking.id}
    checkedIn={booking.checkedIn}
  />
</div>
              {booking.checkedIn ? (
                <span className="font-semibold text-green-600">
                  Yes
                </span>
              ) : (
                <span className="font-semibold text-red-600">
                  No
                </span>
              )}
            </p>

            {booking.checkedInAt && (
              <p>
                <strong>Checked In At:</strong>{" "}
                {booking.checkedInAt.toLocaleString("en-GB")}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}