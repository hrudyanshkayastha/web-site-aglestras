"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  Eye,
  CheckCircle2,
  FileText,
  ChevronDown,
  X,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReducedMotion ? 0 : 0.06,
        delayChildren: isReducedMotion ? 0 : 0.04,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: isReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="destination-services"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-36 relative z-20 pointer-events-none"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
        className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/95 via-[#031714]/92 to-[#031714]/94 border border-[#B7E4D5]/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        {/* Subtle Ambient Radial Illumination */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0 opacity-40 blur-[80px]"
          style={{
            background: "radial-gradient(ellipse, rgba(47,168,133,0.3) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 02 // Explore Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              From Unstructured Information{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                to Clear Intelligence.
              </span>
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
              Explore research and intelligence services designed to help organizations investigate digital risks, evaluate information, discover relevant relationships, and automate repeatable research workflows.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors shrink-0 font-medium bg-[#073B32]/70 px-4 py-2.5 rounded-full border border-[#B7E4D5]/25 backdrop-blur-sm shadow-sm hover:border-[#2FA885]/50"
          >
            <span>Full Service Specifications</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* 6 Services Grid with Ethiack-Inspired Interactive Storytelling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {orderedServices.map((service, index) => {
            const Icon = iconMap[service.id] || ShieldCheck;
            const isSelected = selectedService?.id === service.id;
            const isPrimary = service.isPrimary;
            const stepNum = `0${index + 1}`;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                onClick={() => onSelectService(isSelected ? null : service)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectService(isSelected ? null : service);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isSelected}
                aria-label={`${service.title} - Click to inspect briefing`}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group backdrop-blur-md relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FA885] ${
                  isSelected
                    ? "bg-gradient-to-b from-[#073B32] to-[#041F1B] border-[#2FA885] shadow-[0_0_32px_rgba(47,168,133,0.4)] -translate-y-1.5"
                    : isPrimary
                    ? "bg-[#041F1B]/95 border-[#2FA885]/50 hover:border-[#2FA885] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(47,168,133,0.22)] shadow-xl"
                    : "bg-[#041F1B]/95 border-[#B7E4D5]/20 hover:border-[#2FA885]/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(47,168,133,0.18)] shadow-lg"
                }`}
              >
                {/* Top Row: Index Number, Icon, Code Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#2FA885] text-[#041F1B] shadow-md"
                            : "bg-[#073B32] text-[#B7E4D5] group-hover:text-[#2FA885] group-hover:bg-[#073B32]/90"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#8DA99E] font-medium leading-tight">
                          SERVICE {stepNum}
                        </span>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2FA885]">
                          {service.code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPrimary && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/40 font-medium">
                          Primary Focus
                        </span>
                      )}
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono transition-transform ${
                          isSelected
                            ? "bg-[#2FA885] text-[#041F1B] rotate-180"
                            : "bg-[#073B32]/80 text-[#8DA99E] group-hover:text-[#B7E4D5]"
                        }`}
                        title={isSelected ? "Collapse Details" : "Expand Details"}
                      >
                        <ChevronDown size={13} />
                      </span>
                    </div>
                  </div>

                  {/* Title & Concise Tagline */}
                  <div>
                    <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] mb-1.5 group-hover:text-[#FFFFFF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#B7E4D5] font-light leading-relaxed">
                      {service.shortTagline}
                    </p>
                  </div>

                  {/* Who It Helps Chips (Visible in normal view) */}
                  {!isSelected && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.whoItHelps.slice(0, 2).map((target, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#073B32]/80 text-[#8DA99E] border border-[#B7E4D5]/10 truncate max-w-[220px]"
                        >
                          {target}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactive Expanded Storytelling Section (Ethiack Pattern) */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-3 pt-3 border-t border-[#B7E4D5]/20 text-xs overflow-hidden"
                      >
                        {/* 1. Client Problem Solved */}
                        <div className="p-3 rounded-xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
                            Client Problem Solved:
                          </span>
                          <p className="text-[#D8E8E2] text-[11px] leading-relaxed font-light">
                            {service.problemStatement}
                          </p>
                        </div>

                        {/* 2. Research Approach & Limits */}
                        <div className="p-3 rounded-xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                            Investigative Method:
                          </span>
                          <p className="text-[#C5D9D2] text-[11px] leading-relaxed font-light">
                            {service.valueLayer.technicalMethod}
                          </p>
                        </div>

                        {/* 3. Decision-Ready Outcome */}
                        <div className="p-3 rounded-xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#B7E4D5] font-semibold block">
                            Deliverable Outcome:
                          </span>
                          <p className="text-[#F4F2EA] text-[11px] leading-relaxed font-light">
                            {service.valueLayer.clientOutcome}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                          <Link
                            href={`/services/${service.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0A4D3F] border border-[#B7E4D5]/30 transition-all font-medium text-center"
                          >
                            <span>Inspect Deep Spec</span>
                            <ArrowRight size={13} className="text-[#2FA885]" />
                          </Link>

                          <Link
                            href={`/contact?service=${service.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] font-semibold transition-all shadow-md text-center"
                          >
                            <span>Scope</span>
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Footer: 3D status & direct route link */}
                <div className="pt-4 mt-4 border-t border-[#B7E4D5]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8DA99E] flex items-center gap-1.5">
                    <Eye size={12} className={isSelected ? "text-[#2FA885]" : "text-[#718E84]"} />
                    <span className={isSelected ? "text-[#B7E4D5] font-medium" : ""}>
                      {isSelected ? "Focused in 3D Pavilion" : "Focus in 3D"}
                    </span>
                  </span>

                  <Link
                    href={`/services/${service.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors"
                  >
                    <span>Specification</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
