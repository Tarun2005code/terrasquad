type Props = {
  itinerary: {
    id: number;
    day: number;
    title: string;
    description: string;
  }[];
};

export default function Itinerary({ itinerary }: Props) {
  return (
    <section className="mt-20">
      <h2 className="mb-8 text-4xl font-black text-[#2F5D50]">
        Expedition Itinerary
      </h2>

      <div className="space-y-8">
        {itinerary.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white p-8 shadow"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[#C89B3C]">
              Day {item.day}
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {item.title}
            </h3>

            <p className="mt-4 text-gray-600 leading-8">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}