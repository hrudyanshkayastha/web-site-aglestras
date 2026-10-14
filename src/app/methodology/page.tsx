"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Database,
  CheckCircle2,
  Network,
  ShieldCheck,
  FileText,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Shield,
  Layers,
  HelpCircle,
} from "lucide-react";
import { epistemicStandards, intelligenceStages, sampleBriefData, IntelligenceStage } from "@/data/methodology";

const stageIcons: Record<string, React.ElementType> = {
  "01": Compass,
  "02": Database,
  "03": CheckCircle2,
  "04": Network,
  "05": ShieldCheck,
  "06": FileText,
};

export default function MethodologyPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStage = intelligenceStages[activeStepIndex];
  const ActiveIcon = stageIcons[activeStage.step] || Compass;

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Epistemic Research Process</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            The Architecture{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              of Certainty.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Intelligence without provenance is conjecture. We subject every piece of public information
            to systematic verification, clear epistemic labeling, and senior analyst peer review.
          </p>
        </div>

        {/* The 6-Stage Intelligence Lifecycle — Interactive Visual Journey */}
        <div className="space-y-10">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Methodological Progression
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Define → Collect → Verify → Correlate → Analyze → Deliver
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Select any stage below to inspect its purpose, execution, quality controls, and output.
            </p>
          </div>

          {/* Step Selector Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {intelligenceStages.map((stage, idx) => {
              const Icon = stageIcons[stage.step] || Compass;
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive
                      ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_20px_rgba(47,168,133,0.3)] scale-[1.02]"
                      : "bg-[#041F1B]/90 border-[#B7E4D5]/15 hover:border-[#B7E4D5]/40 hover:bg-[#073B32]/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold">
                      {stage.step}
                    </span>
                    <Icon size={16} className={isActive ? "text-[#B7E4D5]" : "text-[#8DA99E]"} />
                  </div>
                  <div>
                    <h3 className="font-editorial text-sm font-semibold text-[#F4F2EA]">
                      {stage.phase.split(" ")[0]}
                    </h3>
                    <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                      {stage.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Stable Inspection Panel */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#073B32]/35 border border-[#2FA885]/40 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
                  <ActiveIcon size={24} />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#2FA885] font-semibold tracking-wider block">
                    STAGE {activeStage.step} // {activeStage.phase.toUpperCase()}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                    {activeStage.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-full text-xs font-mono bg-[#041F1B] border border-[#B7E4D5]/20 text-[#C5D9D2] hover:text-[#FFFFFF] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === intelligenceStages.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(intelligenceStages.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-full text-xs font-mono bg-[#041F1B] border border-[#B7E4D5]/20 text-[#C5D9D2] hover:text-[#FFFFFF] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* 4 Strict Sub-Sections Mandated by Prompt 3.E */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* 1. Purpose */}
              <div className="p-6 rounded-2xl bg-[#041F1B]/80 border border-[#B7E4D5]/15 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                  1. Stage Purpose
                </span>
                <p className="text-[#F4F2EA] leading-relaxed font-light">
                  {activeStage.purpose}
                </p>
              </div>

              {/* 2. What Happens */}
              <div className="p-6 rounded-2xl bg-[#041F1B]/80 border border-[#B7E4D5]/15 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                  2. What Happens During The Stage
                </span>
                <p className="text-[#C5D9D2] leading-relaxed font-light">
                  {activeStage.whatHappens}
                </p>
              </div>

              {/* 3. Evidence Quality Assessment */}
              <div className="p-6 rounded-2xl bg-[#041F1B]/80 border border-[#B7E4D5]/15 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-semibold block">
                  3. Evidence Quality Assessment
                </span>
                <p className="text-[#C5D9D2] leading-relaxed font-light">
                  {activeStage.evidenceQualityAssessment}
                </p>
              </div>

              {/* 4. Output That Advances Investigation */}
              <div className="p-6 rounded-2xl bg-[#041F1B]/80 border border-[#2FA885]/30 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                  4. Output That Advances The Investigation
                </span>
                <p className="text-[#E2F4EE] leading-relaxed font-light">
                  {activeStage.outputAdvancingInvestigation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Tier Epistemic Standard Section */}
        <div className="space-y-10">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Rigorous Certainty Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              The 5-Tier Epistemic Standard
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Separating primary evidence from working hypotheses and identified knowledge boundaries
            </p>
          </div>

          <div className="space-y-4">
            {epistemicStandards.map((item) => (
              <div
                key={item.type}
                className={`p-6 sm:p-8 rounded-2xl border ${item.colorScheme.border} ${item.colorScheme.bg} grid grid-cols-1 md:grid-cols-12 gap-6 items-center`}
              >
                <div className="md:col-span-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider inline-block mb-1 ${item.colorScheme.badgeBg}`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-xs font-mono text-[#8DA99E] mt-1">
                    {item.confidenceRange}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm text-[#E2F4EE] leading-relaxed font-light">
                    {item.definition}
                  </p>
                </div>

                <div className="md:col-span-4 p-4 rounded-xl bg-[#041F1B]/60 border border-white/5">
                  <span className="block text-[10px] font-mono text-[#8DA99E] uppercase mb-1">
                    Illustrative Pattern:
                  </span>
                  <p className="text-xs text-[#A1B8B0] italic font-light leading-snug">
                    &ldquo;{item.example}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Apply our methodology to your business question
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light max-w-xl">
              We define clear project objectives and deliver evidence-backed briefs with complete source citations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#0a4d40] border border-[#B7E4D5]/30 transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} className="text-[#2FA885]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-lg shadow-[#041F1B]/50"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
