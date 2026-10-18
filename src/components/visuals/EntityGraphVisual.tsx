"use client";

import React from "react";
import { ShieldAlert, Globe, Server, User, Building, CheckCircle2, ArrowRight } from "lucide-react";

export function EntityGraphVisual() {
  return (
    <div className="relative w-full rounded-2xl bg-[#031714] border border-[#073B32] p-5 shadow-inner overflow-hidden font-mono text-xs text-[#F4F2EA]">
      {/* Background isometric grid */}
      <svg
        viewBox="0 0 400 240"
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 60 L400 60 M0 120 L400 120 M0 180 L400 180" stroke="#2FA885" strokeWidth="0.5" strokeDasharray="3 6" />
        <path d="M100 0 L100 240 M200 0 L200 240 M300 0 L300 240" stroke="#2FA885" strokeWidth="0.5" strokeDasharray="3 6" />
        {/* Dynamic connection arcs */}
        <path d="M200 120 C140 120 100 70 80 50" stroke="#2FA885" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M200 120 C260 120 300 70 320 50" stroke="#E26D5C" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M200 120 C150 150 110 180 80 190" stroke="#2FA885" strokeWidth="1.2" strokeDasharray="2 3" />
        <path d="M200 120 C250 150 290 180 320 190" stroke="#2FA885" strokeWidth="1.2" strokeDasharray="2 3" />
      </svg>

      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-[#073B32] pb-3 mb-4 relative z-10">
        <span className="text-[10px] uppercase text-[#8DA99E] tracking-widest font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2FA885]" />
          <span>Entity Correlation Model</span>
        </span>
        <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
          Illustrative OSINT Linkage
        </span>
      </div>

      {/* 3D Multi-Node Graph Canvas */}
      <div className="relative z-10 grid grid-cols-3 gap-2 items-center py-2 min-h-[160px]">
        {/* Left Column Nodes (Permitted Records & Corporate Affiliations) */}
        <div className="space-y-3">
          <div className="p-2.5 rounded-xl bg-[#041F1B] border border-[#B7E4D5]/20 shadow-sm flex items-center gap-2">
            <Building size={14} className="text-[#2FA885] shrink-0" />
            <div>
              <span className="block text-[10px] font-semibold text-[#F4F2EA]">Registry Filing</span>
              <span className="text-[9px] text-[#8DA99E]">State Corp Index</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#041F1B] border border-[#B7E4D5]/20 shadow-sm flex items-center gap-2">
            <User size={14} className="text-[#2FA885] shrink-0" />
            <div>
              <span className="block text-[10px] font-semibold text-[#F4F2EA]">Director Affiliation</span>
              <span className="text-[9px] text-[#8DA99E]">Cross-holding</span>
            </div>
          </div>
        </div>

        {/* Center Node (Core Target Entity with Elevation Bezel) */}
        <div className="flex justify-center">
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0A3D34] to-[#041F1B] border border-[#2FA885]/50 shadow-3d-card text-center space-y-1 transform scale-105">
            <span className="w-7 h-7 rounded-lg bg-[#2FA885]/20 text-[#2FA885] mx-auto flex items-center justify-center font-bold text-xs">
              01
            </span>
            <span className="block text-[11px] font-bold text-[#FFFFFF] tracking-tight">
              TARGET CORP
            </span>
            <span className="block text-[9px] text-[#B7E4D5] font-light">
              Scoped Perimeter
            </span>
          </div>
        </div>

        {/* Right Column Nodes (External Threat & Lookalike Infrastructure) */}
        <div className="space-y-3">
          <div className="p-2.5 rounded-xl bg-[#2C1410] border border-rose-500/30 shadow-sm flex items-center gap-2">
            <ShieldAlert size={14} className="text-rose-400 shrink-0" />
            <div>
              <span className="block text-[10px] font-semibold text-rose-200">Lookalike Domain</span>
              <span className="text-[9px] text-rose-300/80">auth-target[.]com</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#041F1B] border border-[#B7E4D5]/20 shadow-sm flex items-center gap-2">
            <Server size={14} className="text-[#2FA885] shrink-0" />
            <div>
              <span className="block text-[10px] font-semibold text-[#F4F2EA]">Passive DNS (A-Rec)</span>
              <span className="text-[9px] text-[#8DA99E]">198.51.100.42</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status Line */}
      <div className="mt-3 pt-2.5 border-t border-[#073B32] flex items-center justify-between text-[10px] text-[#8DA99E]">
        <span className="flex items-center gap-1.5 text-[#2FA885]">
          <CheckCircle2 size={12} />
          <span>Correlated: 4 Public Data Vectors</span>
        </span>
        <span className="text-[9px] text-[#718E84]">Confidence: 92%</span>
      </div>
    </div>
  );
}
