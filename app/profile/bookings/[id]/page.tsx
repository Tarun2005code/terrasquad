import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";
import DownloadTicketButton from "@/components/admin/DownloadTicketButton";
import ReviewForm from "@/components/ReviewForm";
import CancelBookingButton from "@/components/profile/CancelBookingButton";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingDetailPage({
  params,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const booking = await prisma.booking.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
    include: {
      expedition: true,
      user: true,
      review: true,
    },
  });

  if (!booking) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Booking Details
      </h1>

      <div className="rounded-xl border bg-white p-6 shadow space-y-3">
        <p>
          <strong>Booking Ref:</strong>{" "}
          {booking.bookingReference}
        </p>

        <p>
          <strong>Expedition:</strong>{" "}
          {booking.expedition.title}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            booking.expeditionDate
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>Participants:</strong>{" "}
          {booking.participants}
        </p>

        <p>
          <strong>Amount:</strong> ₹
          {booking.finalAmount}
        </p>

        <DownloadTicketButton
          booking={{
            bookingReference:
              booking.bookingReference,
            user: {
              name: booking.user.name ?? "",
            },
            expedition: {
              title: booking.expedition.title,
            },
            expeditionDate:
              booking.expeditionDate.toISOString(),
            participants:
              booking.participants,
            finalAmount:
              booking.finalAmount,
          }}
        />
        {booking.paymentStatus !== "CANCELLED" && (
  <CancelBookingButton
    bookingId={booking.id}
  />
)}
      </div>

      {!booking.review && (
        <ReviewForm
          bookingId={booking.id}
          expeditionId={booking.expeditionId}
        />
      )}

      {booking.review && (
        <div className="rounded-xl border bg-white p-6">
          <h2 className="mb-3 text-xl font-bold">
            Your Review
          </h2>

          <p>
            ⭐ {booking.review.rating}/5
          </p>

          <p className="mt-2">
            {booking.review.comment}
          </p>
        </div>
      )}
    </div>
  );
}