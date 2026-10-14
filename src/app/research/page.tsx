import { Metadata } from "next";
import { ResearchPageClient } from "@/components/research/ResearchPageClient";

export const metadata: Metadata = {
  title: "Research Domains & Capabilities — AGLETRAS",
  description:
    "Review Agletras's ongoing open intelligence research domains, technical workflows, illustrative demonstrations, and publication ethics.",
};

export default function ResearchPage() {
  return <ResearchPageClient />;
}
