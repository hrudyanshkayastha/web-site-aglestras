import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search, FileCode, Network, ShieldCheck, Database, Terminal, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Research Domains & Explorations — AGLETRAS",
  description:
    "Review Agletras's ongoing open-source intelligence research domains: OSINT automation, threat telemetry, correlation engines, and attack surface discovery.",
};

const researchDomains = [
  {
    icon: Search,
    title: "OSINT Automation Systems",
    summary:
      "Engineering deterministic workflows to ingest, validate, and index passive open-source records without violating platform rate limits or access terms.",
    scope: "Public registries, passive DNS, certificate transparency logs, and code repositories.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Threat Telemetry Correlation",
    summary:
      "Correlating observable indicators of compromise (IoCs), adversary campaign staging, and lookalike domain permutations against threat actor profiles.",
    scope: "Public threat intelligence feeds, MITRE ATT&CK framework alignment, and malware hash databases.",
  },
  {
    icon: Network,
    title: "Graph Correlation & Entity Resolution",
    summary:
      "Resolving multi-node entity clusters to uncover hidden corporate cross-holdings, shared digital assets, and indirect counterparty relationships.",
    scope: "Disparate corporate filings, gazettes, and public beneficial ownership registries.",
  },
  {
    icon: Database,
    title: "Digital Attack Surface Discovery",
    summary:
      "Passive reconnaissance of organization perimeters: exposed staging infrastructure, expiring certificates, misconfigured subdomains, and DNS mutations.",
    scope: "Passive DNS history, SSL/TLS certificate transparency, and open public indexers.",
  },
  {
    icon: Cpu,
    title: "AI-Assisted Signal Extraction",
    summary:
      "Utilizing structured machine-learning models to summarize high-volume public filings, identify textual inconsistencies, and score visual brand similarity.",
    scope: "Document OCR, semantic clustering, and logo similarity classification algorithms.",
  },
  {
    icon: Terminal,
    title: "Open-Source Intelligence Tooling",
    summary:
      "Evaluating and maintaining specialized open-source investigative utilities tailored for reproducible, peer-reviewed forensic workflows.",
    scope: "Custom Python/TypeScript extraction scripts, local SQLite intelligence databases, and export utilities.",
  },
];

export default function ResearchPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Open Intelligence Research</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Research Domains{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              & Explorations.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Agletras investigates the technical frontier where open-source intelligence, cybersecurity,
            automation, and machine-assisted analysis intersect.
          </p>
        </div>

        {/* Research Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchDomains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/15 flex flex-col justify-between space-y-6 hover:border-[#2FA885]/40 transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885]">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                    {domain.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#C5D9D2] leading-relaxed font-light">
                    {domain.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
                  <span className="block text-[10px] uppercase text-[#2FA885] mb-1">
                    Primary Data Vectors:
                  </span>
                  <span>{domain.scope}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Notice */}
        <div className="p-8 rounded-3xl bg-[#031714] border border-[#B7E4D5]/15 text-xs text-[#A1B8B0] leading-relaxed font-light space-y-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
            Research Integrity Commitment
          </h3>
          <p>
            All research domains operate under strict adherence to international legal norms and privacy regulations.
            We do not develop intrusion tools, zero-day exploits, or invasive surveillance capabilities.
            Our research is dedicated to open-source verification and defensive intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}
