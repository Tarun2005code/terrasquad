import Image from "next/image";

type Props = {
  cover: string;
  images: {
    id: number;
    image: string;
  }[];
  title: string;
};

export default function Gallery({
  cover,
  images,
  title,
}: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">

      <h2 className="mb-6 text-3xl font-bold">
        Gallery
      </h2>

      <div className="grid gap-4 md:grid-cols-4">

        <div className="md:col-span-2 md:row-span-2">
          <Image
            src={cover}
            alt={title}
            width={900}
            height={700}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        {images.map((img) => (
          <Image
            key={img.id}
            src={img.image}
            alt={title}
            width={500}
            height={400}
            className="rounded-xl object-cover"
          />
        ))}

      </div>

    </section>
  );
}