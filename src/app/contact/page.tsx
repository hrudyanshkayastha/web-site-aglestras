import { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Scope Formulator — AGLETRAS",
  description:
    "Direct cryptographic brief generation and official inquiry channels for external threat intelligence, corporate due diligence, and OSINT investigations.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
