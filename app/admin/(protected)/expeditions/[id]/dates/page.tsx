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
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
       <div className="mb-4">
  <Link
    href={`/admin/expeditions`}
    className="inline-flex items-center rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
  >
    ← Back to Expeditions
  </Link>
</div>
        <h1 className="break-words text-3xl font-bold md:text-4xl">
          {expedition.title}
        </h1>

        <Link
          href={`/admin/expeditions/${id}/dates/new`}
          className="w-full rounded-lg bg-green-600 px-6 py-3 text-center text-white hover:bg-green-700 sm:w-auto"
        >
          + Add Departure Date
        </Link>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-4 md:hidden">
        {expedition.dates.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500 shadow">
            No departure dates added yet.
          </div>
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
              <div
                key={date.id}
                className={`rounded-xl border p-4 shadow ${
                  date.active
                    ? "bg-white"
                    : "bg-red-50"
                }`}
              >
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">
                      Date:
                    </span>{" "}
                    {new Date(
                      date.date
                    ).toLocaleDateString("en-GB")}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Seats:
                    </span>{" "}
                    {date.seats}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Booked:
                    </span>{" "}
                    {date.bookedSeats}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Available:
                    </span>{" "}
                    {availableSeats}
                  </p>

                  <div>
                    <span className="font-semibold">
                      Occupancy:
                    </span>{" "}
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
                  </div>

                  <div>
                    {date.active ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                        Archived
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/expeditions/${id}/dates/${date.id}/edit`}
                    className="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <DeleteDepartureDateButton
                    expeditionId={Number(id)}
                    dateId={date.id}
                    active={date.active}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Seats</th>
              <th className="p-4 text-left">Booked</th>
              <th className="p-4 text-left">Available</th>
              <th className="p-4 text-left">Occupancy</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expedition.dates.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
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
                        (date.bookedSeats /
                          date.seats) *
                          100
                      );

                return (
                  <tr
                    key={date.id}
                    className={`border-t ${
                      !date.active
                        ? "bg-red-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-4">
                      {new Date(
                        date.date
                      ).toLocaleDateString(
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

                    <td className="p-4">
                      {date.active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                          Archived
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/expeditions/${id}/dates/${date.id}/edit`}
                          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                        >
                          Edit
                        </Link>

                        <DeleteDepartureDateButton
                          expeditionId={Number(id)}
                          dateId={date.id}
                          active={date.active}
                        />
                      </div>
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