"use client";

import {
  ShieldCheck,
  Mountain,
  Users,
  Camera,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Professionally organized expeditions with experienced leaders and emergency planning.",
  },
  {
    icon: Mountain,
    title: "Hidden Destinations",
    description:
      "Discover untouched waterfalls, forests, mountain trails and secret viewpoints.",
  },
  {
    icon: Users,
    title: "Amazing Community",
    description:
      "Meet explorers from IITs and colleges who share your passion for adventure.",
  },
  {
    icon: Camera,
    title: "Memories Forever",
    description:
      "Professional photography and unforgettable experiences included in every expedition.",
  },
];

export default function WhyTerraSquad() {
  return (
    <section className="py-28 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[8px] text-[#C89B3C] text-center font-semibold">
          Why Choose Us
        </p>

        <h2 className="mt-5 text-center text-5xl md:text-6xl font-black text-[#2F5D50]">
          The TerraSquad Experience
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-gray-600 leading-8 text-lg">
          More than just trips. We build unforgettable adventures,
          meaningful friendships and lifetime memories.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2F5D50]/10 flex items-center justify-center">
                  <Icon
                    size={32}
                    className="text-[#2F5D50]"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}