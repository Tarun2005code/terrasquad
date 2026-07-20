import {
  ShieldCheck,
  Mountain,
  Users,
  Compass,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Every expedition follows carefully planned safety standards and experienced leadership.",
  },
  {
    icon: Mountain,
    title: "Hidden Destinations",
    description:
      "Explore places beyond the usual tourist spots with exclusive TerraSquad routes.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Enjoy a better experience with limited group sizes and like-minded explorers.",
  },
  {
    icon: Compass,
    title: "Professionally Organized",
    description:
      "Transport, meals, itinerary, and logistics are handled so you can focus on the adventure.",
  },
];

export default function WhyTerraSquad() {
  return (
    <section className="bg-[#F8F7F3] py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
            Why TerraSquad
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-black text-[#2F5D50]">
            Adventure Without Compromise
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-gray-600">
            Every expedition is carefully planned to deliver memorable
            experiences with safety, comfort, and a strong sense of adventure.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2F5D50] text-white">
                  <Icon size={32} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
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