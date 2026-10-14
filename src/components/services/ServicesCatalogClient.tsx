"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Search,
  Users,
  AlertTriangle,
  Workflow,
  Network,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { ServiceItem } from "@/data/services";
import { AmbientLivingCanvas } from "@/components/visuals/AmbientLivingCanvas";

interface ServicesCatalogClientProps {
  services: ServiceItem[];
}

const iconMap: Record<string, React.ElementType> = {
  "external-threat-intelligence": ShieldCheck,
  "business-due-diligence": Search,
  "recruitment-verification": Users,
  "brand-impersonation-research": AlertTriangle,
  "research-automation": Workflow,
  "osint-investigative-research": Network,
};

type CategoryFilter = "ALL" | "threat" | "corporate" | "verification" | "automation";

export function ServicesCatalogClient({ services }: ServicesCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: "ALL", label: "All Capabilities (06)" },
    { id: "threat", label: "Cyber Threat" },
    { id: "corporate", label: "Due Diligence & OSINT" },
    { id: "verification", label: "Recruitment Verification" },
    { id: "automation", label: "Pipelines & Automation" },
  ];

  const filteredServices = services.filter((s) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "threat") return s.category === "threat";
    if (selectedCategory === "corporate") return s.category === "corporate" || s.id === "osint-investigative-research";
    if (selectedCategory === "verification") return s.category === "verification";
    if (selectedCategory === "automation") return s.category === "automation";
    return true;
  });

  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen overflow-hidden">
      {/* Background Ambient World Canvas */}
      <AmbientLivingCanvas opacity={0.6} particleCount={40} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 space-y-16">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Structured Intelligence Services</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            From Unstructured Information{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              to Clear Intelligence.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Explore research and intelligence services designed to help organizations investigate digital risks, evaluate information, discover relevant relationships, and automate repeatable research workflows.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#B7E4D5]/15 pb-6">
          <span className="text-xs font-mono text-[#8DA99E] uppercase tracking-wider mr-2 hidden sm:inline">
            Filter:
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2FA885] text-[#041F1B] font-semibold shadow-[0_0_16px_rgba(47,168,133,0.35)]"
                    : "bg-[#073B32]/60 text-[#8DA99E] hover:text-[#F4F2EA] hover:bg-[#073B32] border border-[#B7E4D5]/15"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 6 Services Catalog Grid */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = iconMap[service.id] || ShieldCheck;
              const stepNum = `0${index + 1}`;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 relative overflow-hidden backdrop-blur-xl ${
                    service.isPrimary
                      ? "bg-gradient-to-br from-[#073B32]/95 via-[#041F1B]/95 to-[#031714]/95 border-[#2FA885]/45 shadow-2xl"
                      : "bg-[#073B32]/35 border-[#B7E4D5]/20 hover:border-[#2FA885]/50 shadow-xl"
                  }`}
                >
                  {/* Subtle Ambient Radial Glow for Primary */}
                  {service.isPrimary && (
                    <div
                      className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl"
                      style={{ background: "radial-gradient(circle, #2FA885 0%, transparent 70%)" }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6 mb-8 relative z-10">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#041F1B] border border-[#2FA885]/40 text-[#2FA885]">
                          {stepNum}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885] shadow-md">
                          <Icon size={20} />
                        </div>
                        <span className="font-mono text-xs text-[#2FA885] font-semibold tracking-wider">
                          {service.code}
                        </span>
                        {service.isPrimary && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/40 font-medium">
                            Primary Commercial Offering
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-mono text-[#B7E4D5]">
                        {service.shortTagline}
                      </p>
                    </div>

                    {/* Dual Action Buttons: Deep Spec & Scope */}
                    <div className="flex flex-wrap items-center gap-3 self-start md:self-auto shrink-0">
                      <Link
                        href={`/services/${service.id}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0a4d40] border border-[#B7E4D5]/30 transition-all shadow-md hover:border-[#2FA885]"
                      >
                        <span>Deep Specification</span>
                        <ArrowRight size={13} className="text-[#2FA885]" />
                      </Link>

                      <Link
                        href={`/contact?service=${service.id}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-md shadow-[#041F1B]/40 hover:shadow-[0_4px_16px_rgba(47,168,133,0.3)]"
                      >
                        <span>Request Scope</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>

                  {/* 4-Item Grid Explaining the Service in Detail */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm relative z-10">
                    {/* Column 1: Plain-Language Purpose & Who It Helps (6 cols) */}
                    <div className="lg:col-span-6 space-y-6">
                      {/* What It Is */}
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2">
                          What It Is · Plain-Language Purpose
                        </h3>
                        <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                          {service.overview}
                        </p>
                      </div>

                      {/* Who Might Need It */}
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2.5 flex items-center gap-1.5">
                          <Users size={14} className="text-[#2FA885]" />
                          <span>Who Might Need It</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.whoItHelps.map((role, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#041F1B]/80 text-[#D8E8E2] border border-[#B7E4D5]/15"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Problems Addressed */}
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2 flex items-center gap-1.5">
                          <AlertTriangle size={14} className="text-[#2FA885]" />
                          <span>Problems Addressed</span>
                        </h3>
                        <ul className="space-y-1.5 text-xs text-[#C5D9D2] font-light">
                          {service.problemsAddressed.map((problem, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{problem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Column 2: What We Investigate & Deliverables (6 cols) */}
                    <div className="lg:col-span-6 space-y-6">
                      {/* What We Investigate */}
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2 flex items-center gap-1.5">
                          <Search size={14} className="text-[#2FA885]" />
                          <span>Scope of Investigation (Lawful Public Sources)</span>
                        </h3>
                        <div className="space-y-1.5">
                          {service.scopeOfInvestigation.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs text-[#D8E8E2] font-light"
                            >
                              <CheckCircle2 size={13} className="text-[#2FA885] mt-1 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* What Client Receives */}
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2 flex items-center gap-1.5">
                          <FileText size={14} className="text-[#2FA885]" />
                          <span>Tangible Deliverables</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((del, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-xl text-[11px] font-mono bg-[#073B32] text-[#B7E4D5] border border-[#2FA885]/20"
                            >
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Value Triad Summary Mini-Pill */}
                      <div className="p-4 rounded-2xl bg-[#041F1B]/90 border border-[#2FA885]/30 space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#2FA885] font-semibold block">
                          Outcome Focus:
                        </span>
                        <p className="text-xs text-[#F4F2EA] font-light leading-relaxed">
                          {service.valueLayer.clientOutcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
