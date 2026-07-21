"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const images = [
  {
    src: "/images/gallery/gallery1.jpg",
    title: "Hidden Waterfalls",
  },
  {
    src: "/images/gallery/gallery2.jpg",
    title: "Mountain Trails",
  },
  {
    src: "/images/gallery/gallery3.jpg",
    title: "Camping Nights",
  },
  {
    src: "/images/gallery/gallery4.jpg",
    title: "Forest Adventures",
  },
  {
    src: "/images/gallery/gallery5.jpg",
    title: "Sunrise Trek",
  },
  {
    src: "/images/gallery/gallery6.jpg",
    title: "Team Expedition",
  },
];

export default function Gallery() {
  return (
    <section className="bg-[#F8F7F3] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          eyebrow="Gallery"
          title="Moments Worth Remembering"
          description="Every expedition creates unforgettable memories, lifelong friendships and stories you'll tell forever."
        />

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((image) => (
            <div
              key={image.src}
              className="group relative overflow-hidden rounded-3xl shadow-xl"
            >
              <div className="relative h-80">

                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

                <div className="absolute bottom-6 left-6">

                  <h3 className="text-2xl font-bold text-white">
                    {image.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-200">
                    TerraSquad Expedition
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}