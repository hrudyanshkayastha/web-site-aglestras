import { HeroSection } from "@/components/sections/HeroSection";
import { CompactServicesSection } from "@/components/sections/CompactServicesSection";
import { CompactMethodologySection } from "@/components/sections/CompactMethodologySection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CompactServicesSection />
      <CompactMethodologySection />
      <CtaSection />
    </>
  );
}
