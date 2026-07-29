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
    <section
      id="gallery"
      className="relative overflow-hidden bg-black py-28"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(113,143,68,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(47,93,80,0.15),transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments Worth Remembering"
          description="Every expedition creates unforgettable memories, lifelong friendships and stories you'll tell forever."
        />

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.src}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-[#D4A937]/40
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
              "
            >
              <div className="relative h-80">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  TerraSquad
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">
                    {image.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-300">
                    TerraSquad Expedition
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://instagram.com/terrasquad.in"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#2F5D50]
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:bg-[#3B7564]
              hover:shadow-[0_0_30px_rgba(47,93,80,0.45)]
            "
          >
            📸 View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
}