"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface EntranceOverlayProps {
  onExploreServices: () => void;
  onExploreMethodology: () => void;
}

export function EntranceOverlay({
  onExploreServices,
}: EntranceOverlayProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", motionHandler);
    return () => motionQuery.removeEventListener("change", motionHandler);
  }, []);

  return (
    <section
      id="destination-entrance"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-28 pb-32 text-center relative z-20 pointer-events-none overflow-hidden"
    >
      {/* Cinematic Full-Viewport Neural-Network Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {!isReducedMotion && !videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            poster="/images/emerald_landscape_reference.png"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.72] contrast-[1.18] transition-opacity duration-1000"
            aria-hidden="true"
          >
            <source src="/videos/agletras_neural_network_video_cropped.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src="/images/emerald_landscape_reference.png"
              alt="Agletras Cinematic Neural Sanctuary Reference"
              fill
              priority
              className="object-cover object-center filter brightness-[0.68] contrast-[1.12]"
            />
          </div>
        )}

        {/* Deep Atmospheric Gradient Overlays for Guaranteed Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041F1B] via-[#041F1B]/50 to-[#020F0C]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,15,12,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[#041F1B]/30 mix-blend-multiply" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-7 pointer-events-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#031714]/94 via-[#031714]/90 to-[#031714]/86 border border-[#B7E4D5]/25 backdrop-blur-2xl shadow-2xl">
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

        {/* Exact Verified Supporting Copy */}
        <p className="text-lg md:text-xl text-[#C5D9D2] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Agletras transforms publicly available information into structured research, actionable intelligence, and decision support.
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
