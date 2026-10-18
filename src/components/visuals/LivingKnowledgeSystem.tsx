"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, CheckCircle2, Shield, Search, Network, FileSpreadsheet, ArrowRight, Layers } from "lucide-react";

interface NodeInfo {
  id: string;
  stage: string;
  title: string;
  description: string;
  osintVector: string;
  category: "input" | "source" | "evidence" | "correlation" | "confidence" | "output";
}

const networkNodes: NodeInfo[] = [
  {
    id: "question",
    stage: "01. Inquiry",
    title: "Business Inquiry & Scope",
    description: "Establishing legal boundaries, corporate target identifiers, and specific threat questions.",
    osintVector: "Target Parameters: Primary Domain, Legal Registry Names, Threat Verticals",
    category: "input",
  },
  {
    id: "sources",
    stage: "02. Passive Harvesting",
    title: "Permitted Open Sources",
    description: "Lawful passive collection across transparency certificates, public DNS, and open registries.",
    osintVector: "Telemetry: Passive DNS, Certificate Transparency Logs, WHOIS Archives, Code Repositories",
    category: "source",
  },
  {
    id: "evidence",
    stage: "03. Extraction",
    title: "Evidence Extraction",
    description: "Extracting timestamped artifacts, calculating cryptographic hashes, and filtering noise.",
    osintVector: "Artifacts: SHA-256 Checksums, Capture Timestamps, Raw DOM Snapshots",
    category: "evidence",
  },
  {
    id: "correlation",
    stage: "04. Graph Linkage",
    title: "Entity Correlation Graph",
    description: "Connecting lookalike domain clusters, shared MX/NS records, and corporate officer networks.",
    osintVector: "Graph: Node-link infrastructure clustering, ASN proximity, Registrar overlap",
    category: "correlation",
  },
  {
    id: "confidence",
    stage: "05. Governance",
    title: "Epistemic Confidence Review",
    description: "Human intelligence analysts rigorously separate observable facts from analytical inferences.",
    osintVector: "Epistemics: Fact (95%+), Indicator (80%+), Inference (60-80%), Assumption (Open)",
    category: "confidence",
  },
  {
    id: "deliverable",
    stage: "06. Decision Brief",
    title: "Structured Intelligence Brief",
    description: "Delivering an executive dossier with verified evidence, MITRE alignment, and defensive actions.",
    osintVector: "Deliverable: Executive Brief, IoC Matrix, Infrastructure Graph, Actionable Mitigations",
    category: "output",
  },
];

export function LivingKnowledgeSystem() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo>(networkNodes[3]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl surface-matte-dark border border-[#B7E4D5]/20 p-6 sm:p-8 backdrop-blur-xl shadow-3d-card relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#2FA885]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#B7E4D5]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2FA885] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
            OSINT Knowledge Architecture
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#041F1B] border border-[#B7E4D5]/20 text-[#8DA99E]">
          Illustrative Model
        </span>
      </div>

      {/* Dimensional Multi-Layer Visual Network */}
      <div className="relative aspect-[16/11] w-full rounded-2xl bg-[#021310] border border-[#B7E4D5]/15 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* SVG Topographic & Neural Connection Mesh */}
        <svg
          viewBox="0 0 500 320"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Topographic Elevation Contours */}
          <ellipse cx="250" cy="160" rx="220" ry="120" stroke="#2FA885" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
          <ellipse cx="250" cy="160" rx="160" ry="85" stroke="#2FA885" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.6" />
          <ellipse cx="250" cy="160" rx="100" ry="50" stroke="#B7E4D5" strokeWidth="0.75" opacity="0.7" />

          {/* Central Trunk Axis */}
          <path d="M250 280 C250 220 250 180 250 160 C250 140 250 100 250 40" stroke="#2FA885" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Root Input Connectors */}
          <path d="M110 270 C170 240 210 200 250 170" stroke="#B7E4D5" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M390 270 C330 240 290 200 250 170" stroke="#B7E4D5" strokeWidth="1" strokeOpacity="0.5" />

          {/* Canopy Intelligence Connectors */}
          <path d="M250 150 C210 110 170 80 110 50" stroke="#B7E4D5" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M250 150 C290 110 330 80 390 50" stroke="#B7E4D5" strokeWidth="1" strokeOpacity="0.6" />
          <path d="M110 50 C200 85 300 85 390 50" stroke="#2FA885" strokeWidth="0.75" strokeDasharray="2 3" strokeOpacity="0.4" />
        </svg>

        {/* Central Core Emblem: Exact Agletras Logo with Realistic Drop Shadow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#0A3D34] to-[#041F1B] border border-[#B7E4D5]/40 flex items-center justify-center p-2 shadow-3d-emblem">
            <Image
              src="/logo.png"
              alt="Agletras Knowledge Core"
              width={48}
              height={48}
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>
        </div>

        {/* Top Tier: Intelligence Governance & Output */}
        <div className="relative z-20 flex justify-between items-center px-1">
          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[4])}
            className={`text-left px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              selectedNode.id === "confidence"
                ? "bg-[#2FA885]/25 border-[#2FA885] text-[#FFFFFF] shadow-md scale-105"
                : "bg-[#041F1B]/95 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Phase 05</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Shield size={12} className="text-[#2FA885]" />
              Confidence Review
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[5])}
            className={`text-left px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              selectedNode.id === "deliverable"
                ? "bg-[#2FA885]/30 border-[#2FA885] text-[#FFFFFF] shadow-md scale-105"
                : "bg-[#041F1B]/95 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Phase 06</span>
            <span className="text-xs font-semibold text-[#B7E4D5] flex items-center gap-1.5">
              <FileSpreadsheet size={12} className="text-[#B7E4D5]" />
              Decision Output
            </span>
          </button>
        </div>

        {/* Mid Tier: Extraction & Correlation */}
        <div className="relative z-20 flex justify-between items-center px-3 my-auto">
          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[2])}
            className={`text-left px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              selectedNode.id === "evidence"
                ? "bg-[#2FA885]/25 border-[#2FA885] text-[#FFFFFF] shadow-md scale-105"
                : "bg-[#041F1B]/95 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Phase 03</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Search size={12} className="text-[#2FA885]" />
              Evidence Extraction
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[3])}
            className={`text-left px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              selectedNode.id === "correlation"
                ? "bg-[#2FA885]/25 border-[#2FA885] text-[#FFFFFF] shadow-md scale-105"
                : "bg-[#041F1B]/95 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Phase 04</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Network size={12} className="text-[#2FA885]" />
              Entity Graph
            </span>
          </button>
        </div>

        {/* Bottom Tier: Ingestion & Questions */}
        <div className="relative z-20 flex justify-between items-center px-1">
          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[0])}
            className={`text-left px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              selectedNode.id === "question"
                ? "bg-[#2FA885]/25 border-[#2FA885] text-[#FFFFFF] shadow-md scale-105"
                : "bg-[#041F1B]/95 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Phase 01</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Info size={12} className="text-[#B7E4D5]" />
              Business Inquiry
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[1])}
            className={`text-left px-3.5 py-2 rounded-xl border transition-all shadow-sm ${
              selectedNode.id === "sources"
                ? "bg-[#2FA885]/25 border-[#2FA885] text-[#FFFFFF] shadow-md scale-105"
                : "bg-[#041F1B]/95 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Phase 02</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-[#2FA885]" />
              Permitted Sources
            </span>
          </button>
        </div>
      </div>

      {/* Selected Node Details Card with 3D Depth */}
      <div className="mt-5 p-5 rounded-2xl bg-[#031714] border border-[#B7E4D5]/20 shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-[#2FA885] tracking-wider uppercase font-semibold">
            {selectedNode.stage} // {selectedNode.title}
          </span>
          <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20 font-medium">
            {selectedNode.category}
          </span>
        </div>
        <p className="text-xs text-[#C5D9D2] leading-relaxed font-light mb-3">
          {selectedNode.description}
        </p>
        <div className="pt-2 border-t border-[#073B32] flex items-center gap-2 text-[11px] font-mono text-[#8DA99E]">
          <Layers size={13} className="text-[#2FA885] shrink-0" />
          <span className="truncate">{selectedNode.osintVector}</span>
        </div>
      </div>

      {/* Explicit Illustrative Disclaimer */}
      <p className="text-[11px] text-[#718E84] text-center mt-4 font-mono">
        * Illustrative research lifecycle model • Strictly non-intrusive lawful sources
      </p>
    </div>
  );
}
