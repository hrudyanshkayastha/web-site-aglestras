"use client";

import React from "react";
import { WorldVantage, WORLD_VANTAGES } from "./WorldTypes";
import { RotateCcw, Compass, Layers, ShieldCheck } from "lucide-react";

interface WorldVantageControlsProps {
  activeVantage: WorldVantage;
  selectedNodeId: string | null;
  onSelectVantage: (vantage: WorldVantage) => void;
  onResetView: () => void;
}

export function WorldVantageControls({
  activeVantage,
  selectedNodeId,
  onSelectVantage,
  onResetView,
}: WorldVantageControlsProps) {
  const vantages: { id: WorldVantage; icon: React.ReactNode; label: string }[] = [
    {
      id: "OVERVIEW",
      icon: <Compass size={13} className="text-[#2FA885]" />,
      label: "Overview",
    },
    {
      id: "ROOTS",
      icon: <Layers size={13} className="text-[#60A5FA]" />,
      label: "Roots",
    },
    {
      id: "CANOPY",
      icon: <ShieldCheck size={13} className="text-[#B7E4D5]" />,
      label: "Canopy",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
      {/* Vistas Navigation Pill Strip */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-[#031714]/90 border border-[#B7E4D5]/20 backdrop-blur-md shadow-lg">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#718E84] px-2.5 hidden sm:inline-block">
          Vantage:
        </span>
        {vantages.map((v) => {
          const isActive = activeVantage === v.id && !selectedNodeId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVantage(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                isActive
                  ? "bg-[#073B32] text-[#F4F2EA] border border-[#B7E4D5]/40 shadow-sm"
                  : "text-[#B7E4D5]/80 hover:text-[#F4F2EA] hover:bg-[#073B32]/40 border border-transparent"
              }`}
              title={WORLD_VANTAGES[v.id].subtitle}
            >
              {v.icon}
              <span>{v.label}</span>
            </button>
          );
        })}
      </div>

      {/* Reset View Button (Visible when focused on node or custom orbit) */}
      {selectedNodeId && (
        <button
          type="button"
          onClick={onResetView}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/40 text-xs font-mono text-[#F4F2EA] shadow-md transition-all animate-fadeIn"
        >
          <RotateCcw size={12} className="text-[#2FA885]" />
          <span>Reset Overview</span>
        </button>
      )}
    </div>
  );
}
