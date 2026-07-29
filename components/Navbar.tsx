import Link from "next/link";
import Image from "next/image";

import { getCurrentUser } from "@/lib/auth/session";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/images/q-logo.png"
            alt="TerraSquad"
            width={50}
            height={50}
            priority
          />

          <span className="text-3xl font-extrabold tracking-tight">
            <span className="text-white">
              Terra
            </span>

            <span className="text-[#718F44]">
              Squad
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-[15px] font-medium text-gray-300 md:flex">
          <Link
            href="#home"
            className="transition duration-300 hover:text-white"
          >
            Home
          </Link>

          <Link
  href="/#featured-expeditions"
  className="hover:text-white transition duration-300"
>
  Featured Expeditions
</Link>

          <Link
            href="#destinations"
            className="transition duration-300 hover:text-white"
          >
            Destinations
          </Link>

          <Link
            href="#gallery"
            className="transition duration-300 hover:text-white"
          >
            Gallery
          </Link>

          <Link
            href="#about"
            className="transition duration-300 hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition duration-300 hover:text-white"
          >
            Contact
          </Link>

          {user && (
            <Link
              href="/my-bookings"
              className="transition duration-300 hover:text-white"
            >
              My Bookings
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin/check-in"
              className="transition duration-300 hover:text-white"
            >
              QR Check-In
            </Link>
          )}
        </div>

        {/* Auth Area */}
        <div className="flex items-center gap-3">
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

      </div>
    </nav>
  );
}