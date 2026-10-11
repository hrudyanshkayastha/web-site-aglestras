"use client";

import React from "react";
import {
  GraphNode,
  ENTITY_CATEGORIES,
  ILLUSTRATIVE_GRAPH_NODES,
  ILLUSTRATIVE_GRAPH_EDGES,
  EntityCategory,
} from "@/data/entityGraphData";
import { ShieldCheck, Info } from "lucide-react";

interface AccessibleGraphFallbackProps {
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  activeCategoryFilter: EntityCategory | "ALL";
  onSelectCategoryFilter: (cat: EntityCategory | "ALL") => void;
  className?: string;
}

export function AccessibleGraphFallback({
  selectedNodeId,
  onSelectNode,
  activeCategoryFilter,
  onSelectCategoryFilter,
  className = "",
}: AccessibleGraphFallbackProps) {
  // Normalize 3D coordinates into 2D SVG viewBox coordinates (width 700, height 500)
  const getNodeCoord = (node: GraphNode) => {
    // node.position: [x, y, z] where x is ~ -3.5 to +3.5, y is ~ -2.5 to +2.5
    const cx = 350 + node.position[0] * 80;
    const cy = 250 - node.position[1] * 80;
    return { cx, cy };
  };

  const filteredNodes =
    activeCategoryFilter === "ALL"
      ? ILLUSTRATIVE_GRAPH_NODES
      : ILLUSTRATIVE_GRAPH_NODES.filter((n) => n.category === activeCategoryFilter);

  const selectedNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === selectedNodeId);

  // Check if edge is connected to selected node
  const isEdgeConnected = (sourceId: string, targetId: string) => {
    if (!selectedNodeId) return false;
    return sourceId === selectedNodeId || targetId === selectedNodeId;
  };

  return (
    <div
      className={`relative w-full rounded-3xl bg-[#041F1B] border border-[#B7E4D5]/20 overflow-hidden p-6 text-[#F4F2EA] ${className}`}
      aria-label="2D OSINT Entity Graph Fallback"
    >
      {/* Fallback Notice Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-[#B7E4D5]/15 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#B7E4D5]">
          <Info size={14} className="text-[#2FA885]" />
          <span>2D Accessible Topology View</span>
        </div>
        <span className="text-[10px] text-[#8DA99E]">
          WCAG-Compliant Keyboard & Touch Accessible
        </span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => onSelectCategoryFilter("ALL")}
          className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
            activeCategoryFilter === "ALL"
              ? "bg-[#2FA885] text-[#041F1B] font-semibold"
              : "bg-[#073B32]/60 text-[#8DA99E] hover:text-[#FFFFFF]"
          }`}
        >
          All Entities ({ILLUSTRATIVE_GRAPH_NODES.length})
        </button>
        {(Object.keys(ENTITY_CATEGORIES) as EntityCategory[]).map((cat) => {
          const count = ILLUSTRATIVE_GRAPH_NODES.filter((n) => n.category === cat).length;
          const meta = ENTITY_CATEGORIES[cat];
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                activeCategoryFilter === cat
                  ? "bg-[#2FA885] text-[#041F1B] font-semibold"
                  : "bg-[#073B32]/60 text-[#8DA99E] hover:text-[#FFFFFF]"
              }`}
            >
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* SVG Interactive Topology Diagram */}
      <div className="relative w-full aspect-[7/5] bg-[#021310] rounded-2xl border border-[#B7E4D5]/10 overflow-hidden mb-6">
        <svg
          viewBox="0 0 700 500"
          className="w-full h-full"
          role="img"
          aria-label="Diagram of connected entities"
        >
          {/* Subtle background coordinate grid */}
          <defs>
            <pattern id="fallback-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B7E4D5" strokeWidth="0.5" opacity="0.08" />
            </pattern>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="14"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#2FA885" opacity="0.8" />
            </marker>
          </defs>

          <rect width="700" height="500" fill="url(#fallback-grid)" />

          {/* Render Connecting Edges */}
          {ILLUSTRATIVE_GRAPH_EDGES.map((edge) => {
            const sourceNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === edge.source);
            const targetNode = ILLUSTRATIVE_GRAPH_NODES.find((n) => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const p1 = getNodeCoord(sourceNode);
            const p2 = getNodeCoord(targetNode);
            const connected = isEdgeConnected(edge.source, edge.target);

            return (
              <g key={edge.id}>
                <line
                  x1={p1.cx}
                  y1={p1.cy}
                  x2={p2.cx}
                  y2={p2.cy}
                  stroke={connected ? "#2FA885" : "#B7E4D5"}
                  strokeWidth={connected ? 2.5 : 1}
                  strokeDasharray={connected ? "none" : "3 3"}
                  opacity={connected ? 0.9 : selectedNodeId ? 0.15 : 0.4}
                  markerEnd={edge.directional && connected ? "url(#arrowhead)" : undefined}
                />
              </g>
            );
          })}

          {/* Render Interactive Nodes */}
          {ILLUSTRATIVE_GRAPH_NODES.map((node) => {
            const { cx, cy } = getNodeCoord(node);
            const isSelected = node.id === selectedNodeId;
            const isDimmed = selectedNodeId && !isSelected && !isEdgeConnected(node.id, selectedNodeId);

            return (
              <g
                key={node.id}
                onClick={() => onSelectNode(node.id)}
                className="cursor-pointer transition-transform duration-200"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectNode(node.id);
                  }
                }}
                aria-label={`Node: ${node.name}, Category: ${node.categoryLabel}`}
                opacity={isDimmed ? 0.25 : 1}
              >
                {/* Node Outer Halo Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 26 : 18}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={isSelected ? 3 : 1.5}
                  strokeDasharray={isSelected ? "4 2" : "none"}
                  opacity={isSelected ? 1 : 0.6}
                />

                {/* Node Solid Center */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 14 : 9}
                  fill={node.color}
                  className="transition-all"
                />

                {/* Node Name Label */}
                <text
                  x={cx}
                  y={cy + (isSelected ? 38 : 28)}
                  textAnchor="middle"
                  fill={isSelected ? "#F4F2EA" : "#C5D9D2"}
                  fontSize={isSelected ? "11" : "9"}
                  fontFamily="monospace"
                  fontWeight={isSelected ? "600" : "400"}
                  className="select-none pointer-events-none"
                >
                  {node.name.length > 22 ? `${node.name.slice(0, 20)}...` : node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Semantic Screen-Reader Accessible HTML List */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#8DA99E]">
          Tabular Entity Index ({filteredNodes.length} Elements)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectNode(node.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#073B32] border-[#2FA885] shadow-sm"
                    : "bg-[#073B32]/30 border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
                    {node.category}
                  </span>
                </div>
                <strong className="text-xs text-[#F4F2EA] block truncate font-medium">
                  {node.name}
                </strong>
                <p className="text-[11px] text-[#A1B8B0] line-clamp-2 mt-1 font-light">
                  {node.summary}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
