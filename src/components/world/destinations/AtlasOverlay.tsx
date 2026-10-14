"use client";

import React from "react";
import Link from "next/link";
import {
  GraphNode,
  ILLUSTRATIVE_GRAPH_NODES,
  ENTITY_CATEGORIES,
} from "@/data/entityGraphData";
import { Shield, Sparkles, ArrowUpRight } from "lucide-react";

interface AtlasOverlayProps {
  selectedNode: GraphNode | null;
  onSelectNode: (node: GraphNode | null) => void;
}

export function AtlasOverlay({
  selectedNode,
  onSelectNode,
}: AtlasOverlayProps) {
  const [activeCategory, setActiveCategory] = React.useState<string>("ALL");

  const filteredNodes = ILLUSTRATIVE_GRAPH_NODES.filter(
    (n) => activeCategory === "ALL" || n.category === activeCategory
  );

  return (
    <section
      id="destination-atlas"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-36 relative z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-7 pointer-events-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/95 via-[#031714]/92 to-[#031714]/94 border border-[#B7E4D5]/20 backdrop-blur-2xl shadow-2xl">
        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 04 // Interactive Evidence Atlas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              Dimensional Relational Topology.{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                Traceable Evidence.
              </span>
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
              Explore interconnected entities embedded directly in the 3D sanctuary. Click any entity node in 3D or below to examine its provenance, confidence tier, and relationships.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#073B32]/90 px-3.5 py-2 rounded-full border border-amber-500/30 text-xs font-mono text-amber-300 shrink-0 shadow-sm backdrop-blur-sm">
              <Shield size={13} className="text-amber-400" />
              <span>DEMONSTRATION TOPOLOGY // FICTITIOUS DATA</span>
            </div>

            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors shrink-0 font-medium bg-[#073B32]/70 px-4 py-2 rounded-full border border-[#B7E4D5]/25 backdrop-blur-sm"
            >
              <span>Research Domains</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-[#B7E4D5]/10 pb-4">
          <span className="text-xs font-mono text-[#8DA99E] uppercase tracking-wider mr-2 hidden sm:inline">
            Category Filter:
          </span>
          <button
            type="button"
            onClick={() => setActiveCategory("ALL")}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
              activeCategory === "ALL"
                ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-sm"
                : "bg-[#073B32]/70 text-[#B7E4D5] hover:bg-[#073B32]"
            }`}
          >
            All Entities ({ILLUSTRATIVE_GRAPH_NODES.length})
          </button>

          {Object.entries(ENTITY_CATEGORIES).map(([catKey, catMeta]) => {
            const count = ILLUSTRATIVE_GRAPH_NODES.filter((n) => n.category === catKey).length;
            const isCatActive = activeCategory === catKey;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setActiveCategory(catKey)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  isCatActive
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-sm"
                    : "bg-[#073B32]/50 text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32]"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: catMeta.color }}
                />
                <span>{catMeta.label} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Entity Briefing (When active) */}
        {selectedNode && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#041F1B]/95 border border-[#2FA885]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: ENTITY_CATEGORIES[selectedNode.category]?.color || "#2FA885" }}
                />
                <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold">
                  {selectedNode.categoryLabel} // Tier: [{selectedNode.epistemicTier}]
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  selectedNode.epistemicTier === "FACT"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {selectedNode.epistemicTier === "FACT" ? "Confirmed Demonstration Fact" : "Investigative Hypothesis"}
                </span>
              </div>
              <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                {selectedNode.name}
              </h3>
              <p className="text-xs text-[#C5D9D2] font-light max-w-2xl">
                {selectedNode.summary}
              </p>
              <div className="text-[10px] font-mono text-[#8DA99E]">
                Source Provenance: {selectedNode.evidenceSource}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onSelectNode(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/30 transition-all font-medium cursor-pointer"
              >
                Reset Camera
              </button>
            </div>
          </div>
        )}

        {/* Entity Selector Quick Tray */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2">
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const cat = ENTITY_CATEGORIES[node.category];

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectNode(isSelected ? null : node)}
                className={`p-2.5 rounded-xl border text-left transition-all backdrop-blur-md flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-[#073B32]/98 border-[#2FA885] shadow-[0_0_20px_rgba(47,168,133,0.35)] -translate-y-0.5"
                    : "bg-[#041F1B]/95 border-[#B7E4D5]/20 hover:border-[#2FA885]/60 hover:-translate-y-0.5 shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat?.color || "#2FA885" }}
                  />
                  <span className={`text-[9px] font-mono uppercase font-semibold ${
                    node.epistemicTier === "FACT" ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {node.epistemicTier}
                  </span>
                </div>
                <div className="font-medium text-[11px] text-[#F4F2EA] truncate w-full" title={node.name}>
                  {node.name}
                </div>
                <div className="text-[9px] text-[#718E84] font-mono truncate mt-0.5">
                  {node.categoryLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
