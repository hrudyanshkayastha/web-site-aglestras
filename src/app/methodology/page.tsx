"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { epistemicStandards, intelligenceStages, sampleBriefData, IntelligenceStage } from "@/data/methodology";
import { AmbientLivingCanvas } from "@/components/visuals/AmbientLivingCanvas";
import { LivingKnowledgeSystem } from "@/components/visuals/LivingKnowledgeSystem";

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
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen overflow-hidden">
      {/* Shared Ambient Living Canvas in Background */}
      <AmbientLivingCanvas opacity={0.6} particleCount={44} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-sm">
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

        {/* The 6-Stage Intelligence Lifecycle — Connected Visual Pathway */}
        <div className="space-y-10">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Methodological Progression
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Define → Collect → Verify → Correlate → Analyze → Deliver
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Follow the connected visual pathway below. Select any stage to inspect its purpose, execution, quality controls, and output.
            </p>
          </div>

          {/* Connected Pathway Ribbon */}
          <div className="relative">
            {/* Desktop Illuminated Conduit Line */}
            <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-[2px] bg-gradient-to-r from-[#2FA885]/20 via-[#2FA885]/80 to-[#2FA885]/20 z-0 pointer-events-none -translate-y-1/2">
              <div
                className="h-full bg-[#2FA885] transition-all duration-500 shadow-[0_0_12px_#2FA885]"
                style={{ width: `${((activeStepIndex + 1) / intelligenceStages.length) * 100}%` }}
              />
            </div>

            {/* Mobile Vertical Spine */}
            <div className="lg:hidden absolute top-6 bottom-6 left-[28px] w-[2px] bg-gradient-to-b from-[#2FA885]/30 via-[#2FA885]/70 to-[#2FA885]/30 z-0 pointer-events-none" />

            {/* 6 Stage Buttons Grid (Responsive: Vertical flow on small mobile, 2-col on tablet, 6-col on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 relative z-10">
              {intelligenceStages.map((stage, idx) => {
                const Icon = stageIcons[stage.step] || Compass;
                const isActive = idx === activeStepIndex;
                const isPassed = idx <= activeStepIndex;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 backdrop-blur-md ${
                      isActive
                        ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_24px_rgba(47,168,133,0.4)] scale-[1.02]"
                        : isPassed
                        ? "bg-[#041F1B]/95 border-[#2FA885]/40 hover:bg-[#073B32]/40"
                        : "bg-[#041F1B]/90 border-[#B7E4D5]/15 hover:border-[#B7E4D5]/40 hover:bg-[#073B32]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#041F1B] border border-[#2FA885]/50 flex items-center justify-center text-[10px] font-mono font-bold text-[#2FA885]">
                          {stage.step}
                        </span>
                        <span className="font-mono text-xs text-[#2FA885] font-semibold">
                          {stage.phase.split(" ")[0]}
                        </span>
                      </div>
                      <Icon size={16} className={isActive ? "text-[#B7E4D5]" : "text-[#8DA99E]"} />
                    </div>
                    <div>
                      <h3 className="font-editorial text-sm font-semibold text-[#F4F2EA]">
                        {stage.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#8DA99E] block truncate mt-0.5">
                        {stage.outputAdvancingInvestigation.split(" ")[0]} Output
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Stable Inspection Panel with Motion Reveal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-12 rounded-3xl bg-[#073B32]/35 border border-[#2FA885]/45 shadow-2xl backdrop-blur-xl space-y-8 relative overflow-hidden"
            >
              {/* Subtle Ambient Radial Glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-20 blur-3xl"
                style={{ background: "radial-gradient(circle, #2FA885 0%, transparent 70%)" }}
                aria-hidden="true"
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885] shadow-lg">
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

              {/* 4 Sub-Sections: Purpose, What Happens, Evidence Quality, Output */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm relative z-10">
                {/* 1. Purpose */}
                <div className="p-6 rounded-2xl bg-[#041F1B]/85 border border-[#B7E4D5]/15 space-y-2 hover:border-[#2FA885]/30 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                    1. Stage Purpose
                  </span>
                  <p className="text-[#F4F2EA] leading-relaxed font-light">
                    {activeStage.purpose}
                  </p>
                </div>

                {/* 2. What Happens */}
                <div className="p-6 rounded-2xl bg-[#041F1B]/85 border border-[#B7E4D5]/15 space-y-2 hover:border-[#2FA885]/30 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                    2. What Happens During The Stage
                  </span>
                  <p className="text-[#C5D9D2] leading-relaxed font-light">
                    {activeStage.whatHappens}
                  </p>
                </div>

                {/* 3. Evidence Quality Assessment */}
                <div className="p-6 rounded-2xl bg-[#041F1B]/85 border border-[#B7E4D5]/15 space-y-2 hover:border-[#2FA885]/30 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-semibold block">
                    3. Evidence Quality Assessment
                  </span>
                  <p className="text-[#C5D9D2] leading-relaxed font-light">
                    {activeStage.evidenceQualityAssessment}
                  </p>
                </div>

                {/* 4. Output That Advances Investigation */}
                <div className="p-6 rounded-2xl bg-[#041F1B]/85 border border-[#2FA885]/35 space-y-2 hover:border-[#2FA885]/50 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                    4. Output That Advances The Investigation
                  </span>
                  <p className="text-[#E2F4EE] leading-relaxed font-light">
                    {activeStage.outputAdvancingInvestigation}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive OSINT Architecture Demonstrator (Living Knowledge System) */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Architecture Demonstrator
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              OSINT Knowledge Architecture in Practice
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Explore how raw inquiries flow through passive harvesting, extraction, graph linkage, and confidence review into verified deliverables.
            </p>
          </div>

          <LivingKnowledgeSystem />
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
            {epistemicStandards.map((item, idx) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`p-6 sm:p-8 rounded-3xl border ${item.colorScheme.border} ${item.colorScheme.bg} grid grid-cols-1 md:grid-cols-12 gap-6 items-center backdrop-blur-md shadow-lg hover:-translate-y-0.5 transition-transform`}
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

                <div className="md:col-span-4 p-4 rounded-xl bg-[#041F1B]/70 border border-white/5">
                  <span className="block text-[10px] font-mono text-[#8DA99E] uppercase mb-1">
                    Illustrative Pattern:
                  </span>
                  <p className="text-xs text-[#A1B8B0] italic font-light leading-snug">
                    &ldquo;{item.example}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Apply our methodology to your business question
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light max-w-xl">
              We define clear project objectives and deliver evidence-backed briefs with complete source citations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0 relative z-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#0a4d40] border border-[#B7E4D5]/30 transition-all"
            >
              <span>Explore Services</span>
              <ArrowRight size={14} className="text-[#2FA885]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-lg shadow-[#041F1B]/50 hover:shadow-[0_4px_24px_rgba(47,168,133,0.3)]"
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
