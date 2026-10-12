"use client";

import React from "react";
import { WorldDestinationId, ORDERED_DESTINATIONS, WORLD_DESTINATIONS } from "./WorldConfig";
import { Compass, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";

interface WorldNavigatorHUDProps {
  activeDestination: WorldDestinationId;
  hasActiveSelection: boolean;
  onSelectDestination: (destId: WorldDestinationId) => void;
  onResetSelection: () => void;
}

export function WorldNavigatorHUD({
  activeDestination,
  hasActiveSelection,
  onSelectDestination,
  onResetSelection,
}: WorldNavigatorHUDProps) {
  return (
    <aside
      aria-label="3D World Navigation Controls"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] sm:w-auto pointer-events-none"
    >
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-[#031714]/90 border border-[#B7E4D5]/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(3,23,20,0.6)] pointer-events-auto">
        {/* World Destinational Waypoints */}
        <nav className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 px-1" aria-label="World Destinations">
          {ORDERED_DESTINATIONS.map((destId, idx) => {
            const wp = WORLD_DESTINATIONS[destId];
            const isActive = activeDestination === destId && !hasActiveSelection;

            return (
              <button
                key={destId}
                type="button"
                onClick={() => onSelectDestination(destId)}
                aria-label={`Navigate to ${wp.label}: ${wp.sublabel}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#073B32] text-[#F4F2EA] border border-[#B7E4D5]/40 shadow-sm"
                    : "text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32]/40 border border-transparent"
                }`}
                title={wp.sublabel}
              >
                <span className={`text-[10px] ${isActive ? "text-[#2FA885]" : "text-[#718E84]"}`}>
                  0{idx + 1}
                </span>
                <span>{wp.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Reset Selection Button (When inspecting an entity or service) */}
        {hasActiveSelection && (
          <div className="flex items-center gap-2 pl-2 border-l border-[#B7E4D5]/20">
            <button
              type="button"
              onClick={onResetSelection}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/40 text-xs font-mono text-[#F4F2EA] shadow-md transition-all animate-fadeIn"
            >
              <RotateCcw size={12} className="text-[#2FA885]" />
              <span>Reset Vantage</span>
            </button>
          </div>
        )}

        {/* Demonstration Disclaimer Pill */}
        <div className="hidden lg:flex items-center gap-1.5 pl-3 pr-2 border-l border-[#B7E4D5]/15 text-[10px] font-mono text-[#718E84]">
          <ShieldCheck size={12} className="text-[#2FA885]" />
          <span>Fictitious Topology</span>
        </div>
      </div>
    </aside>
  );
}
