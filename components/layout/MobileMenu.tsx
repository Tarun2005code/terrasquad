"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type UserType = {
  role?: string;
} | null;

export default function MobileMenu({
  user,
}: {
  user: UserType;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-white"
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-[#050505] border-l border-white/10 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <h2 className="text-xl font-bold text-white">
            Terra<span className="text-[#718F44]">Squad</span>
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-6 text-white">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10"
          >
            Home
          </Link>

          <Link
            href="/#featured-expeditions"
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10"
          >
            Featured Expeditions
          </Link>

          <Link
            href="/#destinations"
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10"
          >
            Destinations
          </Link>

          <Link
            href="/#gallery"
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10"
          >
            Gallery
          </Link>

          <Link
            href="/#about"
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10"
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="py-4 border-b border-white/10"
          >
            Contact
          </Link>

          {user && (
            <Link
              href="/my-bookings"
              onClick={() => setOpen(false)}
              className="py-4 border-b border-white/10"
            >
              My Bookings
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              href="/admin/check-in"
              onClick={() => setOpen(false)}
              className="py-4 border-b border-white/10"
            >
              QR Check-In
            </Link>
          )}

          {/* Auth Buttons */}
          <div className="mt-8 flex flex-col gap-3">

            {user ? (
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/20 py-3 text-center text-white"
              >
                Account
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/20 py-3 text-center text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-[#2F5D50] py-3 text-center text-white"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}