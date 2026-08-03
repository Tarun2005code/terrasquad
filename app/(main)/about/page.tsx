import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About TerraSquad",
  description:
        "Learn about TerraSquad, India's adventure travel company and outdoor community organizing trekking expeditions, camping experiences, and unforgettable journeys.",
};

export default function AboutPage() {
  return (
    <main className="container mx-auto max-w-5xl px-6 pt-32 pb-16">
      <h1 className="text-5xl font-bold mb-8">
        About TerraSquad
      </h1>

      <p className="mb-4">
        TerraSquad is an Indian adventure travel company and outdoor community
        dedicated to bringing explorers together through trekking expeditions,
        camping experiences, mountain adventures, and curated journeys across India.
      </p>

      <p className="mb-4">
        Founded with the vision of making adventure accessible, TerraSquad
        organizes professionally managed expeditions to hidden waterfalls,
        forests, mountains, and breathtaking destinations.
      </p>

      <p className="mb-4">
        TerraSquad focuses on safety, community, responsible travel, and
        memorable outdoor experiences for beginners as well as experienced explorers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        What TerraSquad Offers
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Trekking expeditions across India</li>
        <li>Camping experiences</li>
        <li>Mountain adventures</li>
        <li>Weekend exploration trips</li>
        <li>Unique destinations across India</li>
      </ul>
      <section className="mt-12 border-t pt-8">
  <h2 className="text-3xl font-semibold mb-4">
    Connect With Us
  </h2>

  <a
    href="https://www.instagram.com/terrasquad.in"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#8DB255] font-semibold text-lg hover:text-[#A7D46A] transition-colors"
  >
    Instagram: @terrasquad.in
  </a>
</section>
    </main>
  );
}