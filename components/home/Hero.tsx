"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/hero-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 brightness-[0.7]" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/45" />

      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#718F44]/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#2F5D50]/30 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-4 sm:px-6 text-center text-white">

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[3px] sm:tracking-[5px] md:tracking-[8px] text-[#718F44] font-semibold mb-6 sm:mb-8 text-xs sm:text-sm"
        >
          Premium Adventure Expeditions
        </motion.p>

        {/* Logo Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center">

            <h1 className="flex items-center justify-center font-black leading-none flex-wrap">

              <span className="text-[2.8rem] sm:text-6xl md:text-8xl lg:text-[9rem]">
                TerraS
              </span>

              <Image
                src="/images/q-logo.png"
                alt="TerraSquad Logo"
                width={180}
                height={180}
                priority
                className="mx-[-4px] sm:mx-[-8px] md:mx-[-12px] lg:mx-[-16px] w-14 sm:w-24 md:w-32 lg:w-40 h-auto"
              />

              <span className="text-[2.8rem] sm:text-6xl md:text-8xl lg:text-[9rem]">
                uad
              </span>

            </h1>

            <p className="mt-4 text-[#718F44] text-xs sm:text-sm md:text-lg lg:text-xl tracking-[0.2em] sm:tracking-[0.35em] md:tracking-[0.45em] font-medium uppercase">
              Explore Earth Together
            </p>

          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-7 sm:leading-8"
        >
          Join professionally organized expeditions to hidden waterfalls,
          forests, mountains, and breathtaking destinations across India.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">

          <Link
            href="/expeditions"
            className="bg-[#2F5D50] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:scale-105 transition text-center"
          >
            Join Expedition
          </Link>

          <Link
            href="/#featured-expeditions"
            scroll
            className="border border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition text-center"
          >
            View Expeditions
          </Link>

        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-3 sm:gap-5">

          <div className="rounded-full border border-white/20 bg-white/10 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15">
            🛡 Safe Trips
          </div>

          <div className="rounded-full border border-white/20 bg-white/10 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15">
            📸 Epic Memories
          </div>

          <div className="rounded-full border border-white/20 bg-white/10 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15">
            🌿 Real Adventure
          </div>

        </div>

      </div>
    </section>
  );
}