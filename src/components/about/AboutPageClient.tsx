"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Network,
  Cpu,
  Search,
  CheckCircle2,
  FileText,
  FileCheck,
  Radio,
  Share2,
} from "lucide-react";
import { companyData } from "@/data/company";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";
import { DimensionalEmblem } from "@/components/visuals/DimensionalEmblem";

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

const intelligenceStages = [
  {
    step: "01",
    label: "Discover",
    icon: Search,
    description:
      "Identify relevant public sources, records, technical indicators, and information related to the investigation objective.",
    tagline: "Lawful Public Ingestion",
    detail: "Systematic ingestion across corporate registers, passive DNS telemetry, and official gazettes.",
  },
  {
    step: "02",
    label: "Verify",
    icon: ShieldCheck,
    description:
      "Evaluate source reliability, validate observations, compare evidence, and distinguish confirmed facts from unverified indicators.",
    tagline: "Provenance & Epistemics",
    detail: "Application of 5-Tier Epistemic attribution to separate verifiable facts from working hypotheses.",
  },
  {
    step: "03",
    label: "Connect",
    icon: Network,
    description:
      "Correlate relevant entities, timelines, domains, organizations, and other evidence to identify meaningful relationships.",
    tagline: "Relational Correlation",
    detail: "Bidirectional graph linkage mapping corporate cross-holdings, infrastructure clusters, and directorship overlaps.",
  },
  {
    step: "04",
    label: "Deliver",
    icon: FileText,
    description:
      "Present structured findings, source references, confidence assessments, limitations, and relevant next steps in an organized report or technical deliverable.",
    tagline: "Decision-Ready Briefs",
    detail: "Executive briefings, attributed findings registers, and actionable mitigation roadmaps.",
  },
];

export function AboutPageClient() {
  const [activeStageStep, setActiveStageStep] = useState<number>(0);

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

        {/* Section 5: From Research to Actionable Intelligence (Connected Visual Pathway) */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
              <span>The Intelligence Progression</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              From Research to Actionable Intelligence
            </h2>
            <p className="text-base sm:text-lg text-[#C5D9D2] font-light leading-relaxed">
              Public information is only the starting point. Agletras helps organizations evaluate evidence, discover relationships, identify potential risks, and turn fragmented information into structured research findings that support better-informed decisions.
            </p>
          </div>

          {/* 4 Stages with Interactive Illuminated Neural Pathway */}
          <div className="relative">
            {/* Desktop Illuminated Pathway Line */}
            <div className="hidden lg:block absolute top-[48px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#2FA885]/20 via-[#2FA885]/80 to-[#2FA885]/20 z-0 pointer-events-none">
              <div
                className="h-full bg-[#2FA885] transition-all duration-500 shadow-[0_0_12px_#2FA885]"
                style={{ width: `${((activeStageStep + 1) / intelligenceStages.length) * 100}%` }}
              />
            </div>

            {/* Mobile Illuminated Pathway Vertical Spine */}
            <div className="lg:hidden absolute top-8 bottom-8 left-[30px] w-[2px] bg-gradient-to-b from-[#2FA885]/30 via-[#2FA885]/70 to-[#2FA885]/30 z-0 pointer-events-none" />

            {/* 4 Stages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
              {intelligenceStages.map((stage, idx) => {
                const StageIcon = stage.icon;
                const isActive = activeStageStep === idx;

                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageStep(idx)}
                    className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 text-left flex flex-col justify-between space-y-6 shadow-xl backdrop-blur-md group cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_24px_rgba(47,168,133,0.35)] scale-[1.02]"
                        : "bg-[#073B32]/35 border-[#B7E4D5]/20 hover:border-[#2FA885]/50 hover:bg-[#073B32]/50"
                    }`}
                  >
                    {/* Subtle Neural Leaf-Vein Watermark */}
                    <BotanicalMotif
                      variant="leaf-vein"
                      className="absolute -right-6 -bottom-6 w-36 text-[#2FA885] opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
                    />

                    <div className="space-y-4 relative z-10">
                      {/* Top Node Header Aligned with Illuminated Pathway */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                            isActive
                              ? "bg-[#041F1B] border border-[#2FA885] text-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.4)]"
                              : "bg-[#041F1B] border border-[#2FA885]/40 text-[#2FA885]"
                          }`}
                        >
                          <StageIcon size={20} />
                        </div>
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#041F1B] text-[#B7E4D5] border border-[#B7E4D5]/15">
                          {stage.step}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] mb-1">
                          {stage.step} — {stage.label}
                        </h3>
                        <span className="text-[11px] font-mono text-[#2FA885] uppercase tracking-wider block mb-2">
                          {stage.tagline}
                        </span>
                        <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#B7E4D5]/10 flex items-center justify-between text-[11px] font-mono text-[#8DA99E] relative z-10">
                      <span>Phase {stage.step} of 04</span>
                      <span className={`text-[#2FA885] transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        Active Vector →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

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
