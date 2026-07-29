import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import DeleteDepartureDateButton from "@/components/admin/DeleteDepartureDateButton";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DatesPage({
  params,
}: Props) {
  await requireAdmin();

  const { id } = await params;

  const expedition = await prisma.expedition.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      dates: {
        orderBy: {
          date: "asc",
        },
      },
    },
  });

  if (!expedition) {
    return (
      <div className="mx-auto max-w-5xl p-8">
        Expedition not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          {expedition.title}
        </h1>

        <Link
          href={`/admin/expeditions/${id}/dates/new`}
          className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          + Add Departure Date
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Seats</th>
              <th className="p-4 text-left">Booked</th>
              <th className="p-4 text-left">Available</th>
              <th className="p-4 text-left">Occupancy</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expedition.dates.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No departure dates added yet.
                </td>
              </tr>
            ) : (
              expedition.dates.map((date) => {
                const availableSeats =
                  date.seats - date.bookedSeats;

                const occupancy =
                  date.seats === 0
                    ? 0
                    : Math.round(
                        (date.bookedSeats / date.seats) * 100
                      );

                return (
                  <tr
                    key={date.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {new Date(date.date).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>

                    <td className="p-4">
                      {date.seats}
                    </td>

                    <td className="p-4">
                      {date.bookedSeats}
                    </td>

                    <td className="p-4 font-semibold">
                      {availableSeats}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          occupancy <= 50
                            ? "bg-green-100 text-green-700"
                            : occupancy <= 80
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {occupancy}%
                      </span>
                    </td>

                    <td className="space-x-2 p-4">
                      <Link
                        href={`/admin/expeditions/${id}/dates/${date.id}/edit`}
                        className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                   <DeleteDepartureDateButton
  expeditionId={Number(id)}
  dateId={date.id}
/>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}