"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
    >
      Logout
    </button>
  );
}