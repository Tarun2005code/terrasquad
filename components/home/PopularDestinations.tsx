import Link from "next/link";

const destinations = [
  {
    name: "Manali",
    icon: "🏔️",
    subtitle: "Snow & Mountains",
  },
  {
    name: "Kasol",
    icon: "🌲",
    subtitle: "Valley Escape",
  },
  {
    name: "Kedarnath",
    icon: "🛕",
    subtitle: "Spiritual Trek",
  },
  {
    name: "Valley of Flowers",
    icon: "🌸",
    subtitle: "Nature Paradise",
  },
  {
    name: "Spiti Valley",
    icon: "🏜️",
    subtitle: "Cold Desert",
  },
  {
    name: "Auli",
    icon: "⛷️",
    subtitle: "Snow Adventure",
  },
  {
    name: "Rishikesh",
    icon: "🌊",
    subtitle: "River & Rafting",
  },
  {
    name: "Mussoorie",
    icon: "☁️",
    subtitle: "Queen of Hills",
  },
];

export default function PopularDestinations() {
  return (
    <section
      id="destinations"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1714] via-[#111111] to-[#16221d]" />

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-[#718F44]/10 blur-[140px]" />

      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#2F5D50]/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
            Discover
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-black text-white">
            Popular Destinations
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg">
            Explore some of the most loved adventure destinations
            across the Himalayas and beyond.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((place) => (
            <Link
              key={place.name}
              href="/destinations"
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                p-8
                text-center
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-[#C89B3C]/40
                hover:bg-white/10
              "
            >
              <div className="text-4xl">
                {place.icon}
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                {place.name}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {place.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}