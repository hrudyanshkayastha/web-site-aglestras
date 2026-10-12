"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface EntranceOverlayProps {
  onExploreServices: () => void;
  onExploreMethodology: () => void;
}

export function EntranceOverlay({
  onExploreServices,
  onExploreMethodology,
}: EntranceOverlayProps) {
  return (
    <section
      id="destination-entrance"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-28 pb-32 text-center relative z-20 pointer-events-none"
    >
      <div className="max-w-3xl mx-auto space-y-7 pointer-events-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/94 via-[#031714]/90 to-[#031714]/86 border border-[#B7E4D5]/20 backdrop-blur-xl shadow-2xl">
        {/* Eyebrow Brand Badge with Unaltered Authentic Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#073B32]/90 border border-[#B7E4D5]/35 shadow-lg backdrop-blur-md">
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

        {/* Restrained Category Label */}
        <div className="text-xs uppercase tracking-[0.25em] font-mono text-[#8DA99E]">
          OSINT · RESEARCH · AUTOMATION · CYBER INTELLIGENCE
        </div>

        {/* Headline */}
        <h1 className="text-editorial-hero text-[#F4F2EA] tracking-tight drop-shadow-md">
          Intelligence From{" "}
          <span className="italic font-normal text-[#B7E4D5]">
            Open Information.
          </span>
        </h1>

        {/* Concise Verified Supporting Sentence */}
        <p className="text-lg md:text-xl text-[#C5D9D2] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Agletras builds research-driven technologies that transform publicly available information into actionable, decision-supporting intelligence.
        </p>

        {/* Two Clear Calls to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_24px_rgba(47,168,133,0.3)] hover:shadow-[0_6px_32px_rgba(47,168,133,0.45)]"
          >
            <span>Explore Agletras</span>
            <ArrowDown size={15} />
          </button>

          <Link
            href="/research"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/35 hover:border-[#B7E4D5]/65 transition-all backdrop-blur-md shadow-md"
          >
            <span>View Research</span>
            <ArrowUpRight size={15} className="text-[#B7E4D5]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
