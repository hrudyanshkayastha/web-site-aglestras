"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Compass,
  Database,
  CheckCircle2,
  Network,
  ShieldCheck,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { sampleBriefData } from "@/data/methodology";

const methodologySteps = [
  {
    step: "01",
    label: "Define",
    icon: Compass,
    title: "Question & Scope Definition",
    summary: "Establish precise research objectives, jurisdictional boundaries, and approved public data sources.",
  },
  {
    step: "02",
    label: "Collect",
    icon: Database,
    title: "Permitted Open Harvesting",
    summary: "Lawful extraction across public registries, certificate transparency logs, DNS telemetry, and corporate filings.",
  },
  {
    step: "03",
    label: "Verify",
    icon: CheckCircle2,
    title: "Evidence Filtering & Provenance",
    summary: "Assess reliability, corroborate findings, and validate source authenticity while separating facts from noise.",
  },
  {
    step: "04",
    label: "Correlate",
    icon: Network,
    title: "Relational Topology Mapping",
    summary: "Connecting lookalike domains, staging hosts, corporate directorships, and nominee entities into structural networks.",
  },
  {
    step: "05",
    label: "Analyze",
    icon: ShieldCheck,
    title: "5-Tier Epistemic Evaluation",
    summary: "Deterministic grading separating verified facts from indicators, inferences, working assumptions, and open gaps.",
  },
  {
    step: "06",
    label: "Deliver",
    icon: FileText,
    title: "Decision-Ready Intelligence",
    summary: "Present findings, source references, confidence assessments, limitations, and next steps in an organized deliverable.",
  },
];

interface MethodologyOverlayProps {
  activeStage?: number;
  onSelectStage?: (stage: number) => void;
}

const stageDetails: Record<string, { inputs: string; verificationFilter: string; deliverableArtifact: string }> = {
  "01": {
    inputs: "Client research requirement, target entities, registered domains, statutory compliance limits.",
    verificationFilter: "Lawful boundaries review: confirm 100% public access, non-intrusive scope, and authorized research parameters.",
    deliverableArtifact: "Approved Research Protocol & Jurisdictional Boundary Charter.",
  },
  "02": {
    inputs: "Commercial registries, Certificate Transparency (RFC 6962), Passive DNS telemetry, official gazettes.",
    verificationFilter: "Cryptographic hash verification, canonical timestamp logging, and multi-sensor corroboration.",
    deliverableArtifact: "Raw Ingestion Ledger with cryptographic SHA-256 chain of custody.",
  },
  "03": {
    inputs: "Primary records, cross-source registrar filings, director appointment notices, public databases.",
    verificationFilter: "Adversarial noise removal: discard unverified hearsay, dead staging hosts, and deceptive artifacts.",
    deliverableArtifact: "Attributed Evidence Repository (Fact vs Hypothesis classified).",
  },
  "04": {
    inputs: "Entity linkages: lookalike domain clusters, shared MX hosts, common beneficial ownership filings.",
    verificationFilter: "Multi-hop graph traversal, cross-jurisdiction resolution, and nominee director identification.",
    deliverableArtifact: "Interactive 3D Entity Network Topology & Relational Cluster Map.",
  },
  "05": {
    inputs: "Correlated relational graph, verified primary evidence, timeline intervals, confidence metrics.",
    verificationFilter: "5-Tier Epistemic Evaluation: Deterministic Facts, Corroborated Indicators, Inferences, Working Leads, Unknowns.",
    deliverableArtifact: "Epistemic Confidence Scorecard & Analytical Risk Assessment.",
  },
  "06": {
    inputs: "Final analyzed findings, high-resolution topology visual, limitation disclosures, strategic advisory.",
    verificationFilter: "Peer-review audit by Senior Intelligence Analyst; non-destructive recommendations review.",
    deliverableArtifact: "Executive Intelligence Briefing, Machine-Readable STIX/JSON Export, Actionable Risk Advisory.",
  },
};

export function MethodologyOverlay({
  activeStage: propStage,
  onSelectStage: setPropStage,
}: MethodologyOverlayProps) {
  const [internalStage, setInternalStage] = useState<number>(1);
  const currentStage = propStage !== undefined ? propStage : internalStage;

  const handleSelect = (stageNum: number) => {
    setInternalStage(stageNum);
    if (setPropStage) setPropStage(stageNum);
  };

  const handlePrevStage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = currentStage <= 1 ? 6 : currentStage - 1;
    handleSelect(prev);
  };

  const handleNextStage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = currentStage >= 6 ? 1 : currentStage + 1;
    handleSelect(next);
  };

  const activeStepKey = `0${currentStage}`;
  const activeStep = methodologySteps.find((s) => s.step === activeStepKey) || methodologySteps[0];
  const activeDetail = stageDetails[activeStepKey] || stageDetails["01"];
  const ActiveIcon = activeStep.icon;

  return (
    <section
      id="destination-methodology"
      className="min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-28 pb-32 relative z-20 pointer-events-none"
    >
      {/* Top Floating Methodology Header HUD */}
      <div className="w-full max-w-3xl mx-auto pointer-events-auto space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
          <span>Destination 03 // 6-Stage Epistemic Conduit</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA] drop-shadow-[0_4px_20px_rgba(2,15,12,0.9)]">
          Define → Collect → Verify → Correlate → Analyze → Deliver
        </h2>

        <p className="text-xs sm:text-sm text-[#C5D9D2] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(2,15,12,0.9)]">
          Intelligence without provenance is conjecture. Select any checkpoint along the illuminated conduit below to inspect its data inputs, verification filters, and deliverables.
        </p>

        {/* Floating 6-Stage Conduit Stepper Dock */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-2 overflow-x-auto no-scrollbar">
          {methodologySteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isSelected = stepNum === currentStage;
            const isPast = stepNum < currentStage;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => handleSelect(stepNum)}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md shrink-0 ${
                  isSelected
                    ? "bg-[#2FA885] text-[#041F1B] border border-[#2FA885] font-semibold shadow-[0_0_24px_rgba(47,168,133,0.45)] -translate-y-0.5"
                    : isPast
                    ? "bg-[#041F1B]/90 text-[#B7E4D5] border border-[#B7E4D5]/30 hover:border-[#2FA885]/70"
                    : "bg-[#031714]/80 text-[#718E84] border border-[#B7E4D5]/15 hover:text-[#C5D9D2]"
                }`}
                title={`Traverse to Portal 0${stepNum}: ${step.label}`}
              >
                <span className={`text-[10px] font-bold ${isSelected ? "text-[#041F1B]" : isPast ? "text-[#2FA885]" : "text-[#718E84]"}`}>
                  {step.step}
                </span>
                <span className="font-medium tracking-tight">{step.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#041F1B] animate-ping" />
                )}
              </button>
            );
          })}

          <Link
            href="/methodology"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono text-[#B7E4D5] hover:text-[#FFFFFF] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/30 transition-all cursor-pointer backdrop-blur-md shadow-md shrink-0"
            title="Explore our full 5-tier epistemic attribution framework"
          >
            <span>5 Tiers</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Center 3D Conduit Space is Wide Open! */}
      {/* Floating Active Stage Inspector Panel (Scoped strictly to Destination 03) */}
      <AnimatePresence mode="wait">
        <motion.aside
          key={activeStep.step}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:absolute lg:right-8 lg:top-32 w-full lg:w-[480px] max-w-full z-20 overflow-y-auto max-h-[75vh] p-5 sm:p-6 rounded-3xl bg-[#031714]/92 border border-[#2FA885]/60 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] pointer-events-auto space-y-4 my-6 lg:my-0"
          aria-label={`Methodology Stage ${activeStep.step} Briefing`}
        >
          {/* Top Bar: Stage index, title, portal active indicator */}
          <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#073B32] border border-[#2FA885]/50 flex items-center justify-center text-[#2FA885]">
                <ActiveIcon size={16} />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                  Stage {activeStep.step} Architecture // Checkpoint 0{currentStage}/06
                </span>
                <span className="text-[11px] font-mono text-[#8DA99E]">
                  3D Portal {activeStep.step} Active & Locked
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#2FA885]/30">
              Conduit Arch {activeStep.step}
            </span>
          </div>

          {/* Title & Stage Summary */}
          <div>
            <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] mb-1">
              {activeStep.label}: {activeStep.title}
            </h3>
            <p className="text-xs text-[#B7E4D5] font-light leading-relaxed">
              {activeStep.summary}
            </p>
          </div>

          {/* 3 Structured Verification Steps */}
          <div className="space-y-2.5 text-xs">
            {/* 01. Lawful Data Inputs */}
            <div className="p-3.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                01. Lawful Data Inputs:
              </span>
              <p className="text-[#C5D9D2] text-[11px] leading-relaxed font-light">
                {activeDetail.inputs}
              </p>
            </div>

            {/* 02. Epistemic Verification Filter */}
            <div className="p-3.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
                02. Epistemic Verification Filter:
              </span>
              <p className="text-[#D8E8E2] text-[11px] leading-relaxed font-light">
                {activeDetail.verificationFilter}
              </p>
            </div>

            {/* 03. Verified Output Artifact */}
            <div className="p-3.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                03. Verified Output Artifact:
              </span>
              <p className="text-[#F4F2EA] text-[11px] leading-relaxed font-light">
                {activeDetail.deliverableArtifact}
              </p>
            </div>
          </div>

          {/* Stepper Tour Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#B7E4D5]/15 text-xs font-mono">
            <button
              type="button"
              onClick={handlePrevStage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Prev Portal</span>
            </button>

            <span className="text-[11px] text-[#8DA99E]">
              Portal {currentStage} / 06
            </span>

            <button
              type="button"
              onClick={handleNextStage}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
            >
              <span>Next Portal</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Action Link: Illustrative Dossier */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <Link
              href="/services/external-threat-intelligence"
              className="w-full flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/30 transition-all font-medium text-center"
            >
              <span>View Sample Dossier</span>
              <ArrowRight size={13} className="text-[#2FA885]" />
            </Link>

            <Link
              href="/methodology"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] font-semibold transition-all shadow-md text-center"
            >
              <span>5 Epistemic Tiers</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Floating Bottom Prompt */}
      <div className="w-full max-w-lg mx-auto pointer-events-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] backdrop-blur-md shadow-lg">
          <Sparkles size={13} className="text-[#2FA885]" />
          <span>Walk the 3D conduit above or navigate portals to trace verification provenance.</span>
        </div>
      </div>
    </section>
  );
}
