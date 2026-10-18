"use client";

import React from "react";
import Link from "next/link";
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingUp, 
  Layers,
  Sparkles,
  HelpCircle
} from "lucide-react";

export function CompetitorOfferSection() {
  return (
    <section id="competitor-offer" className="py-24 md:py-32 bg-[#041410] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#34d399]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073b32]/90 border border-[#34d399]/40 text-xs font-mono text-[#34d399] tracking-wider shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span>PRIMARY COMMERCIAL OFFER // INITIAL SERVICE ENGAGEMENT</span>
          </div>

          <h2 className="text-editorial-hero text-[#f4f2ea] tracking-tight">
            Competitor Intelligence{" "}
            <span className="italic font-normal text-[#34d399]">
              Report.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#cbd5d1] font-light leading-relaxed">
            A comprehensive, evidence-backed research report comparing three to five of your primary competitors.
            Understand their commercial positioning, service offerings, digital footprint, and market differences without relying on hearsay.
          </p>
        </div>

        {/* Featured Offer Card */}
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-br from-[#062920] via-[#041d17] to-[#031410] border-2 border-[#34d399]/40 shadow-[0_24px_70px_rgba(2,15,11,0.85)] relative overflow-hidden">
          {/* Corner Pixel-Style Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#34d399]/60" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#34d399]/60" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#34d399]/60" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#34d399]/60" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Practical Value & Deliverables */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#34d399] font-semibold">
                  Practical Business Value
                </span>
                <h3 className="text-2xl md:text-3xl font-editorial font-semibold text-[#f4f2ea]">
                  What You Receive in the Report:
                </h3>
                <p className="text-sm text-[#cbd5d1] leading-relaxed font-light">
                  Rather than generic market summaries, Agletras extracts, cross-references, and documents concrete publicly observable intelligence across 3 to 5 named rivals:
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl bg-[#031511]/90 border border-[#34d399]/20 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4f2ea]">Market Positioning & Target Audiences</h4>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      How each competitor frames their value proposition, which customer segments they prioritize, and which messages they test across marketing channels.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#031511]/90 border border-[#34d399]/20 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4f2ea]">Public Pricing & Packaging Structures</h4>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      Discovered commercial tiers, contract terms, discount indicators, and unlisted enterprise packages extracted from public RFPs, customer tenders, and filings.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#031511]/90 border border-[#34d399]/20 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4f2ea]">Digital Footprint & Infrastructure Comparison</h4>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      Analysis of technology stacks, hosting footprints, advertising networks, newly registered subdomains, and operational tooling.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#031511]/90 border border-[#34d399]/20 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4f2ea]">Corporate Milestones & Leadership Moves</h4>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      Recent corporate filings, new branch locations, trademark applications, and verified senior leadership hiring patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: The 4-Step Customer Journey */}
            <div className="lg:col-span-5 p-7 md:p-8 rounded-2xl bg-[#03110e]/95 border border-[#34d399]/30 space-y-6 shadow-xl">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#34d399] font-semibold block mb-1">
                  How an Engagement Works
                </span>
                <h4 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                  A Sensible 4-Step Journey:
                </h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#073b32] border border-[#34d399] text-[#34d399] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-semibold text-[#f4f2ea]">Tell us what you need to understand</h5>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      Specify the 3 to 5 competitors and your primary questions (e.g. pricing, product lineup, or market expansion).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#073b32] border border-[#34d399] text-[#34d399] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-semibold text-[#f4f2ea]">Agree on scope & deliverables</h5>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      We establish the authorized investigative depth, deliverable formats, and concrete delivery timeframe.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#073b32] border border-[#34d399] text-[#34d399] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-semibold text-[#f4f2ea]">Conduct the authorized research</h5>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      Our intelligence analysts harvest public sources, cross-verify indicators, and build comprehensive comparative matrices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#073b32] border border-[#34d399] text-[#34d399] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h5 className="text-xs font-mono font-semibold text-[#f4f2ea]">Receive your documented report</h5>
                    <p className="text-xs text-[#a1b8b0] mt-0.5">
                      Receive an executive brief with side-by-side matrices, verifiable evidence citations, and strategic takeaways.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#34d399]/20 space-y-3">
                <Link
                  href="/contact"
                  className="w-full py-3.5 px-6 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-[#041f1b] bg-[#34d399] hover:bg-[#b7e4d5] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#041f1b]/50"
                >
                  <span>Request Competitor Scope</span>
                  <ArrowUpRight size={14} />
                </Link>

                {/* Secondary Pathway */}
                <div className="text-center pt-2">
                  <span className="text-[11px] text-[#8da99e] block mb-1">
                    Need a custom inquiry into a specific company, individual, or transaction?
                  </span>
                  <Link
                    href="/services/osint-investigation"
                    className="text-xs font-mono text-[#34d399] hover:text-[#b7e4d5] underline underline-offset-4 transition-colors"
                  >
                    Explore Scoped OSINT Investigation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
