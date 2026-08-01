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

    <section className="bg-[#F8F7F3] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <Overview
            description={expedition.description}
          />

          <Highlights
            expedition={expedition}
          />

          <Itinerary
            itinerary={expedition.itinerary}
          />

          <Gallery
            cover={expedition.image}
            images={expedition.images}
            title={expedition.title}
          />
        </div>

        <div className="order-1 lg:order-2">
          <BookingCard
            expeditionId={expedition.id}
            price={expedition.price}
            dates={expedition.dates}
          />
        </div>
      </div>
    </section>
  </>
);
}