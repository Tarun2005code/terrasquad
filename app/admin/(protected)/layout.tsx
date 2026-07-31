import LogoutButton from "@/components/admin/LogoutButton";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <h1 className="break-words text-xl font-bold sm:text-2xl">
            TerraSquad Admin
          </h1>

          <div className="w-full sm:w-auto">
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="overflow-x-hidden p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}