import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Gallery from "@/components/expedition/Gallery";
import Hero from "@/components/expedition/Hero";
import Overview from "@/components/expedition/Overview";
import Highlights from "@/components/expedition/Highlights";
import Itinerary from "@/components/expedition/Itinerary";
import BookingCard from "@/components/expedition/BookingCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExpeditionPage({ params }: Props) {
 
const { slug } = await params;

console.log("Slug:", slug);

const expedition = await prisma.expedition.findUnique({
  where: { slug },
  include: {
    itinerary: {
      orderBy: {
        day: "asc",
      },
    },
    images: true,
    dates: {
      orderBy: {
        date: "asc",
      },
    },
  },
});

console.log("Expedition:", expedition);
  if (!expedition) {
    notFound();
  }

  return (
    <>
      <Hero expedition={expedition} />
      <Gallery
  cover={expedition.image}
  images={expedition.images}
  title={expedition.title}
/>

      <section className="bg-[#F8F7F3] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Overview
              description={expedition.description}
            />

            <Highlights
              expedition={expedition}
            />

            <Itinerary
              itinerary={expedition.itinerary}
            />
          </div>

          <BookingCard
            expeditionId={expedition.id}
            price={expedition.price}
            dates={expedition.dates}
          />
        </div>
      </section>
    </>
  );
}