import Link from "next/link";
import Image from "next/image";

import { getCurrentUser } from "@/lib/auth/session";
import LogoutButton from "@/components/auth/LogoutButton";
import MobileMenu from "@/components/layout/MobileMenu";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 shrink-0"
        >
          <Image
            src="/images/q-logo.png"
            alt="TerraSquad"
            width={50}
            height={50}
            priority
            className="h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12"
          />

          <span className="font-extrabold tracking-tight text-xl sm:text-2xl lg:text-3xl">
            <span className="text-white">Terra</span>
            <span className="text-[#718F44]">Squad</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-gray-300">
  {user?.role === "ADMIN" ? (
    <>
      <Link href="/admin" className="transition hover:text-white">
        Dashboard
      </Link>

      <Link
        href="/admin/expeditions"
        className="transition hover:text-white"
      >
        Manage Expeditions
      </Link>

      <Link
        href="/admin/bookings"
        className="transition hover:text-white"
      >
        Bookings
      </Link>

      <Link
        href="/admin/check-in"
        className="transition hover:text-white"
      >
        QR Check-In
      </Link>
    </>
  ) : (
    <>
      <Link href="/" className="transition hover:text-white">
        Home
      </Link>

      <Link href="/#expeditions" className="transition hover:text-white">
        Expeditions
      </Link>

      <Link href="/#destinations" className="transition hover:text-white">
        Destinations
      </Link>

      <Link href="/#gallery" className="transition hover:text-white">
        Gallery
      </Link>

      <Link href="/#about" className="transition hover:text-white">
        About
      </Link>

      <Link href="/contact" className="transition hover:text-white">
        Contact
      </Link>

      {user && (
        <Link href="/my-bookings" className="transition hover:text-white">
          My Bookings
        </Link>
      )}
    </>
  )}
</div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/account"
                className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
              >
                Account
              </Link>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-[#2F5D50] px-4 py-2 text-white transition hover:bg-[#3a7363]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu user={user} />
        </div>

      </div>
    </nav>
  );
}