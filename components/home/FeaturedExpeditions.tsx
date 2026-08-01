import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 600;

export default async function FeaturedExpeditions() {
  const expeditions = await prisma.expedition.findMany({
    where: {
      featured: true,
       active: true,
    },
    select: {
      id: true,
      title: true,
      image: true,
      location: true,
      price: true,
      duration: true,
      slug: true,
    },
    take: 3,
  });

  if (expeditions.length === 0) {
    return null;
  }

  return (
    <section
      id="featured-expeditions"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1714] via-[#111111] to-[#1b2d26]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#718F44]/10 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#2F5D50]/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
            Featured Adventures
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black text-white">
            Upcoming Expeditions
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-300 leading-8">
            Handpicked experiences curated for explorers seeking
            unforgettable adventures.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {expeditions.map((trip) => (
            <div
              key={trip.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2
active:scale-[0.98]hover:-translate-y-2 hover:border-[#C89B3C]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-[#C89B3C] px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Featured
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">
                  {trip.title}
                </h3>

                <p className="mt-2 text-gray-300">
                  📍 {trip.location}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#C89B3C]">
                    ₹{trip.price}
                  </span>

                  <span className="text-gray-200">
                    {trip.duration}
                  </span>
                </div>

                <Link
                  href={`/expeditions/${trip.slug}`}
                  className="
  mt-6
  block
  w-full
  rounded-full
  bg-[#2F5D50]
  py-3
  text-center
  font-semibold
  text-white
  transition-all
  duration-200
  hover:bg-[#3b7262]
  active:scale-95
  active:bg-[#23463B]
  touch-manipulation
"
                >
                  View Expedition
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}