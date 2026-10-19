"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText, 
  Network, 
  Workflow, 
  Layers,
  ChevronRight,
  Database,
  Eye
} from "lucide-react";

interface BusinessLine {
  id: "bi" | "osint" | "cyber";
  code: string;
  name: string;
  headline: string;
  summary: string;
  examples: string[];
  audience: string[];
  sampleDeliverable: {
    title: string;
    description: string;
    keyMetric: string;
    metricLabel: string;
  };
  associatedServices: {
    title: string;
    slug: string;
  }[];
  accentColor: string;
}

const BUSINESS_LINES: BusinessLine[] = [
  {
    id: "bi",
    code: "LINE 01",
    name: "Competitor Intelligence",
    headline: "Understand Your Market & Competitors to Make High-Confidence Decisions",
    summary:
      "We research corporate registers, market disclosures, pricing structures, and commercial relationships so you never have to guess what competitors, suppliers, or acquisition targets are doing.",
    examples: [
      "Competitor research, feature mapping, and public pricing comparisons",
      "Market and industry growth research across target regions",
      "Supplier discovery, reliability checks, and trade relationships",
      "Corporate due diligence on prospective partners and joint ventures",
      "Company ownership, director networks, and affiliate background research",
    ],
    audience: [
      "Small marketing agencies & business consultants (competitor information & client-ready reports)",
      "E-commerce & direct-to-consumer (D2C) brands (market positioning & public pricing tracking)",
      "B2B startups & sales consultants (prospect research & company intelligence)",
    ],
    sampleDeliverable: {
      title: "Executive Competitor Intelligence Matrix",
      description: "Side-by-side comparison of 3 to 5 competitors across public pricing models, positioning, digital advertising spend indicators, and discovered customer pain points.",
      keyMetric: "3-5",
      metricLabel: "Competitors Benchmarked per Report",
    },
    associatedServices: [
      { title: "Business Due Diligence", slug: "/services/business-due-diligence" },
      { title: "Competitor Intelligence Report", slug: "#competitor-offer" },
      { title: "OSINT Investigation", slug: "/services/osint-investigation" },
    ],
    accentColor: "from-[#2fa885] to-[#34d399]",
  },
  {
    id: "osint",
    code: "LINE 02",
    name: "Investigative Research",
    headline: "Lawful Public-Source Research to Verify Facts & Document Evidence",
    summary:
      "We use hypothesis-driven open-source intelligence methods to investigate specific business questions, verify credentials, uncover undisclosed affiliations, and document verifiable findings.",
    examples: [
      "Targeted OSINT investigations into entities, assets, and dispute backgrounds",
      "Recruitment verification under authorized scope (career timelines & credentials)",
      "Brand impersonation, typosquat domain, and copycat scam discovery",
      "Independent evidence verification and timeline reconstruction",
      "Corporate relationship mapping and secondary affiliation tracing",
    ],
    audience: [
      "Boutique firms and law firms (scoped public-record & business research)",
      "Business consultants (company research, corporate relationships & public-record checks)",
      "E-commerce & D2C brands (suspicious websites, fake profiles & brand impersonation research)",
    ],
    sampleDeliverable: {
      title: "Evidence-Backed Investigative Dossier",
      description: "Structured findings report where every material statement is categorized under our 5-tier confidence taxonomy (Facts, Indicators, Inferences) with full source citations.",
      keyMetric: "100%",
      metricLabel: "Lawful Public-Source Corroboration",
    },
    associatedServices: [
      { title: "OSINT Investigation", slug: "/services/osint-investigation" },
      { title: "Recruitment Verification", slug: "/services/recruitment-verification" },
      { title: "Brand Impersonation & Scam Research", slug: "/services/brand-impersonation-research" },
    ],
    accentColor: "from-[#34d399] to-[#b7e4d5]",
  },
  {
    id: "cyber",
    code: "LINE 03",
    name: "Digital Exposure Research",
    headline: "Understand External Digital Exposure & Anticipate Emerging Threats",
    summary:
      "We examine publicly observable digital footprints, certificate transparency telemetry, and threat indicators to help security and IT teams identify external staging before incidents happen.",
    examples: [
      "Cyber threat intelligence and external digital attack surface discovery",
      "Passive reconnaissance of exposed domains, subdomains, and open ports",
      "Credential leak indexing and public source-code repository exposure checks",
      "Threat actor campaign research and telemetry alignment (MITRE ATT&CK)",
      "Repeatable research automation and scheduled intelligence pipelines",
    ],
    audience: [
      "Cyber threat intelligence teams (public cyber-threat indicators & external digital-risk research)",
      "Technology startups & founders (external perimeter hygiene & staging discovery)",
      "Growing enterprises evaluating digital exposure across Nashik, Mumbai, and Pune",
    ],
    sampleDeliverable: {
      title: "External Threat Intelligence & Perimeter Brief",
      description: "Comprehensive catalog of discovered lookalike domains, expired certificates, exposed staging infrastructure, and machine-readable Indicators of Compromise (IoCs).",
      keyMetric: "Passive",
      metricLabel: "Non-Intrusive External Discovery",
    },
    associatedServices: [
      { title: "Cyber Threat Intelligence", slug: "/services/cyber-threat-intelligence" },
      { title: "Research Automation & Pipelines", slug: "/services/research-automation" },
      { title: "Brand Impersonation & Scam Research", slug: "/services/brand-impersonation-research" },
    ],
    accentColor: "from-[#2fa885] to-[#10b981]",
  },
];

export function ThreeBusinessLinesSection() {
  const [selectedLineId, setSelectedLineId] = useState<"bi" | "osint" | "cyber">("bi");

  const activeLine = BUSINESS_LINES.find((b) => b.id === selectedLineId) || BUSINESS_LINES[0];

  return (
    <section id="business-lines" className="py-24 md:py-32 bg-[#030d0a] text-[#f4f2ea] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-[#2fa885]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073b32]/80 border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>SECTION 04 // THREE BUSINESS LINES</span>
          </div>

          <h2 className="text-editorial-title text-[#f4f2ea]">
            How Agletras{" "}
            <span className="italic font-normal text-[#34d399]">
              Helps Your Business.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#cbd5d1] font-light leading-relaxed">
            We operate across three core business lines, giving commercial leaders, legal counsel,
            and security teams the exact depth of research they require without technical jargon.
          </p>
        </div>

        {/* 3 Interactive Business Line Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BUSINESS_LINES.map((line) => {
            const isSelected = selectedLineId === line.id;
            const iconMap = {
              bi: TrendingUp,
              osint: Search,
              cyber: ShieldCheck,
            };
            const Icon = iconMap[line.id];

            return (
              <button
                key={line.id}
                type="button"
                onClick={() => setSelectedLineId(line.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#073b32] border-[#34d399] shadow-[0_10px_35px_rgba(52,211,153,0.25)] -translate-y-1"
                    : "bg-[#031511]/90 border-[#34d399]/20 hover:border-[#34d399]/50 hover:bg-[#073b32]/50"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2fa885] to-[#34d399]" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-[#34d399] text-[#041f1b]" : "bg-[#04241d] text-[#34d399] group-hover:bg-[#2fa885]/30"
                  }`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-mono tracking-widest text-[#8da99e]">
                    {line.code}
                  </span>
                </div>

                <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea] mb-2">
                  {line.name}
                </h3>

                <p className="text-xs text-[#cbd5d1] line-clamp-2 leading-relaxed">
                  {line.headline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel for the Selected Business Line */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#06241c] via-[#041b16] to-[#03130f] border border-[#34d399]/35 shadow-[0_20px_60px_rgba(2,15,11,0.8)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Scope & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399]">
                <span>CORE BUSINESS LINE</span>
                <span>//</span>
                <span>{activeLine.code}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-editorial font-semibold text-[#f4f2ea]">
                {activeLine.headline}
              </h3>

              <p className="text-sm md:text-base text-[#cbd5d1] font-light leading-relaxed">
                {activeLine.summary}
              </p>

              {/* What We Investigate List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8da99e] font-semibold block">
                  Core Investigative Capabilities:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeLine.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#e2ece8]">
                      <CheckCircle2 size={16} className="text-[#34d399] shrink-0 mt-0.5" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Services Quick Links */}
              <div className="pt-4 border-t border-[#34d399]/20 flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono text-[#8da99e]">
                  Relevant Services:
                </span>
                {activeLine.associatedServices.map((svc, idx) => (
                  <Link
                    key={idx}
                    href={svc.slug}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#073b32]/90 hover:bg-[#34d399] hover:text-[#041f1b] border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5] transition-all"
                  >
                    <span>{svc.title}</span>
                    <ArrowUpRight size={12} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right 5 Columns: Sample Deliverable Preview & Target Beneficiaries */}
            <div className="lg:col-span-5 space-y-6">
              {/* Sample Deliverable Preview Box */}
              <div className="p-6 md:p-8 rounded-2xl bg-[#031511]/95 border border-[#34d399]/30 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-[#34d399]/15 pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#34d399] font-semibold">
                    Client Deliverable Snapshot
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#34d399]/20 text-[#34d399]">
                    OUTPUT FORMAT
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-editorial font-semibold text-[#f4f2ea]">
                    {activeLine.sampleDeliverable.title}
                  </h4>
                  <p className="text-xs text-[#cbd5d1] leading-relaxed">
                    {activeLine.sampleDeliverable.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#041f1b] border border-[#34d399]/20 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-editorial font-bold text-[#34d399]">
                      {activeLine.sampleDeliverable.keyMetric}
                    </span>
                    <span className="text-[11px] font-mono text-[#8da99e] block">
                      {activeLine.sampleDeliverable.metricLabel}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#b7e4d5] hover:text-white underline underline-offset-4 transition-colors"
                  >
                    <span>Request Scope</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Target Audiences Box */}
              <div className="p-6 rounded-2xl bg-[#073b32]/40 border border-[#34d399]/20 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#34d399] font-semibold block">
                  Tailored For:
                </span>
                <ul className="space-y-2 text-xs text-[#cbd5d1]">
                  {activeLine.audience.map((aud, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] mt-1.5 shrink-0" />
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
