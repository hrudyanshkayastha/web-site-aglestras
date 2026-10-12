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
  return (
    <section
      id="destination-atlas"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-36 relative z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/95 via-[#031714]/92 to-[#031714]/94 border border-[#B7E4D5]/20 backdrop-blur-2xl shadow-2xl">
        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 04 // Research & Capabilities Topology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              Dimensional Relational Topology.{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                Traceable Evidence.
              </span>
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light">
              Explore interconnected entities embedded directly in the 3D sanctuary. Click any node in 3D or select below to examine its provenance and confidence tier.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#073B32]/70 px-3.5 py-2 rounded-full border border-[#B7E4D5]/20 text-xs font-mono text-[#B7E4D5] shrink-0 shadow-sm backdrop-blur-sm">
              <Shield size={13} className="text-[#2FA885]" />
              <span>Illustrative Demonstration Topology</span>
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

        {/* Entity Selector Quick Tray */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2">
          {ILLUSTRATIVE_GRAPH_NODES.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const cat = ENTITY_CATEGORIES[node.category];

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectNode(isSelected ? null : node)}
                className={`p-2.5 rounded-xl border text-left transition-all backdrop-blur-md flex flex-col justify-between ${
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
                  <span className="text-[9px] font-mono text-[#8DA99E] uppercase">
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
