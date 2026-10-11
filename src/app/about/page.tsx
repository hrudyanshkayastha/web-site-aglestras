import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Scale, BookOpen, MapPin, Sparkles } from "lucide-react";
import { companyData } from "@/data/company";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";

export const metadata: Metadata = {
  title: "About Agletras — Research Intelligence & Origins",
  description:
    "Learn about Agletras's mission, evidence-first research methodology, statutory registration, and nature-inspired knowledge philosophy.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero Header */}
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Identity & Purpose</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Researching Information.{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Engineering Intelligence.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed max-w-3xl">
            Agletras was established to bridge the chasm between raw, chaotic public data
            and rigorous, evidence-backed commercial decisions.
          </p>
        </div>

        {/* The Leaf & Tree Symbolism (Organic Living Knowledge System) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#073B32]/70 via-[#041F1B] to-[#031714] border border-[#B7E4D5]/20 relative overflow-hidden">
          <BotanicalMotif
            variant="canopy-burst"
            className="absolute -top-10 -right-10 w-96 text-[#2FA885] opacity-15 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-[#073B32] p-4 border border-[#B7E4D5]/40 flex items-center justify-center shadow-[0_0_40px_rgba(47,168,133,0.3)]">
                <Image
                  src="/logo.png"
                  alt="Agletras Tree Emblem"
                  width={180}
                  height={180}
                  className="w-full h-full object-contain filter contrast-125"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
                The Living Knowledge Metaphor
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-[#F4F2EA]">
                Rooted in Empirical Data, Branching into Decisive Clarity
              </h2>
              <p className="text-sm sm:text-base text-[#C5D9D2] font-light leading-relaxed">
                The Agletras emblem represents an organic living system: the roots draw raw nutrients
                from lawful public sources, passive infrastructure telemetry, and official registries.
                At the stem junction, rigorous correlation and human analysis filter signal from noise.
                Above, the canopy branches outward, flowering into structured, actionable intelligence briefs.
              </p>
            </div>
          </div>
        </div>

        {/* Verified Statutory & Incorporation Details */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <h2 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Statutory Incorporation & Registration
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Publicly verifiable enterprise filing details
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Legal Enterprise Name</span>
              <strong className="text-[#F4F2EA] text-sm font-medium block">
                {companyData.legalName}
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">Micro Enterprise (Services)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Registration Authority</span>
              <strong className="text-[#F4F2EA] text-sm font-medium block">
                Ministry of MSME, Govt of India
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">Udyam Registration</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Registration Certificate ID</span>
              <strong className="text-[#2FA885] text-sm font-medium block">
                {companyData.registration.number}
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">Incorporated: August 1, 2026</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Operational Location</span>
              <strong className="text-[#F4F2EA] text-sm font-medium block">
                {companyData.registration.location}
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">Maharashtra, India</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Registered NIC Activities</span>
              <strong className="text-[#F4F2EA] text-sm font-medium block">
                63111, 74904, 72100
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">
                Data Processing, Security Consulting, Scientific Research
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Verified Domain & Contact</span>
              <strong className="text-[#F4F2EA] text-sm font-medium block">
                {companyData.contacts.corporateEmail}
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">Primary Business Communications</span>
            </div>
          </div>
        </div>

        {/* Operating Philosophy */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <h2 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Core Operating Principles
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Guiding every engagement, dataset, and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyData.principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-2"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[#2FA885] font-semibold">
                  <ShieldCheck size={16} />
                  <span>{p.label}</span>
                </div>
                <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="pt-10 border-t border-[#B7E4D5]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-editorial font-medium text-[#F4F2EA]">
              Have a question that requires structured intelligence?
            </h3>
            <p className="text-xs text-[#A1B8B0] font-light">
              We define clear project objectives and deliver evidence-backed briefs.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shrink-0"
          >
            <span>Discuss an Engagement</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
