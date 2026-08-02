"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function logout() {
    if (loading) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Logout failed"
        );
      }

      setMessage(
        "Logged out successfully"
      );

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);

      setMessage(
        "Logout failed"
      );

      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={logout}
        disabled={loading}
        className="rounded-xl border border-red-500 px-6 py-3 text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {loading
          ? "Logging out..."
          : "Logout"}
      </button>

      {message && (
        <div className="rounded-md bg-green-100 px-3 py-1 text-xs text-green-700">
          {message}
        </div>
      )}
    </div>
  );
}