"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, ServiceItem } from "@/data/services";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Search,
  Users,
  AlertTriangle,
  Workflow,
  Network,
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  Eye,
  Layers,
} from "lucide-react";

interface ServicesOverlayProps {
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem | null) => void;
}

const SERVICE_DISPLAY_ORDER = [
  "osint-investigative-research",
  "business-due-diligence",
  "recruitment-verification",
  "brand-impersonation-research",
  "external-threat-intelligence",
  "research-automation",
];

const iconMap: Record<string, React.ElementType> = {
  "osint-investigative-research": Network,
  "business-due-diligence": Search,
  "recruitment-verification": Users,
  "brand-impersonation-research": AlertTriangle,
  "external-threat-intelligence": ShieldCheck,
  "research-automation": Workflow,
};

export function ServicesOverlay({
  selectedService,
  onSelectService,
}: ServicesOverlayProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  const orderedServices = [...servicesData].sort((a, b) => {
    const idxA = SERVICE_DISPLAY_ORDER.indexOf(a.id);
    const idxB = SERVICE_DISPLAY_ORDER.indexOf(b.id);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  const currentIndex = selectedService
    ? orderedServices.findIndex((s) => s.id === selectedService.id)
    : -1;

  const handlePrevStation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex <= 0) {
      onSelectService(orderedServices[orderedServices.length - 1]);
    } else {
      onSelectService(orderedServices[currentIndex - 1]);
    }
  };

  const handleNextStation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex >= orderedServices.length - 1) {
      onSelectService(orderedServices[0]);
    } else {
      onSelectService(orderedServices[currentIndex + 1]);
    }
  };

  const SelectedIcon = selectedService ? (iconMap[selectedService.id] || ShieldCheck) : null;

  return (
    <section
      id="destination-services"
      className="min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-12 pt-28 pb-32 relative z-20 pointer-events-none"
    >
      {/* Top Floating Pavilion Header HUD */}
      <div className="w-full max-w-3xl mx-auto pointer-events-auto space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
          <span>Destination 02 // 3D Services Rotunda</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA] drop-shadow-[0_4px_20px_rgba(2,15,12,0.9)]">
          From Unstructured Information{" "}
          <span className="italic font-normal text-[#B7E4D5]">
            to Clear Intelligence.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-[#C5D9D2] max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(2,15,12,0.9)]">
          Six structured research capabilities designed to investigate digital risks, evaluate information, discover hidden relationships, and automate repeatable research workflows.
        </p>

        {/* Floating Station Selector Dock */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
          {orderedServices.map((service, idx) => {
            const Icon = iconMap[service.id] || ShieldCheck;
            const isSelected = selectedService?.id === service.id;
            const stepNum = `0${idx + 1}`;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(isSelected ? null : service)}
                className={`group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md ${
                  isSelected
                    ? "bg-[#2FA885] text-[#041F1B] border border-[#2FA885] font-semibold shadow-[0_0_24px_rgba(47,168,133,0.45)] -translate-y-0.5"
                    : "bg-[#031714]/85 text-[#C5D9D2] border border-[#B7E4D5]/25 hover:border-[#2FA885]/70 hover:text-[#FFFFFF] hover:-translate-y-0.5"
                }`}
                title={`Focus Station ${stepNum}: ${service.title}`}
              >
                <Icon
                  size={14}
                  className={isSelected ? "text-[#041F1B]" : "text-[#2FA885] group-hover:scale-110 transition-transform"}
                />
                <span className="text-[11px] font-bold opacity-80">{stepNum}</span>
                <span className="hidden sm:inline font-medium tracking-tight">
                  {service.shortTagline ? service.title.split(" ")[0] : service.title}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#041F1B] animate-ping" />
                )}
              </button>
            );
          })}

          <Link
            href="/services"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono text-[#B7E4D5] hover:text-[#FFFFFF] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/30 transition-all cursor-pointer backdrop-blur-md shadow-md"
            title="Inspect comprehensive service specifications"
          >
            <span>All Specs</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Center 3D Space is Wide Open! */}
      {/* Floating Station Briefing Inspector Panel (Anchored Right) */}
      <AnimatePresence>
        {selectedService && SelectedIcon && (
          <motion.aside
            key={selectedService.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:absolute lg:right-8 lg:top-32 w-full lg:w-[480px] max-w-full z-20 overflow-y-auto max-h-[75vh] p-5 sm:p-6 rounded-3xl bg-[#031714]/92 border border-[#2FA885]/60 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] pointer-events-auto space-y-4 my-6 lg:my-0"
            aria-label={`3D Station Briefing for ${selectedService.title}`}
          >
            {/* Top Bar: Station index, code, close button */}
            <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#073B32] border border-[#2FA885]/50 flex items-center justify-center text-[#2FA885]">
                  <SelectedIcon size={16} />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                    Station 0{currentIndex + 1} of 06 // {selectedService.code}
                  </span>
                  <span className="text-[11px] font-mono text-[#8DA99E]">
                    3D Pylon Camera Locked
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {selectedService.isPrimary && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/40 font-medium">
                    Primary Focus
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onSelectService(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#073B32]/70 text-[#C5D9D2] hover:text-[#FFFFFF] hover:bg-[#073B32] border border-[#B7E4D5]/20 transition-all cursor-pointer"
                  title="Unfocus 3D station"
                  aria-label="Close station inspection and reset view"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] mb-1">
                {selectedService.title}
              </h3>
              <p className="text-xs text-[#B7E4D5] font-light leading-relaxed">
                {selectedService.shortTagline}
              </p>
            </div>

            {/* 3 Structured Client Questions Answered */}
            <div className="space-y-2.5 text-xs">
              {/* 1. Client Problem Solved */}
              <div className="p-3.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
                  Problem Addressed:
                </span>
                <p className="text-[#D8E8E2] text-[11px] leading-relaxed font-light">
                  {selectedService.problemStatement}
                </p>
              </div>

              {/* 2. Investigative Method */}
              <div className="p-3.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                  Investigative Method:
                </span>
                <p className="text-[#C5D9D2] text-[11px] leading-relaxed font-light">
                  {selectedService.valueLayer.technicalMethod}
                </p>
              </div>

              {/* 3. Deliverable Outcome */}
              <div className="p-3.5 rounded-xl bg-[#041F1B]/95 border border-[#B7E4D5]/15 space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                  Decision-Ready Deliverable:
                </span>
                <p className="text-[#F4F2EA] text-[11px] leading-relaxed font-light">
                  {selectedService.valueLayer.clientOutcome}
                </p>
              </div>
            </div>

            {/* Station Tour Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#B7E4D5]/15 text-xs font-mono">
              <button
                type="button"
                onClick={handlePrevStation}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span>Prev Station</span>
              </button>

              <span className="text-[11px] text-[#8DA99E]">
                Station {currentIndex + 1} / 06
              </span>

              <button
                type="button"
                onClick={handleNextStation}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#073B32]/70 hover:bg-[#073B32] text-[#B7E4D5] hover:text-[#FFFFFF] border border-[#B7E4D5]/20 transition-all cursor-pointer"
              >
                <span>Next Station</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Deep Specification & Scoping Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <Link
                href={`/services/${selectedService.id}`}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/30 transition-all font-medium text-center"
              >
                <span>Inspect Deep Spec</span>
                <ArrowRight size={13} className="text-[#2FA885]" />
              </Link>

              <Link
                href={`/contact?service=${selectedService.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] font-semibold transition-all shadow-md text-center"
              >
                <span>Scope Inquiry</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Floating Bottom Prompt (When no station is selected) */}
      {!selectedService && (
        <div className="w-full max-w-lg mx-auto pointer-events-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#031714]/80 border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] backdrop-blur-md shadow-lg">
            <Compass size={13} className="text-[#2FA885] animate-spin" />
            <span>Click any 3D station monument or choose from the dock above to inspect.</span>
          </div>
        </div>
      )}
    </section>
  );
}
