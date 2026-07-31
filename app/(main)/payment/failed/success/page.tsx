export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-4xl font-bold text-green-600">
        Booking Confirmed
      </h1>

      <p className="mt-6">
        Your payment was successful.
      </p>

      <a
        href="/my-bookings"
        className="mt-8 inline-block rounded-xl bg-green-700 px-6 py-3 text-white"
      >
        View Booking
      </a>
    </div>
  );
}