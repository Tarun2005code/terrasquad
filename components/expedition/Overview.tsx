type Props = {
  description: string;
};

export default function Overview({ description }: Props) {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-5xl px-6">

        <p className="uppercase tracking-[6px] text-[#C89B3C]">
          Overview
        </p>

        <h2 className="mt-4 text-5xl font-black text-[#2F5D50]">
          About this Expedition
        </h2>

        <p className="mt-10 text-lg leading-9 text-gray-700">
          {description}
        </p>

      </div>

    </section>
  );
}