import { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Scope Formulator — AGLETRAS",
  description:
    "Direct research inquiry brief generator and official communication channels for OSINT investigation, business due diligence, recruitment verification, brand protection, cyber threat intelligence, and research automation.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
