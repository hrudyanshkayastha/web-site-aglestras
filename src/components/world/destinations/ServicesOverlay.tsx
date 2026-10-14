"use client";

import React from "react";
import Link from "next/link";
import { servicesData, ServiceItem } from "@/data/services";
import { ArrowUpRight, ShieldCheck, Search, Users, AlertTriangle, Workflow, Network, Eye } from "lucide-react";

interface ServicesOverlayProps {
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem | null) => void;
}

const iconMap: Record<string, React.ElementType> = {
  "external-threat-intelligence": ShieldCheck,
  "business-due-diligence": Search,
  "recruitment-verification": Users,
  "brand-impersonation-research": AlertTriangle,
  "research-automation": Workflow,
  "osint-investigative-research": Network,
};

export function ServicesOverlay({
  selectedService,
  onSelectService,
}: ServicesOverlayProps) {
  return (
    <section
      id="destination-services"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-28 pb-36 relative z-20 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full space-y-8 pointer-events-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#031714]/95 via-[#031714]/92 to-[#031714]/94 border border-[#B7E4D5]/20 backdrop-blur-2xl shadow-2xl">
        {/* Destination Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Destination 02 // The Intelligence Landscape</span>
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
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors shrink-0 font-medium bg-[#073B32]/70 px-4 py-2 rounded-full border border-[#B7E4D5]/25 backdrop-blur-sm"
          >
            <span>Full Service Specifications</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* 6 Services Grid (Synchronized with 3D Pylons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((service) => {
            const Icon = iconMap[service.id] || ShieldCheck;
            const isSelected = selectedService?.id === service.id;
            const isPrimary = service.isPrimary;

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(isSelected ? null : service)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group backdrop-blur-md ${
                  isSelected
                    ? "bg-[#073B32]/98 border-[#2FA885] shadow-[0_0_24px_rgba(47,168,133,0.35)] -translate-y-1"
                    : isPrimary
                    ? "bg-[#041F1B]/95 border-[#2FA885]/50 hover:border-[#2FA885]/80 shadow-xl"
                    : "bg-[#041F1B]/95 border-[#B7E4D5]/20 hover:border-[#B7E4D5]/50 hover:-translate-y-0.5 shadow-lg"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isSelected
                            ? "bg-[#2FA885] text-[#041F1B]"
                            : "bg-[#073B32] text-[#B7E4D5]"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#2FA885]">
                        {service.code}
                      </span>
                    </div>

                    {isPrimary && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/30">
                        Primary Focus
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-editorial font-semibold text-[#F4F2EA] mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#B7E4D5] font-light leading-relaxed">
                      {service.shortTagline}
                    </p>
                    <p className="text-[11px] text-[#C5D9D2] font-light leading-relaxed mt-2 line-clamp-2">
                      {service.problemStatement}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {service.whoItHelps.slice(0, 2).map((target, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#073B32]/80 text-[#8DA99E] border border-[#B7E4D5]/10 truncate max-w-[200px]"
                        >
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#B7E4D5]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8DA99E] flex items-center gap-1.5">
                    <Eye size={12} className="text-[#2FA885]" />
                    <span>{isSelected ? "In 3D Focus" : "Focus in 3D"}</span>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
