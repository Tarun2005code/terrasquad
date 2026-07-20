export default function Stats() {
  const stats = [
    {
      number: "500+",
      title: "Explorers",
    },
    {
      number: "25+",
      title: "Hidden Locations",
    },
    {
      number: "100%",
      title: "Safety First",
    },
    {
      number: "4.9★",
      title: "Average Rating",
    },
  ];

  return (
    <section className="bg-[#F8F7F3] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {stats.map((item) => (
            <div
              key={item.title}
              className="text-center"
            >
              <h2 className="text-5xl font-black text-[#2F5D50]">
                {item.number}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}