import ExpeditionCard from "./ExpeditionCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { expeditions } from "@/constants/expeditions";

export default function FeaturedExpeditions() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Header */}
        <SectionHeading
          eyebrow="Explore"
          title="Featured Expeditions"
          description="Every expedition is carefully planned with professional guides, breathtaking locations and unforgettable experiences."
        />

        {/* Expedition Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {expeditions.map((expedition) => (
            <ExpeditionCard
              key={expedition.id}
              slug={expedition.slug}
              title={expedition.title}
              location={expedition.location}
              duration={expedition.duration}
              difficulty={expedition.difficulty}
              image={expedition.image}
              price={expedition.price}
            />
          ))}

        </div>

      </div>
    </section>
  );
}