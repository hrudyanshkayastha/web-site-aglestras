"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Scale, 
  FileCheck, 
  AlertCircle, 
  ArrowRight,
  EyeOff,
  CheckCircle2
} from "lucide-react";

const ETHICAL_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Lawful Open-Source Intelligence",
    description: "Every inquiry strictly analyzes publicly observable information, official registers, and indexed digital archives. We never engage in unauthorized network intrusion, exploit execution, malware deployment, or password cracking.",
  },
  {
    icon: Scale,
    title: "Explicit Client Authorization",
    description: "We only conduct external perimeter discovery and recruitment verification under mutual written authorization and clearly defined boundaries. Unofficial or unauthorized targeting is categorically declined.",
  },
  {
    icon: FileCheck,
    title: "Transparent Epistemic Confidence",
    description: "We separate confirmed factual evidence from working indicators, inferences, and knowledge gaps using a formal 5-tier attribution taxonomy. We never report speculation or unverified rumors as established facts.",
  },
  {
    icon: EyeOff,
    title: "Zero Fabricated Proof or Hype",
    description: "Agletras does not publish fake customer logos, invent vanity statistics, or make unrealistic turnaround guarantees. Our reputation is built on repeatable analytical rigor and verifiable primary source citations.",
  },
];

export function TrustAndEthicsSection() {
  return (
    <section id="ethics" className="py-24 md:py-32 bg-[#041410] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[450px] bg-[#2fa885]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073b32]/80 border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>SECTION 07 // TRUST & RESPONSIBLE RESEARCH</span>
          </div>

          <h2 className="text-editorial-title text-[#f4f2ea]">
            Responsible Intelligence.{" "}
            <span className="italic font-normal text-[#34d399]">
              Uncompromising Ethics.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#cbd5d1] font-light leading-relaxed">
            Research must be lawful, verifiable, and respectful of privacy boundaries.
            Agletras operates under a strict ethical charter ensuring every finding is legally defensible and methodologically sound.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ETHICAL_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#06241c] via-[#041a15] to-[#03130f] border border-[#34d399]/25 hover:border-[#34d399]/50 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/40 flex items-center justify-center text-[#34d399]">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#cbd5d1] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Prohibited Activities Notice Box */}
        <div className="p-8 rounded-3xl bg-[#03110e]/95 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <AlertCircle size={16} />
              <span>Explicit Non-Negotiable Boundaries</span>
            </div>
            <p className="text-xs sm:text-sm text-[#cbd5d1] font-light leading-relaxed">
              Agletras does NOT conduct illicit surveillance, personal harassment, private account credential cracking, invasive malware operations, or bypass of technical security controls. All scopes violating our charter are refused without exception.
            </p>
          </div>

          <Link
            href="/terms"
            className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-[#041f1b] bg-[#34d399] hover:bg-[#b7e4d5] transition-all font-semibold shrink-0"
          >
            Review Complete Charter
          </Link>
        </div>
      </div>
    </section>
  );
}
