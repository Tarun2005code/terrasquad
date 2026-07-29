"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Who can join TerraSquad expeditions?",
    answer:
      "Anyone with a passion for adventure. Most of our expeditions are beginner-friendly and open to students and working professionals.",
  },
  {
    question: "Is transportation included?",
    answer:
      "Yes. Transportation details are mentioned for each expedition and are included wherever applicable.",
  },
  {
    question: "Are meals included?",
    answer:
      "Yes, depending on the expedition package. Every expedition page clearly lists the meals included.",
  },
  {
    question: "Is it safe?",
    answer:
      "Safety is our highest priority. Every expedition includes trained leaders, route planning, and emergency support.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1714] via-[#131d18] to-[#111111]" />

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#718F44]/10 blur-[140px]" />

      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#2F5D50]/20 blur-[140px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know before joining your next adventure."
        />

        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                overflow-hidden
                transition-all
                duration-300
                hover:border-[#C89B3C]/30
              "
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`text-[#C89B3C] transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-300 leading-8">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}