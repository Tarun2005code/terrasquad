import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 p-8">
      <aside className="w-64 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          My Account
        </h2>

        <nav className="space-y-3">
          <Link
            href="/profile"
            className="block rounded p-2 hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/profile/bookings"
            className="block rounded p-2 hover:bg-gray-100"
          >
            My Bookings
          </Link>

          <Link
            href="/profile/reviews"
            className="block rounded p-2 hover:bg-gray-100"
          >
            Reviews
          </Link>

          <Link
            href="/profile/settings"
            className="block rounded p-2 hover:bg-gray-100"
          >
            Settings
          </Link>
        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}