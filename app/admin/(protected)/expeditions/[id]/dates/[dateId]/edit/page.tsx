import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import DepartureDateForm from "@/components/admin/DepartureDateForm";

type Props = {
  params: Promise<{
    id: string;
    dateId: string;
  }>;
};

export default async function EditDepartureDatePage({
  params,
}: Props) {
  const { id, dateId } = await params;

  const departureDate = await prisma.expeditionDate.findUnique({
    where: {
      id: Number(dateId),
    },
  });

  if (!departureDate) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Departure Date
      </h1>

      <DepartureDateForm
        expeditionId={Number(id)}
        departureDate={departureDate}
      />
    </div>
  );
}