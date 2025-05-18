import { HeroSection } from "../components/hero/HeroSection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { HowItWorksSection } from "../components/sections/HowItWorksSection";
import { StatsSection } from "../components/sections/StatsSection";
import { TestimonialSection } from "../components/sections/TestimonialSection";
import { CTASection } from "../components/sections/CTASection";
import { SimpleHeader } from "../components/layout/SimpleHeader";
import { SimpleFooter } from "../components/layout/SimpleFooter";

export default function Home() {
  return (
    <>
      <SimpleHeader />
      <main className="flex flex-col min-h-screen bg-gradient-to-b from-white to-primary/5">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <SimpleFooter />
    </>
  );
}
