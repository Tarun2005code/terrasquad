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
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Expeditions
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all TerraSquad expeditions
          </p>
        </div>

        <Link
          href="/admin/expeditions/new"
          className="rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
        >
          + New Expedition
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Difficulty</th>
              <th className="p-4 text-left">Bookings</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-left">Actions</th>
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
                    {"featured" in expedition && expedition.featured ? (
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
                        className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <DeleteButton id={expedition.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}