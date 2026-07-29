import LogoutButton from "@/components/admin/LogoutButton";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between border-b bg-white px-8 py-4">
        <h1 className="text-2xl font-bold">
          TerraSquad Admin
        </h1>

        <LogoutButton />
      </header>

      <main className="p-8">
        {children}
      </main>
    </div>
  );
}