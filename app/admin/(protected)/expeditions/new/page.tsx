import ExpeditionForm from "@/components/admin/ExpeditionForm";
import { requireAdmin } from "@/lib/admin";

export default async function NewExpeditionPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Create Expedition
        </h1>

        <p className="mt-2 text-gray-600">
          Add a new expedition to TerraSquad.
        </p>
      </div>

      <ExpeditionForm />
    </div>
  );
}