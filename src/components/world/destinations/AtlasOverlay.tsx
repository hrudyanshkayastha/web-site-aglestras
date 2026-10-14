"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraphNode,
  ILLUSTRATIVE_GRAPH_NODES,
  ENTITY_CATEGORIES,
  EntityCategory,
  EPISTEMIC_TIERS,
  EpistemicTier,
} from "@/data/entityGraphData";
import { Shield, ArrowUpRight, Compass, X, RotateCcw, Filter, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EntityDetailsPanel } from "@/components/visuals/EntityDetailsPanel";

interface AtlasOverlayProps {
  selectedNode: GraphNode | null;
  onSelectNode: (node: GraphNode | null) => void;
}

export function AtlasOverlay({
  selectedNode,
  onSelectNode,
}: AtlasOverlayProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [activeTier, setActiveTier] = useState<string>("ALL");
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const filteredNodes = ILLUSTRATIVE_GRAPH_NODES.filter((n) => {
    const matchesCategory = activeCategory === "ALL" || n.category === activeCategory;
    const matchesTier = activeTier === "ALL" || n.epistemicTier === activeTier;
    return matchesCategory && matchesTier;
  });

  const currentIndex = selectedNode
    ? filteredNodes.findIndex((n) => n.id === selectedNode.id)
    : -1;

  // Global Keyboard Navigation
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
        if (filteredNodes.length > 0) {
          if (currentIndex <= 0) {
            onSelectNode(filteredNodes[filteredNodes.length - 1]);
          } else {
            onSelectNode(filteredNodes[currentIndex - 1]);
          }
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (filteredNodes.length > 0) {
          if (currentIndex >= filteredNodes.length - 1 || currentIndex === -1) {
            onSelectNode(filteredNodes[0]);
          } else {
            onSelectNode(filteredNodes[currentIndex + 1]);
          }
        }
      } else if (e.key === "Escape") {
        if (selectedNode) {
          e.preventDefault();
          onSelectNode(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, filteredNodes, onSelectNode, selectedNode]);

  const handlePrevNode = () => {
    if (filteredNodes.length === 0) return;
    if (currentIndex <= 0) {
      onSelectNode(filteredNodes[filteredNodes.length - 1]);
    } else {
      onSelectNode(filteredNodes[currentIndex - 1]);
    }
  };

  const handleNextNode = () => {
    if (filteredNodes.length === 0) return;
    if (currentIndex >= filteredNodes.length - 1 || currentIndex === -1) {
      onSelectNode(filteredNodes[0]);
    } else {
      onSelectNode(filteredNodes[currentIndex + 1]);
    }
  };

  return (
    <section
      id="destination-atlas"
      className="min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-28 pb-32 relative z-20 pointer-events-none"
      aria-label="Agletras Interactive 3D Evidence Atlas"
    >
      {/* Top Floating Atlas Header & Category Filter HUD */}
      <div className="w-full max-w-3xl mx-auto pointer-events-auto space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031714]/85 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
          <span>Destination 04 // Interactive Evidence Atlas</span>
        </div>

        {/* Collapsible Headline (Hides smoothly when entity is focused to maximize 3D visibility) */}
        <AnimatePresence>
          {!selectedNode && (
            <motion.div
              initial={isReducedMotion ? undefined : { opacity: 0, height: 0 }}
              animate={isReducedMotion ? undefined : { opacity: 1, height: "auto" }}
              exit={isReducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 overflow-hidden"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA] drop-shadow-[0_4px_20px_rgba(2,15,12,0.9)]">
                Dimensional Relational Topology.{" "}
                <span className="italic font-normal text-[#B7E4D5]">
                  Traceable Evidence.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[#C5D9D2] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(2,15,12,0.9)]">
                Explore interconnected public entities in 3D space. Click any entity node below or directly in the 3D sanctuary to examine provenance, epistemic tier, and relationships.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2" role="toolbar" aria-label="Entity filters">
          <button
            type="button"
            onClick={() => setActiveCategory("ALL")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md ${
              activeCategory === "ALL"
                ? "bg-[#2FA885] text-[#041F1B] font-semibold border border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.35)]"
                : "bg-[#031714]/85 text-[#B7E4D5] hover:bg-[#073B32] border border-[#B7E4D5]/20"
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md ${
                  isCatActive
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold border border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.35)]"
                    : "bg-[#031714]/85 text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32] border border-[#B7E4D5]/20"
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

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#073B32]/80 border border-amber-500/30 text-[11px] font-mono text-amber-300 backdrop-blur-md shadow-md">
              <Shield size={12} className="text-amber-400" />
              <span>SIMULATED DATA</span>
            </span>

            <Link
              href="/research"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#B7E4D5] hover:text-[#FFFFFF] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/30 transition-all cursor-pointer backdrop-blur-md shadow-md"
              title="View all research domains"
            >
              <span>Research Domains</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Center 3D Space is Wide Open! */}

      {/* Floating Entity Details Inspector Panel (Docked Right, matching Services Pavilion layout) */}
      <AnimatePresence>
        {selectedNode && (
          <motion.aside
            key={selectedNode.id}
            initial={isReducedMotion ? undefined : { opacity: 0, y: 15, scale: 0.98 }}
            animate={isReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={isReducedMotion ? undefined : { opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:absolute lg:right-8 lg:top-24 w-full lg:w-[440px] max-w-full z-30 pointer-events-auto my-6 lg:my-0"
            aria-label={`Evidence Dossier for ${selectedNode.name}`}
          >
            <EntityDetailsPanel
              node={selectedNode}
              onClose={() => onSelectNode(null)}
              onSelectNode={(nodeId) => {
                const found = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === nodeId) || null;
                onSelectNode(found);
              }}
              onPrevNode={handlePrevNode}
              onNextNode={handleNextNode}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Bottom Floating Quick Entity Selector Dock */}
      <div className="w-full max-w-4xl mx-auto pointer-events-auto space-y-3">
        {/* Quick Entity Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar p-2 rounded-2xl bg-[#031714]/85 border border-[#B7E4D5]/25 backdrop-blur-xl shadow-xl">
          <span className="text-[10px] font-mono text-[#8DA99E] uppercase tracking-wider px-2 shrink-0 hidden sm:inline">
            Quick Focus:
          </span>
          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const categoryMeta = ENTITY_CATEGORIES[node.category];

            return (
              <button
                key={node.id}
                type="button"
                data-node-id={node.id}
                onClick={() => onSelectNode(isSelected ? null : node)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold border border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.4)] -translate-y-0.5"
                    : "bg-[#041F1B]/80 text-[#C5D9D2] border border-[#B7E4D5]/15 hover:border-[#2FA885]/60 hover:text-[#FFFFFF]"
                }`}
                title={`Focus node in 3D: ${node.name}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: categoryMeta?.color || "#2FA885" }}
                />
                <span className="truncate max-w-[150px]">{node.name}</span>
                <span className="text-[10px] opacity-70">[{node.epistemicTier}]</span>
              </button>
            );
          })}

          {selectedNode && (
            <button
              type="button"
              onClick={() => onSelectNode(null)}
              className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/30 text-xs font-mono transition-all shrink-0 cursor-pointer"
              title="Reset view to full network overview (Esc)"
            >
              <RotateCcw size={12} className="text-[#2FA885]" />
              <span>Overview</span>
            </button>
          )}
        </div>

        {/* Hint bar (Only when no node is selected) */}
        {!selectedNode && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#031714]/85 border border-[#B7E4D5]/20 text-xs font-mono text-[#B7E4D5] backdrop-blur-md shadow-md">
              <Compass size={13} className="text-[#2FA885] animate-spin" />
              <span>Click any node in 3D space or choose from the dock above to inspect evidence provenance and connections.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
