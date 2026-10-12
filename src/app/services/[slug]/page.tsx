import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Search,
  Users,
  AlertTriangle,
  Workflow,
  Network,
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Layers,
  HelpCircle,
  ChevronRight,
  Shield,
  Hash,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/services";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  if (!service) {
    return {
      title: "Service Not Found — AGLETRAS",
    };
  }
  return {
    title: `${service.title} (${service.code}) — AGLETRAS Specification`,
    description: service.overview,
  };
}

const iconMap: Record<string, React.ElementType> = {
  "external-threat-intelligence": ShieldCheck,
  "business-due-diligence": Search,
  "recruitment-verification": Users,
  "brand-impersonation-research": AlertTriangle,
  "research-automation": Workflow,
  "osint-investigative-research": Network,
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.id] || ShieldCheck;
  const currentIndex = servicesData.findIndex((s) => s.id === service.id);
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8DA99E] border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Services Catalog</span>
            </Link>
            <ChevronRight size={13} className="text-[#073B32]" />
            <span className="text-[#C5D9D2]">{service.code}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/services/${prevService.id}`}
              className="hover:text-[#B7E4D5] transition-colors"
            >
              ← Prev: {prevService.code}
            </Link>
            <span className="text-[#073B32]">|</span>
            <Link
              href={`/services/${nextService.id}`}
              className="hover:text-[#B7E4D5] transition-colors"
            >
              Next: {nextService.code} →
            </Link>
          </div>
        </div>

        {/* 1. Header & Overview Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#073B32] border border-[#B7E4D5]/25 flex items-center justify-center text-[#2FA885]">
              <Icon size={20} />
            </div>
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-md bg-[#073B32] text-[#2FA885] border border-[#2FA885]/30">
              {service.code}
            </span>
            {service.isPrimary && (
              <span className="font-mono text-xs px-3 py-1 rounded-md bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/40 font-medium">
                Primary Commercial Focus
              </span>
            )}
            <span className="text-xs font-mono text-[#8DA99E] uppercase tracking-wider">
              Service Specification v2.4
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-semibold text-[#F4F2EA] leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-[#B7E4D5] font-light">
              {service.shortTagline}
            </p>
          </div>

          {/* Item 1: Overview in Plain Language */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/35 border border-[#B7E4D5]/20 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>01 // Plain-Language Purpose</span>
            </div>
            <p className="text-base sm:text-lg text-[#F4F2EA] font-light leading-relaxed">
              {service.overview}
            </p>
          </div>
        </div>

        {/* Section 4: Value-Layered Technical Terminology (Outcome -> Method -> Limits) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#031714] to-[#041F1B] border border-[#2FA885]/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#2FA885] font-semibold">
              Value Translation Architecture
            </span>
            <span className="text-[11px] font-mono text-[#8DA99E]">
              Epistemic Triad
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
            <div className="space-y-1.5 p-4 rounded-xl bg-[#073B32]/30 border border-[#B7E4D5]/15">
              <span className="font-mono text-[#2FA885] uppercase block font-semibold">
                1. Client Outcome
              </span>
              <p className="text-[#F4F2EA] leading-relaxed font-light">
                {service.valueLayer.clientOutcome}
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-[#073B32]/30 border border-[#B7E4D5]/15">
              <span className="font-mono text-[#B7E4D5] uppercase block font-semibold">
                2. Technical Method
              </span>
              <p className="text-[#C5D9D2] leading-relaxed font-light">
                {service.valueLayer.technicalMethod}
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-xl bg-[#073B32]/30 border border-[#B7E4D5]/15">
              <span className="font-mono text-[#8DA99E] uppercase block font-semibold">
                3. Evidence & Limits
              </span>
              <p className="text-[#A1B8B0] leading-relaxed font-light">
                {service.valueLayer.evidenceAndLimits}
              </p>
            </div>
          </div>
        </div>

        {/* Item 2 & 3: Who It Helps & Concrete Problems Addressed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item 2: Who It Helps */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <Users size={15} className="text-[#2FA885]" />
              <span>02 // Who It Helps</span>
            </div>
            <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
              Target Client Profiles
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#C5D9D2]">
              {service.whoItHelps.map((target, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-2 shrink-0" />
                  <span className="leading-relaxed">{target}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Item 3: Problems Addressed */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <AlertTriangle size={15} className="text-[#2FA885]" />
              <span>03 // Concrete Problems Addressed</span>
            </div>
            <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
              Real-World Scenarios
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#C5D9D2]">
              {service.problemsAddressed.map((problem, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Item 4: What We Do (Research Activities) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/20 space-y-6">
          <div className="flex items-center justify-between border-b border-[#B7E4D5]/15 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <Search size={15} className="text-[#2FA885]" />
              <span>04 // What We Do · Actual Research Activities</span>
            </div>
            <span className="text-xs font-mono text-[#8DA99E]">
              {service.scopeOfInvestigation.length} Scope Parameters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#D8E8E2]">
            {service.scopeOfInvestigation.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#041F1B]/60 border border-[#B7E4D5]/10"
              >
                <CheckCircle2 size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Item 5: How It Works (6-Stage Process) */}
        <div className="space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <Workflow size={15} className="text-[#2FA885]" />
              <span>05 // How It Works · Investigation & Delivery Process</span>
            </div>
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA] mt-1">
              6-Stage Rigorous Workflow
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.workflowDetailed.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold">
                      Phase {step.step}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#041F1B] border border-[#2FA885]/30 text-[#2FA885] font-mono text-xs flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h4 className="text-base font-editorial font-semibold text-[#F4F2EA]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Item 6: What You Provide (Client Prerequisites) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
            <Clock size={15} className="text-[#2FA885]" />
            <span>06 // What You Provide · Scoping Input Checklist</span>
          </div>
          <p className="text-xs text-[#8DA99E] font-light">
            To initiate an engagement and ensure lawful discovery, the client supplies the following prerequisites:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#D8E8E2]">
            {service.clientPrerequisites.map((req, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#041F1B]/60 border border-[#B7E4D5]/10"
              >
                <span className="font-mono text-[#2FA885] font-semibold">0{idx + 1}.</span>
                <span className="leading-relaxed font-light">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Item 7: What You Receive (Deliverables + Tangible Deliverable Preview) */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
              <FileText size={15} className="text-[#2FA885]" />
              <span>07 // What You Receive · Tangible Deliverable Package</span>
            </div>
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA] mt-1">
              Decision-Ready Output
            </h3>
          </div>

          {/* Summary of Deliverables List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.deliverables.map((del, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#073B32]/30 border border-[#B7E4D5]/15 flex items-start gap-2.5 text-xs text-[#E2F4EE]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] mt-1.5 shrink-0" />
                <span className="leading-relaxed font-light">{del}</span>
              </div>
            ))}
          </div>

          {/* Concrete Illustrative Deliverable Preview Card with Explicit Demonstration Label */}
          <div className="rounded-3xl surface-matte-ivory text-[#041F1B] border border-[#073B32]/20 shadow-3d-card overflow-hidden">
            {/* Header Band */}
            <div className="bg-[#041F1B] text-[#F4F2EA] px-6 sm:px-8 py-5 border-b border-[#073B32] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#073B32] flex items-center justify-center text-[#B7E4D5]">
                  <FileText size={16} />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#2FA885] font-semibold tracking-wider block">
                    {service.deliverablePreview.previewTypeBadge}
                  </span>
                  <span className="text-[11px] font-mono text-[#8DA99E]">
                    Report ID: {service.deliverablePreview.reportId} // {service.deliverablePreview.date}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#073B32] text-[#B7E4D5] text-[11px] font-mono border border-[#B7E4D5]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
                <span>DEMONSTRATION DATASET // NON-CLIENT DATA</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Target & Title */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#5A736C] block">
                  Target Scope: {service.deliverablePreview.scopeSummary}
                </span>
                <h4 className="text-2xl font-editorial font-semibold text-[#041F1B]">
                  {service.deliverablePreview.previewTitle}
                </h4>
              </div>

              {/* Key Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {service.deliverablePreview.keyMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F8F6F0] border border-[#073B32]/10 space-y-1"
                  >
                    <span className="block text-[10px] font-mono uppercase text-[#718E84]">
                      {metric.label}
                    </span>
                    <strong className="block text-base sm:text-lg font-editorial text-[#041F1B]">
                      {metric.value}
                    </strong>
                    {metric.hint && (
                      <span className="block text-[10px] font-mono text-[#2FA885]">
                        {metric.hint}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Findings Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold">
                    Attributed Findings Register
                  </h5>
                  <span className="text-[11px] font-mono text-[#5A736C]">
                    5-Tier Epistemic Attribution
                  </span>
                </div>

                <div className="overflow-x-auto border border-[#073B32]/10 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F6F0] border-b border-[#073B32]/10 font-mono text-[#073B32]">
                      <tr>
                        <th className="p-3 font-semibold">ID</th>
                        <th className="p-3 font-semibold">Tier</th>
                        <th className="p-3 font-semibold">Observation</th>
                        <th className="p-3 font-semibold">Source Citation</th>
                        <th className="p-3 font-semibold">Confidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#073B32]/10 text-[#3D524C]">
                      {service.deliverablePreview.findingsTable.map((row) => (
                        <tr key={row.id} className="hover:bg-[#F8F6F0]/60 transition-colors">
                          <td className="p-3 font-mono font-medium text-[#041F1B] whitespace-nowrap">
                            {row.id}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                                row.level === "FACT"
                                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                  : row.level === "INDICATOR"
                                  ? "bg-teal-100 text-teal-900 border border-teal-300"
                                  : row.level === "INFERENCE"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300"
                                  : "bg-rose-100 text-rose-900 border border-rose-300"
                              }`}
                            >
                              {row.level}
                            </span>
                          </td>
                          <td className="p-3 font-light leading-relaxed max-w-xs sm:max-w-md">
                            {row.observation}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-[#5A736C] max-w-xs truncate">
                            {row.sourceCitation}
                          </td>
                          <td className="p-3 font-mono text-[11px] text-[#073B32] whitespace-nowrap">
                            {row.confidence}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actionable Steps */}
              <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#073B32]/10 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold block">
                  Recommended Actionable Steps
                </span>
                <ul className="space-y-1.5 text-xs text-[#3D524C] font-light">
                  {service.deliverablePreview.mitigationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-[#073B32] font-semibold">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Item 8: Limitations & Scope Boundaries */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#073B32]/25 border border-rose-500/20 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-300 font-semibold">
            <AlertCircle size={15} className="text-rose-400" />
            <span>08 // Documented Limitations & Scope Boundaries</span>
          </div>
          <p className="text-xs text-[#8DA99E] font-light">
            In accordance with the Agletras Ethical Charter, all limitations, exclusions, and uncertainty boundaries are disclosed explicitly:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#C5D9D2] font-light">
            {service.limitations.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span className="leading-relaxed">{lim}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Item 9 & 10: Request This Service CTA & Terms & Privacy Links */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block">
              09 // Request This Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Ready to scope a {service.title} engagement?
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light max-w-xl">
              Begin by completing our structured inquiry brief. Our research team will review your objectives and confirm feasibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              href={`/contact?service=${service.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-lg shadow-[#041F1B]/60"
            >
              <span>{service.ctaLabel}</span>
              <ArrowUpRight size={14} />
            </Link>

            <Link
              href="/terms#ethical-charter"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs font-mono uppercase tracking-widest text-[#F4F2EA] bg-[#041F1B]/80 hover:bg-[#073B32] border border-[#B7E4D5]/30 transition-all"
            >
              <Shield size={13} className="text-[#2FA885]" />
              <span>Ethical Charter (10)</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
