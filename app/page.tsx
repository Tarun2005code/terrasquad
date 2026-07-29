import Hero from "@/components/home/Hero";
import WhyTerraSquad from "@/components/home/WhyTerraSquad";
import UpcomingExpeditions from "@/components/home/UpcomingExpeditions";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQ from "@/components/home/FAQ";
import BrandStory from "@/components/home/BrandStory";
import FeaturedExpeditions from "@/components/home/FeaturedExpeditions";
import PopularDestinations from "@/components/home/PopularDestinations";
export default function Home() {
  return (
    <>
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