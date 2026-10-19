"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp, Check, AlertCircle } from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

export function CapabilitiesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>("osint-investigative-research");
  const allServices = servicesData;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 md:py-32 bg-[#FCFCF8] text-[#041F1B] relative overflow-hidden border-t border-[#073B32]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#073B32] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Structured Service Portfolio</span>
          </div>
          <h2 className="text-editorial-title text-[#041F1B]">
            Verified Research{" "}
            <span className="italic font-normal text-[#073B32]">
              & Due Diligence Capabilities.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#3D524C] font-light leading-relaxed">
            From counterparty due diligence to specialized open-source investigative research,
            every service operates under a defined Statement of Work with transparent boundaries.
          </p>
        </div>

        {/* Capabilities List with Expandable Deep-Dives */}
        <div className="space-y-4">
          {allServices.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? "bg-[#F4F2EA] border-[#073B32]/30 shadow-md"
                    : "bg-[#FFFFFF] border-[#073B32]/10 hover:border-[#073B32]/25 shadow-sm"
                }`}
              >
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => toggleExpand(service.id)}
                  className="w-full p-6 sm:p-8 flex items-start sm:items-center justify-between text-left gap-4 focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-mono text-xs font-semibold text-[#2FA885] uppercase tracking-wider">
                      {service.code}
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-editorial font-semibold text-[#041F1B]">
                          {service.title}
                        </h3>
                        {service.isPrimary && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#073B32] text-[#B7E4D5] font-semibold">
                            Priority Focus
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#4E635D] font-light mt-0.5">
                        {service.shortTagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden md:inline font-mono text-xs uppercase text-[#5A736C]">
                      {isExpanded ? "Collapse" : "Explore Scope"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#073B32]/5 flex items-center justify-center text-[#073B32]">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 pt-2 border-t border-[#073B32]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
                    {/* Problem & Investigation */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold mb-2">
                          The Business Problem
                        </h4>
                        <p className="text-[#3D524C] leading-relaxed font-light">
                          {service.problemStatement}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold mb-2">
                          What Is Investigated Across Public Sources
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2C3E3A]">
                          {service.scopeOfInvestigation.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check size={14} className="text-[#2FA885] shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Deliverables, Limitations & CTA */}
                    <div className="lg:col-span-5 space-y-6 bg-[#FFFFFF] p-6 rounded-xl border border-[#073B32]/10">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold mb-2">
                          Deliverable Package
                        </h4>
                        <ul className="space-y-1.5 text-xs text-[#3D524C]">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#073B32] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-rose-800 font-semibold mb-1 flex items-center gap-1.5">
                          <AlertCircle size={14} />
                          <span>Explicit Limitations</span>
                        </h4>
                        <p className="text-[11px] text-[#5A736C] leading-relaxed font-light">
                          {service.limitations[0]}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={`/contact?service=${service.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#041F1B] transition-colors"
                        >
                          <span>{service.ctaLabel}</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link to Dedicated Services Page */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#073B32] hover:text-[#2FA885] underline underline-offset-4"
          >
            <span>View Full Service Documentation & Technical Scope →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
