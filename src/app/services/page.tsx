import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, AlertCircle, Shield, FileText, ArrowRight, GitCommit } from "lucide-react";
import { servicesData } from "@/data/services";

export const metadata: Metadata = {
  title: "Capabilities & Services — AGLETRAS",
  description:
    "Explore AGLETRAS research intelligence capabilities: Cyber Threat Intelligence, Business Due Diligence, Recruitment Verification, Brand Protection, Research Automation, and OSINT Investigation.",
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
          {servicesData.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className={`p-8 sm:p-12 rounded-3xl border transition-all ${
                service.isPrimary
                  ? "bg-gradient-to-br from-[#073B32] via-[#041F1B] to-[#031714] border-[#B7E4D5]/35 shadow-[0_20px_50px_rgba(7,59,50,0.4)]"
                  : "bg-[#073B32]/30 border-[#B7E4D5]/15"
              }`}
            >
              {/* 1 & 7: Service Header Row & CTA */}
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
                  <p className="text-xs font-mono text-[#B7E4D5]/80 mt-1">
                    {service.shortTagline}
                  </p>
                </div>

                <Link
                  href={`/contact?service=${service.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all self-start md:self-auto shrink-0 shadow-lg shadow-[#041F1B]/50"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Service Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm">
                {/* Left Column: Problem, Scope, & Workflow */}
                <div className="lg:col-span-7 space-y-6">
                  {/* 1. Overview / Problem Statement */}
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2">
                      Purpose & Business Problem
                    </h3>
                    <p className="text-[#C5D9D2] leading-relaxed font-light">
                      {service.problemStatement}
                    </p>
                  </div>

                  {/* 2. What We Do / Scope */}
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-3">
                      What We Do · Scope of Investigation
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

                  {/* 3. Investigation Process / Workflow */}
                  <div className="p-4 rounded-2xl bg-[#041F1B]/80 border border-[#B7E4D5]/15">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#B7E4D5] font-semibold mb-3 flex items-center gap-1.5">
                      <GitCommit size={14} className="text-[#2FA885]" />
                      <span>Investigation & Delivery Process</span>
                    </h4>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#C5D9D2]">
                      {service.workflow.map((step, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#073B32] border border-[#2FA885]/40 text-[#2FA885] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="leading-tight">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* 4. Client Prerequisites */}
                  <div className="p-4 rounded-2xl bg-[#041F1B]/70 border border-[#B7E4D5]/10">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#8DA99E] font-semibold mb-2">
                      Client Prerequisites for Engagement:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#A1B8B0]">
                      {service.clientPrerequisites.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#2FA885]">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Deliverables, Limitations, & Ethical Charter */}
                <div className="lg:col-span-5 space-y-6 bg-[#031714]/90 p-6 rounded-2xl border border-[#B7E4D5]/20 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* 5. Deliverables */}
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-3 flex items-center gap-1.5">
                        <FileText size={14} className="text-[#2FA885]" />
                        <span>Deliverables Package</span>
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

                    {/* 6. Documented Limitations */}
                    <div className="pt-4 border-t border-[#B7E4D5]/10">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-rose-300 font-semibold mb-2 flex items-center gap-1.5">
                        <AlertCircle size={14} className="text-rose-400" />
                        <span>Documented Limitations & Scope Boundaries</span>
                      </h4>
                      <ul className="space-y-1.5 text-[11px] text-[#A1B8B0] font-light leading-relaxed">
                        {service.limitations.map((limit, idx) => (
                          <li key={idx}>• {limit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 8. Ethical Charter Link & Bottom Action */}
                  <div className="pt-5 border-t border-[#B7E4D5]/15 space-y-3">
                    <Link
                      href="/terms#ethical-charter"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#B7E4D5] hover:text-[#C8EFE2] transition-colors group"
                    >
                      <Shield size={13} className="text-[#2FA885] group-hover:scale-110 transition-transform" />
                      <span className="underline underline-offset-4 decoration-[#B7E4D5]/40">
                        Governed by Agletras Ethical Charter
                      </span>
                      <ArrowRight size={12} />
                    </Link>

                    <div className="pt-1">
                      <Link
                        href={`/contact?service=${service.id}`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#09473D] border border-[#B7E4D5]/20 transition-all text-center"
                      >
                        <span>Start Scoped Engagement</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
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
