import FeaturedExpeditions from "@/components/FeaturedExpeditions";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ExpeditionsPage() {
  return (
    <main className="pt-32 pb-24 bg-[#F8F7F3] min-h-screen">

      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          eyebrow="Explore"
          title="All Expeditions"
          description="Discover hidden waterfalls, forests, mountains and unforgettable adventures."
        />

      </div>

      <FeaturedExpeditions />

    </main>
  );
}