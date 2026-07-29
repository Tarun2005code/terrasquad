"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Something went wrong"
        );
        return;
      }

      setSuccess(true);
    } catch {
      setError(
        "Unable to send reset email"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAF9] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-[#2F5D50]">
          Forgot Password
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Enter your email and we'll send
          you a reset link.
        </p>

        {success ? (
          <div className="mt-8 rounded-2xl bg-green-50 p-5 text-center">
            <p className="font-medium text-green-700">
              Reset link sent successfully.
            </p>

            <p className="mt-2 text-sm text-green-600">
              Check your inbox.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-block rounded-xl bg-[#2F5D50] px-5 py-3 text-white"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border p-4 outline-none focus:border-[#2F5D50]"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2F5D50] py-4 font-medium text-white disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-[#2F5D50]"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}