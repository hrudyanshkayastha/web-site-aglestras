"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CinematicIntelligenceWorld } from "@/components/visuals/world/CinematicIntelligenceWorld";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#041F1B] via-[#073B32]/30 to-[#041F1B]">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#2FA885]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-12 md:space-y-16">
        {/* Editorial Text Block: Centered, confident, generous whitespace */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow with unaltered authentic Agletras logo */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#073B32]/80 border border-[#B7E4D5]/30 shadow-sm backdrop-blur-md">
            <div className="relative w-5 h-5 rounded-full bg-gradient-to-b from-[#0a4237] to-[#041F1B] p-0.5 border border-[#B7E4D5]/40 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Agletras Brand Emblem"
                width={20}
                height={20}
                className="w-full h-full object-contain filter contrast-125"
                priority
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-[#B7E4D5] font-semibold">
              AGLETRAS // RESEARCH INTELLIGENCE
            </span>
          </div>

          {/* Memorable Headline: Exact user requirement */}
          <h1 className="text-editorial-hero text-[#F4F2EA] tracking-tight">
            See beyond{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              the surface.
            </span>
          </h1>

          {/* One concise, powerful supporting sentence */}
          <p className="text-lg md:text-xl text-[#C5D9D2] max-w-2xl mx-auto font-light leading-relaxed">
            AGLETRAS decodes external cyber risk, counterparty networks, and adversary footprints into evidence-backed intelligence.
          </p>

          {/* Two Clear Calls to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_20px_rgba(47,168,133,0.25)] hover:shadow-[0_6px_28px_rgba(47,168,133,0.4)]"
            >
              <span>Discuss an Engagement</span>
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href="/methodology"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/70 hover:bg-[#073B32] border border-[#B7E4D5]/30 hover:border-[#B7E4D5]/60 transition-all"
            >
              <span>Explore Methodology</span>
              <ArrowRight size={16} className="text-[#B7E4D5]" />
            </Link>
          </div>
        </div>

        {/* The 3D Visualization Centerpiece */}
        <div className="w-full relative">
          <CinematicIntelligenceWorld />
        </div>
      </div>
    </section>
  );
}
