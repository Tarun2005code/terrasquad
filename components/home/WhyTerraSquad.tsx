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
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1714] via-[#111111] to-[#16221d]" />

      {/* Glow Effects */}
      <div className="absolute top-20 left-20 h-80 w-80 rounded-full bg-[#718F44]/10 blur-[120px]" />

      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#2F5D50]/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[8px] text-[#C89B3C] text-center font-semibold">
          Why Choose Us
        </p>

        <h2 className="mt-5 text-center text-5xl md:text-6xl font-black text-white">
          The TerraSquad Experience
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-gray-300 leading-8 text-lg">
          More than just trips. We build unforgettable adventures,
          meaningful friendships and lifetime memories.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 hover:border-[#C89B3C]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C89B3C]/15 border border-[#C89B3C]/20">
                  <Icon
                    size={30}
                    className="text-[#C89B3C]"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-300">
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