"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Search, ShieldCheck, Network, Database, Cpu, Terminal } from "lucide-react";

const featuredResearch = [
  {
    icon: Search,
    title: "OSINT Automation Systems",
    summary:
      "Deterministic pipelines to ingest, validate, and index passive open-source records without violating access limits.",
    scope: "Public registries, passive DNS, certificate transparency logs",
  },
  {
    icon: ShieldCheck,
    title: "Threat Telemetry Correlation",
    summary:
      "Correlating observable indicators of compromise (IoCs), campaign staging, and lookalike permutations against actor profiles.",
    scope: "Threat intelligence feeds, MITRE ATT&CK alignment",
  },
  {
    icon: Network,
    title: "Graph Correlation & Entity Resolution",
    summary:
      "Resolving multi-node entity clusters to uncover hidden corporate cross-holdings and indirect counterparty relationships.",
    scope: "Corporate filings, beneficial ownership registries",
  },
  {
    icon: Database,
    title: "Digital Attack Surface Discovery",
    summary:
      "Passive reconnaissance of organization perimeters: exposed staging infrastructure, expiring certificates, and DNS mutations.",
    scope: "Passive DNS history, SSL/TLS transparency",
  },
];

export function ResearchOverlay() {
  return (
    <section
      id="destination-research"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-36 relative z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/70 via-[#031714]/55 to-[#031714]/70 border border-[#B7E4D5]/25 backdrop-blur-md shadow-[0_16px_48px_rgba(2,15,12,0.6)]">
        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 05 // Open Intelligence Research</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              Methodological Frontiers.{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                Empirical Verification.
              </span>
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light">
              Investigating the technological frontier where open-source intelligence, cybersecurity, automation, and entity resolution intersect.
            </p>
          </div>

          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all self-start md:self-auto shrink-0 shadow-lg shadow-[#041F1B]/50"
          >
            <span>Explore All Domains</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 4 Research Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredResearch.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#041F1B]/70 border border-[#B7E4D5]/15 hover:border-[#2FA885]/60 hover:bg-[#073B32]/50 hover:-translate-y-1 transition-all flex flex-col justify-between space-y-4 backdrop-blur-sm shadow-md"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885]">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-editorial text-base font-semibold text-[#F4F2EA] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B7E4D5]/10">
                  <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                    {item.scope}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
