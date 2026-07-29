import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F7F3] px-6">
      <h1 className="text-7xl font-black text-[#2F5D50]">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-4 text-gray-600">
        The page you're looking for doesn't exist.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-[#2F5D50] px-6 py-3 text-white"
      >
        Go Home
      </Link>
    </div>
  );
}