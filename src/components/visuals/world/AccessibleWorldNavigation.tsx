"use client";

import React, { useState } from "react";
import {
  GraphNode,
  ILLUSTRATIVE_GRAPH_NODES,
  ENTITY_CATEGORIES,
} from "@/data/entityGraphData";
import { ListFilter, ChevronDown, ChevronUp } from "lucide-react";

interface AccessibleWorldNavigationProps {
  selectedNodeId: string | null;
  onSelectNode: (node: GraphNode | null) => void;
}

export function AccessibleWorldNavigation({
  selectedNodeId,
  onSelectNode,
}: AccessibleWorldNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pointer-events-auto">
      {/* Keyboard Accessible Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="accessible-atlas-list"
        className="flex items-center justify-between w-full px-4 py-2 text-xs font-mono rounded-xl bg-[#031714]/90 border border-[#B7E4D5]/20 text-[#B7E4D5] hover:text-[#F4F2EA] hover:bg-[#073B32]/60 transition-all focus:outline-none focus:ring-2 focus:ring-[#2FA885]"
      >
        <span className="flex items-center gap-2">
          <ListFilter size={13} className="text-[#2FA885]" />
          <span>Keyboard & Screen Reader Entity Atlas ({ILLUSTRATIVE_GRAPH_NODES.length} entities)</span>
        </span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {/* Accessible List Body */}
      {isOpen && (
        <div
          id="accessible-atlas-list"
          role="region"
          aria-label="Intelligence Atlas Entities"
          className="mt-2 p-3 rounded-xl bg-[#031714]/95 border border-[#B7E4D5]/20 backdrop-blur-md max-h-60 overflow-y-auto space-y-1.5 shadow-2xl"
        >
          <p className="text-[11px] text-[#718E84] font-sans pb-1 border-b border-[#B7E4D5]/10">
            Select an entity to examine its relationships, epistemic confidence tier, and investigative evidence:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
            {ILLUSTRATIVE_GRAPH_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const cat = ENTITY_CATEGORIES[node.category];

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => onSelectNode(isSelected ? null : node)}
                  className={`flex items-start text-left gap-2 p-2 rounded-lg text-xs transition-all ${
                    isSelected
                      ? "bg-[#073B32] border border-[#B7E4D5]/60 text-[#F4F2EA]"
                      : "bg-[#041F1B]/60 hover:bg-[#073B32]/40 border border-[#B7E4D5]/10 text-[#C5D9D2]"
                  } focus:outline-none focus:ring-2 focus:ring-[#2FA885]`}
                >
                  <span
                    className="w-2 h-2 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: cat?.color || "#2FA885" }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{node.name}</div>
                    <div className="text-[10px] text-[#718E84] font-mono">
                      {node.categoryLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
