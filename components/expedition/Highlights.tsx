type Props = {
  expedition: {
    altitude: string | null;
    distance: string | null;
    pickup: string | null;
    meals: string | null;
    guide: boolean;
  };
};

export default function Highlights({ expedition }: Props) {
  const items = [
    {
      title: "Pickup",
      value: expedition.pickup,
      icon: "🚌",
    },
    {
      title: "Meals",
      value: expedition.meals,
      icon: "🍳",
    },
    {
      title: "Altitude",
      value: expedition.altitude,
      icon: "⛰️",
    },
    {
      title: "Distance",
      value: expedition.distance,
      icon: "🥾",
    },
    {
      title: "Guide",
      value: expedition.guide ? "Included" : "No",
      icon: "🧑‍🏫",
    },
  ];

  return (
    <section className="bg-white py-24">

      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-5">

        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border bg-[#F8F7F3] p-8 text-center"
          >
            <div className="text-5xl">
              {item.icon}
            </div>

            <h3 className="mt-5 font-bold">
              {item.title}
            </h3>

            <p className="mt-2 text-gray-600">
              {item.value}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}