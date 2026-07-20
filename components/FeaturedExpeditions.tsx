import ExpeditionCard from "./ExpeditionCard";

export default function FeaturedExpeditions() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center">
          <p className="uppercase tracking-[8px] font-semibold text-[#C89B3C]">
            Explore
          </p>

          <h2 className="mt-5 text-5xl md:text-6xl font-black text-[#2F5D50]">
            Featured Expeditions
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-center text-gray-600 text-lg leading-8">
            Every expedition is carefully planned with professional guides,
            breathtaking locations, and unforgettable experiences.
          </p>
        </div>

        {/* Expedition Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ExpeditionCard
            title="Patna Waterfall"
            location="Rishikesh"
            duration="1 Day"
            difficulty="Easy"
            image="/images/expeditions/patna.jpg"
          />

          <ExpeditionCard
            title="Neer Waterfall"
            location="Rishikesh"
            duration="1 Day"
            difficulty="Easy"
            image="/images/expeditions/neer.jpg"
          />

          <ExpeditionCard
            title="Kyari Viewpoint"
            location="Mussoorie"
            duration="2 Days"
            difficulty="Moderate"
            image="/images/expeditions/kyari.jpg"
          />
        </div>
      </div>
    </section>
  );
}