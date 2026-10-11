import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, AlertCircle, Shield, FileText, ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Capabilities & Services — AGLETRAS",
  description:
    "Explore AGLETRAS research intelligence capabilities: External Threat OSINT, Business Due Diligence, Recruitment Verification, Brand Protection, and Research Automation.",
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Research Capabilities</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Structured Services.{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Defined Scopes.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Every Agletras service line operates under explicit parameters, lawful open-source standards,
            and written authorization. We produce traceable intelligence briefs tailored to organizational needs.
          </p>
        </div>

        {/* Detailed Services Breakdown */}
        <div className="space-y-16">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`p-8 sm:p-12 rounded-3xl border transition-all ${
                service.isPrimary
                  ? "bg-gradient-to-br from-[#073B32] via-[#041F1B] to-[#031714] border-[#B7E4D5]/30 shadow-[0_20px_50px_rgba(7,59,50,0.4)]"
                  : "bg-[#073B32]/30 border-[#B7E4D5]/15"
              }`}
            >
              {/* Service Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold">
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
                </div>

                <Link
                  href={`/contact?service=${service.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all self-start md:self-auto shrink-0"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Service Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
                {/* Left Column: Problem & Scope */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2">
                      The Business Problem
                    </h3>
                    <p className="text-[#C5D9D2] leading-relaxed font-light">
                      {service.problemStatement}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-3">
                      Investigation Scope Across Public Sources
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#D8E8E2]">
                      {service.scopeOfInvestigation.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-[#2FA885] shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Client Prerequisites */}
                  <div className="p-4 rounded-2xl bg-[#041F1B]/70 border border-[#B7E4D5]/10">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#8DA99E] font-semibold mb-2">
                      Client Prerequisites for Engagement:
                    </h4>
                    <ul className="space-y-1 text-xs text-[#A1B8B0]">
                      {service.clientPrerequisites.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#2FA885]">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Deliverables & Limitations */}
                <div className="lg:col-span-5 space-y-6 bg-[#031714]/80 p-6 rounded-2xl border border-[#B7E4D5]/15">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-3 flex items-center gap-1.5">
                      <FileText size={14} className="text-[#2FA885]" />
                      <span>Deliverable Package</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-[#C5D9D2] font-light">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div className="pt-4 border-t border-[#B7E4D5]/10">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
                      <AlertCircle size={14} />
                      <span>Documented Scope Boundaries</span>
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-[#A1B8B0] font-light leading-relaxed">
                      {service.limitations.map((limit, idx) => (
                        <li key={idx}>• {limit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
