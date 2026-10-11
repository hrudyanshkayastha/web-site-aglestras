"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Shield, Network, Database, Lock } from "lucide-react";

interface DimensionalEmblemProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export function DimensionalEmblem({
  className = "",
  size,
  interactive = true,
}: DimensionalEmblemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle restrained tilt (clamped to max ±6 degrees)
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const styleOverride = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={styleOverride}
      className={`relative w-full max-w-[460px] aspect-square flex items-center justify-center perspective-1200 ${className}`}
      aria-label="Agletras Dimensional Tree Emblem"
    >
      {/* Deep ambient shadow plane on floor */}
      <div className="absolute -bottom-8 w-4/5 h-16 bg-[#000000]/70 rounded-[100%] blur-2xl pointer-events-none transform rotate-x-60" />

      {/* Outer 3D Container with smooth perspective transform */}
      <div
        className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Tier 1: Outer Matte Alloy Ring with directional specular lighting */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#0A3D34] via-[#073B32] to-[#031714] border border-[#B7E4D5]/25 shadow-3d-emblem flex items-center justify-center p-3">
          {/* Subtle concentric topographic depth grooves */}
          <div className="absolute inset-3 rounded-full border border-[#B7E4D5]/10 pointer-events-none" />
          <div className="absolute inset-7 rounded-full border border-[#B7E4D5]/10 pointer-events-none" />
          
          {/* Top highlight reflection */}
          <div className="absolute top-1 inset-x-12 h-px bg-gradient-to-r from-transparent via-[#B7E4D5]/40 to-transparent" />

          {/* Tier 2: Recessed Core Bezel (Matte Midnight Pine) */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#041F1B] via-[#021310] to-[#031714] border border-[#B7E4D5]/15 flex items-center justify-center p-8 overflow-hidden">
            {/* Fine geometric radial crosshairs */}
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="95" stroke="#B7E4D5" strokeWidth="0.75" strokeDasharray="3 4" />
              <circle cx="100" cy="100" r="70" stroke="#B7E4D5" strokeWidth="0.5" />
              <line x1="100" y1="5" x2="100" y2="195" stroke="#B7E4D5" strokeWidth="0.5" strokeDasharray="2 3" />
              <line x1="5" y1="100" x2="195" y2="100" stroke="#B7E4D5" strokeWidth="0.5" strokeDasharray="2 3" />
            </svg>

            {/* Core Emblem: The Original, Exact Agletras Living Tree Logo */}
            <div className="relative w-full h-full flex items-center justify-center z-10">
              <Image
                src="/logo.png"
                alt="Agletras Original Tree Logo"
                width={360}
                height={360}
                className="w-full h-full object-contain filter contrast-125 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Floating Dimensional Telemetry Badges on Z-axis (Restrained OSINT Metadata) */}
        <div
          className="absolute -top-2 left-6 z-20 px-3 py-1.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/30 shadow-3d-card flex items-center gap-2 backdrop-blur-md transition-transform duration-300 pointer-events-none"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-2 h-2 rounded-full bg-[#2FA885] animate-pulse" />
          <span className="font-mono text-[10px] text-[#B7E4D5] uppercase tracking-wider font-semibold">
            AGLETRAS // KNOWLEDGE CORE
          </span>
        </div>

        <div
          className="absolute -bottom-3 right-6 z-20 px-3 py-1.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/30 shadow-3d-card flex items-center gap-2 backdrop-blur-md transition-transform duration-300 pointer-events-none"
          style={{ transform: "translateZ(25px)" }}
        >
          <Shield size={12} className="text-[#2FA885]" />
          <span className="font-mono text-[10px] text-[#C5D9D2] uppercase tracking-wider">
            OSINT • EVIDENCE MATRIX
          </span>
        </div>
      </div>
    </div>
  );
}
