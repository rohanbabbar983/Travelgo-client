import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import CityBadges from "../components/CityBadges";
import FAQSection from "../components/FAQSection";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CityBadges />
      <FAQSection />
    </div>
  );
}
