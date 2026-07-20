import Button from "@/components/ui/Button";

const trips = [
  {
    date: "2 Aug",
    title: "Patna Waterfall Expedition",
    seats: "8 Seats Left",
    price: "₹999",
  },
  {
    date: "9 Aug",
    title: "Neer Waterfall Expedition",
    seats: "12 Seats Left",
    price: "₹1099",
  },
  {
    date: "16 Aug",
    title: "Kyari Viewpoint Trek",
    seats: "6 Seats Left",
    price: "₹1299",
  },
];

export default function UpcomingExpeditions() {
  return (
    <section className="py-28 bg-[#2F5D50] text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <p className="uppercase tracking-[8px] text-[#C89B3C] font-semibold">
            Upcoming
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-black">
            Next Expeditions
          </h2>
        </div>

        <div className="mt-16 space-y-6">

          {trips.map((trip) => (
            <div
              key={trip.title}
              className="bg-white/10 backdrop-blur rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/15 transition"
            >

              <div>
                <p className="text-[#C89B3C] font-semibold">
                  {trip.date}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {trip.title}
                </h3>

                <p className="text-gray-300 mt-2">
                  {trip.seats}
                </p>
              </div>

              <div className="text-center">
                <p className="text-4xl font-black">
                  {trip.price}
                </p>
              </div>

              <Button>
                Reserve Seat
              </Button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}