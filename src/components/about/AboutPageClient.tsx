"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Network,
  Cpu,
  Search,
  CheckCircle2,
  FileText,
  FileCheck,
  Radio,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Compass,
  Lock,
  Workflow,
  Layers,
} from "lucide-react";
import { companyData } from "@/data/company";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";
import { DimensionalEmblem } from "@/components/visuals/DimensionalEmblem";
import { useWorldContext } from "@/components/world/WorldContext";
import { philosophyStages, PhilosophyStage } from "@/data/aboutPhilosophy";

const triadPillars = [
  {
    icon: Search,
    title: "1. Empirical Research",
    tagline: "Primary Public Source Investigation",
    description:
      "Hypothesis-driven inquiry into unclassified public records, corporate registers, academic catalogs, and open technical archives. We replace generic keyword searches with structured epistemic questions.",
    deliverable: "Primary source citations & cryptographic capture hashes",
  },
  {
    icon: Network,
    title: "2. Relational Intelligence",
    tagline: "Entity Resolution & Synthesis",
    description:
      "Transforming isolated data points into relational knowledge graphs. We connect lookalike domains, corporate directorships, and digital footprints to uncover structural relationships and evaluate operational risks.",
    deliverable: "5-Tier Epistemic classifications & node-link link charts",
  },
  {
    icon: Cpu,
    title: "3. Process Automation",
    tagline: "Deterministic Pipelines & ETL",
    description:
      "Engineering reproducible collection workflows that respect platform rate limits and robots.txt. Automation handles data extraction and normalization so human analysts can focus entirely on high-stakes synthesis.",
    deliverable: "Scheduled change watchers & standardized JSON/Markdown datasets",
  },
];

const stageIcons: Record<string, React.ElementType> = {
  discover: Search,
  verify: ShieldCheck,
  connect: Network,
  deliver: FileText,
};

export function AboutPageClient() {
  const { aboutStage, focusAboutStage, isReducedMotion } = useWorldContext();

  const activeStage = aboutStage
    ? philosophyStages.find((s) => s.stageNumber === aboutStage) || null
    : null;

  const handleSelectStage = (stageNum: number) => {
    if (aboutStage === stageNum) {
      focusAboutStage(null);
    } else {
      focusAboutStage(stageNum);
    }
  };

  const handlePrevStage = () => {
    if (aboutStage === null || aboutStage <= 1) {
      focusAboutStage(4);
    } else {
      focusAboutStage(aboutStage - 1);
    }
  };

  const handleNextStage = () => {
    if (aboutStage === null || aboutStage >= 4) {
      focusAboutStage(1);
    } else {
      focusAboutStage(aboutStage + 1);
    }
  };

  // Keyboard Navigation: ArrowLeft, ArrowRight, Escape
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
        if (aboutStage !== null) {
          e.preventDefault();
          focusAboutStage(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aboutStage]);

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-transparent via-[#041F1B]/40 to-[#041F1B]/80 text-[#F4F2EA] min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 space-y-24">
        {/* Page Hero Header */}
        <div className="space-y-6 text-center md:text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Identity, Philosophy & Standards</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Researching Information.{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Engineering Intelligence.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Agletras researches publicly available information and develops intelligence workflows
            to help organizations investigate relationships, evaluate counterparty information, identify digital risks, and make better-informed decisions.
          </p>

          {/* Interactive Bridge to 3D Philosophy Sanctum */}
          <div className="pt-2 flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("philosophy-progression");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                focusAboutStage(1);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#073B32] hover:bg-[#0A4D42] border border-[#2FA885]/40 text-xs font-mono text-[#B7E4D5] transition-all hover:scale-105 shadow-lg shadow-[#041F1B]/60 cursor-pointer"
            >
              <Eye size={14} className="text-[#2FA885]" />
              <span>Explore 3D Philosophy Sanctum</span>
              <span className="text-[10px] text-[#8DA99E]">↓</span>
            </button>
            <span className="text-xs font-mono text-[#8DA99E] hidden sm:inline">
              4 Procedural Monuments • Lateral Sightlines
            </span>
          </div>
        </div>

        {/* Section 1: What Agletras Is & Core Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#073B32]/35 border border-[#B7E4D5]/20 backdrop-blur-md space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
                What Agletras Is
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                An Evidence-First Research Intelligence Practice
              </h2>
              <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
                Agletras is a specialized research enterprise founded to bridge the critical gap between vast, chaotic public data and high-stakes executive decisions. We combine open-source intelligence (OSINT) methodologies, cybersecurity telemetry, and automated data pipelines to provide organizations with clear, empirically substantiated findings.
              </p>
            </div>
            <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
              Governed strictly by lawful open-source research and explicit client authorizations.
            </div>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#073B32]/35 border border-[#B7E4D5]/20 backdrop-blur-md space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
                Problems We Aim to Solve
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                Eliminating Decision Blind Spots
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#C5D9D2] font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span><strong>Perimeter Blind Spots:</strong> Adversaries staging lookalike domains and harvesting infrastructure before phishing campaigns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span><strong>Concealed Liabilities:</strong> Complex shell company webs, undisclosed litigation, and nominee director ownership structures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span><strong>Analytical Fatigue:</strong> Thousands of hours lost manually copying records across government registries and disparate databases.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
              Structured discovery turns noisy search results into defensible truth.
            </div>
          </div>
        </div>

        {/* Section 2: The Living Knowledge Metaphor & Dimensional Emblem */}
        <div className="p-8 sm:p-12 rounded-3xl surface-matte-dark shadow-2xl border border-[#B7E4D5]/25 relative overflow-hidden backdrop-blur-xl">
          <BotanicalMotif
            variant="canopy-burst"
            className="absolute -top-10 -right-10 w-96 text-[#2FA885] opacity-15 pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-4 flex justify-center">
              <DimensionalEmblem size={220} interactive={true} />
            </div>

            <div className="md:col-span-8 space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
                The Living Knowledge Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-[#F4F2EA]">
                Rooted in Empirical Data, Branching into Decisive Clarity
              </h2>
              <p className="text-sm sm:text-base text-[#C5D9D2] font-light leading-relaxed">
                The Agletras identity reflects an interconnected living system: the roots draw raw nutrients from lawful public registries, passive DNS history, and transparency feeds. At the trunk junction, systematic correlation, normalization, and senior analyst peer review filter signal from noise. Above, the canopy branches into structured, actionable intelligence dossiers ready for executive action.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: The Triad — How Research, Intelligence, and Automation Work Together */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Methodological Synergy
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              How Research, Intelligence & Automation Coexist
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light mt-1">
              Technology accelerates collection, but human discernment governs analysis. No single pillar operates in isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {triadPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#073B32]/35 border border-[#B7E4D5]/20 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-xl hover:border-[#2FA885]/50 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885] shadow-md">
                      <PillarIcon size={22} />
                    </div>
                    <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-mono text-[#B7E4D5] block">
                      {pillar.tagline}
                    </span>
                    <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
                    <span className="block text-[10px] uppercase text-[#2FA885] mb-0.5">
                      Direct Output:
                    </span>
                    <span>{pillar.deliverable}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Lawful & Responsible Research Commitments */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <ShieldCheck size={16} className="text-[#2FA885]" />
              <span>Ethical Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA] mt-1">
              Commitment to Lawful & Responsible Research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyData.principles.map((p, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/15 backdrop-blur-md space-y-2 shadow-lg"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[#2FA885] font-semibold">
                  <FileCheck size={16} />
                  <span>{p.label}</span>
                </div>
                <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: The 4-Stage Intelligence Philosophy Sanctum (Interactive 3D Progression) */}
        <div id="philosophy-progression" className="space-y-10 scroll-mt-28">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
              <span>Interactive 3D Philosophy Sanctum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              From Research to Actionable Intelligence
            </h2>
            <p className="text-base sm:text-lg text-[#C5D9D2] font-light leading-relaxed">
              Public information is only the starting point. Agletras helps organizations evaluate evidence, discover relationships, identify potential risks, and turn fragmented information into structured research findings that support better-informed decisions.
            </p>
          </div>

          {/* Sanctum Status & Control Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#073B32]/40 border border-[#B7E4D5]/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStage
                    ? "bg-[#2FA885] shadow-[0_0_12px_#2FA885] animate-pulse"
                    : "bg-[#8DA99E]/50"
                }`}
              />
              <span className="font-mono text-xs text-[#F4F2EA]">
                {activeStage ? (
                  <>
                    <strong className="text-[#2FA885]">Stage 0{activeStage.stageNumber}:</strong>{" "}
                    {activeStage.label} — <em>{activeStage.visualMotif}</em>
                  </>
                ) : (
                  <span>Sanctum Overview — 4 Connected Architectural Monuments</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeStage ? (
                <>
                  <button
                    type="button"
                    onClick={handlePrevStage}
                    aria-label="Previous Philosophy Stage"
                    className="p-2 rounded-lg bg-[#041F1B] hover:bg-[#073B32] border border-[#B7E4D5]/20 text-[#B7E4D5] hover:text-[#F4F2EA] transition-all cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStage}
                    aria-label="Next Philosophy Stage"
                    className="p-2 rounded-lg bg-[#041F1B] hover:bg-[#073B32] border border-[#B7E4D5]/20 text-[#B7E4D5] hover:text-[#F4F2EA] transition-all cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => focusAboutStage(null)}
                    className="px-3 py-1.5 rounded-lg bg-[#041F1B] hover:bg-[#073B32] border border-[#B7E4D5]/20 text-xs font-mono text-[#8DA99E] hover:text-[#F4F2EA] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <X size={13} />
                    <span>Overview</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => focusAboutStage(1)}
                  className="px-4 py-2 rounded-xl bg-[#041F1B] hover:bg-[#073B32] border border-[#2FA885]/40 text-xs font-mono text-[#2FA885] hover:text-[#B7E4D5] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Eye size={14} />
                  <span>Inspect 3D Tour (Stage 01)</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Stages Selection Dock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophyStages.map((stage) => {
              const StageIcon = stageIcons[stage.id] || Search;
              const isSelected = aboutStage === stage.stageNumber;

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => handleSelectStage(stage.stageNumber)}
                  className={`p-6 rounded-3xl border transition-all duration-300 text-left flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md group cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_24px_rgba(47,168,133,0.35)] scale-[1.02]"
                      : "bg-[#073B32]/35 border-[#B7E4D5]/20 hover:border-[#2FA885]/50 hover:bg-[#073B32]/50"
                  }`}
                >
                  {/* Subtle Botanical Motif */}
                  <BotanicalMotif
                    variant="leaf-vein"
                    className="absolute -right-6 -bottom-6 w-36 text-[#2FA885] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
                  />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                          isSelected
                            ? "bg-[#041F1B] border border-[#2FA885] text-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.4)]"
                            : "bg-[#041F1B] border border-[#2FA885]/40 text-[#2FA885]"
                        }`}
                      >
                        <StageIcon size={18} />
                      </div>
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#041F1B] text-[#B7E4D5] border border-[#B7E4D5]/15">
                        {stage.step}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-editorial font-semibold text-[#F4F2EA] mb-0.5">
                        {stage.step} — {stage.label}
                      </h3>
                      <span className="text-[11px] font-mono text-[#2FA885] uppercase tracking-wider block mb-1">
                        {stage.tagline}
                      </span>
                      <p className="text-xs text-[#C5D9D2] font-light leading-relaxed line-clamp-2">
                        {stage.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#B7E4D5]/10 flex items-center justify-between text-[11px] font-mono text-[#8DA99E] relative z-10">
                    <span className="text-[10px] text-[#2FA885]/80 truncate max-w-[140px]">
                      {stage.visualMotif}
                    </span>
                    <span
                      className={`text-[#2FA885] transition-opacity shrink-0 ${
                        isSelected ? "opacity-100 font-semibold" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {isSelected ? "Locked ✓" : "Inspect →"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Dossier & Quality Controls */}
          <AnimatePresence mode="wait">
            {activeStage ? (
              <motion.div
                key={activeStage.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-10 rounded-3xl bg-[#041F1B]/90 border border-[#2FA885]/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(3,23,20,0.5)] space-y-8 relative overflow-hidden"
              >
                {/* Dossier Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#B7E4D5]/15 pb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#073B32] border border-[#2FA885]/40 text-xs font-mono text-[#2FA885] font-semibold">
                        Stage {activeStage.step} of 04
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#041F1B] border border-[#B7E4D5]/20 text-[11px] font-mono text-[#B7E4D5]">
                        3D Architecture: {activeStage.visualMotif}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                      {activeStage.title}
                    </h3>
                    <p className="text-sm text-[#C5D9D2] font-light max-w-3xl leading-relaxed">
                      {activeStage.summary}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => focusAboutStage(null)}
                    aria-label="Close Active Stage Dossier"
                    className="self-start p-2.5 rounded-xl bg-[#073B32] hover:bg-[#0A4D42] border border-[#B7E4D5]/20 text-[#8DA99E] hover:text-[#F4F2EA] transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* 3 Quality Control Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Lawful Inputs */}
                  <div className="p-6 rounded-2xl bg-[#073B32]/35 border border-[#B7E4D5]/15 space-y-3">
                    <div className="flex items-center gap-2 text-[#2FA885]">
                      <Radio size={16} />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                        Lawful Ingestion Vectors
                      </span>
                    </div>
                    <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                      {activeStage.lawfulInputs}
                    </p>
                  </div>

                  {/* Verification Checks */}
                  <div className="p-6 rounded-2xl bg-[#073B32]/35 border border-[#B7E4D5]/15 space-y-3">
                    <div className="flex items-center gap-2 text-[#B7E4D5]">
                      <CheckCircle2 size={16} />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                        Epistemic Verification
                      </span>
                    </div>
                    <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                      {activeStage.verificationChecks}
                    </p>
                  </div>

                  {/* Expected Deliverable */}
                  <div className="p-6 rounded-2xl bg-[#073B32]/35 border border-[#B7E4D5]/15 space-y-3">
                    <div className="flex items-center gap-2 text-[#2FA885]">
                      <FileCheck size={16} />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                        Expected Deliverable
                      </span>
                    </div>
                    <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                      {activeStage.expectedDeliverable}
                    </p>
                  </div>
                </div>

                {/* Client Outcome & Business Model Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Client Operational Outcome */}
                  <div className="p-6 rounded-2xl bg-[#073B32]/20 border border-[#2FA885]/30 space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                      Client Operational Outcome:
                    </span>
                    <p className="text-xs sm:text-sm text-[#F4F2EA] font-light leading-relaxed">
                      {activeStage.clientOutcome}
                    </p>
                  </div>

                  {/* Honest Business Model Note */}
                  <div className="p-6 rounded-2xl bg-[#041F1B] border border-[#B7E4D5]/20 space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                      Operating Model & Automation Vector:
                    </span>
                    <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                      {activeStage.businessModelNote}
                    </p>
                  </div>
                </div>

                {/* Dossier Footer Navigation & Action */}
                <div className="pt-4 border-t border-[#B7E4D5]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8DA99E]">
                    <span>Use keyboard arrow keys</span>
                    <kbd className="px-2 py-0.5 rounded bg-[#073B32] text-[#B7E4D5] text-[10px] border border-[#B7E4D5]/20">←</kbd>
                    <kbd className="px-2 py-0.5 rounded bg-[#073B32] text-[#B7E4D5] text-[10px] border border-[#B7E4D5]/20">→</kbd>
                    <span>or</span>
                    <kbd className="px-2 py-0.5 rounded bg-[#073B32] text-[#B7E4D5] text-[10px] border border-[#B7E4D5]/20">Esc</kbd>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link
                      href={`/contact?service=osint-investigation`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-md cursor-pointer"
                    >
                      <span>Scope an Investigation in Stage 0{activeStage.stageNumber}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#073B32]/20 border border-[#B7E4D5]/15 text-center text-xs font-mono text-[#8DA99E] space-y-1">
                <p className="text-[#C5D9D2]">
                  Select any stage above or click any procedural monument in the 3D background to inspect our methodology checkpoints.
                </p>
                <p className="text-[11px] text-[#8DA99E]/80">
                  01 Discover (Sensor Obelisk) • 02 Verify (Provenance Portal) • 03 Connect (Relational Cluster) • 04 Deliver (Decision Spire)
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* Client-Focused Call to Action */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <BotanicalMotif
              variant="leaf-vein"
              className="absolute -right-8 -bottom-8 w-64 text-[#2FA885] opacity-10 pointer-events-none"
            />

            <div className="space-y-3 relative z-10 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
                <Sparkles size={13} />
                <span>Consultation & Scope Assessment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                Have a Research Challenge?
              </h3>
              <p className="text-sm sm:text-base text-[#C5D9D2] font-light leading-relaxed">
                Tell us what you need to investigate, verify, or understand. We can discuss the scope, relevant information sources, and appropriate deliverables.
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-mono font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-lg shadow-[#041F1B]/60 hover:shadow-[0_4px_24px_rgba(47,168,133,0.4)] cursor-pointer"
              >
                <span>Discuss Your Requirements</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
