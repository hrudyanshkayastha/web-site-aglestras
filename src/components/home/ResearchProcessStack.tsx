"use client";

import React, { useRef } from "react";
import { 
  FileQuestion, 
  Database, 
  CheckCircle2, 
  Network, 
  FileCheck2, 
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from "lucide-react";
import Link from "next/link";

interface ProcessStep {
  stepNumber: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  whatHappens: string[];
  evidenceStandard: string;
  clientTakeaway: string;
  icon: React.ElementType;
  accentColor: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    code: "SCOPING & ALIGNMENT",
    title: "Define the Business Question & Agree on Scope",
    tagline: "Every investigation starts with a specific commercial or legal question.",
    description:
      "We begin by understanding your exact business objective. We agree upon defined target entities, jurisdictions, and lawful public boundaries before any research commences.",
    whatHappens: [
      "Confirm written client authorization and mutual non-disclosure scope",
      "Isolate key questions (e.g., competitor pricing, counterparty risk, brand spoofing)",
      "Establish strict legal boundaries (100% open-source, non-intrusive research)",
      "Define deliverables, evidence formats, and delivery timeline",
    ],
    evidenceStandard: "Explicit Written Scope & Authorized Mandate",
    clientTakeaway: "Clear expectations, fixed scope, and zero ambiguity on what will be researched.",
    icon: FileQuestion,
    accentColor: "#34d399",
  },
  {
    stepNumber: "02",
    code: "PUBLIC HARVESTING",
    title: "Systematic Multi-Source Gathering",
    tagline: "Comprehensive data collection across lawful public and indexed archives.",
    description:
      "Our researchers harvest open-source intelligence across statutory corporate registers, passive DNS telemetry, certificate logs, archived web pages, public filings, and code repositories.",
    whatHappens: [
      "Query statutory business registries, gazettes, and official corporate databases",
      "Inspect passive DNS history, SSL/TLS certificate transparency, and WHOIS archives",
      "Harvest public pricing lists, tenders, media reports, and litigation records",
      "Document cryptographic timestamps and raw origin sources for every asset",
    ],
    evidenceStandard: "Multi-Source Independent Ingestion",
    clientTakeaway: "A broad, structured inventory of raw evidence covering every public angle.",
    icon: Database,
    accentColor: "#2fa885",
  },
  {
    stepNumber: "03",
    code: "VERIFICATION & PROVENANCE",
    title: "Evidence Verification & Fact Triangulation",
    tagline: "Stress-testing every finding to eliminate rumors and false positives.",
    description:
      "Data is not intelligence until it is verified. We test every finding for source independence, corroboration, and authenticity, separating proven facts from inferences.",
    whatHappens: [
      "Corroborate claims across at least two independent primary public sources",
      "Apply the Agletras 5-Tier Epistemic Taxonomy (A1 Confirmed to E5 Unreliable)",
      "Eliminate single-source rumors, marketing exaggerations, and circular reporting",
      "Explicitly document investigative boundaries and unconfirmed areas",
    ],
    evidenceStandard: "Agletras 5-Tier Epistemic Confidence Matrix",
    clientTakeaway: "Confidence that findings are real, verifiable, and legally defensible.",
    icon: CheckCircle2,
    accentColor: "#a3e635",
  },
  {
    stepNumber: "04",
    code: "RELATIONSHIP CORRELATION",
    title: "Relationship Mapping & Analysis",
    tagline: "Connecting disconnected entities to reveal hidden patterns.",
    description:
      "We connect the dots between corporate directorships, affiliated shell entities, common hosting infrastructure, and competitor marketing campaigns to reveal the full picture.",
    whatHappens: [
      "Map corporate officer cross-holdings, shared addresses, and holding structures",
      "Trace digital infrastructure connections (shared nameservers, IP subnets, SSL certs)",
      "Reconstruct event timelines, commercial shifts, and strategic milestones",
      "Synthesize analytical insights into actionable commercial implications",
    ],
    evidenceStandard: "Relational Entity & Infrastructure Graphs",
    clientTakeaway: "A panoramic view of relationships and hidden connections affecting your business.",
    icon: Network,
    accentColor: "#b7e4d5",
  },
  {
    stepNumber: "05",
    code: "INTELLIGENCE BRIEF",
    title: "Documented Actionable Intelligence Report",
    tagline: "Executive clarity with verifiable evidence and clear recommendations.",
    description:
      "You receive a clear, executive-ready report designed for decision-makers. Every assertion includes source citations, confidence ratings, and practical next steps.",
    whatHappens: [
      "Executive Summary translating complex findings into business conclusions",
      "Structured Findings Tables with full evidence citations and timestamps",
      "Attributed relationship maps and forensic screenshot archives",
      "Concrete strategic or defensive recommendations prioritized by urgency",
    ],
    evidenceStandard: "Decision-Ready Intelligence Dossier",
    clientTakeaway: "An objective report you can take to the board, your legal team, or sales strategy.",
    icon: FileCheck2,
    accentColor: "#34d399",
  },
];

export function ResearchProcessStack() {
  return (
    <section id="process" className="py-24 md:py-32 bg-[#041410] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[500px] bg-[#2fa885]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073b32]/80 border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
            <span>SECTION 04 // THE RESEARCH PROCESS</span>
          </div>

          <h2 className="text-editorial-title text-[#f4f2ea]">
            From Business Question to{" "}
            <span className="italic font-normal text-[#34d399]">
              Verified Proof.
            </span>
          </h2>

          <p className="text-base md:text-lg text-[#cbd5d1] font-light leading-relaxed">
            We follow a rigorous, 5-stage research progression inspired by intelligence standards.
            Every claim is traceable to primary public sources.
          </p>
        </div>

        {/* Sticky Card Stack Container (Ethiack StepCard Mechanism) */}
        <div className="space-y-8 relative">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.stepNumber}
                style={{
                  top: `calc(90px + ${index * 24}px)`,
                  zIndex: index + 10,
                }}
                className="sticky rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#06241c] via-[#041a15] to-[#03130f] border border-[#34d399]/35 shadow-[0_16px_50px_rgba(2,15,11,0.85)] backdrop-blur-xl transition-all duration-300"
              >
                {/* Corner Pixel-Style Brackets */}
                <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-[#34d399]/40" />
                <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-[#34d399]/40" />
                <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-[#34d399]/40" />
                <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-[#34d399]/40" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number, Title, Overview */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl md:text-4xl font-editorial font-bold text-[#34d399]">
                        {step.stepNumber}
                      </span>
                      <div className="h-4 w-px bg-[#34d399]/30" />
                      <span className="text-xs font-mono uppercase tracking-widest text-[#b7e4d5] font-semibold">
                        STAGE // {step.code}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-editorial font-semibold text-[#f4f2ea] leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-sm md:text-base text-[#cbd5d1] font-light leading-relaxed">
                      {step.description}
                    </p>

                    {/* Step Execution Checklist */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#8da99e] font-semibold block">
                        What Agletras Conducts in this Stage:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.whatHappens.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#e2ece8]">
                            <CheckCircle2 size={14} className="text-[#34d399] shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Evidence Standards & Customer Value Box */}
                  <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-[#031511]/90 border border-[#34d399]/25 space-y-5">
                    <div className="flex items-center gap-3 border-b border-[#34d399]/15 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#073b32] border border-[#34d399]/40 flex items-center justify-center text-[#34d399]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#8da99e] block">
                          Quality Benchmark
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#f4f2ea]">
                          {step.evidenceStandard}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#34d399] font-semibold block">
                        The Customer Takeaway:
                      </span>
                      <p className="text-xs sm:text-sm text-[#cbd5d1] font-sans leading-relaxed">
                        {step.clientTakeaway}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#34d399]/15 flex items-center justify-between text-xs font-mono text-[#8da99e]">
                      <span>Stage Progress:</span>
                      <span className="text-[#34d399]">
                        {index + 1} of {PROCESS_STEPS.length} Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
