import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

export default async function MyBookingsPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.id,
    },
    include: {
      expedition: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          You don't have any bookings yet.
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {booking.expedition.title}
                  </h2>

                  <p className="text-gray-600">
                    {booking.bookingReference}
                  </p>

                  <p className="mt-2">
                    Status:{" "}
                    <span className="font-semibold">
                      {booking.paymentStatus}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/profile/bookings/${booking.id}`}
                  className="rounded-lg bg-black px-5 py-2 text-white"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}