"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, ShieldCheck, Compass, FileSearch } from "lucide-react";
import { LivingTreeCanvas } from "./LivingTreeCanvas";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#030d0a] via-[#041a15] to-[#030d0a]">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#2fa885]/12 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-12 md:space-y-16">
        {/* Editorial Text Block: Centered, confident, generous whitespace */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow badge with authentic Agletras logo */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#073b32]/80 border border-[#b7e4d5]/30 shadow-sm backdrop-blur-md max-w-full">
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-b from-[#0a4237] to-[#041f1b] p-0.5 border border-[#b7e4d5]/40 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Agletras Brand Emblem"
                width={20}
                height={20}
                className="w-full h-full object-contain filter contrast-125"
                priority
              />
            </div>
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.22em] font-mono text-[#b7e4d5] font-semibold truncate">
              AGLETRAS // RESEARCH & INTELLIGENCE
            </span>
          </div>

          {/* Non-Technical, Clear Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-editorial text-[#f4f2ea] tracking-tight leading-tight">
            Clear Intelligence for <br className="sm:hidden" />
            <span className="italic font-normal text-[#34d399]">
              Critical Decisions.
            </span>
          </h1>

          {/* Concise Business-Focused Explanation */}
          <p className="text-base sm:text-lg md:text-xl text-[#cbd5d1] max-w-2xl mx-auto font-light leading-relaxed">
            We investigate public records, verify evidence, and map business relationships.
            From competitor positioning to external digital exposure, Agletras provides documented,
            decision-ready findings so business leaders can move forward with confidence.
          </p>

          {/* Two Clear Calls to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041f1b] bg-[#34d399] hover:bg-[#b7e4d5] transition-all shadow-[0_4px_24px_rgba(52,211,153,0.3)] hover:shadow-[0_6px_32px_rgba(52,211,153,0.45)]"
            >
              <span>Explore Services</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="#competitor-offer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#f4f2ea] bg-[#073b32]/80 hover:bg-[#073b32] border border-[#b7e4d5]/30 hover:border-[#b7e4d5]/60 transition-all shadow-md"
            >
              <span>Competitor Intelligence Report</span>
              <ArrowUpRight size={16} className="text-[#34d399]" />
            </Link>
          </div>

          {/* Quick value indicators */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#8da99e]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#34d399]" />
              <span>100% Lawful Open-Source</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileSearch size={14} className="text-[#34d399]" />
              <span>Documented Evidence & Citations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass size={14} className="text-[#34d399]" />
              <span>Nashik · Mumbai · Pune · Global</span>
            </div>
          </div>
        </div>

        {/* 3D Visualization Centerpiece with Overlaid Intelligence Tags */}
        <div className="w-full relative">
          <LivingTreeCanvas />
        </div>
      </div>
    </section>
  );
}
