"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileCheck2, 
  Layers, 
  Scale, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Lock,
  Search,
  AlertCircle
} from "lucide-react";

export function ProofAndMethodologySection() {
  return (
    <section className="py-24 md:py-32 bg-[#020d09] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#34d399]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#34d399]/15 pb-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073b32]/90 border border-[#34d399]/30 text-xs font-mono text-[#34d399] tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span>SECTION 06 // PROOF & METHODOLOGY</span>
            </div>

            <h2 className="text-editorial-hero text-[#f4f2ea] tracking-tight">
              Evidence You Can Defend.{" "}
              <span className="italic font-normal text-[#34d399]">
                Verified by Method.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#cbd5d1] font-light leading-relaxed">
              We do not present speculation, rumors, or unverified claims. Every insight delivered to your leadership team is substantiated by documented public proof and classified by explicit confidence standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#073b32] hover:bg-[#0a4d42] border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5] hover:text-[#f4f2ea] transition-all group"
            >
              <span>Explore Methodology</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#34d399]" />
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#041a14] hover:bg-[#073b32] border border-[#34d399]/20 text-xs font-mono text-[#8da99e] hover:text-[#f4f2ea] transition-all"
            >
              <span>Ethical Charter</span>
            </Link>
          </div>
        </div>

        {/* Three Epistemic Verification Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#062920]/80 to-[#031511]/90 border border-[#34d399]/20 space-y-4 relative group hover:border-[#34d399]/40 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/30 flex items-center justify-center text-[#34d399]">
              <FileCheck2 size={22} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#34d399] font-semibold block">
                01 // TRACEABLE PROVENANCE
              </span>
              <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                Immutable Source Archives
              </h3>
            </div>

            <p className="text-sm text-[#cbd5d1] font-light leading-relaxed">
              Every data point in your report references official public records: corporate filings, court gazettes, domain registration logs, or archived web pages. Nothing is taken on faith.
            </p>

            <div className="pt-2 border-t border-[#34d399]/15 flex items-center gap-2 font-mono text-xs text-[#8da99e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>Cryptographic Timestamps</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#062920]/80 to-[#031511]/90 border border-[#34d399]/20 space-y-4 relative group hover:border-[#34d399]/40 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/30 flex items-center justify-center text-[#34d399]">
              <Layers size={22} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#34d399] font-semibold block">
                02 // INDEPENDENT TRIANGULATION
              </span>
              <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                Multi-Source Verification
              </h3>
            </div>

            <p className="text-sm text-[#cbd5d1] font-light leading-relaxed">
              We never rely on single-source claims or hearsay. Factual statements are cross-referenced across at least two independent primary origins to eliminate circular reporting and marketing noise.
            </p>

            <div className="pt-2 border-t border-[#34d399]/15 flex items-center gap-2 font-mono text-xs text-[#8da99e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>Zero Unverified Rumors</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-[#062920]/80 to-[#031511]/90 border border-[#34d399]/20 space-y-4 relative group hover:border-[#34d399]/40 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/30 flex items-center justify-center text-[#34d399]">
              <Scale size={22} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#34d399] font-semibold block">
                03 // CONFIDENCE TAXONOMY
              </span>
              <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                5-Tier Epistemic Matrix
              </h3>
            </div>

            <p className="text-sm text-[#cbd5d1] font-light leading-relaxed">
              Every deliverable strictly separates <span className="text-[#34d399] font-medium">Confirmed Facts [A1]</span> from <span className="text-[#b7e4d5] font-medium">Observed Indicators [B2]</span> and <span className="text-[#cbd5d1] font-medium">Analytical Inferences [C3]</span>, giving executives crystal clarity on certainty.
            </p>

            <div className="pt-2 border-t border-[#34d399]/15 flex items-center gap-2 font-mono text-xs text-[#8da99e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span>Explicit Epistemic Grading</span>
            </div>
          </div>
        </div>

        {/* Responsible Research & Statutory Trust Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#041a14]/90 border border-[#34d399]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/30 flex items-center justify-center text-[#34d399] shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-editorial font-semibold text-[#f4f2ea]">
                Strictly Lawful Public-Source Research Mandate
              </h4>
              <p className="text-xs sm:text-sm text-[#a1b8b0] font-light">
                Agletras conducts 100% lawful open-source research under explicit client mandates. We never perform intrusive network attacks, unauthorized password cracking, or illicit surveillance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-[#073b32] text-[#34d399] border border-[#34d399]/30">
              Nashik MSME Entity
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#020b08] text-[#8da99e] border border-white/10">
              100% Lawful OSINT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
