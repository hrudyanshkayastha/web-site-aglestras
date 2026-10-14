import { Metadata } from "next";
import { MethodologyPageClient } from "@/components/methodology/MethodologyPageClient";

export const metadata: Metadata = {
  title: "Research Methodology & Epistemic Framework — AGLETRAS",
  description:
    "Explore the Agletras 6-stage epistemic intelligence lifecycle (Define, Collect, Verify, Correlate, Analyze, Deliver) and our 5-tier certainty standard.",
};

export default function MethodologyPage() {
  return <MethodologyPageClient />;
}
