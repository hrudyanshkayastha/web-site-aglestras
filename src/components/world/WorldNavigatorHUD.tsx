"use client";

import React from "react";
import { WorldDestinationId, ORDERED_DESTINATIONS, WORLD_DESTINATIONS } from "./WorldConfig";
import { RotateCcw, ShieldCheck } from "lucide-react";

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
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-fit pointer-events-none px-2"
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#031714]/90 border border-[#B7E4D5]/25 backdrop-blur-md shadow-[0_8px_32px_rgba(3,23,20,0.7)] pointer-events-auto">
        {/* World Destinational Waypoints */}
        <nav
          className="flex items-center justify-center gap-1 sm:gap-2 shrink-0 flex-nowrap"
          aria-label="World Destinations"
        >
          {ORDERED_DESTINATIONS.map((destId, idx) => {
            const wp = WORLD_DESTINATIONS[destId];
            const isActive = activeDestination === destId && !hasActiveSelection;

            return (
              <button
                key={destId}
                type="button"
                onClick={() => onSelectDestination(destId)}
                aria-label={`Navigate to ${wp.label}: ${wp.sublabel}`}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono transition-all shrink-0 whitespace-nowrap ${
                  isActive
                    ? "bg-[#073B32] text-[#F4F2EA] border border-[#B7E4D5]/40 shadow-sm"
                    : "text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32]/40 border border-transparent"
                }`}
                title={wp.sublabel}
              >
                <span className={`text-[10px] font-bold ${isActive ? "text-[#2FA885]" : "text-[#718E84]"}`}>
                  0{idx + 1}
                </span>
                <span className="tracking-tight">{wp.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Reset Selection Button (When inspecting an entity or service) */}
        {hasActiveSelection && (
          <div className="flex items-center gap-1 pl-1 sm:pl-1.5 border-l border-[#B7E4D5]/20 shrink-0">
            <button
              type="button"
              onClick={onResetSelection}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/40 text-[11px] sm:text-xs font-mono text-[#F4F2EA] shadow-md transition-all whitespace-nowrap"
            >
              <RotateCcw size={11} className="text-[#2FA885]" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        )}

        {/* Demonstration Disclaimer Pill */}
        <div className="hidden md:flex items-center gap-1.5 pl-2 pr-1 border-l border-[#B7E4D5]/15 text-[10px] font-mono text-[#718E84] shrink-0">
          <ShieldCheck size={11} className="text-[#2FA885]" />
          <span>Fictitious Topology</span>
        </div>
      </div>
    </aside>
  );
}
