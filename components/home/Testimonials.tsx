"use client";

const testimonials = [
  {
    name: "Aman Sharma",
    college: "IIT Roorkee",
    text: "The Patna Waterfall expedition was incredibly well organized. The locations, food, and overall experience exceeded my expectations.",
  },
  {
    name: "Priya Singh",
    college: "Graphic Era University",
    text: "I met amazing people and explored places I never knew existed. Everything felt safe and professionally managed.",
  },
  {
    name: "Rahul Verma",
    college: "UPES Dehradun",
    text: "One of the best adventure experiences I've had. Beautiful memories, great photography and an awesome team.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[8px] text-center text-[#C89B3C] font-semibold">
          Testimonials
        </p>

        <h2 className="mt-5 text-center text-5xl md:text-6xl font-black text-[#2F5D50]">
          What Our Explorers Say
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-center text-gray-600 leading-8">
          Real stories from explorers who joined TerraSquad expeditions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-gray-200 bg-[#F8F7F3] p-8 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="text-yellow-500 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-6 text-gray-700 leading-8">
                "{item.text}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-xl text-[#2F5D50]">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.college}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}