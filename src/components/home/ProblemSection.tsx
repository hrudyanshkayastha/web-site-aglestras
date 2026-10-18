"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building2
} from "lucide-react";

interface ProblemItem {
  id: string;
  icon: React.ElementType;
  title: string;
  categoryBadge: string;
  theRisk: string;
  whatWeInvestigate: string;
  theOutcome: string;
  realWorldScenario: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: "competitors",
    icon: TrendingUp,
    categoryBadge: "MARKET POSITIONING",
    title: "Uncertainty About Competitors",
    theRisk: "Competitors shift pricing, launch stealth services, or aggressively target your key accounts while your commercial team is operating in the dark.",
    whatWeInvestigate: "Public archived websites, digital advertising footprints, regional pricing filings, open job postings, supplier listings, and press releases.",
    theOutcome: "Objective strategic visibility into competitor moves, pricing tiers, and service gaps so you can out-position them with confidence.",
    realWorldScenario: "An e-commerce brand discovered a competitor was preparing a 30% discount assault during festive season by analyzing unlisted supplier shipments.",
  },
  {
    id: "verification",
    icon: Search,
    categoryBadge: "COUNTERPARTY RISK",
    title: "Difficulty Verifying Information",
    theRisk: "Prospective partners, suppliers, or executive hires present embellished resumes, unverified financial track records, or concealed corporate conflicts.",
    whatWeInvestigate: "Statutory corporate registries, directorship history, court judgment archives, public regulatory disclosures, and verified employment timelines.",
    theOutcome: "Independent factual verification before you sign contracts, transfer funds, or grant operational authority.",
    realWorldScenario: "A boutique legal firm uncovered that a prospective joint-venture partner had three undisclosed dissolved entities facing public default proceedings.",
  },
  {
    id: "impersonation",
    icon: AlertTriangle,
    categoryBadge: "BRAND INTEGRITY",
    title: "Suspicious Impersonation & Scams",
    theRisk: "Fraudulent copycats register lookalike domains, clone your social profiles, or run fake recruitment ads that deceive customers and damage your reputation.",
    whatWeInvestigate: "Newly registered typosquat domains, SSL/TLS certificate transparency logs, cloned social media handles, and phishing email server records.",
    theOutcome: "A forensic evidence package with hosting IP metadata ready for immediate registrar takedowns, cease-and-desist notices, and customer alerts.",
    realWorldScenario: "A regional consumer brand detected 4 spoofed Telegram and WhatsApp customer support handles defrauding customers within 48 hours of launch.",
  },
  {
    id: "exposure",
    icon: ShieldAlert,
    categoryBadge: "DIGITAL ATTACK SURFACE",
    title: "Incomplete Visibility into Digital Exposure",
    theRisk: "Forgotten staging subdomains, exposed test servers, and accidental credential leaks sit open on the public web without your team's knowledge.",
    whatWeInvestigate: "Passive DNS history, open port telemetry, SSL certificate expiration maps, and public code repository leaks without invasive penetration attacks.",
    theOutcome: "A prioritized list of exposed exterior endpoints and concrete remediation steps before adversaries exploit them.",
    realWorldScenario: "A B2B software startup was alerted to an unauthenticated staging database containing mock client data left exposed on an obscure subdomain.",
  },
];

export function ProblemSection() {
  const [activeTab, setActiveTab] = useState<string>("competitors");

  const activeProblem = PROBLEMS.find((p) => p.id === activeTab) || PROBLEMS[0];

  return (
    <section className="py-24 md:py-32 bg-[#041410] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#2fa885]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073b32]/80 border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>SECTION 02 // THE BUSINESS PROBLEM</span>
          </div>

          <h2 className="text-editorial-title text-[#f4f2ea]">
            Uncertainty Is{" "}
            <span className="italic font-normal text-[#34d399]">
              Expensive.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#cbd5d1] font-light leading-relaxed">
            Most business decisions are made using incomplete information, marketing claims, or rumors.
            When evidence is missing, companies face hidden operational, legal, and financial exposure.
          </p>
        </div>

        {/* 4 Interactive Problem Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROBLEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#073b32] border-[#34d399] shadow-[0_8px_30px_rgba(52,211,153,0.2)] -translate-y-1"
                    : "bg-[#031714]/80 border-[#34d399]/20 hover:border-[#34d399]/50 hover:bg-[#073b32]/50"
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#34d399]" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-[#34d399] text-[#041f1b]" : "bg-[#04241d] text-[#34d399] group-hover:bg-[#2fa885]/30"
                  }`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-[#8da99e]">
                    {item.categoryBadge}
                  </span>
                </div>

                <h3 className="font-editorial text-lg font-semibold text-[#f4f2ea] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#a1b8b0] line-clamp-2 leading-relaxed">
                  {item.theRisk}
                </p>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Storytelling Module for Active Problem */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#06241c] via-[#041a15] to-[#031511] border border-[#34d399]/30 shadow-[0_20px_50px_rgba(2,15,11,0.7)] relative overflow-hidden">
          {/* Subtle grid accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_70%_20%,rgba(52,211,153,0.1)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: The Challenge & The Agletras Investigation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399]">
                <span>ANALYSIS PROTOCOL</span>
                <span>//</span>
                <span>{activeProblem.categoryBadge}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-editorial font-semibold text-[#f4f2ea]">
                {activeProblem.title}
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#031511]/90 border border-red-500/20">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-400 mb-1">
                    <XCircle size={14} />
                    <span>The Unchecked Business Risk</span>
                  </div>
                  <p className="text-sm text-[#e2ece8] font-light leading-relaxed">
                    {activeProblem.theRisk}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#073b32]/60 border border-[#34d399]/30">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#34d399] mb-1">
                    <CheckCircle2 size={14} />
                    <span>What Agletras Investigates</span>
                  </div>
                  <p className="text-sm text-[#cbd5d1] font-light leading-relaxed">
                    {activeProblem.whatWeInvestigate}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8da99e] block mb-1">
                  Deliverable Outcome For Your Business:
                </span>
                <p className="text-sm text-[#b7e4d5] font-medium leading-relaxed">
                  {activeProblem.theOutcome}
                </p>
              </div>
            </div>

            {/* Right: Concrete Real-World Vignette Card */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-[#03110e]/95 border border-[#34d399]/25 space-y-5">
              <div className="flex items-center justify-between border-b border-[#34d399]/15 pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#34d399] font-semibold">
                  Illustrative Case Finding
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#34d399]/15 text-[#34d399]">
                  ● VERIFIED
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8da99e] block">
                  Scenario Overview:
                </span>
                <p className="text-xs sm:text-sm text-[#f4f2ea] font-sans leading-relaxed">
                  &ldquo;{activeProblem.realWorldScenario}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#041f1b] border border-[#34d399]/20 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#8da99e]">
                  <span>Evidence Type:</span>
                  <span className="text-[#f4f2ea]">Multi-Source Corroborated</span>
                </div>
                <div className="flex justify-between text-[#8da99e]">
                  <span>Turnaround Scope:</span>
                  <span className="text-[#34d399]">Standard Agreed Engagement</span>
                </div>
                <div className="flex justify-between text-[#8da99e]">
                  <span>Legal Status:</span>
                  <span className="text-[#b7e4d5]">100% Lawful Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
