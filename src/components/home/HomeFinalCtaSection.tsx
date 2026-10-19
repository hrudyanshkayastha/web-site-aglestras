"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Copy, 
  Check, 
  Sparkles,
  Layers,
  Clock
} from "lucide-react";

export function HomeFinalCtaSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText("contact@agletras.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Ignore copy error
    }
  };

  return (
    <section className="py-24 md:py-36 bg-gradient-to-b from-[#020d09] via-[#031713] to-[#020907] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#34d399]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10 text-center space-y-12">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073b32]/90 border border-[#34d399]/40 text-xs font-mono text-[#34d399] tracking-wider shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          <span>SECTION 07 // NEXT STEPS & ENGAGEMENT</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-editorial-hero text-[#f4f2ea] tracking-tight">
            Ready to Eliminate Business{" "}
            <span className="italic font-normal text-[#34d399]">
              Uncertainty?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#cbd5d1] font-light leading-relaxed">
            Describe the specific business question or commercial risk you need investigated. Whether you need a competitor intelligence report covering three to five rivals, independent due diligence on a prospective partner, or external exposure research, our analysts are ready to help.
          </p>
        </div>

        {/* Dual Primary Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#34d399] hover:bg-[#2fa885] text-[#020b08] font-semibold text-sm font-mono uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(52,211,153,0.35)] hover:shadow-[0_0_40px_rgba(52,211,153,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Discuss Your Research Requirement</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#073b32]/80 hover:bg-[#073b32] border border-[#34d399]/30 text-[#f4f2ea] font-medium text-sm font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:border-[#34d399]/60"
          >
            <span>Explore Our Services</span>
            <ArrowUpRight size={16} className="text-[#34d399]" />
          </Link>
        </div>

        {/* Direct Contact Reassurance Box */}
        <div className="pt-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#041a14]/80 border border-[#34d399]/25 backdrop-blur-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8da99e]">
                <Clock size={13} className="text-[#34d399]" />
                <span>Direct Confidential Scope Review</span>
              </div>
              <div className="text-sm font-medium text-[#f4f2ea]">
                Direct Confidential Inquiry Channel:
              </div>
              <div className="font-mono text-xs text-[#34d399]">
                contact@agletras.com
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#073b32] hover:bg-[#0a4d42] border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5] hover:text-[#f4f2ea] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-[#34d399]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="mailto:contact@agletras.com?subject=Research%20Scope%20Inquiry"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#34d399]/20 hover:bg-[#34d399]/30 border border-[#34d399]/50 text-xs font-mono text-[#34d399] transition-all"
              >
                <Mail size={13} />
                <span>Open Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Trust & Location Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#8da99e] pt-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#34d399]" />
            <span>Strict Mutual Confidentiality</span>
          </span>
          <span className="text-[#34d399]/30">•</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#34d399]" />
            <span>Nashik, Maharashtra, India</span>
          </span>
          <span className="text-[#34d399]/30">•</span>
          <span>100% Lawful Open-Source Intelligence</span>
        </div>
      </div>
    </section>
  );
}
