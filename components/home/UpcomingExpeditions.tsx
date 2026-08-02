import Link from "next/link";
import Button from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";

export const revalidate = 600;

type Trip = {
  id: number;
  date: Date;
  seats: number;
  bookedSeats: number;
  expedition: {
    title: string;
    location: string;
    price: number;
    slug: string;
    active: boolean;
  };
};

export default async function UpcomingExpeditions() {
  const trips: Trip[] = await prisma.expeditionDate.findMany({
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

    take: 6,
  });

  if (trips.length === 0) {
    return (
      <section
        id="expeditions"
        className="relative overflow-hidden py-28"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#16221d] via-[#111111] to-[#0f1714]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
            Upcoming
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-black text-white">
            Next Expeditions
          </h2>

          <p className="mt-8 text-xl text-gray-300">
            New expeditions will be announced soon.
          </p>
        </div>
      </section>
    );
  }

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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[8px] text-[#C89B3C]">
            Upcoming
          </p>

          <h2 className="mt-4 text-5xl font-black text-white md:text-6xl">
            Next Expeditions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-300">
            Reserve your spot before seats fill up and join fellow explorers on
            unforgettable adventures.
          </p>
        </div>

        <div className="mt-20 space-y-8">
          {trips.map((trip: Trip) => {
            const seatsLeft = trip.seats - trip.bookedSeats;

            return (
              <div
                key={trip.id}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#C89B3C]/40 hover:bg-white/10"
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

                    <p
                      className={`mt-3 text-sm font-medium ${
                        seatsLeft > 5
                          ? "text-green-400"
                          : seatsLeft > 0
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {seatsLeft > 0
                        ? `${seatsLeft} Seats Left`
                        : "Sold Out"}
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
                      {seatsLeft > 0
                        ? "Reserve Seat"
                        : "View Expedition"}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link href="/expeditions">
            <Button>
              View All Expeditions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}