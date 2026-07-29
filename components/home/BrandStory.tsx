export default function BrandStory() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#161f1b] to-[#0f1714]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#718F44]/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#2F5D50]/20 blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
          TerraSquad
        </p>

        <h2 className="mt-6 text-5xl md:text-7xl font-black text-white leading-tight">
          Built By Explorers.
          <br />
          For Explorers.
        </h2>

        <p className="mt-10 text-lg md:text-xl text-gray-300 leading-9 max-w-3xl mx-auto">
          TerraSquad was created with one simple belief —
          the best memories are made outside your comfort zone.
          We bring together passionate explorers, hidden destinations,
          unforgettable adventures and a community that feels like family.
        </p>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <h3 className="text-4xl font-black text-[#C89B3C]">
              100+
            </h3>
            <p className="mt-2 text-gray-400">
              Explorers
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-[#C89B3C]">
              20+
            </h3>
            <p className="mt-2 text-gray-400">
              Expeditions
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-[#C89B3C]">
              10+
            </h3>
            <p className="mt-2 text-gray-400">
              Destinations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}