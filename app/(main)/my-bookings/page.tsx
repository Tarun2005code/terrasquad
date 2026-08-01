import Link from "next/link";
import { redirect } from "next/navigation";
import ReviewButton from "@/components/reviews/ReviewButton";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import Image from "next/image";
import DownloadTicketButton from "@/components/admin/DownloadTicketButton";
import RazorpayButton from "@/components/payment/RazorpayButton";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";

export default async function MyBookingsPage() {
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

  const totalSpent = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce(
      (sum, booking) =>
        sum + booking.finalAmount,
      0
    );

  const confirmedBookings =
    bookings.filter(
      (b) => b.paymentStatus === "PAID"
    ).length;

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        My Bookings
      </h1>

      <p className="mb-6 text-gray-600">
        View and manage your expedition bookings.
      </p>

      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 rounded-xl bg-[#2F5D50] px-5 py-3 text-white font-medium hover:opacity-90 transition"
      >
        ← Back to Home
      </Link>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Bookings
          </p>

          <p className="mt-2 text-3xl font-bold">
            {bookings.length}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Confirmed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {confirmedBookings}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-gray-500">
            Total Spent
          </p>

          <p className="mt-2 text-3xl font-bold">
            ₹{totalSpent}
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-bold">
            No bookings yet
          </h2>

          <p className="mt-2 text-gray-500">
            Book your first expedition to see it here.
          </p>

          <Link
            href="/expeditions"
            className="mt-6 inline-block rounded-xl bg-[#2F5D50] px-6 py-3 text-white"
          >
            Explore Expeditions
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => {
           const isCompleted =
  booking.status === "CONFIRMED" &&
  booking.paymentStatus === "PAID" &&
  new Date(booking.expeditionDate).getTime() < Date.now();

            return (
              <div
                key={booking.id}
                className="overflow-hidden rounded-2xl border bg-white shadow"
              >
                {/* Hero Image */}
                <div className="relative h-56 w-full">
                  <Image
  src={booking.expedition.image}
  alt={booking.expedition.title}
  fill
  sizes="100vw"
  className="object-cover"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-3xl font-bold">
                      {booking.expedition.title}
                    </h2>

                    <p className="text-sm opacity-90">
                      {booking.expedition.location}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-[#2F5D50]">
                        {booking.bookingReference}
                      </p>
                    </div>

                    <PaymentStatusBadge
                      status={booking.paymentStatus}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Info
                      label="Location"
                      value={
                        booking.expedition.location
                      }
                    />

                    <Info
                      label="Expedition Date"
                      value={new Date(
                        booking.expeditionDate
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    />

                    <Info
                      label="Participants"
                      value={booking.participants}
                    />

                    <Info
                      label="Amount Paid"
                      value={`₹${booking.finalAmount}`}
                    />

                    {booking.discountAmount >
                      0 && (
                        <Info
                          label="Discount"
                          value={`₹${booking.discountAmount}`}
                        />
                      )}

                    <Info
                      label="Booked On"
                      value={new Date(
                        booking.createdAt
                      ).toLocaleDateString(
                        "en-GB"
                      )}
                    />

                    <div className="rounded-xl border p-4">
                      <p className="text-sm text-gray-500">
                        Booking Status
                      </p>

                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${booking.status ===
                          "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : booking.status ===
                            "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {isCompleted ? "COMPLETED" : booking.status}
                      </span>
                    </div>

                    <Info
                      label="Payment Status"
                      value={
                        booking.paymentStatus
                      }
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href={`/expeditions/${booking.expedition.slug}`}
                      className="rounded-xl border px-5 py-3 hover:bg-gray-50"
                    >
                      View Expedition
                    </Link>
                    {(booking.status === "COMPLETED" || isCompleted) && (
                      <ReviewButton bookingId={booking.id} />
                    )}
                    {booking.paymentStatus ===
                      "PAID" && (
                        <DownloadTicketButton
                          booking={{
                            bookingReference:
                              booking.bookingReference ??
                              "",
                            user: {
                              name: user.name,
                            },
                            expedition: {
                              title:
                                booking.expedition
                                  .title,
                            },
                            expeditionDate:
                              booking.expeditionDate.toISOString(),
                            participants:
                              booking.participants,
                            finalAmount:
                              booking.finalAmount,
                          }}
                        />
                      )}

                    {booking.paymentStatus ===
                      "PENDING" && (
                        <RazorpayButton
                          bookingId={booking.id}
                        />
                      )}
                  </div>
                </div>
              </div>);
          })}
        </div>
      )}
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