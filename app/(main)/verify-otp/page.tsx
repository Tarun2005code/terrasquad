"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const email =
    searchParams.get("email") ||
    "";

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleVerify(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.error
        );
        return;
      }

      toast.success(
        "Email verified successfully"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      toast.error(
        "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-4xl font-black text-center">
          Verify OTP
        </h1>

        <p className="mt-4 text-center text-sm text-gray-600">
          Enter the OTP sent to
        </p>

        <p className="text-center font-semibold break-all">
          {email}
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
          className="mt-8 w-full rounded-2xl border p-4 text-center text-2xl tracking-[8px]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#2F5D50] py-4 text-white font-bold disabled:opacity-50"
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}