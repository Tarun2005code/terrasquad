import ExpeditionCard from "./ExpeditionCard";
import { prisma } from "@/lib/prisma";

export default async function FeaturedExpeditions() {
  const expeditions = await prisma.expedition.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="bg-white pt-8 pb-28">
      <div className="mx-auto max-w-7xl px-6">

        

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