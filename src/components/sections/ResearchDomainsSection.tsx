"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Cpu,
  Database,
  Network,
  Terminal,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";

const domains = [
  {
    id: "osint-automation",
    icon: Search,
    title: "OSINT Automation Systems",
    scopeTag: "PIPELINES & INGESTION",
    summary:
      "Deterministic data harvesting workflows designed to collect, validate, and index public records without violating platform rate limits or API access policies.",
    technicalFeatures: [
      "Automated passive DNS and WHOIS change detection",
      "Rate-controlled public registry scraping",
      "Cryptographic source artifact hashing (SHA-256)",
    ],
    epistemicFocus: "Ensures reproducible collection provenance from first observation.",
  },
  {
    id: "threat-telemetry",
    icon: ShieldCheck,
    title: "Cyber Threat Telemetry Correlation",
    scopeTag: "THREAT INTELLIGENCE",
    summary:
      "Cross-correlating observable indicators of compromise (IoCs), adversary staging perimeters, and homoglyph domain mutations against corporate brand perimeters.",
    technicalFeatures: [
      "Certificate Transparency log ingestion",
      "Punycode and lookalike domain permutations",
      "BGP routing and hosting infrastructure clustering",
    ],
    epistemicFocus: "Early warning detection before active phishing weaponization.",
  },
  {
    id: "graph-correlation",
    icon: Network,
    title: "Graph Correlation & Entity Resolution",
    scopeTag: "TOPOLOGICAL OSINT",
    summary:
      "Multi-node relational resolution linking corporate parent entities, lookalike hosts, nominee officers, and historic digital footprints across disparate jurisdictions.",
    technicalFeatures: [
      "Disparate corporate filing graph linkage",
      "Nominee director cross-holding discovery",
      "Historic WHOIS & passive DNS node linking",
    ],
    epistemicFocus: "Unmasks obfuscated corporate relationships and indirect threat vectors.",
  },
  {
    id: "attack-surface",
    icon: Database,
    title: "Digital Attack Surface Reconnaissance",
    scopeTag: "PERIMETER MAPPING",
    summary:
      "Passive, non-intrusive enumeration of external assets: exposed staging environments, expiring TLS certificates, DNS mutations, and forgotten cloud endpoints.",
    technicalFeatures: [
      "Passive sub-domain enumeration via public indexers",
      "Expiring certificate vulnerability alerts",
      "Open port and banner analysis via public censuses",
    ],
    epistemicFocus: "100% lawful reconnaissance restricted strictly to public telemetry.",
  },
  {
    id: "ai-extraction",
    icon: Cpu,
    title: "AI-Assisted Signal Extraction",
    scopeTag: "MACHINE ANALYSIS",
    summary:
      "Utilizing structured machine learning models to synthesize high-volume filings, flag contradictory statements, and score visual brand impersonation similarity.",
    technicalFeatures: [
      "Corporate charter and gazette OCR parsing",
      "DOM and CSS visual layout similarity heuristics",
      "Semantic discrepancy detection across filings",
    ],
    epistemicFocus: "Accelerates analyst discovery without replacing human validation.",
  },
  {
    id: "security-tooling",
    icon: Terminal,
    title: "Open-Source Intelligence Tooling",
    scopeTag: "CUSTOM UTILITIES",
    summary:
      "Engineering reproducible, self-contained forensic tools in TypeScript and Python for analyst validation, local SQLite querying, and structured brief generation.",
    technicalFeatures: [
      "Local, air-gapped evidence database formats",
      "Deterministic Markdown and PDF export engines",
      "Custom query wrappers for public databases",
    ],
    epistemicFocus: "Zero dependency on proprietary, black-box threat scoring APIs.",
  },
];

export function ResearchDomainsSection() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("osint-automation");
  const selectedDomain = domains.find((d) => d.id === selectedDomainId) || domains[0];
  const IconComponent = selectedDomain.icon;

  return (
    <section className="py-24 md:py-32 bg-[#041F1B] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/10">
      <BotanicalMotif
        variant="root-mesh"
        className="absolute top-10 right-10 w-96 text-[#2FA885] opacity-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Technical Research Initiatives</span>
            </div>
            <h2 className="text-editorial-title text-[#F4F2EA]">
              Pioneering the Science{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                of Open Intelligence.
              </span>
            </h2>
            <p className="text-base text-[#C5D9D2] font-light leading-relaxed">
              We continually advance the methods, pipelines, and correlation systems required to
              extract dependable signal from high-velocity public data streams.
            </p>
          </div>

          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all self-start md:self-auto shrink-0 font-medium"
          >
            <span>Explore All Domains</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Asymmetrical Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Domain Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {domains.map((domain) => {
              const Icon = domain.icon;
              const isActive = domain.id === selectedDomainId;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedDomainId(domain.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-[#073B32] border-[#2FA885] shadow-3d-card"
                      : "bg-[#073B32]/30 border-[#B7E4D5]/10 hover:border-[#B7E4D5]/30 hover:bg-[#073B32]/50"
                  }`}
                >
                  <div className="flex items-center gap-3.5 truncate">
                    <div
                      className={`p-2 rounded-xl transition-colors shrink-0 ${
                        isActive
                          ? "bg-[#2FA885] text-[#041F1B]"
                          : "bg-[#041F1B] text-[#B7E4D5] group-hover:text-[#F4F2EA]"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono uppercase text-[#8DA99E] block">
                        {domain.scopeTag}
                      </span>
                      <strong
                        className={`text-sm font-editorial block truncate ${
                          isActive ? "text-[#F4F2EA]" : "text-[#C5D9D2] group-hover:text-[#F4F2EA]"
                        }`}
                      >
                        {domain.title}
                      </strong>
                    </div>
                  </div>

                  <ArrowRight
                    size={14}
                    className={`transition-transform shrink-0 ${
                      isActive
                        ? "text-[#2FA885] translate-x-1"
                        : "text-[#8DA99E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Focus Panel for Selected Domain */}
          <div className="lg:col-span-7 rounded-3xl bg-[#031714] border border-[#B7E4D5]/25 p-8 md:p-10 shadow-3d-card relative overflow-hidden space-y-8">
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#073B32] text-[#2FA885] border border-[#B7E4D5]/20">
                  <IconComponent size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#2FA885] font-semibold block">
                    {selectedDomain.scopeTag}
                  </span>
                  <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
                    {selectedDomain.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-[#C5D9D2] leading-relaxed font-light">
              {selectedDomain.summary}
            </p>

            {/* Technical Execution Pillars */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                Technical Capabilities & Standards:
              </span>
              <ul className="space-y-2.5">
                {selectedDomain.technicalFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#E2F4EE]">
                    <CheckCircle size={15} className="text-[#2FA885] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Epistemic Focus Callout */}
            <div className="p-4 rounded-2xl bg-[#041F1B] border border-[#B7E4D5]/15 text-xs font-mono space-y-1">
              <span className="text-[10px] uppercase text-[#8DA99E] block">
                Epistemic Value Proposition:
              </span>
              <p className="text-[#B7E4D5] font-light">
                {selectedDomain.epistemicFocus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
