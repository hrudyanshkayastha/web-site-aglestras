"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Compass, Database, CheckCircle2, Network, ShieldCheck, FileText } from "lucide-react";

const methodologySteps = [
  {
    step: "01",
    label: "Define",
    icon: Compass,
    title: "Question & Scope Definition",
    summary: "Establish precise research objectives, jurisdictional boundaries, and approved public data sources.",
  },
  {
    step: "02",
    label: "Collect",
    icon: Database,
    title: "Permitted Open Harvesting",
    summary: "Lawful extraction across public registries, certificate transparency logs, DNS telemetry, and corporate filings.",
  },
  {
    step: "03",
    label: "Validate",
    icon: CheckCircle2,
    title: "Evidence Filtering & Provenance",
    summary: "Verifying timestamps, source authenticity, and data integrity while eliminating noise and duplicate telemetry.",
  },
  {
    step: "04",
    label: "Correlate",
    icon: Network,
    title: "Relational Topology Mapping",
    summary: "Connecting lookalike domains, staging hosts, corporate directorships, and nominee entities into structural networks.",
  },
  {
    step: "05",
    label: "Analyze",
    icon: ShieldCheck,
    title: "5-Tier Epistemic Evaluation",
    summary: "Deterministic grading separating verified facts from indicators, inferences, working assumptions, and open gaps.",
  },
  {
    step: "06",
    label: "Report",
    icon: FileText,
    title: "Decision-Ready Intelligence",
    summary: "Delivering defensible briefings with cryptographic evidence hashes, confidence tiers, and documented limitations.",
  },
];

export function MethodologyOverlay() {
  return (
    <section
      id="destination-methodology"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-36 relative z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/95 via-[#031714]/92 to-[#031714]/94 border border-[#B7E4D5]/20 backdrop-blur-2xl shadow-2xl">
        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 03 // Epistemic Research Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              Define → Collect → Validate → Correlate → Analyze → Report
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light">
              Intelligence without provenance is conjecture. We follow a 6-stage evidence lifecycle from inquiry to executive delivery.
            </p>
          </div>

          <Link
            href="/methodology"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors shrink-0 font-medium bg-[#073B32]/70 px-4 py-2 rounded-full border border-[#B7E4D5]/25 backdrop-blur-sm"
          >
            <span>Explore Epistemic Tiers</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* 6-Stage Pathway Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {methodologySteps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === methodologySteps.length - 1;

            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 hover:border-[#2FA885]/70 transition-all duration-300 flex flex-col justify-between space-y-5 backdrop-blur-md group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold tracking-wider">
                      Stage {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-[#073B32] text-[#B7E4D5] group-hover:text-[#2FA885] transition-colors">
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] mb-1">
                    {item.label}
                  </h3>
                  <div className="text-xs text-[#B7E4D5] font-mono mb-2">
                    {item.title}
                  </div>

                  <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B7E4D5]/10 flex items-center justify-between text-xs font-mono text-[#8DA99E]">
                  <span className="uppercase tracking-wider">Portal {item.step}/04</span>
                  {!isLast && (
                    <ArrowRight
                      size={14}
                      className="text-[#2FA885] hidden lg:block opacity-75 group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
