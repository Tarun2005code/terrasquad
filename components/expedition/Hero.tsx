"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

type HeroProps = {
  expedition: {
    title: string;
    image: string;
    location: string;
    rating: number;
    duration: string;
    difficulty: string;
    price: number;
  };
};

export default function Hero({ expedition }: HeroProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/expeditions");
    }
  };

  return (
    <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden">
      <Image
        src={expedition.image}
        alt={expedition.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
          <div className="max-w-2xl text-white">
            <button
              onClick={handleBack}
              className="
                mb-8
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-black/30
                px-4
                py-2
                text-sm
                font-medium
                text-white
                backdrop-blur-md
                transition-all
                hover:bg-black/50
              "
            >
              ← Back
            </button>

            <p className="mb-4 uppercase tracking-[6px] text-[#C89B3C]">
              TerraSquad Expedition
            </p>

            <h1 className="text-6xl font-black leading-tight">
              {expedition.title}
            </h1>

            <p className="mt-6 text-xl text-gray-200">
              📍 {expedition.location}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-full bg-white/15 px-5 py-3 backdrop-blur">
                ⭐ {expedition.rating}
              </div>

              <div className="rounded-full bg-white/15 px-5 py-3 backdrop-blur">
                🕒 {expedition.duration}
              </div>

              <div className="rounded-full bg-white/15 px-5 py-3 backdrop-blur">
                🥾 {expedition.difficulty}
              </div>
            </div>
          </div>

          <div className="hidden rounded-3xl bg-white p-8 shadow-2xl lg:block">
            <p className="text-gray-500">
              Starting From
            </p>

            <h2 className="mt-2 text-5xl font-black text-[#2F5D50]">
              ₹{expedition.price}
            </h2>

            <p className="mt-1 text-gray-500">
              per person
            </p>

            <Button className="mt-8 w-full">
              Book Expedition
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}