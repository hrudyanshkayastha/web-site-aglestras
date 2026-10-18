import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Search, Users, AlertTriangle, Workflow, Network } from "lucide-react";
import { servicesData } from "@/data/services";

export function CompactServicesSection() {
  const iconMap: Record<string, React.ElementType> = {
    "external-threat-intelligence": ShieldCheck,
    "business-due-diligence": Search,
    "recruitment-verification": Users,
    "brand-impersonation-research": AlertTriangle,
    "research-automation-pipelines": Workflow,
    "osint-investigative-research": Network,
  };

  return (
    <section className="py-20 md:py-28 bg-[#FCFCF8] text-[#041F1B] relative overflow-hidden border-t border-[#073B32]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#073B32]/10 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#073B32] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Verified Capabilities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#041F1B]">
              Six Focused Service Lines.{" "}
              <span className="italic font-normal text-[#073B32]">
                Zero Generic Output.
              </span>
            </h2>
            <p className="text-sm md:text-base text-[#4E635D] font-light">
              Every engagement operates under a defined Statement of Work with transparent boundaries and traceable provenance.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#073B32] hover:text-[#2FA885] font-semibold transition-colors shrink-0"
          >
            <span>Explore Full Specifications</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Compact, Visually Varied 6-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon = iconMap[service.id] || ShieldCheck;
            const isPrimary = service.isPrimary;

            return (
              <div
                key={service.id}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between group ${
                  isPrimary
                    ? "lg:col-span-2 bg-[#041F1B] text-[#F4F2EA] border-[#2FA885]/40 shadow-3d-card"
                    : "bg-[#FFFFFF] text-[#041F1B] border-[#073B32]/10 hover:border-[#2FA885]/40 hover:-translate-y-1 shadow-sm"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isPrimary
                            ? "bg-[#073B32] text-[#2FA885]"
                            : "bg-[#F4F2EA] text-[#073B32]"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                          isPrimary ? "text-[#2FA885]" : "text-[#2FA885]"
                        }`}
                      >
                        {service.code}
                      </span>
                    </div>

                    {isPrimary && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/30 font-medium">
                        Primary Focus
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-editorial font-semibold mb-1.5 ${
                        isPrimary ? "text-[#F4F2EA]" : "text-[#041F1B]"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-light leading-relaxed ${
                        isPrimary ? "text-[#C5D9D2]" : "text-[#4E635D]"
                      }`}
                    >
                      {service.id === "external-threat-intelligence"
                        ? "Research and analyze publicly available cyber-threat information, indicators, infrastructure and campaigns to produce actionable security intelligence."
                        : service.id === "business-due-diligence"
                        ? "Research publicly available information about companies, founders, directors, and vendors to support informed business decisions."
                        : service.id === "recruitment-verification"
                        ? "Verify publicly available professional and digital information against records supplied for recruitment workflows."
                        : service.id === "brand-impersonation-research"
                        ? "Identify and analyze publicly visible indicators of brand impersonation, fraudulent activity and suspicious digital assets."
                        : service.id === "research-automation"
                        ? "Build automation workflows that reduce repetitive information collection, processing, analysis and reporting tasks."
                        : "Research lawfully accessible public information and transform fragmented records into structured, defensible intelligence."}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider ${
                      isPrimary ? "text-[#8DA99E]" : "text-[#718E84]"
                    }`}
                  >
                    Statement of Work Scoped
                  </span>
                  <Link
                    href={`/services#${service.id}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-transform group-hover:translate-x-1 ${
                      isPrimary
                        ? "text-[#B7E4D5] hover:text-[#FFFFFF]"
                        : "text-[#073B32] hover:text-[#2FA885]"
                    }`}
                  >
                    <span>Inspect Scope</span>
                    <ArrowUpRight size={14} />
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
