import Link from "next/link";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export const revalidate = 600;

export default async function UpcomingExpeditions() {
  const trips = await prisma.expeditionDate.findMany({
  where: {
    date: {
      gte: new Date(),
    },
    expedition: {
      active: true,
    },
  },

  select: {
    id: true,
    date: true,
    seats: true,
    bookedSeats: true,
    expedition: {
      select: {
        title: true,
        location: true,
        price: true,
        slug: true,
        active: true,
      },
    },
  },

  orderBy: {
    date: "asc",
  },

  take: 3,
});

  return (
    <section
      id="expeditions"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#16221d] via-[#111111] to-[#0f1714]" />

      {/* Glow Effects */}
      <div className="absolute top-10 right-10 h-96 w-96 rounded-full bg-[#718F44]/10 blur-[140px]" />

      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#2F5D50]/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
            Upcoming
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-black text-white">
            Next Expeditions
          </h2>

          <p className="mt-5 text-gray-300 max-w-2xl mx-auto">
            Reserve your spot before seats fill up and join fellow explorers on
            unforgettable adventures.
          </p>
        </div>

        <div className="mt-20 space-y-8">
          {trips.map((trip) => {
            const seatsLeft = trip.seats - trip.bookedSeats;

            return (
              <div
                key={trip.id}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:border-[#C89B3C]/40 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  {/* Left */}
                  <div>
                    <div className="inline-flex rounded-full border border-[#C89B3C]/30 bg-[#C89B3C]/10 px-4 py-2 text-sm font-semibold text-[#C89B3C]">
                      {new Date(trip.date).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-white">
                      {trip.expedition.title}
                    </h3>

                    <p className="mt-2 text-gray-300">
                      📍 {trip.expedition.location}
                    </p>

                    <p className="mt-3 text-sm font-medium text-green-400">
                      {seatsLeft} Seats Left
                    </p>
                  </div>

                  {/* Center */}
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-widest text-gray-400">
                      Starting From
                    </p>

                    <p className="mt-2 text-5xl font-black text-[#C89B3C]">
                      ₹{trip.expedition.price}
                    </p>
                  </div>

                  {/* Right */}
                  <Link
                    href={`/expeditions/${trip.expedition.slug}`}
                  >
                    <Button>
                      Reserve Seat
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}