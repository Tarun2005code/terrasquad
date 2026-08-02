"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const [showConfirm, setShowConfirm] =
    useState(false);

  async function logout() {
    try {
      const res = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        toast.error(
          "Failed to logout"
        );
        return;
      }

      toast.success(
        "Admin logged out successfully"
      );

      setTimeout(() => {
        router.push("/admin/login");
        router.refresh();
      }, 800);
    } catch {
      toast.error(
        "Something went wrong"
      );
    }
  }

  return (
    <>
      <button
        onClick={() =>
          setShowConfirm(true)
        }
        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-semibold text-black">
              Confirm Logout
            </h3>

            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to logout from the admin panel?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setShowConfirm(false)
                }
                className="rounded-lg border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}