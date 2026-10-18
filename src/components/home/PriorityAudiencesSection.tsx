"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  ShoppingBag, 
  Rocket, 
  Scale, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Sparkles
} from "lucide-react";

const AUDIENCES = [
  {
    priority: "01",
    title: "Small Marketing Agencies & Business Consultants",
    tagline: "Empower your pitch decks with enterprise-grade research.",
    benefit: "Benchmark client competitors, uncover undisclosed market opportunities, and back your strategic recommendations with unassailable public evidence.",
    typicalProject: "Comparative competitor audits and industry landscape dossiers for prospective agency clients.",
    icon: Building2,
    badge: "REGIONAL PRIORITY",
  },
  {
    priority: "02",
    title: "E-Commerce & Direct-to-Consumer (D2C) Brands",
    tagline: "Protect your margins and stop counterfeit copycats.",
    benefit: "Track rival pricing shifts, uncover unauthorized marketplace sellers, detect fraudulent lookalike stores, and protect your brand equity.",
    typicalProject: "Continuous brand impersonation surveillance and supplier distribution verification.",
    icon: ShoppingBag,
    badge: "GROWTH SECTOR",
  },
  {
    priority: "03",
    title: "B2B Startups & Sales Consultants",
    tagline: "Close high-value enterprise accounts with deep intelligence.",
    benefit: "Map executive hierarchies, verify prospective client budgets, and conduct thorough due diligence on angel investors and strategic partners.",
    typicalProject: "Account intelligence dossiers and investor background due diligence.",
    icon: Rocket,
    badge: "ENTERPRISE PIPELINE",
  },
  {
    priority: "04",
    title: "Boutique Law Firms & Legal Counsel",
    tagline: "Lawful, defensible open-source fact-finding.",
    benefit: "Support litigation, commercial arbitration, and transaction due diligence with structured evidence dossiers traceable to primary public sources.",
    typicalProject: "Entity relationship mapping, public court record audits, and asset footprint analysis.",
    icon: Scale,
    badge: "EVIDENTIARY RIGOR",
  },
  {
    priority: "05",
    title: "Threat Intelligence & Security Teams",
    tagline: "Extend your external visibility without adding headcount.",
    benefit: "Augment internal security operations with passive digital attack-surface discovery, lookalike domain tracking, and threat actor infrastructure telemetry.",
    typicalProject: "External digital footprint audits and adversary campaign monitoring.",
    icon: ShieldCheck,
    badge: "SPECIALIZED DEFENSE",
  },
];

export function PriorityAudiencesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#030d0a] text-[#f4f2ea] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-[#2fa885]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073b32]/80 border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>SECTION 06 // CLIENT SEGMENTS & REGIONAL PRIORITY</span>
          </div>

          <h2 className="text-editorial-title text-[#f4f2ea]">
            Built for Decision-Makers{" "}
            <span className="italic font-normal text-[#34d399]">
              Across Industries.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#cbd5d1] font-light leading-relaxed">
            You do not need cybersecurity expertise to benefit from Agletras research.
            We tailor our investigations to the specific commercial realities of five key client categories.
          </p>
        </div>

        {/* 5 Audiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((aud) => {
            const Icon = aud.icon;

            return (
              <div
                key={aud.priority}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#06241c] via-[#041a15] to-[#03130f] border border-[#34d399]/25 hover:border-[#34d399]/60 transition-all duration-300 shadow-[0_12px_40px_rgba(2,15,11,0.6)] flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/40 flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono text-[#34d399] px-2.5 py-0.5 rounded-full bg-[#34d399]/15 border border-[#34d399]/30">
                      {aud.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#8da99e]">
                      <span>PRIORITY // {aud.priority}</span>
                    </div>
                    <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea] leading-snug">
                      {aud.title}
                    </h3>
                    <p className="text-xs font-medium text-[#b7e4d5]">
                      {aud.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#cbd5d1] leading-relaxed font-light">
                    {aud.benefit}
                  </p>

                  <div className="pt-2 border-t border-[#34d399]/15 text-[11px] font-mono text-[#8da99e]">
                    <span className="text-[#34d399] block mb-0.5">Typical Deliverable:</span>
                    <span>{aud.typicalProject}</span>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#34d399]/15">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#34d399] hover:text-[#b7e4d5] transition-colors"
                  >
                    <span>Discuss Requirements</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Special 6th Card: Regional Anchor Module (Nashik First, Mumbai, Pune) */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#073b32] via-[#052923] to-[#041f1b] border-2 border-[#34d399]/50 shadow-[0_16px_50px_rgba(52,211,153,0.15)] flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#34d399] flex items-center justify-center text-[#041f1b]">
                  <MapPin size={24} />
                </div>
                <span className="text-xs font-mono text-[#041f1b] px-3 py-1 rounded-full bg-[#34d399] font-bold">
                  REGIONAL ANCHOR
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#b7e4d5] font-semibold">
                  Geographic Focus
                </span>
                <h3 className="text-2xl font-editorial font-bold text-[#f4f2ea] leading-tight">
                  Nashik First. Expanding to Mumbai & Pune.
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#cbd5d1] font-light leading-relaxed">
                Agletras was incorporated in Nashik, Maharashtra under Government of India MSME registration.
                We provide local and regional business owners, agencies, and manufacturers with intelligence capabilities that were previously accessible only to multinational corporations.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#34d399]">
                  <span>•</span>
                  <span>Nashik: Primary Operational Base & Local Industry Advisory</span>
                </div>
                <div className="flex items-center gap-2 text-[#b7e4d5]">
                  <span>•</span>
                  <span>Mumbai & Pune: Commercial, Agency & Tech Startup Hubs</span>
                </div>
                <div className="flex items-center gap-2 text-[#8da99e]">
                  <span>•</span>
                  <span>Global: Digital Intelligence Across Any Lawful Jurisdiction</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#34d399]/25">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#f4f2ea] hover:text-[#34d399] transition-colors"
              >
                <span>Read About Our Nashik Foundation</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
