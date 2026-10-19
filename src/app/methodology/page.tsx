import { Metadata } from "next";
import { MethodologyPageClient } from "@/components/methodology/MethodologyPageClient";

export const metadata: Metadata = {
  title: "Research Methodology & Epistemic Framework — AGLETRAS",
  description:
    "Explore the Agletras 8-step research methodology and our evidence classification standards for clear, defensible business decisions.",
};

export default function MethodologyPage() {
  return <MethodologyPageClient />;
}
