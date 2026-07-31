import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";
import { requireAdmin } from "@/lib/admin";

export default async function AdminExpeditions() {
  await requireAdmin();

  const expeditions = await prisma.expedition.findMany({
    include: {
      _count: {
        select: {
          bookings: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 className="text-4xl font-bold">
      Expeditions
    </h1>

    <p className="mt-2 text-gray-600">
      Manage all TerraSquad expeditions
    </p>
  </div>

  <Link
    href="/admin"
    className="inline-flex items-center justify-center rounded-lg bg-gray-600 px-5 py-3 text-white transition hover:bg-gray-700"
  >
    ← Back to Dashboard
  </Link>
</div>

        <Link
          href="/admin/expeditions/new"
          className="w-full rounded-lg bg-green-600 px-6 py-3 text-center text-white transition hover:bg-green-700 md:w-auto"
        >
          + New Expedition
        </Link>
      </div>

      {/* MOBILE CARDS */}
      <div className="space-y-4 md:hidden">
        {expeditions.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-500 shadow">
            No expeditions found.
          </div>
        ) : (
          expeditions.map((expedition: any) => (
            <div
              key={expedition.id}
              className="overflow-hidden rounded-xl border bg-white shadow"
            >
              <Image
                src={expedition.image}
                alt={expedition.title}
                width={600}
                height={300}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {expedition.title}
                </h2>

                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">
                      Location:
                    </span>{" "}
                    {expedition.location}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Price:
                    </span>{" "}
                    ₹{expedition.price}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Difficulty:
                    </span>{" "}
                    {expedition.difficulty}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Bookings:
                    </span>{" "}
                    {expedition._count.bookings}
                  </p>

                  {"featured" in expedition &&
                    expedition.featured && (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        ⭐ Featured
                      </span>
                    )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/admin/expeditions/${expedition.id}`}
                    className="flex-1 rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <div className="flex-1">
                    <DeleteButton id={expedition.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-xl border bg-white shadow md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Image
                </th>
                <th className="p-4 text-left">
                  Title
                </th>
                <th className="p-4 text-left">
                  Location
                </th>
                <th className="p-4 text-left">
                  Price
                </th>
                <th className="p-4 text-left">
                  Difficulty
                </th>
                <th className="p-4 text-left">
                  Bookings
                </th>
                <th className="p-4 text-left">
                  Featured
                </th>
                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {expeditions.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="p-10 text-center text-gray-500"
                  >
                    No expeditions found.
                  </td>
                </tr>
              ) : (
                expeditions.map((expedition: any) => (
                  <tr
                    key={expedition.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <Image
                        src={expedition.image}
                        alt={expedition.title}
                        width={80}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </td>

                    <td className="p-4 font-medium">
                      {expedition.title}
                    </td>

                    <td className="p-4">
                      {expedition.location}
                    </td>

                    <td className="p-4">
                      ₹{expedition.price}
                    </td>

                    <td className="p-4">
                      {expedition.difficulty}
                    </td>

                    <td className="p-4">
                      {expedition._count.bookings}
                    </td>

                    <td className="p-4">
                      {"featured" in expedition &&
                      expedition.featured ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          ⭐ Featured
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          —
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/expeditions/${expedition.id}`}
                          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          Edit
                        </Link>

                        <DeleteButton
                          id={expedition.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}