import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth/auth";

export default async function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("admin_token")?.value;

  if (token) {
    try {
      const admin = verifyAdminToken(token);

      if (
        admin &&
        admin.role === "ADMIN"
      ) {
        redirect("/admin");
      }
    } catch {
      // invalid token
    }
  }

  return children;
}