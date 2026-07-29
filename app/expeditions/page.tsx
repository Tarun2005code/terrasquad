import Link from "next/link";
import FeaturedExpeditions from "@/components/FeaturedExpeditions";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ExpeditionsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">

        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          ← Back to Home
        </Link>

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