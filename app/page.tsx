import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedExpeditions from "@/components/FeaturedExpeditions";
import WhyTerraSquad from "@/components/home/WhyTerraSquad";
import UpcomingExpeditions from "@/components/home/UpcomingExpeditions";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQ from "@/components/home/FAQ";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
       <FeaturedExpeditions />
  <WhyTerraSquad />
    <UpcomingExpeditions />
  <Gallery />
<Testimonials />
<FAQ />
    </>
  );
}