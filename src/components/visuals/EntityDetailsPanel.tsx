"use client";

import React, { useEffect, useRef } from "react";
import { X, ExternalLink, ShieldCheck, ArrowRight, Database, AlertCircle, Sparkles } from "lucide-react";
import {
  GraphNode,
  ENTITY_CATEGORIES,
  ILLUSTRATIVE_GRAPH_NODES,
  ILLUSTRATIVE_GRAPH_EDGES,
} from "@/data/entityGraphData";

interface EntityDetailsPanelProps {
  node: GraphNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
}

export function EntityDetailsPanel({
  node,
  onClose,
  onSelectNode,
}: EntityDetailsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const categoryMeta = ENTITY_CATEGORIES[node.category];

  // Find connected edges and target nodes
  const connectedEdges = ILLUSTRATIVE_GRAPH_EDGES.filter(
    (e) => e.source === node.id || e.target === node.id
  );

  const connectedNodes = connectedEdges.map((e) => {
    const otherId = e.source === node.id ? e.target : e.source;
    const targetNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === otherId);
    return {
      edge: e,
      node: targetNode,
      isOutgoing: e.source === node.id,
    };
  });

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Entity Details Inspector"
      className="w-full md:w-96 rounded-2xl bg-[#031714]/95 border border-[#B7E4D5]/30 shadow-3d-card backdrop-blur-xl p-5 md:p-6 text-[#F4F2EA] flex flex-col justify-between space-y-5 animate-in fade-in slide-in-from-right-4 duration-300 relative z-30"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 border-b border-[#B7E4D5]/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider font-semibold border ${categoryMeta.badgeClass}`}
            >
              {categoryMeta.label}
            </span>
            <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
              ID: {node.id}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-editorial font-medium text-[#F4F2EA] leading-snug">
            {node.name}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close entity details inspector"
          className="p-1.5 rounded-lg text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2FA885]"
        >
          <X size={16} />
        </button>
      </div>

      {/* Epistemic Standard Label */}
      <div className="p-3 rounded-xl bg-[#041F1B] border border-[#B7E4D5]/15 space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E] block">
          Epistemic Classification:
        </span>
        <div className="flex items-center gap-2 text-xs font-mono text-[#B7E4D5]">
          <ShieldCheck size={14} className="text-[#2FA885] shrink-0" />
          <span className="font-semibold">{node.epistemicTier}</span>
          <span className="text-[#8DA99E] text-[11px] font-normal">
            — {node.epistemicLabel}
          </span>
        </div>
      </div>

      {/* Summary & Analysis Details */}
      <div className="space-y-3 text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E] block mb-1">
            Intelligence Overview:
          </span>
          <p className="text-[#C5D9D2] font-light leading-relaxed">
            {node.summary}
          </p>
        </div>

        <div className="pt-2 border-t border-[#B7E4D5]/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E] block mb-1">
            Forensic Scope:
          </span>
          <p className="text-[#A1B8B0] font-light leading-relaxed">
            {node.details}
          </p>
        </div>
      </div>

      {/* Source Provenance */}
      <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/15 space-y-1 text-xs">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#B7E4D5]">
          <Database size={12} className="text-[#2FA885]" />
          <span>Attributed Public Provenance</span>
        </div>
        <p className="text-[11px] text-[#C5D9D2] font-mono leading-tight">
          {node.evidenceSource}
        </p>
        {node.evidenceArtifact && (
          <p className="text-[10px] text-[#8DA99E] font-mono truncate pt-1">
            Hash: {node.evidenceArtifact}
          </p>
        )}
      </div>

      {/* Connected Relationship Network */}
      <div className="space-y-2 pt-1 border-t border-[#B7E4D5]/15">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E] block">
          Direct Relationships ({connectedNodes.length}):
        </span>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {connectedNodes.map(({ edge, node: targetNode, isOutgoing }) => {
            if (!targetNode) return null;
            return (
              <button
                key={edge.id}
                type="button"
                onClick={() => onSelectNode(targetNode.id)}
                className="w-full text-left p-2 rounded-lg bg-[#041F1B] hover:bg-[#073B32] border border-[#B7E4D5]/10 hover:border-[#2FA885]/40 transition-all flex items-center justify-between group focus:outline-none focus:ring-1 focus:ring-[#2FA885]"
              >
                <div className="truncate pr-2">
                  <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                    {edge.label} {isOutgoing ? "→" : "←"}
                  </span>
                  <span className="text-xs text-[#E2F4EE] group-hover:text-[#B7E4D5] font-medium truncate block">
                    {targetNode.name}
                  </span>
                </div>
                <ArrowRight
                  size={12}
                  className="text-[#8DA99E] group-hover:text-[#B7E4D5] group-hover:translate-x-0.5 transition-transform shrink-0"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-2.5 rounded-lg bg-[#021310] border border-[#B7E4D5]/10 text-[10px] font-mono text-[#718E84] flex items-start gap-2 leading-tight">
        <AlertCircle size={13} className="text-[#8DA99E] shrink-0 mt-0.5" />
        <span>
          Illustrative Demonstration: Fictitious topology for methodological demonstration only; does not represent live investigation telemetry.
        </span>
      </div>
    </div>
  );
}
