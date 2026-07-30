import Link from "next/link";
import { notFound } from "next/navigation";
import SuccessDownloadTicketButton from "@/components/booking/SuccessDownloadTicketButton";
import BookingActions from "@/components/booking/BookingActions";
type Props = {
  searchParams: Promise<{
    booking?: string;
  }>;
};

export default async function BookingSuccessPage({
  searchParams,
}: Props) {
  const { booking } = await searchParams;

  if (!booking) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/bookings/reference/${booking}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  if (!data.success) {
    notFound();
  }

  const bookingData = data.booking;

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="rounded-3xl border bg-white p-10 shadow-xl">

        <div className="text-center">

          <div className="text-6xl">
            🎉
          </div>

          <h1 className="mt-4 text-4xl font-black text-[#2F5D50]">
            Booking Confirmed
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for booking with TerraSquad.
            Your payment has been received successfully.
          </p>

        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">

          <Info
            label="Booking Reference"
            value={bookingData.bookingReference}
          />

          <Info
            label="Booking Status"
            value={bookingData.status}
          />

          <Info
            label="Payment Status"
            value={
              <span
                className={
                  bookingData.paymentStatus === "PAID"
                    ? "font-bold text-green-600"
                    : "font-bold text-red-600"
                }
              >
                {bookingData.paymentStatus}
              </span>
            }
          />

          <Info
            label="Amount Paid"
            value={`₹${bookingData.finalAmount}`}
          />

          {bookingData.discountAmount > 0 && (
            <Info
              label="Discount"
              value={`₹${bookingData.discountAmount}`}
            />
          )}

          <Info
            label="Name"
            value={bookingData.user.name}
          />

          <Info
            label="Email"
            value={bookingData.user.email}
          />

          <Info
            label="Phone"
            value={bookingData.user.phone}
          />

          <Info
            label="Expedition"
            value={bookingData.expedition.title}
          />

          <Info
            label="Location"
            value={bookingData.expedition.location}
          />

          <Info
            label="Expedition Date"
            value={new Date(
              bookingData.expeditionDate
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          />

          <Info
            label="Participants"
            value={bookingData.participants}
          />

          <Info
            label="Coupon"
            value={
              bookingData.couponCode ??
              "Not Applied"
            }
          />

          {bookingData.razorpayPaymentId && (
            <Info
              label="Payment ID"
              value={bookingData.razorpayPaymentId}
            />
          )}

        </div>
<div className="mt-12 flex flex-wrap gap-4">

  <SuccessDownloadTicketButton
    booking={{
      bookingReference: bookingData.bookingReference,
      user: {
        name: bookingData.user.name,
      },
      expedition: {
        title: bookingData.expedition.title,
      },
      expeditionDate: new Date(
        bookingData.expeditionDate
      ).toLocaleDateString("en-GB"),
      participants: bookingData.participants,
      finalAmount: bookingData.finalAmount,
    }}
  />

  <BookingActions
    bookingId={bookingData.id}
    bookingReference={bookingData.bookingReference}
    status={bookingData.status}
  />

</div>

        <div className="mt-10 rounded-3xl border border-green-200 bg-green-50 p-8">
          <h2 className="text-2xl font-bold text-[#2F5D50]">
            Important Instructions
          </h2>

          <ul className="mt-5 list-disc space-y-3 pl-5 text-gray-700">
            <li>Reach IIT Roorkee pickup point at least 15 minutes early.</li>

            <li>Carry a valid Government ID proof.</li>

            <li>Wear trekking shoes or sports shoes.</li>

            <li>Carry a reusable water bottle.</li>

            <li>Do not litter during the expedition.</li>

            <li>Follow all instructions given by the trip leader.</li>

            <li>
              Save your Booking Reference and Confirmation Email for future
              verification.
            </li>
          </ul>
        </div>
      </div>
    </main>
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
    <div className="rounded-2xl border p-5">
      <p className="text-sm text-gray-500">{label}</p>

      <div className="mt-2 text-lg font-semibold">
        {value}
      </div>
    </div>
  );
}