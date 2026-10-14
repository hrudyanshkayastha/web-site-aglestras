"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Search,
  Layers,
  AlertCircle,
  Database,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Sparkles,
  Network,
} from "lucide-react";
import {
  GraphNode,
  ENTITY_CATEGORIES,
  EPISTEMIC_TIERS,
  EpistemicTier,
  ILLUSTRATIVE_GRAPH_NODES,
  ILLUSTRATIVE_GRAPH_EDGES,
} from "@/data/entityGraphData";

interface EntityDetailsPanelProps {
  node: GraphNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onPrevNode?: () => void;
  onNextNode?: () => void;
}

const tierIconMap: Record<string, React.ElementType> = {
  FACT: ShieldCheck,
  INDICATOR: Search,
  INFERENCE: Layers,
  UNRESOLVED: AlertCircle,
  ASSUMPTION: AlertCircle,
};

export function EntityDetailsPanel({
  node,
  onClose,
  onSelectNode,
  onPrevNode,
  onNextNode,
}: EntityDetailsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrevNode) {
        e.preventDefault();
        onPrevNode();
      } else if (e.key === "ArrowRight" && onNextNode) {
        e.preventDefault();
        onNextNode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrevNode, onNextNode]);

  if (!node) return null;

  const categoryMeta = ENTITY_CATEGORIES[node.category];
  const tierKey = (node.epistemicTier as EpistemicTier) || "FACT";
  const tierMeta = EPISTEMIC_TIERS[tierKey] || EPISTEMIC_TIERS.FACT;
  const TierIcon = tierIconMap[tierKey] || ShieldCheck;

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
      aria-label={`Evidence Dossier for ${node.name}`}
      className="w-full max-w-full rounded-3xl bg-[#031714]/94 border border-[#2FA885]/55 shadow-[0_24px_64px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-5 sm:p-6 text-[#F4F2EA] flex flex-col justify-between space-y-4 max-h-[76vh] overflow-y-auto pointer-events-auto"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 border-b border-[#B7E4D5]/15 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${categoryMeta.badgeClass}`}
            >
              {categoryMeta.label}
            </span>
            <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
              // {node.id}
            </span>
          </div>
          <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] leading-tight">
            {node.name}
          </h3>
          <p className="text-[11px] font-mono text-[#B7E4D5]">
            {node.categoryLabel}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          data-action="close-inspector"
          aria-label="Return to network overview"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#073B32]/80 text-[#B7E4D5] hover:text-[#FFFFFF] hover:bg-[#073B32] border border-[#B7E4D5]/25 text-[11px] font-mono transition-all cursor-pointer shrink-0"
          title="Return to full network view (Esc)"
        >
          <span>Overview</span>
          <X size={12} />
        </button>
      </div>

      {/* 4-Tier Epistemic Standard Label */}
      <div className="p-3.5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E] block">
            Epistemic Evidence Tier:
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${tierMeta.badgeClass}`}
          >
            {tierMeta.label}
          </span>
        </div>
        <div className="flex items-start gap-2 pt-0.5">
          <TierIcon size={14} className="text-[#2FA885] mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-xs font-mono text-[#F4F2EA] block font-medium">
              {node.epistemicLabel}
            </span>
            <span className="text-[10px] text-[#A1B8B0] font-light leading-relaxed block">
              {tierMeta.description}
            </span>
          </div>
        </div>
      </div>

      {/* Summary & Analysis Details */}
      <div className="space-y-2.5 text-xs">
        <div className="p-3.5 rounded-xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#2FA885] font-semibold block">
            Intelligence Overview:
          </span>
          <p className="text-[#D8E8E2] text-[11px] leading-relaxed font-light">
            {node.summary}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#B7E4D5] font-semibold block">
            Forensic Scope:
          </span>
          <p className="text-[#C5D9D2] text-[11px] leading-relaxed font-light">
            {node.details}
          </p>
        </div>
      </div>

      {/* Attributed Public Provenance */}
      <div className="p-3.5 rounded-2xl bg-[#073B32]/40 border border-[#B7E4D5]/20 space-y-1 text-xs">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#B7E4D5] font-semibold">
          <Database size={12} className="text-[#2FA885]" />
          <span>Attributed Public Provenance</span>
        </div>
        <p className="text-[11px] text-[#F4F2EA] font-mono leading-tight">
          {node.evidenceSource}
        </p>
        {node.evidenceArtifact && (
          <p className="text-[10px] text-[#8DA99E] font-mono truncate pt-1 border-t border-[#B7E4D5]/10 mt-1">
            Artifact: {node.evidenceArtifact}
          </p>
        )}
      </div>

      {/* Connected Relationship Network */}
      <div className="space-y-2 pt-1 border-t border-[#B7E4D5]/15">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E] block">
          Connected Graph Relationships ({connectedNodes.length}):
        </span>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {connectedNodes.map(({ edge, node: targetNode, isOutgoing }) => {
            if (!targetNode) return null;
            return (
              <button
                key={edge.id}
                type="button"
                onClick={() => onSelectNode(targetNode.id)}
                className="w-full text-left p-2.5 rounded-xl bg-[#041F1B]/95 hover:bg-[#073B32] border border-[#B7E4D5]/15 hover:border-[#2FA885]/60 transition-all flex items-center justify-between group cursor-pointer"
                title={`Focus connected entity in 3D: ${targetNode.name}`}
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
                  className="text-[#8DA99E] group-hover:text-[#2FA885] group-hover:translate-x-0.5 transition-transform shrink-0"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Prev / Next Entity Tour Controls */}
      {(onPrevNode || onNextNode) && (
        <div className="flex items-center justify-between pt-2 border-t border-[#B7E4D5]/15 text-xs font-mono">
          <button
            type="button"
            data-action="prev-entity"
            onClick={onPrevNode}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
            title="Previous entity (ArrowLeft)"
          >
            <ChevronLeft size={14} />
            <span>Prev Entity</span>
          </button>

          <span className="text-[10px] text-[#8DA99E] hidden sm:inline">
            Use ← / → keys or Esc
          </span>

          <button
            type="button"
            data-action="next-entity"
            onClick={onNextNode}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
            title="Next entity (ArrowRight)"
          >
            <span>Next Entity</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Mandatory Fictional Demonstration Notice */}
      <div className="p-2.5 rounded-xl bg-[#021310] border border-amber-500/20 text-[10px] font-mono text-[#8DA99E] flex items-start gap-2 leading-tight">
        <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-amber-300">Fictional Demonstration Topology:</strong> Synthetic dataset demonstrating relational epistemic methodology. No real targets or live surveillance.
        </span>
      </div>
    </div>
  );
}
