"use client";

import React, { useState, useEffect } from "react";
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
  RotateCcw,
  X,
  Workflow,
  Cpu,
  Shield,
} from "lucide-react";
import { intelligenceStages, IntelligenceStage } from "@/data/methodology";

const stageIconMap: Record<string, React.ElementType> = {
  "01": Compass,
  "02": Shield,
  "03": Database,
  "04": Network,
  "05": CheckCircle2,
  "06": ShieldCheck,
  "07": FileText,
  "08": ArrowUpRight,
};

interface MethodologyOverlayProps {
  activeStage?: number | null;
  onSelectStage?: (stage: number | null) => void;
}

export function MethodologyOverlay({
  activeStage: propStage,
  onSelectStage: setPropStage,
}: MethodologyOverlayProps) {
  const [internalStage, setInternalStage] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const currentStage = propStage !== undefined ? propStage : internalStage;

  const handleSelect = (stageNum: number | null) => {
    setInternalStage(stageNum);
    if (setPropStage) setPropStage(stageNum);
  };

  const handlePrevStage = () => {
    if (currentStage === null || currentStage <= 1) {
      handleSelect(intelligenceStages.length);
    } else {
      handleSelect(currentStage - 1);
    }
  };

  const handleNextStage = () => {
    if (currentStage === null || currentStage >= intelligenceStages.length) {
      handleSelect(1);
    } else {
      handleSelect(currentStage + 1);
    }
  };

  // Global Keyboard Navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevStage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextStage();
      } else if (e.key === "Escape") {
        if (currentStage !== null) {
          e.preventDefault();
          handleSelect(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStage]);

  const activeStageData = currentStage !== null
    ? intelligenceStages[currentStage - 1] || intelligenceStages[0]
    : null;

  const ActiveIcon = activeStageData ? stageIconMap[activeStageData.step] || Compass : Compass;

  return (
    <section
      id="destination-methodology"
      className="min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-28 pb-32 relative z-20 pointer-events-none"
      aria-label="Agletras 6-Stage Investigation Methodology"
    >
      {/* Top Floating Methodology Header & Stepper Dock */}
      <div className="w-full max-w-3xl mx-auto pointer-events-auto space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031714]/85 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
          <span>Destination 03 // 8-Step Epistemic Pathway</span>
        </div>

        {/* Collapsible Headline (Hides smoothly when a stage is focused to maximize 3D spatial visibility) */}
        <AnimatePresence>
          {currentStage === null && (
            <motion.div
              initial={isReducedMotion ? undefined : { opacity: 0, height: 0 }}
              animate={isReducedMotion ? undefined : { opacity: 1, height: "auto" }}
              exit={isReducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 overflow-hidden"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-editorial font-semibold text-[#F4F2EA] drop-shadow-[0_4px_20px_rgba(2,15,12,0.9)]">
                Understand → Scope → Collect → Correlate → Verify → Conclude → Report → Review
              </h2>

              <p className="text-xs sm:text-sm text-[#C5D9D2] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(2,15,12,0.9)]">
                Intelligence without provenance is conjecture. Explore our 8 connected architectural stages below. Click any monument or checkpoint to inspect its inputs, verification controls, and expected deliverables.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating 8-Stage Conduit Stepper Dock */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2" role="toolbar" aria-label="Methodology stage selector">
          {intelligenceStages.map((stage, idx) => {
            const stepNum = idx + 1;
            const isSelected = stepNum === currentStage;
            const isCompleted = currentStage !== null && stepNum < currentStage;
            const Icon = stageIconMap[stage.step] || Compass;

            return (
              <button
                key={stage.step}
                type="button"
                data-stage-number={stepNum}
                onClick={() => handleSelect(isSelected ? null : stepNum)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md shrink-0 ${
                  isSelected
                    ? "bg-[#2FA885] text-[#041F1B] border border-[#2FA885] font-semibold shadow-[0_0_24px_rgba(47,168,133,0.45)] -translate-y-0.5"
                    : isCompleted
                    ? "bg-[#041F1B]/90 text-[#B7E4D5] border border-[#2FA885]/40 hover:border-[#2FA885]/70 hover:bg-[#073B32]/60"
                    : "bg-[#031714]/85 text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32] border border-[#B7E4D5]/20"
                }`}
                title={`Focus Stage ${stage.step}: ${stage.title}`}
              >
                <span
                  className={`text-[10px] font-bold ${
                    isSelected ? "text-[#041F1B]" : isCompleted ? "text-[#2FA885]" : "text-[#8DA99E]"
                  }`}
                >
                  {stage.step}
                </span>
                <span className="font-medium tracking-tight">{stage.shortLabel}</span>
                {isSelected ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#041F1B] animate-ping" />
                ) : (
                  <Icon size={12} className={isCompleted ? "text-[#2FA885]" : "opacity-60"} />
                )}
              </button>
            );
          })}

          {currentStage !== null && (
            <button
              type="button"
              data-action="reset-overview"
              onClick={() => handleSelect(null)}
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/30 text-xs font-mono transition-all shrink-0 cursor-pointer shadow-md backdrop-blur-md"
              title="Return to 8-stage panoramic overview (Esc)"
            >
              <RotateCcw size={12} className="text-[#2FA885]" />
              <span>Overview</span>
            </button>
          )}

          <Link
            href="/methodology"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-mono text-[#B7E4D5] hover:text-[#FFFFFF] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/30 transition-all cursor-pointer backdrop-blur-md shadow-md shrink-0"
            title="Explore our full 5-tier epistemic attribution framework"
          >
            <span>5 Epistemic Tiers</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Center 3D Conduit Space is Wide Open! */}

      {/* Floating Active Stage Inspector Panel (Docked Right, matching Services & Atlas layout) */}
      <AnimatePresence>
        {activeStageData && currentStage !== null && (
          <motion.aside
            key={activeStageData.step}
            initial={isReducedMotion ? undefined : { opacity: 0, y: 15, scale: 0.98 }}
            animate={isReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={isReducedMotion ? undefined : { opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:absolute lg:right-8 lg:top-24 w-full lg:w-[440px] max-w-full z-30 pointer-events-auto my-6 lg:my-0"
            aria-label={`Methodology Stage ${activeStageData.step} Briefing`}
          >
            <div className="p-5 sm:p-6 rounded-3xl bg-[#031714]/94 border border-[#2FA885]/60 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
              {/* Top Bar: Stage index, title, overview close button */}
              <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#073B32] border border-[#2FA885]/50 flex items-center justify-center text-[#2FA885] shadow-sm">
                    <ActiveIcon size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                      STAGE {activeStageData.step} // {activeStageData.phase.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-mono text-[#8DA99E]">
                      3D Stage 0{currentStage}/08 Active & Locked
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  data-action="close-dossier"
                  onClick={() => handleSelect(null)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/25 text-xs font-mono transition-all cursor-pointer"
                  title="Return to 8-stage overview (Esc)"
                >
                  <span>Overview</span>
                  <X size={12} />
                </button>
              </div>

              {/* Title, Visual Motif & Summary */}
              <div className="space-y-1">
                <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                  {activeStageData.shortLabel}: {activeStageData.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#B7E4D5]">
                  <Sparkles size={11} className="text-[#2FA885]" />
                  <span>3D Architectural Motif: {activeStageData.visualMotif}</span>
                </div>
                <p className="text-xs text-[#C5D9D2] font-light leading-relaxed pt-1">
                  {activeStageData.summary}
                </p>
              </div>

              {/* 3 Structured Quality Controls */}
              <div className="space-y-2.5 text-xs">
                {/* 01. Lawful Data Inputs */}
                <div className="p-3 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                    01. Lawful Data Inputs:
                  </span>
                  <p className="text-[#C5D9D2] text-[11px] leading-relaxed font-light">
                    {activeStageData.inputs}
                  </p>
                </div>

                {/* 02. Verification Filter & Evidentiary Checks */}
                <div className="p-3 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
                    02. Verification Checks & Epistemic Filter:
                  </span>
                  <p className="text-[#D8E8E2] text-[11px] leading-relaxed font-light">
                    {activeStageData.verificationChecks}
                  </p>
                </div>

                {/* 03. Expected Deliverable Artifact */}
                <div className="p-3 rounded-xl bg-[#041F1B]/95 border border-[#2FA885]/35 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                    03. Expected Deliverable Artifact:
                  </span>
                  <p className="text-[#F4F2EA] text-[11px] leading-relaxed font-light">
                    {activeStageData.expectedArtifact}
                  </p>
                </div>
              </div>

              {/* Business Value & Repeatable Workflow Box */}
              <div className="p-3.5 rounded-2xl bg-[#073B32]/45 border border-[#B7E4D5]/20 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#2FA885] font-semibold flex items-center gap-1.5">
                    <Workflow size={12} className="text-[#2FA885]" />
                    <span>Business Value & Automation</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider border ${
                      activeStageData.workflowAutomationPotential.automationType === "HUMAN_LEAD"
                        ? "bg-amber-500/20 text-amber-200 border-amber-500/40"
                        : activeStageData.workflowAutomationPotential.automationType === "HYBRID_PIPELINE"
                        ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/40"
                        : "bg-blue-500/20 text-blue-200 border-blue-500/40"
                    }`}
                  >
                    {activeStageData.workflowAutomationPotential.title}
                  </span>
                </div>
                <p className="text-[#C5D9D2] text-[11px] font-light leading-relaxed">
                  {activeStageData.workflowAutomationPotential.description}
                </p>
              </div>

              {/* Stepper Tour Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#B7E4D5]/15 text-xs font-mono">
                <button
                  type="button"
                  data-action="prev-stage"
                  onClick={handlePrevStage}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
                  title="Previous stage (ArrowLeft)"
                >
                  <ChevronLeft size={14} />
                  <span>Prev Stage</span>
                </button>

                <span className="text-[10px] text-[#8DA99E] hidden sm:inline">
                  Use ← / → keys or Esc
                </span>

                <button
                  type="button"
                  data-action="next-stage"
                  onClick={handleNextStage}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
                  title="Next stage (ArrowRight)"
                >
                  <span>Next Stage</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Action Links: Link to Core Service & Methodology */}
              <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
                <Link
                  href={activeStageData.businessServiceLink.href}
                  className="w-full flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/30 transition-all font-medium text-center"
                >
                  <span>Explore {activeStageData.businessServiceLink.name}</span>
                  <ArrowRight size={12} className="text-[#2FA885]" />
                </Link>

                <Link
                  href="/methodology"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] font-semibold transition-all shadow-md text-center"
                >
                  <span>Full 5 Tiers</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Floating Bottom Prompt (Only in overview mode) */}
      {currentStage === null && (
        <div className="w-full max-w-lg mx-auto pointer-events-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#031714]/85 border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] backdrop-blur-md shadow-lg">
            <Sparkles size={13} className="text-[#2FA885] animate-spin" />
            <span>Click any 3D stage monument or select from the dock above to walk the investigation journey.</span>
          </div>
        </div>
      )}
    </section>
  );
}
