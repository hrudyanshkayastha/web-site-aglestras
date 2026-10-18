import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ApproachVisualSection } from "@/components/home/ApproachVisualSection";
import { ThreeBusinessLinesSection } from "@/components/home/ThreeBusinessLinesSection";
import { CompetitorOfferSection } from "@/components/home/CompetitorOfferSection";
import { ProofAndMethodologySection } from "@/components/home/ProofAndMethodologySection";
import { HomeFinalCtaSection } from "@/components/home/HomeFinalCtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-[#030d0a] text-[#f4f2ea]">
      {/* SECTION 01: Cinematic Hero with 3D Living Knowledge Tree Centerpiece & Overlaid Intelligence Tags */}
      <HeroSection />

      {/* SECTION 02: The Business Problem: Uncertainty About Competitors, False Claims, Copycats & Exposure */}
      <ProblemSection />

      {/* SECTION 03: The Agletras Approach: Interactive 5-Stage Visual Progression Pipeline */}
      <ApproachVisualSection />

      {/* SECTION 04: Research Capabilities: Three Business Lines (BI, OSINT, Cyber Threat Intelligence) */}
      <ThreeBusinessLinesSection />

      {/* SECTION 05: Featured Offer: Competitor Intelligence Report (3 to 5 Competitors) */}
      <CompetitorOfferSection />

      {/* SECTION 06: Evidence & Methodology: Traceable Sources, Triangulation & 5-Tier Epistemic Taxonomy */}
      <ProofAndMethodologySection />

      {/* SECTION 07: Final Call to Action: Uncluttered Next Step & Direct Engagement Channels */}
      <HomeFinalCtaSection />
    </div>
  );
}
