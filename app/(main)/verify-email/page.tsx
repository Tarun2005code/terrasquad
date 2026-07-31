"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();

  const token = params.get("token");

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setMessage(
          "Invalid verification link."
        );
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "/api/auth/verify-email",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              token,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setMessage(
            data.error ||
              "Verification failed."
          );
        } else {
          setMessage(
            "✅ Email verified successfully."
          );
        }
      } catch {
        setMessage(
          "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold">
          Email Verification
        </h1>

        {loading ? (
          <p>Verifying...</p>
        ) : (
          <p className="text-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}