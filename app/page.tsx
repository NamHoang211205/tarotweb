import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TopicsSection from "@/components/landing/TopicsSection";
import SpreadsSection from "@/components/landing/SpreadsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ClosingCtaSection from "@/components/landing/ClosingCtaSection";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <HowItWorksSection />
      <TopicsSection />
      <SpreadsSection />
      <FeaturesSection />
      <ClosingCtaSection />
    </div>
  );
}
