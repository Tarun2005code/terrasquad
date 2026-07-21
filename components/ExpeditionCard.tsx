import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

type ExpeditionCardProps = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  image: string;
  price: number;
};

export default function ExpeditionCard({
  slug,
  title,
  location,
  duration,
  difficulty,
  image,
  price,
}: ExpeditionCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

      {/* Image */}
      <div className="relative h-72 overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Difficulty Badge */}
        <div className="absolute top-5 left-5 rounded-full bg-[#C89B3C] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {difficulty}
        </div>

      </div>

      {/* Content */}
      <div className="p-7">

        <p className="text-sm font-semibold uppercase tracking-wide text-[#2F5D50]">
          📍 {location}
        </p>

        <h3 className="mt-3 text-3xl font-bold text-gray-900">
          {title}
        </h3>

        <div className="mt-6 flex items-center justify-between text-gray-600">

          <div>
            <p className="text-sm">Duration</p>
            <p className="font-semibold">{duration}</p>
          </div>

          <div className="text-right">
            <p className="text-sm">Starting From</p>
            <p className="text-xl font-bold text-[#2F5D50]">
              ₹{price}
            </p>
          </div>

        </div>

        {/* Button */}
        <div className="mt-8">
          <Link href={`/expeditions/${slug}`}>
            <Button className="w-full">
              Book Now
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
}