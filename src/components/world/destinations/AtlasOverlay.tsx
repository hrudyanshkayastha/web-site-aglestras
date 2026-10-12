"use client";

import React from "react";
import Link from "next/link";
import {
  GraphNode,
  ILLUSTRATIVE_GRAPH_NODES,
  ENTITY_CATEGORIES,
} from "@/data/entityGraphData";
import { ArrowUpRight, Shield, Sparkles, Network } from "lucide-react";

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
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 py-24 relative z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto">
        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6 backdrop-blur-sm">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 04 // Observatory Intelligence Atlas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              Dimensional Relational Topology.{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                Traceable Evidence.
              </span>
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light">
              Explore interconnected entities embedded directly in the 3D sanctuary. Click any entity node in 3D or select below to examine its provenance and confidence tier.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#031714]/85 px-3 py-1.5 rounded-full border border-[#B7E4D5]/20 text-xs font-mono text-[#718E84] shrink-0">
            <Shield size={13} className="text-[#2FA885]" />
            <span>Demonstration Topology (Fictitious Entities)</span>
          </div>
        </div>

        {/* Entity Selector Quick Tray */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ILLUSTRATIVE_GRAPH_NODES.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const cat = ENTITY_CATEGORIES[node.category];

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectNode(isSelected ? null : node)}
                className={`p-3.5 rounded-xl border text-left transition-all backdrop-blur-md flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#073B32]/95 border-[#2FA885] shadow-[0_0_20px_rgba(47,168,133,0.3)] -translate-y-1"
                    : "bg-[#031714]/80 border-[#B7E4D5]/15 hover:border-[#B7E4D5]/40 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat?.color || "#2FA885" }}
                  />
                  <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
                    {node.epistemicTier}
                  </span>
                </div>
                <div className="font-semibold text-xs text-[#F4F2EA] truncate w-full">
                  {node.name}
                </div>
                <div className="text-[10px] text-[#718E84] font-mono truncate mt-0.5">
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
