type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl mx-auto text-center">

      <p className="uppercase tracking-[8px] font-semibold text-[#C89B3C]">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-5xl md:text-6xl font-black text-[#2F5D50]">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}

    </div>
  );
}