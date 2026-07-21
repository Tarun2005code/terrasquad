export default function WhyTerraSquad() {
  const features = [
    {
      title: "Professional Planning",
      desc: "Every trip is carefully organized with detailed itineraries and experienced leaders.",
      icon: "🧭",
    },
    {
      title: "Hidden Locations",
      desc: "Discover waterfalls, forests and trails that most tourists never visit.",
      icon: "🏔️",
    },
    {
      title: "Safety First",
      desc: "Emergency planning, verified routes and safety briefings on every expedition.",
      icon: "🛡️",
    },
    {
      title: "Community",
      desc: "Meet explorers, students and adventure lovers from across India.",
      icon: "👥",
    },
  ];

  return (
    <section className="py-28 bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[8px] text-center font-semibold text-[#C89B3C]">
          Why Choose Us
        </p>

        <h2 className="text-center text-5xl font-black mt-5 text-[#2F5D50]">
          Why TerraSquad?
        </h2>

        <p className="text-center mt-6 max-w-3xl mx-auto text-gray-600 leading-8">
          We don't simply organize trips—we create unforgettable adventure
          experiences with safety, professionalism and exploration at the core.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="text-5xl">{feature.icon}</div>

              <h3 className="mt-6 text-2xl font-bold text-[#2F5D50]">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}