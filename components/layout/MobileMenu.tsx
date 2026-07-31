"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

type UserType = {
  role?: string;
} | null;

export default function MobileMenu({
  user,
}: {
  user: UserType;
}) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-white"
        aria-label="Open Menu"
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] transition-all duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={closeMenu}
          className="absolute inset-0 bg-black/80"
        />
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-screen w-[85%] max-w-sm bg-[#050505] border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <h2 className="text-2xl font-black">
            <span className="text-white">Terra</span>
            <span className="text-[#718F44]">Squad</span>
          </h2>

          <button
            onClick={closeMenu}
            className="text-white"
            aria-label="Close Menu"
          >
            <X size={32} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 p-6 overflow-y-auto">
          {user?.role === "ADMIN" ? (
            <>
              <Link
                href="/admin"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/expeditions"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Manage Expeditions
              </Link>

              <Link
                href="/admin/bookings"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Bookings
              </Link>

              <Link
                href="/admin/check-in"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                QR Check-In
              </Link>

              

              
            </>
          ) : (
            <>
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Home
              </Link>

              <Link
                href="/#featured-expeditions"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Featured Expeditions
              </Link>

              <Link
                href="/#destinations"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Destinations
              </Link>

              <Link
                href="/#gallery"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Gallery
              </Link>

              <Link
                href="/#about"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
              >
                Contact
              </Link>

              {user && (
                <Link
                  href="/my-bookings"
                  onClick={closeMenu}
                  className="rounded-2xl bg-[#111111] border border-white/10 px-5 py-4 text-white font-medium hover:bg-[#1a1a1a]"
                >
                  My Bookings
                </Link>
              )}
            </>
          )}

          {/* Auth */}
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <div className="flex gap-3">
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="flex-1 rounded-2xl border border-white/20 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Account
                </Link>

                <div
                  className="flex-1"
                  onClick={closeMenu}
                >
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-2xl border border-white/20 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="rounded-2xl bg-[#2F5D50] py-4 text-center font-semibold text-white transition hover:bg-[#3a7363]"
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