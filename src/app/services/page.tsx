import { Metadata } from "next";
import Link from "next/link";
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
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

export const metadata: Metadata = {
  title: "Services & Capabilities Catalog — AGLETRAS",
  description:
    "Explore AGLETRAS research intelligence capabilities: Cyber Threat Intelligence, Business Due Diligence, Recruitment Verification, Brand Protection, Research Automation, and OSINT Investigation.",
};

const iconMap: Record<string, React.ElementType> = {
  "external-threat-intelligence": ShieldCheck,
  "business-due-diligence": Search,
  "recruitment-verification": Users,
  "brand-impersonation-research": AlertTriangle,
  "research-automation": Workflow,
  "osint-investigative-research": Network,
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-16">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Structured Intelligence Services</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Six Verified Services.{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Explicit Scopes.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Every Agletras engagement operates under defined parameters, lawful open-source standards,
            and written authorization. We produce traceable intelligence briefs tailored to organizational needs.
          </p>
        </div>

        {/* 6 Services Catalog Grid */}
        <div className="space-y-12">
          {servicesData.map((service) => {
            const Icon = iconMap[service.id] || ShieldCheck;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  service.isPrimary
                    ? "bg-gradient-to-br from-[#073B32]/95 via-[#041F1B] to-[#031714] border-[#2FA885]/40 shadow-2xl"
                    : "bg-[#073B32]/30 border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#B7E4D5]/15 pb-6 mb-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885]">
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
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#F4F2EA] bg-[#073B32] hover:bg-[#0a4d40] border border-[#B7E4D5]/30 transition-all shadow-md"
                    >
                      <span>Deep Specification</span>
                      <ArrowRight size={13} className="text-[#2FA885]" />
                    </Link>

                    <Link
                      href={`/contact?service=${service.id}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-md shadow-[#041F1B]/40"
                    >
                      <span>Request Scope</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* 4-Item Grid Explaining the Service in Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">
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
                        <AlertTriangle size={14} className="text-amber-400" />
                        <span>Core Problem Solved</span>
                      </h3>
                      <p className="text-xs text-[#A1B8B0] font-light leading-relaxed">
                        {service.problemStatement}
                      </p>
                    </div>
                  </div>

                  {/* Column 2: Deliverables & Scope Safeguards (6 cols) */}
                  <div className="lg:col-span-6 space-y-6 bg-[#041F1B]/70 p-6 rounded-2xl border border-[#B7E4D5]/15 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* What The Client Expects to Receive */}
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold mb-2.5 flex items-center gap-1.5">
                          <FileText size={14} className="text-[#2FA885]" />
                          <span>What You Receive (Tangible Deliverables)</span>
                        </h3>
                        <ul className="space-y-2 text-xs text-[#D8E8E2] font-light">
                          {service.deliverables.slice(0, 4).map((del, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-1.5 shrink-0" />
                              <span className="leading-snug">{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Illustrative Deliverable Metric Hint */}
                      <div className="p-3.5 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#8DA99E]">Illustrative Deliverable Sample:</span>
                        <span className="text-[#2FA885] font-semibold">
                          {service.deliverablePreview.reportId}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="pt-4 border-t border-[#B7E4D5]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                      <Link
                        href={`/services/${service.id}`}
                        className="text-[#B7E4D5] hover:text-[#FFFFFF] inline-flex items-center gap-1.5 font-medium transition-colors"
                      >
                        <span>View 10-Item Specification & Sample Data</span>
                        <ArrowRight size={13} />
                      </Link>

                      <Link
                        href="/terms#ethical-charter"
                        className="text-[#8DA99E] hover:text-[#C5D9D2] inline-flex items-center gap-1 text-[11px] transition-colors"
                      >
                        <Shield size={11} className="text-[#2FA885]" />
                        <span>Ethical Scope Limits</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Have a research inquiry not listed here?
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light max-w-xl">
              We frequently formulate custom statements of work combining OSINT data extraction, threat telemetry, and entity resolution.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shrink-0"
          >
            <span>Discuss Custom Scope</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
