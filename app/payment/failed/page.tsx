export default function PaymentFailedPage() {
  return (
    <div className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-4xl font-bold text-red-600">
        Payment Failed
      </h1>

      <p className="mt-6">
        Your payment could not be completed.
      </p>

      <a
        href="/my-bookings"
        className="mt-8 inline-block rounded-xl bg-red-600 px-6 py-3 text-white"
      >
        Retry Payment
      </a>
    </div>
  );
}