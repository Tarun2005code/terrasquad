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
    <section className="bg-[#F8F7F3] py-28">
      <div className="max-w-5xl mx-auto px-6">

        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know before joining your next adventure."
        />

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl bg-white shadow-md"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-lg">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
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