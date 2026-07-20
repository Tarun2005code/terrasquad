import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedExpeditions from "@/components/FeaturedExpeditions";
import WhyTerraSquad from "@/components/home/WhyTerraSquad";
import UpcomingExpeditions from "@/components/home/UpcomingExpeditions";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
       <FeaturedExpeditions />
  <WhyTerraSquad />
    <UpcomingExpeditions />
    </>
  );
}