import Image from "next/image";
import { notFound } from "next/navigation";
import { expeditions } from "@/constants/expeditions";
import Button from "@/components/ui/Button";
import BookingForm from "@/components/booking/BookingForm";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExpeditionDetails({ params }: Props) {
  const { slug } = await params;

  const expedition = expeditions.find(
    (item) => item.slug === slug
  );

  if (!expedition) {
    notFound();
  }

  return (
    <main className="pt-24 bg-[#F8F7F3] min-h-screen">

      {/* Hero */}

      <section className="relative h-[70vh]">

        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-16 left-10 text-white">

          <p className="uppercase tracking-[5px] text-[#C89B3C]">
            {expedition.location}
          </p>

          <h1 className="mt-4 text-6xl font-black">
            {expedition.title}
          </h1>

        </div>

      </section>

      {/* Details */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">

            <h2 className="text-4xl font-bold text-[#2F5D50]">
              About Expedition
            </h2>

            <p className="mt-8 leading-8 text-gray-600">
              {expedition.description}
            </p>

            <div className="mt-12">

              <h3 className="text-2xl font-bold">
                Highlights
              </h3>

              <ul className="mt-6 space-y-4">

                {expedition.highlights.map((item) => (
                  <li key={item}>
                    ✅ {item}
                  </li>
                ))}

              </ul>

            </div>

          </div>

          {/* Booking Card */}

          <div>

           <div className="sticky top-28">
  <BookingForm
    price={expedition.price}
  />
</div>

          </div>

        </div>

      </section>

    </main>
  );
}