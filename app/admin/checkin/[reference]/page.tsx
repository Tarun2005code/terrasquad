import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckInButton from "@/components/admin/CheckInButton";

type Props = {
  params: Promise<{
    reference: string;
  }>;
};

export default async function Page({
  params,
}: Props) {
  const { reference } = await params;

  const booking =
    await prisma.booking.findFirst({
      where: {
        bookingReference: reference,
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
    <div className="mx-auto max-w-3xl p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Booking Found
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow">

        <p>
          <strong>Name:</strong>{" "}
          {booking.user.name}
        </p>

        <p>
          <strong>Expedition:</strong>{" "}
          {booking.expedition.title}
        </p>

        <p>
          <strong>Participants:</strong>{" "}
          {booking.participants}
        </p>

        <p>
          <strong>Reference:</strong>{" "}
          {booking.bookingReference}
        </p>

        <div className="mt-6">

          <CheckInButton
            bookingId={booking.id}
            checkedIn={booking.checkedIn}
          />

        </div>

      </div>

    </div>
  );
}