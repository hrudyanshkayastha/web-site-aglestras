"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, CheckCircle2, Shield, Search, Network, FileSpreadsheet, ArrowRight } from "lucide-react";

interface NodeInfo {
  id: string;
  stage: string;
  title: string;
  description: string;
  category: "input" | "source" | "evidence" | "correlation" | "confidence" | "output";
}

const networkNodes: NodeInfo[] = [
  {
    id: "question",
    stage: "01. Inquiry",
    title: "The Business Question",
    description: "The client identifies a counterparty risk, external threat signal, or market-entry unknown.",
    category: "input",
  },
  {
    id: "sources",
    stage: "02. Discovery",
    title: "Permitted Public Sources",
    description: "Lawful collection across passive DNS, transparency certs, public business registries, and open repositories.",
    category: "source",
  },
  {
    id: "evidence",
    stage: "03. Extraction",
    title: "Evidence Extraction",
    description: "Filtering raw signals into timestamped, source-attributed records with strict provenance capture.",
    category: "evidence",
  },
  {
    id: "correlation",
    stage: "04. Synthesis",
    title: "Correlated Relationships",
    description: "Mapping entity intersections, infrastructure overlaps, and timeline sequences into structured graphs.",
    category: "correlation",
  },
  {
    id: "confidence",
    stage: "05. Governance",
    title: "Confidence & Epistemic Review",
    description: "Rigorous human analyst review classifying findings into Facts, Indicators, and Inferences.",
    category: "confidence",
  },
  {
    id: "deliverable",
    stage: "06. Intelligence",
    title: "Decision-Ready Brief",
    description: "A comprehensive executive brief with defensible citations, risk ratings, and defensive actions.",
    category: "output",
  },
];

export function LivingKnowledgeSystem() {
  const [selectedNode, setSelectedNode] = useState<NodeInfo>(networkNodes[0]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#073B32]/70 via-[#041F1B]/90 to-[#031714] border border-[#B7E4D5]/20 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(3,23,20,0.6)] relative overflow-hidden">
      {/* Decorative botanical mesh */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2FA885]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B7E4D5]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2FA885] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-medium">
            Living Knowledge System
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#8DA99E]">
          Research Pipeline Model
        </span>
      </div>

      {/* Interactive Network Diagram */}
      <div className="relative aspect-[16/11] w-full rounded-2xl bg-[#031714]/80 border border-[#B7E4D5]/10 p-4 flex flex-col justify-between overflow-hidden">
        {/* Subtle background SVG botanical tree lines */}
        <svg
          viewBox="0 0 500 320"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trunk & Core convergence */}
          <path
            d="M250 280 C250 230 250 180 250 160 C250 140 250 90 250 40"
            stroke="#2FA885"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* Roots from bottom */}
          <path
            d="M120 280 C180 250 220 220 250 180"
            stroke="#B7E4D5"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <path
            d="M380 280 C320 250 280 220 250 180"
            stroke="#B7E4D5"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          {/* Canopy branches toward top */}
          <path
            d="M250 140 C220 100 170 70 110 50"
            stroke="#B7E4D5"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <path
            d="M250 140 C280 100 330 70 390 50"
            stroke="#B7E4D5"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          {/* Lateral connection filaments */}
          <path
            d="M110 50 C180 90 320 90 390 50"
            stroke="#2FA885"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            strokeOpacity="0.3"
          />
        </svg>

        {/* Central Logo Convergence Emblem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-[#073B32]/90 border border-[#B7E4D5]/40 flex items-center justify-center p-2 shadow-[0_0_24px_rgba(47,168,133,0.3)]">
            <Image
              src="/logo.png"
              alt="Agletras Knowledge Core"
              width={48}
              height={48}
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>
        </div>

        {/* Top Canopy Tier: Decision Intelligence */}
        <div className="relative z-20 flex justify-between items-center px-2">
          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[4])}
            className={`group text-left px-3 py-1.5 rounded-xl border transition-all ${
              selectedNode.id === "confidence"
                ? "bg-[#2FA885]/20 border-[#2FA885] text-[#FFFFFF]"
                : "bg-[#041F1B]/90 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Stage 05</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Shield size={12} className="text-[#2FA885]" />
              Confidence Review
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[5])}
            className={`group text-left px-3 py-1.5 rounded-xl border transition-all ${
              selectedNode.id === "deliverable"
                ? "bg-[#2FA885]/25 border-[#2FA885] text-[#FFFFFF]"
                : "bg-[#041F1B]/90 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Stage 06</span>
            <span className="text-xs font-semibold text-[#B7E4D5] flex items-center gap-1.5">
              <FileSpreadsheet size={12} className="text-[#B7E4D5]" />
              Decision Output
            </span>
          </button>
        </div>

        {/* Mid Tier: Extraction & Correlation */}
        <div className="relative z-20 flex justify-between items-center px-4 my-auto">
          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[2])}
            className={`group text-left px-3 py-1.5 rounded-xl border transition-all ${
              selectedNode.id === "evidence"
                ? "bg-[#2FA885]/20 border-[#2FA885] text-[#FFFFFF]"
                : "bg-[#041F1B]/90 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Stage 03</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Search size={12} className="text-[#2FA885]" />
              Evidence Extraction
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[3])}
            className={`group text-left px-3 py-1.5 rounded-xl border transition-all ${
              selectedNode.id === "correlation"
                ? "bg-[#2FA885]/20 border-[#2FA885] text-[#FFFFFF]"
                : "bg-[#041F1B]/90 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Stage 04</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Network size={12} className="text-[#2FA885]" />
              Correlated Graph
            </span>
          </button>
        </div>

        {/* Bottom Tier: Ingestion & Questions */}
        <div className="relative z-20 flex justify-between items-center px-2">
          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[0])}
            className={`group text-left px-3 py-1.5 rounded-xl border transition-all ${
              selectedNode.id === "question"
                ? "bg-[#2FA885]/20 border-[#2FA885] text-[#FFFFFF]"
                : "bg-[#041F1B]/90 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Stage 01</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <Info size={12} className="text-[#B7E4D5]" />
              Business Question
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedNode(networkNodes[1])}
            className={`group text-left px-3 py-1.5 rounded-xl border transition-all ${
              selectedNode.id === "sources"
                ? "bg-[#2FA885]/20 border-[#2FA885] text-[#FFFFFF]"
                : "bg-[#041F1B]/90 border-[#B7E4D5]/20 text-[#C5D9D2] hover:border-[#B7E4D5]/50"
            }`}
          >
            <span className="block text-[10px] font-mono text-[#8DA99E]">Stage 02</span>
            <span className="text-xs font-medium flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-[#2FA885]" />
              Permitted Sources
            </span>
          </button>
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="mt-5 p-4 rounded-xl bg-[#031714] border border-[#B7E4D5]/15 transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-xs text-[#2FA885] tracking-wider uppercase font-semibold">
            {selectedNode.stage}
          </span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            {selectedNode.category}
          </span>
        </div>
        <h4 className="text-base font-semibold text-[#F4F2EA] mb-1">
          {selectedNode.title}
        </h4>
        <p className="text-xs text-[#A1B8B0] leading-relaxed font-light">
          {selectedNode.description}
        </p>
      </div>

      {/* Trust Annotation */}
      <p className="text-[11px] text-[#718E84] text-center mt-4 font-mono">
        Interactive research lifecycle model • Lawful public sources only
      </p>
    </div>
  );
}
