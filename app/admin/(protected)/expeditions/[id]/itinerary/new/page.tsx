import ItineraryForm from "@/components/admin/ItineraryForm";
import { requireAdmin } from "@/lib/admin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewItineraryPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Add Itinerary Day
      </h1>

      <ItineraryForm
        expeditionId={Number(id)}
      />
    </div>
  );
}