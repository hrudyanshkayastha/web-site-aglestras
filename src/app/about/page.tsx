import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowUpRight,
  Scale,
  BookOpen,
  MapPin,
  Sparkles,
  Network,
  Cpu,
  Search,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { companyData } from "@/data/company";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";
import { DimensionalEmblem } from "@/components/visuals/DimensionalEmblem";

export const metadata: Metadata = {
  title: "About Agletras — Purpose, Philosophy & Architecture",
  description:
    "Learn what Agletras is, our purpose, research philosophy, how research, intelligence, and automation work together, and our commitment to lawful public-source inquiry.",
};

const triadPillars = [
  {
    icon: Search,
    title: "1. Empirical Research",
    tagline: "Primary Public Source Investigation",
    description:
      "Hypothesis-driven inquiry into unclassified public records, corporate registers, academic catalogs, and open technical archives. We replace generic keyword searches with structured epistemic questions.",
    deliverable: "Primary source citations & cryptographic capture hashes",
  },
  {
    icon: Network,
    title: "2. Relational Intelligence",
    tagline: "Entity Resolution & Synthesis",
    description:
      "Transforming isolated data points into relational knowledge graphs. We connect lookalike domains, corporate directorships, and digital footprints to uncover structural relationships and evaluate operational risks.",
    deliverable: "5-Tier Epistemic classifications & node-link link charts",
  },
  {
    icon: Cpu,
    title: "3. Process Automation",
    tagline: "Deterministic Pipelines & ETL",
    description:
      "Engineering reproducible collection workflows that respect platform rate limits and robots.txt. Automation handles data extraction and normalization so human analysts can focus entirely on high-stakes synthesis.",
    deliverable: "Scheduled change watchers & standardized JSON/Markdown datasets",
  },
];

const epistemicFlow = [
  {
    phase: "Sources",
    label: "Permitted Open Data",
    desc: "Statutory company registries, passive DNS, certificate transparency logs, court gazettes, and public repositories.",
  },
  {
    phase: "Evidence",
    label: "Attributed Artifacts",
    desc: "Cryptographically hashed records tagged with universal UTC timestamps and primary provenance metadata.",
  },
  {
    phase: "Analysis",
    label: "Epistemic Grading",
    desc: "Rigorous human peer review separating verified facts from indicators, inferences, and stated operational assumptions.",
  },
  {
    phase: "Decisions",
    label: "Actionable Briefs",
    desc: "Defensive recommendations and strategic findings delivered with explicit scope boundaries and confidence ratings.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero Header */}
        <div className="space-y-6 text-center md:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Identity, Philosophy & Standards</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Researching Information.{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Engineering Intelligence.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Agletras researches publicly available information and develops intelligence workflows
            to help organizations investigate relationships, evaluate counterparty information, identify digital risks, and make better-informed decisions.
          </p>
        </div>

        {/* Section 1: What Agletras Is & Core Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
                What Agletras Is
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                An Evidence-First Research Intelligence Practice
              </h2>
              <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
                Agletras is a specialized research enterprise founded to bridge the critical gap between vast, chaotic public data and high-stakes executive decisions. We combine open-source intelligence (OSINT) methodologies, cybersecurity telemetry, and automated data pipelines to provide organizations with clear, empirically substantiated findings.
              </p>
            </div>
            <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
              Governed strictly by lawful open-source research and explicit client authorizations.
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/20 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
                Problems We Aim to Solve
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                Eliminating Decision Blind Spots
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#C5D9D2] font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span><strong>Perimeter Blind Spots:</strong> Adversaries staging lookalike domains and harvesting infrastructure before phishing campaigns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span><strong>Concealed Liabilities:</strong> Complex shell company webs, undisclosed litigation, and nominee director ownership structures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span><strong>Analytical Fatigue:</strong> Thousands of hours lost manually copying records across government registries and disparate databases.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
              Structured discovery turns noisy search results into defensible truth.
            </div>
          </div>
        </div>

        {/* Section 2: The Living Knowledge Metaphor & Emblem */}
        <div className="p-8 sm:p-12 rounded-3xl surface-matte-dark shadow-3d-card border border-[#B7E4D5]/20 relative overflow-hidden">
          <BotanicalMotif
            variant="canopy-burst"
            className="absolute -top-10 -right-10 w-96 text-[#2FA885] opacity-15 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-4 flex justify-center">
              <DimensionalEmblem size={200} interactive={true} />
            </div>

            <div className="md:col-span-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
                The Living Knowledge Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-[#F4F2EA]">
                Rooted in Empirical Data, Branching into Decisive Clarity
              </h2>
              <p className="text-sm sm:text-base text-[#C5D9D2] font-light leading-relaxed">
                The Agletras identity reflects an interconnected living system: the roots draw raw nutrients from lawful public registries, passive DNS history, and transparency feeds. At the trunk junction, systematic correlation, normalization, and senior analyst peer review filter signal from noise. Above, the canopy branches into structured, actionable intelligence dossiers ready for executive action.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Triad — How Research, Intelligence, and Automation Work Together */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Methodological Synergy
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              How Research, Intelligence & Automation Coexist
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light mt-1">
              Technology accelerates collection, but human discernment governs analysis. No single pillar operates in isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {triadPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/20 flex flex-col justify-between space-y-6 shadow-lg hover:border-[#2FA885]/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885]">
                      <PillarIcon size={22} />
                    </div>
                    <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-[#B7E4D5] block">
                      {pillar.tagline}
                    </span>
                    <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
                    <span className="block text-[10px] uppercase text-[#2FA885] mb-0.5">
                      Direct Output:
                    </span>
                    <span>{pillar.deliverable}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: The Epistemic Bridge (Sources -> Evidence -> Analysis -> Decisions) */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              The Epistemic Bridge
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              From Raw Observation to Executive Action
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {epistemicFlow.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold">
                      Stage 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-[#8DA99E]">
                      {step.phase}
                    </span>
                  </div>
                  <h4 className="text-base font-editorial font-semibold text-[#F4F2EA]">
                    {step.label}
                  </h4>
                  <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="pt-2 text-right hidden lg:block text-[#2FA885]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Lawful & Responsible Research Commitments */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <ShieldCheck size={16} className="text-[#2FA885]" />
              <span>Ethical Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA] mt-1">
              Commitment to Lawful & Responsible Research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyData.principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-2"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[#2FA885] font-semibold">
                  <FileCheck size={16} />
                  <span>{p.label}</span>
                </div>
                <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Verified Statutory & Incorporation Details */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <h2 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Statutory Incorporation & Registration
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Verifiable enterprise registry details
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
              <span className="text-[11px] text-[#A1B8B0]">Statutory Enterprise Filing</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 space-y-1.5">
              <span className="text-[#8DA99E] uppercase block">Enterprise Status</span>
              <strong className="text-[#2FA885] text-sm font-medium block">
                Active Micro Enterprise
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
              <span className="text-[#8DA99E] uppercase block">Primary Contact</span>
              <strong className="text-[#F4F2EA] text-sm font-medium block">
                {companyData.contacts.corporateEmail}
              </strong>
              <span className="text-[11px] text-[#A1B8B0]">Official Business Inquiries</span>
            </div>
          </div>
        </div>

        {/* Closing Next-Step CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Explore How Our Capabilities Apply to Your Organization
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light max-w-xl">
              From cyber threat intelligence to corporate due diligence, we provide transparent, evidence-backed answers.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#0a4d40] border border-[#B7E4D5]/30 transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} className="text-[#2FA885]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-lg shadow-[#041F1B]/50"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
