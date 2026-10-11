import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { ResearchDomainsSection } from "@/components/sections/ResearchDomainsSection";
import { FeaturedThreatSection } from "@/components/sections/FeaturedThreatSection";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { DeliverablesPreview } from "@/components/sections/DeliverablesPreview";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { ResponsibleResearchSection } from "@/components/sections/ResponsibleResearchSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WorkflowSection />
      <ResearchDomainsSection />
      <FeaturedThreatSection />
      <CapabilitiesGrid />
      <MethodologySection />
      <DeliverablesPreview />
      <AudienceSection />
      <ResponsibleResearchSection />
      <CtaSection />
    </>
  );
}
