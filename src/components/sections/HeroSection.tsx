"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Shield,
  Network,
  Share2,
} from "lucide-react";
import { SpatialEntityGraph } from "@/components/visuals/SpatialEntityGraph";
import { DimensionalEmblem } from "@/components/visuals/DimensionalEmblem";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";

export function HeroSection() {
  const [activeVisualMode, setActiveVisualMode] = useState<"graph" | "emblem">("graph");

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-[#041F1B] via-[#073B32]/30 to-[#041F1B]">
      {/* Background organic light accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2FA885]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#B7E4D5]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle decorative motif */}
      <BotanicalMotif
        variant="leaf-vein"
        className="absolute top-20 right-10 w-96 text-[#B7E4D5] opacity-10 hidden xl:block pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-12">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Left: Primary Message & Action Pathway */}
          <div className="lg:col-span-8 space-y-6">
            {/* Eyebrow & Authentic Logo Integration */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-b from-[#0a4237] to-[#041F1B] p-1 border border-[#B7E4D5]/40 shadow-sm flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Agletras Brand Emblem"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain filter contrast-125"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#B7E4D5] font-semibold">
                  EVIDENCE-FIRST OSINT RESEARCH
                </span>
              </div>
            </div>

            {/* Primary Headline */}
            <h1 className="text-editorial-hero text-[#F4F2EA]">
              Turn Information{" "}
              <span className="italic text-[#B7E4D5] font-normal">
                Into Intelligence.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg md:text-xl text-[#C5D9D2] max-w-3xl leading-relaxed font-light">
              AGLETRAS investigates external digital risk, analyzes public adversary footprints,
              evaluates corporate counterparty integrity, and transforms fragmented open-source data into
              evidence-backed, decision-ready intelligence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_20px_rgba(47,168,133,0.25)] hover:shadow-[0_6px_28px_rgba(47,168,133,0.4)]"
              >
                <span>Discuss an Engagement</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/70 hover:bg-[#073B32] border border-[#B7E4D5]/30 hover:border-[#B7E4D5]/60 transition-all"
              >
                <span>Explore Our Methodology</span>
                <ArrowRight size={16} className="text-[#B7E4D5]" />
              </Link>
            </div>
          </div>

          {/* Right: Three Core Trust Pillars */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-3 pb-2">
            <div className="p-3.5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-[#073B32] text-[#2FA885] shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <strong className="text-xs font-mono uppercase text-[#F4F2EA] block">AI-Assisted</strong>
                <span className="text-[11px] text-[#8DA99E] font-light block">Accelerated public signal extraction</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-[#073B32] text-[#2FA885] shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <strong className="text-xs font-mono uppercase text-[#F4F2EA] block">Evidence-First</strong>
                <span className="text-[11px] text-[#8DA99E] font-light block">Every finding attributed to public records</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-[#073B32] text-[#2FA885] shrink-0">
                <UserCheck size={16} />
              </div>
              <div>
                <strong className="text-xs font-mono uppercase text-[#F4F2EA] block">Human-Reviewed</strong>
                <span className="text-[11px] text-[#8DA99E] font-light block">Senior analyst governance & peer review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Interactive 3D Intelligence Stage */}
        <div className="space-y-4 pt-4">
          {/* Header Bar with Visual Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#B7E4D5] font-semibold">
                  Interactive Intelligence Environment
                </h2>
              </div>
              <p className="text-xs text-[#8DA99E] font-light mt-0.5">
                Explore relational corporate topology or inspect the dimensional brand core
              </p>
            </div>

            {/* Interactive Switcher */}
            <div className="inline-flex p-1 rounded-full bg-[#031714] border border-[#B7E4D5]/20 self-start sm:self-auto text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveVisualMode("graph")}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${
                  activeVisualMode === "graph"
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-sm"
                    : "text-[#8DA99E] hover:text-[#FFFFFF]"
                }`}
              >
                <Share2 size={13} />
                <span>Spatial 3D Entity Graph</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveVisualMode("emblem")}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${
                  activeVisualMode === "emblem"
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-sm"
                    : "text-[#8DA99E] hover:text-[#FFFFFF]"
                }`}
              >
                <Shield size={13} />
                <span>Dimensional Tree Emblem</span>
              </button>
            </div>
          </div>

          {/* Active 3D Environment Stage */}
          <div className="w-full">
            {activeVisualMode === "graph" ? (
              <SpatialEntityGraph />
            ) : (
              <div className="w-full py-12 flex flex-col items-center justify-center bg-[#041F1B] rounded-3xl border border-[#B7E4D5]/20 shadow-3d-card relative overflow-hidden">
                <div className="max-w-md text-center mb-8 px-6 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                    The Living Knowledge Core
                  </span>
                  <p className="text-xs text-[#C5D9D2] font-light">
                    Grounded in empirical public telemetry; branching into decisive, structured commercial intelligence briefs.
                  </p>
                </div>
                <DimensionalEmblem size={320} interactive={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
