"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Workflow,
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ShieldAlert,
  FileCheck,
  Cpu,
  Layers,
  Sparkles,
  Database,
  ExternalLink,
} from "lucide-react";
import { useWorldContext } from "../WorldContext";

interface OperationalEngineOverlayProps {
  onExploreServices: () => void;
  onExploreMethodology?: () => void;
}

type OperationalStageId = "investigate" | "verify" | "operationalize";

interface StageDetail {
  id: OperationalStageId;
  stepNumber: string;
  title: string;
  shortTagline: string;
  spatialFocus: string;
  description: string;
  actions: string[];
  evidenceStandard: string;
  clientDeliverable: string;
  operationalSafeguard: string;
  icon: React.ElementType;
  badgeColor: string;
  borderColor: string;
}

const STAGES: StageDetail[] = [
  {
    id: "investigate",
    stepNumber: "STAGE 01",
    title: "Investigate",
    shortTagline: "Targeted Multi-Source Discovery",
    spatialFocus: "Sensory Conduits & Peripheral Ingestion",
    description:
      "We begin with a clearly defined research question, examining public records, digital footprints, certificate transparency logs, corporate registries, and open-source intelligence rather than running indiscriminate automated dumps.",
    actions: [
      "Define explicit inquiry hypotheses, targets, and operational constraints.",
      "Harvest open-source intelligence across registries, archives, and infrastructure.",
      "Trace secondary relationships, registrar proxies, and corporate affiliations.",
      "Document exact timestamps, cryptographic hashes, and source origins.",
    ],
    evidenceStandard: "Multi-Source Corroboration & Origin Integrity",
    clientDeliverable:
      "Structured source inventory, timestamped raw evidence artifacts, and mapped entity relationships.",
    operationalSafeguard:
      "Zero unvetted scrapers; strict adherence to ethical, legal, and open-source research bounds.",
    icon: Search,
    badgeColor: "text-[#2FA885] bg-[#2FA885]/15 border-[#2FA885]/35",
    borderColor: "border-[#2FA885]/50",
  },
  {
    id: "verify",
    stepNumber: "STAGE 02",
    title: "Verify",
    shortTagline: "Epistemic Rigor & Provenance Validation",
    spatialFocus: "Epistemic Core & Dais Harmonic Rings",
    description:
      "Every piece of gathered information is tested for provenance, corroboration, and contextual validity. We separate confirmed factual evidence from inferences, working hypotheses, and open knowledge gaps.",
    actions: [
      "Evaluate source independence to prevent single-source echoing or circular reporting.",
      "Apply Agletras 5-tier attribution confidence taxonomy (A1 Confirmed to E5 Unreliable).",
      "Stress-test contradictory indicators and identify evidentiary omissions.",
      "Contextualize findings within industry risk parameters and jurisdictional realities.",
    ],
    evidenceStandard: "Agletras 5-Tier Epistemic Attribution Taxonomy",
    clientDeliverable:
      "Validated intelligence dossier with explicit confidence ratings, caveats, and risk assessments.",
    operationalSafeguard:
      "Explicitly documented uncertainty; we never report speculation as verified fact.",
    icon: CheckCircle2,
    badgeColor: "text-amber-400 bg-amber-400/15 border-amber-400/35",
    borderColor: "border-amber-400/50",
  },
  {
    id: "operationalize",
    stepNumber: "STAGE 03",
    title: "Operationalize",
    shortTagline: "Repeatable Workflows & Purpose-Built Automation",
    spatialFocus: "Architectural Colonnade & Automation Pylons",
    description:
      "Instead of treating research as a one-off black box, we codify validated investigative steps into structured, reusable workflows and build targeted automation around genuine, recurring client requirements.",
    actions: [
      "Convert manual investigative procedures into documented analytical SOPs.",
      "Engineer scoped collection and monitoring scripts for recurring risk indicators.",
      "Deliver actionable executive intelligence briefings alongside structured JSON/markdown artifacts.",
      "Iteratively train internal tooling on verified patterns without claiming artificial omniscience.",
    ],
    evidenceStandard: "Reproducible Analytical Playbooks & Scoped Tooling",
    clientDeliverable:
      "Actionable executive summary, machine-readable intelligence schema, and scheduled monitoring scripts.",
    operationalSafeguard:
      "Human-in-the-loop validation; automation assists researchers rather than replacing critical discernment.",
    icon: Workflow,
    badgeColor: "text-[#B7E4D5] bg-[#B7E4D5]/15 border-[#B7E4D5]/35",
    borderColor: "border-[#B7E4D5]/50",
  },
];

export function OperationalEngineOverlay({
  onExploreServices,
  onExploreMethodology,
}: OperationalEngineOverlayProps) {
  const { focusOperationalStage, isReducedMotion } = useWorldContext();
  const [selectedStage, setSelectedStage] = useState<OperationalStageId>("investigate");

  const activeData = STAGES.find((s) => s.id === selectedStage) || STAGES[0];
  const ActiveIcon = activeData.icon;

  const handleSelectStage = (stageId: OperationalStageId) => {
    setSelectedStage(stageId);
    focusOperationalStage(stageId);
  };

  return (
    <section
      id="operational-engine"
      className="min-h-screen py-20 px-4 sm:px-8 md:px-12 relative z-20 pointer-events-none flex flex-col justify-start md:justify-center"
      aria-label="Agletras Operational Model and Startup Business Engine"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        {/* Section 1: Startup Business Model Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
            <span>Operational Architecture // How Agletras Operates</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-editorial font-semibold text-[#F4F2EA] tracking-tight drop-shadow-[0_4px_24px_rgba(2,15,12,0.95)]">
            From Client Inquiry to{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Repeatable Intelligence.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D6E7E1] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(2,15,12,0.9)]">
            We do not sell pre-packaged, unvetted data dumps. Agletras couples rigorous human research with structured methodology, codifying proven analytical procedures into reliable, client-tailored automation.
          </p>
        </div>

        {/* Section 2: Visual Startup Model Progression (Services -> Workflows -> Automation) */}
        <div className="pointer-events-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#031714]/75 border border-[#B7E4D5]/20 backdrop-blur-xl shadow-[0_16px_48px_rgba(2,15,12,0.6)] space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#2FA885] font-semibold">
                  Our Startup Progression
                </span>
                <h3 className="text-lg font-editorial text-[#F4F2EA]">
                  Research Services → Repeatable Workflows → Research Automation
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#8DA99E] bg-[#073B32]/70 px-3 py-1 rounded-full border border-[#B7E4D5]/20">
                Grounded Capability Roadmap
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: Research Services */}
              <div className="p-5 rounded-2xl bg-[#041F1B]/85 border border-[#2FA885]/40 space-y-2 relative overflow-hidden group hover:border-[#2FA885] transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#2FA885] tracking-wider uppercase">
                    01. Active Services
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/40 font-medium">
                    In Production
                  </span>
                </div>
                <h4 className="text-base font-semibold text-[#F4F2EA]">
                  Bespoke Intelligence Engagements
                </h4>
                <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                  Hands-on OSINT investigations, executive due diligence, external threat mapping, and identity verification conducted directly by human researchers where discernment matters most.
                </p>
              </div>

              {/* Pillar 2: Repeatable Workflows */}
              <div className="p-5 rounded-2xl bg-[#041F1B]/85 border border-amber-400/35 space-y-2 relative overflow-hidden group hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-amber-400 tracking-wider uppercase">
                    02. Repeatable Workflows
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-400/15 text-amber-200 border border-amber-400/30 font-medium">
                    Core Methodology
                  </span>
                </div>
                <h4 className="text-base font-semibold text-[#F4F2EA]">
                  Codified Epistemic Playbooks
                </h4>
                <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                  Every engagement produces structured evidence trails, standardized data schemas, and 5-tier confidence scoring that eliminate bias and turn one-off findings into reusable organizational assets.
                </p>
              </div>

              {/* Pillar 3: Research Automation */}
              <div className="p-5 rounded-2xl bg-[#041F1B]/85 border border-[#B7E4D5]/35 space-y-2 relative overflow-hidden group hover:border-[#B7E4D5] transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#B7E4D5] tracking-wider uppercase">
                    03. Research Automation
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#B7E4D5]/15 text-[#B7E4D5] border border-[#B7E4D5]/30 font-medium">
                    Purpose-Built
                  </span>
                </div>
                <h4 className="text-base font-semibold text-[#F4F2EA]">
                  Targeted Collection Tooling
                </h4>
                <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                  We engineer scoped automation scripts and recurring scrapers around genuine client needs. We build practical tools where repetition is high, without claiming an unverified autonomous SaaS.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Spatial Three-Part Interactive Experience (Investigate / Verify / Operationalize) */}
        <div className="pointer-events-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Interactive Spatial Demonstration
              </span>
              <h3 className="text-xl sm:text-2xl font-editorial font-semibold text-[#F4F2EA]">
                Select a stage to explore its methodology &amp; spatial focus
              </h3>
            </div>

            {/* Stage Selector Pills */}
            <div className="flex items-center gap-2 bg-[#031714]/90 p-1.5 rounded-2xl border border-[#B7E4D5]/25 backdrop-blur-md">
              {STAGES.map((stage) => {
                const Icon = stage.icon;
                const isSelected = selectedStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => handleSelectStage(stage.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-[0_0_20px_rgba(47,168,133,0.4)] scale-102"
                        : "text-[#C5D9D2] hover:text-[#FFFFFF] hover:bg-[#073B32]/60"
                    }`}
                  >
                    <Icon size={14} className={isSelected ? "text-[#041F1B]" : "text-[#2FA885]"} />
                    <span>{stage.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail Card (Spatial Camera Synchronized) */}
          <div
            className={`p-6 sm:p-8 rounded-3xl bg-[#031714]/92 border ${activeData.borderColor} backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] transition-all duration-500 space-y-6`}
          >
            {/* Header: Stage Badge, Title, Spatial Camera Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885] shrink-0">
                  <ActiveIcon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${activeData.badgeColor}`}>
                      {activeData.stepNumber}
                    </span>
                    <span className="text-xs font-mono text-[#8DA99E]">
                      {activeData.shortTagline}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-editorial font-semibold text-[#F4F2EA]">
                    {activeData.title}: {activeData.shortTagline}
                  </h4>
                </div>
              </div>

              {/* 3D Focus Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#041F1B]/90 border border-[#B7E4D5]/20 text-[11px] font-mono text-[#B7E4D5]">
                <span className="w-2 h-2 rounded-full bg-[#2FA885] animate-ping" />
                <span>3D Focus: {activeData.spatialFocus}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#D6E7E1] font-light leading-relaxed">
              {activeData.description}
            </p>

            {/* Grid of Key Activities & Tangible Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Column 1: Analyst Procedures */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold flex items-center gap-2">
                  <Layers size={13} />
                  <span>Key Analyst Procedures</span>
                </span>
                <ul className="space-y-2">
                  {activeData.actions.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Deliverables & Safeguards */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#041F1B]/75 border border-[#B7E4D5]/15 space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#B7E4D5] font-semibold flex items-center gap-1.5">
                    <FileCheck size={13} className="text-[#2FA885]" />
                    <span>Tangible Client Deliverable</span>
                  </span>
                  <p className="text-xs text-[#D6E7E1] font-light leading-relaxed">
                    {activeData.clientDeliverable}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#041F1B]/75 border border-[#B7E4D5]/15 space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                    <ShieldAlert size={13} className="text-amber-400" />
                    <span>Operational Safeguard &amp; Grounding</span>
                  </span>
                  <p className="text-xs text-[#D6E7E1] font-light leading-relaxed">
                    {activeData.operationalSafeguard}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Meaningful Services Transition Bridge */}
        <div className="pointer-events-auto pt-8 border-t border-[#B7E4D5]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Next Destination // 02 Services Pavilion</span>
            </span>
            <h3 className="text-lg sm:text-xl font-editorial text-[#F4F2EA]">
              Explore how these principles power our six verified intelligence services.
            </h3>
            <p className="text-xs text-[#8DA99E] font-light">
              From threat mapping to executive verification, discover our structured offerings.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_20px_rgba(47,168,133,0.35)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore 6 Services</span>
              <ArrowDown size={14} />
            </button>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-mono font-medium text-[#F4F2EA] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/30 transition-all hover:-translate-y-0.5 cursor-pointer backdrop-blur-md"
            >
              <span>Full Catalog</span>
              <ArrowUpRight size={13} className="text-[#B7E4D5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
