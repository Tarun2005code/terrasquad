import { prisma } from "@/lib/prisma";

export default async function Testimonials() {
  const testimonials = await prisma.review.findMany({
    where: {
      approved: true,
      rating: 5,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#161f1b] to-[#0f1714]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#718F44]/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#2F5D50]/20 blur-[140px]" />

      {/* Watermark Quote */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[14rem] md:text-[22rem] font-black leading-none text-white/[0.03]">
          "
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[8px] text-center text-[#C89B3C] font-semibold">
          Testimonials
        </p>

        <h2 className="mt-5 text-center text-5xl md:text-6xl font-black text-white">
          What Our Explorers Say
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-center text-gray-300 leading-8">
          Real stories from explorers who joined TerraSquad expeditions.
        </p>

        <div
          className={`mt-20 ${
            testimonials.length > 0
              ? "grid md:grid-cols-3 gap-8"
              : "flex justify-center"
          }`}
        >
          {testimonials.length > 0 ? (
            testimonials.map((review) => (
              <div
                key={review.id}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-md
                  p-8
                  shadow-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#C89B3C]/30
                  hover:bg-white/10
                "
              >
                <div className="flex items-center gap-1 text-xl">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400">★</span>
                </div>

                <p className="mt-6 leading-8 text-gray-200">
                  "{review.comment}"
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <h3 className="font-bold text-xl text-white">
                    {review.user.name}
                  </h3>

                  <p className="text-[#C89B3C] text-sm mt-1">
                    Verified Explorer
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div
              className="
                max-w-lg
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                p-10
                shadow-xl
                text-center
              "
            >
              <div className="text-3xl text-yellow-400">
                ★★★★★
              </div>

              <p className="mt-6 text-lg leading-8 text-gray-200">
                Your adventure story could be featured here.
                Join a TerraSquad expedition and become one of our first
                verified explorers.
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-xl text-white">
                  Future Explorer
                </h3>

                <p className="text-[#C89B3C] text-sm mt-1">
                  Waiting for your review
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}