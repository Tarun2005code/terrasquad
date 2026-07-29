import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth/auth";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    const admin = verifyAdminToken(token);

    if (!admin || admin.role !== "ADMIN") {
      redirect("/admin/login");
    }

    return admin;
  } catch {
    redirect("/admin/login");
  }
}