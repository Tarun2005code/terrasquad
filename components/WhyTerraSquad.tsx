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
    desc: "Every expedition is planned with safety protocols, experienced leaders, and emergency preparedness.",
  },
  {
    icon: Mountain,
    title: "Hidden Destinations",
    desc: "Discover waterfalls, forests, viewpoints, and trails beyond the usual tourist routes.",
  },
  {
    icon: Users,
    title: "Small Groups",
    desc: "Travel with like-minded explorers in carefully managed groups for a better experience.",
  },
  {
    icon: Compass,
    title: "Professionally Organized",
    desc: "From transport to meals and itinerary, every detail is planned so you can focus on the adventure.",
  },
];

export default function WhyTerraSquad() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[5px] text-[#C89B3C] font-semibold">
          WHY TERRASQUAD
        </p>

        <h2 className="text-5xl font-bold mt-4">
          Adventure Without Compromise
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <Icon
                  size={42}
                  className="text-[#2F5D50]"
                />

                <h3 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}