import { Metadata } from "next";
import { servicesData } from "@/data/services";
import { ServicesCatalogClient } from "@/components/services/ServicesCatalogClient";

export const metadata: Metadata = {
  title: "Services & Capabilities Catalog — AGLETRAS",
  description:
    "Explore Agletras research intelligence capabilities: OSINT Investigation, Business Due Diligence, Recruitment Verification, Brand Impersonation & Scam Research, Cyber Threat Intelligence, and Research Automation & Pipelines.",
};

const SERVICE_DISPLAY_ORDER = [
  "osint-investigative-research",
  "business-due-diligence",
  "recruitment-verification",
  "brand-impersonation-research",
  "external-threat-intelligence",
  "research-automation",
];

export default function ServicesPage() {
  const orderedServices = [...servicesData].sort((a, b) => {
    const idxA = SERVICE_DISPLAY_ORDER.indexOf(a.id);
    const idxB = SERVICE_DISPLAY_ORDER.indexOf(b.id);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  return <ServicesCatalogClient services={orderedServices} />;
}
