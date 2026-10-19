"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileQuestion, 
  Database, 
  CheckCircle2, 
  Network, 
  FileCheck2, 
  ArrowRight,
  Shield,
  Eye,
  Activity,
  Sparkles,
  Search,
  Check
} from "lucide-react";

interface ApproachStage {
  id: string;
  step: string;
  code: string;
  title: string;
  questionAddressed: string;
  description: string;
  keyOutputs: string[];
  telemetry: {
    sourceType: string;
    certainty: string;
    protocol: string;
  };
  icon: React.ElementType;
}

const APPROACH_STAGES: ApproachStage[] = [
  {
    id: "question",
    step: "01",
    code: "STAGE 01 // QUESTION",
    title: "Define the Business Question",
    questionAddressed: "What specific risk or strategic gap are you trying to resolve?",
    description: "Every engagement begins with an exact commercial or risk question. We isolate the target entities, jurisdictions, and boundaries before any research commences.",
    keyOutputs: [
      "Target entity perimeter specification",
      "Lawful open-source scope boundary definition",
      "Explicit written client authorization mandate"
    ],
    telemetry: {
      sourceType: "Client Authorization Mandate",
      certainty: "100% Defined Scope",
      protocol: "SEC-SCOPE-2026",
    },
    icon: FileQuestion,
  },
  {
    id: "harvesting",
    step: "02",
    code: "STAGE 02 // HARVESTING",
    title: "Systematic Multi-Source Gathering",
    questionAddressed: "What publicly observable footprint exists across open records?",
    description: "Our researchers harvest verifiable data across statutory corporate registers, passive DNS telemetry, certificate transparency logs, archived web pages, and public regulatory records.",
    keyOutputs: [
      "Statutory business registries & gazettes",
      "Passive DNS telemetry & SSL transparency",
      "Historical web archives & public tender records"
    ],
    telemetry: {
      sourceType: "Public Corporate & Network Registers",
      certainty: "Multi-Source Cross-Check",
      protocol: "OSINT-INGEST-V4",
    },
    icon: Database,
  },
  {
    id: "verification",
    step: "03",
    code: "STAGE 03 // VERIFICATION",
    title: "Fact Triangulation & Provenance",
    questionAddressed: "Is this claim verifiable across independent, corroborating sources?",
    description: "Data is not intelligence until verified. We test every finding for source independence, eliminating rumors, marketing claims, and circular reporting through our 5-Tier Epistemic Taxonomy.",
    keyOutputs: [
      "Corroboration across independent primary sources",
      "Classification under Agletras 5-Tier Epistemic Matrix",
      "Elimination of single-source hearsay & marketing noise"
    ],
    telemetry: {
      sourceType: "Cryptographic Provenance Triangulation",
      certainty: "A1 Confirmed Fact Standard",
      protocol: "EPISTEMIC-TRIAD-A1",
    },
    icon: CheckCircle2,
  },
  {
    id: "correlation",
    step: "04",
    code: "STAGE 04 // CORRELATION",
    title: "Relationship Mapping & Synthesis",
    questionAddressed: "What hidden connections, directorships, or shared assets link these entities?",
    description: "We connect disparate data points: shared corporate directorships, common hosting infrastructure, undisclosed subsidiaries, and competitor moves to assemble the complete puzzle.",
    keyOutputs: [
      "Corporate officer cross-holding & director networks",
      "Digital infrastructure linkages (nameservers, subnets)",
      "Strategic milestone & timeline reconstruction"
    ],
    telemetry: {
      sourceType: "Relational Entity Graph Engine",
      certainty: "Correlated Evidence Cluster",
      protocol: "GRAPH-REL-SYNC",
    },
    icon: Network,
  },
  {
    id: "deliverable",
    step: "05",
    code: "STAGE 05 // ACTIONABLE FINDINGS",
    title: "Decision-Ready Intelligence Brief",
    questionAddressed: "What concrete business action should you take based on verified evidence?",
    description: "You receive an executive intelligence report written in plain, non-technical business language, complete with an executive summary, evidence exhibits, and clear strategic implications.",
    keyOutputs: [
      "Executive summary for decision-makers",
      "Traceable evidence exhibits with origin timestamps",
      "Actionable recommendations & risk mitigation roadmap"
    ],
    telemetry: {
      sourceType: "Executive Intelligence Dossier",
      certainty: "Decision-Ready Verdict",
      protocol: "BRIEF-DELIVERY-FINAL",
    },
    icon: FileCheck2,
  },
];

export function ApproachVisualSection() {
  const [activeStageId, setActiveStageId] = useState<string>("verification");
  const activeStage = APPROACH_STAGES.find((s) => s.id === activeStageId) || APPROACH_STAGES[2];
  const activeIndex = APPROACH_STAGES.findIndex((s) => s.id === activeStageId);

  return (
    <section className="py-24 md:py-32 bg-[#020b08] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[450px] bg-[#2fa885]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#34d399]/15 pb-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073b32]/90 border border-[#34d399]/30 text-xs font-mono text-[#34d399] tracking-wider shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span>SECTION 03 // THE AGLETRAS APPROACH</span>
            </div>

            <h2 className="text-editorial-hero text-[#f4f2ea] tracking-tight">
              From Raw Data to{" "}
              <span className="italic font-normal text-[#34d399]">
                Actionable Truth.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#cbd5d1] font-light leading-relaxed">
              Agletras defines the question, identifies relevant lawful sources, collects information, checks evidence, compares findings, and prepares a structured report for clear, defensible business decisions.
            </p>
          </div>

          <Link
            href="/methodology"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#073b32]/80 hover:bg-[#073b32] border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5] hover:text-[#f4f2ea] transition-all shrink-0 group self-start md:self-auto"
          >
            <span>Full 8-Step Research Methodology</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#34d399]" />
          </Link>
        </div>

        {/* Interactive Visual Progression Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive 5-Stage Stepper (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="text-xs font-mono text-[#8da99e] uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Interactive Progression Workflow:</span>
              <span className="text-[#34d399]">Select a Stage ({activeIndex + 1}/5)</span>
            </div>

            {APPROACH_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = stage.id === activeStageId;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 relative border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#073b32] to-[#04241d] border-[#34d399] shadow-[0_0_25px_rgba(52,211,153,0.18)]"
                      : "bg-[#041a14]/60 hover:bg-[#073b32]/40 border-[#34d399]/15 hover:border-[#34d399]/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold transition-colors ${
                          isSelected
                            ? "bg-[#34d399] text-[#020b08]"
                            : isPassed
                            ? "bg-[#073b32] text-[#34d399] border border-[#34d399]/30"
                            : "bg-[#020b08] text-[#8da99e] border border-white/10"
                        }`}
                      >
                        {stage.step}
                      </div>

                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-[#34d399]/90 font-medium">
                          {stage.code}
                        </div>
                        <div className="text-sm font-editorial font-semibold text-[#f4f2ea]">
                          {stage.title}
                        </div>
                      </div>
                    </div>

                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isSelected ? "text-[#34d399]" : "text-[#8da99e]/60"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Inspector & Animated Telemetry Canvas (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#062920] via-[#041d17] to-[#02100c] border border-[#34d399]/30 p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Retro Corner Visual Accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#34d399]/50" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#34d399]/50" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#34d399]/50" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#34d399]/50" />

            {/* Stage Telemetry Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#34d399]/20 pb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#34d399] font-semibold">
                  {activeStage.code}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#b7e4d5] bg-[#020b08]/80 px-3 py-1 rounded-full border border-[#34d399]/20">
                <Activity size={12} className="text-[#34d399]" />
                <span>PROTOCOL: {activeStage.telemetry.protocol}</span>
              </div>
            </div>

            {/* Stage Content & Dynamic Inspector */}
            <div className="my-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#f4f2ea]">
                  {activeStage.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#34d399] italic">
                  &ldquo;{activeStage.questionAddressed}&rdquo;
                </p>
                <p className="text-sm sm:text-base text-[#cbd5d1] font-light leading-relaxed pt-2">
                  {activeStage.description}
                </p>
              </div>

              {/* Visual Process Diagram Graphic */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#020b08]/90 border border-[#34d399]/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#8da99e]">
                  <span className="uppercase tracking-wider">Verified Stage Deliverables:</span>
                  <span className="text-[#34d399] flex items-center gap-1">
                    <Shield size={12} /> {activeStage.telemetry.certainty}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {activeStage.keyOutputs.map((output, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f4f2ea]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] mt-1.5 shrink-0" />
                      <span className="font-light">{output}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Telemetry Footprint */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#073b32]/40 border border-[#34d399]/15 space-y-1">
                  <span className="text-[10px] uppercase text-[#8da99e] block">Source Verification</span>
                  <span className="text-[#b7e4d5] font-semibold text-xs truncate block">
                    {activeStage.telemetry.sourceType}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#073b32]/40 border border-[#34d399]/15 space-y-1">
                  <span className="text-[10px] uppercase text-[#8da99e] block">Confidence Standard</span>
                  <span className="text-[#34d399] font-semibold text-xs truncate block">
                    {activeStage.telemetry.certainty}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Navigation Strip */}
            <div className="flex items-center justify-between pt-4 border-t border-[#34d399]/20 text-xs font-mono text-[#8da99e]">
              <span>Next Stage Progression</span>
              <button
                onClick={() => {
                  const nextIdx = (activeIndex + 1) % APPROACH_STAGES.length;
                  setActiveStageId(APPROACH_STAGES[nextIdx].id);
                }}
                className="inline-flex items-center gap-1 text-[#34d399] hover:text-[#f4f2ea] font-semibold transition-colors cursor-pointer"
              >
                <span>Advance to Step {(activeIndex + 1) % APPROACH_STAGES.length + 1}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
