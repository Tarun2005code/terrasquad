"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 text-center text-white">

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[8px] text-[#C89B3C] font-semibold mb-6"
        >
          Premium Adventure Expeditions
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
        >
          Explore Hidden
          <br />
          Places With
          <br />
          <span className="text-[#C89B3C]">TerraSquad</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-8"
        >
          Join professionally organized expeditions to hidden waterfalls,
          forests, mountains, and breathtaking destinations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-5 flex-wrap"
        >
          <Button>Join Expedition</Button>

          <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
            View Expeditions
          </button>
        </motion.div>

      </div>
    </section>
  );
}