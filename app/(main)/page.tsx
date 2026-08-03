import Script from "next/script";

import Hero from "@/components/home/Hero";
import WhyTerraSquad from "@/components/home/WhyTerraSquad";
import UpcomingExpeditions from "@/components/home/UpcomingExpeditions";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import BrandStory from "@/components/home/BrandStory";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import PopularDestinations from "@/components/home/PopularDestinations";

export default function Home() {
  const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://terrasquad.in/#organization",
  name: "TerraSquad",
  url: "https://terrasquad.in",
  logo: "https://terrasquad.in/icon.png",
  image: "https://terrasquad.in/icon.png",
  description:
    "TerraSquad is an Indian adventure travel company and outdoor community organizing trekking expeditions, camping experiences, mountain adventures, and curated journeys across India.",
  sameAs: [
    "https://www.instagram.com/terrasquad.in"
  ]
};

  return (
    <>
      <Script
        id="terrasquad-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <Hero />
      <BrandStory />
      <FeaturedExpeditions />
      <WhyTerraSquad />
      <UpcomingExpeditions />
      <PopularDestinations />
      <Gallery />
      <Testimonials />
      <FAQ />
    </>
  );
}