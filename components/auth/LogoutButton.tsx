"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-xl border border-red-500 px-6 py-3 text-red-600"
    >
      Logout
    </button>
  );
}