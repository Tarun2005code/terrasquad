import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BookingFailedPage() {
  return (
    <main className="min-h-screen bg-[#F8FAF8] flex items-center justify-center px-6">

      <div className="max-w-xl w-full rounded-3xl bg-white p-10 shadow-xl text-center">

        <XCircle
          size={90}
          className="mx-auto text-red-500"
        />

        <h1 className="mt-6 text-4xl font-black">
          Payment Failed
        </h1>

        <p className="mt-4 text-gray-600">
          Your booking couldn't be completed.
        </p>

        <p className="text-gray-600">
          If money was deducted it will automatically be refunded by Razorpay.
        </p>

        <Link
          href="/expeditions"
          className="mt-8 inline-block rounded-xl bg-black px-8 py-4 text-white"
        >
          Try Again
        </Link>

      </div>

    </main>
  );
}