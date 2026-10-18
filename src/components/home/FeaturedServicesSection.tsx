"use client";

import React from "react";
import Link from "next/link";
import { 
  Network, 
  Search, 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  Workflow, 
  ArrowRight, 
  ArrowUpRight,
  FileCheck
} from "lucide-react";
import { servicesData } from "@/data/services";

const SERVICE_CARDS = [
  {
    slug: "osint-investigation",
    code: "AGL-OIR",
    title: "OSINT Investigation",
    tagline: "Deep research into public records, entities, and corporate relationships.",
    problem: "When you need to investigate a company, individual, or transaction using purely open and lawful sources.",
    deliverable: "Documented investigative report with attribution confidence ratings, relationship maps, and evidence archives.",
    whoFor: "Law firms, executives, business owners, and corporate investigators.",
    icon: Network,
  },
  {
    slug: "business-due-diligence",
    code: "AGL-BDD",
    title: "Business Due Diligence",
    tagline: "Uncover counterparty risk, corporate filings, and ownership networks.",
    problem: "Before signing major contracts, entering joint ventures, or acquiring assets with unknown histories.",
    deliverable: "Business Due Diligence Dossier, public litigation history, and director network mapping.",
    whoFor: "Founders, investment teams, commercial consultants, and procurement managers.",
    icon: Search,
  },
  {
    slug: "recruitment-verification",
    code: "AGL-RVR",
    title: "Recruitment Verification",
    tagline: "Verify professional histories, timelines, and technical claims under authorized scope.",
    problem: "Prevent costly executive hiring mistakes caused by resume embellishments or unverified track records.",
    deliverable: "Candidate verification brief comparing declared career timelines with statutory filings and public archives.",
    whoFor: "HR leaders, recruiters, executive search consultants, and startup founders.",
    icon: Users,
  },
  {
    slug: "brand-impersonation-research",
    code: "AGL-BIR",
    title: "Brand Impersonation & Scam Research",
    tagline: "Detect lookalike domains, cloned social profiles, and fraudulent campaigns.",
    problem: "Scammers spoofing your brand name, siphoning customers, or damaging market reputation.",
    deliverable: "Infringing Asset Registry with registrar/hosting metadata ready for legal notice and takedown.",
    whoFor: "D2C brands, e-commerce retailers, marketing agencies, and brand managers.",
    icon: AlertTriangle,
  },
  {
    slug: "cyber-threat-intelligence",
    code: "AGL-ETI",
    title: "Cyber Threat Intelligence",
    tagline: "Passive external attack-surface analysis, threat indicators, and digital exposure mapping.",
    problem: "Identify adversary infrastructure, lookalike domains, and leaked credentials before attacks occur.",
    deliverable: "Executive Threat Brief, machine-readable IoC lists, and prioritized defensive recommendations.",
    whoFor: "SOC analysts, CISOs, IT managers, and security-conscious founders.",
    icon: ShieldCheck,
  },
  {
    slug: "research-automation",
    code: "AGL-RAP",
    title: "Research Automation & Pipelines",
    tagline: "Turn repetitive manual intelligence collection into automated, repeatable workflows.",
    problem: "Analysts wasting hundreds of hours manually checking registries, search queries, and threat feeds.",
    deliverable: "Custom data collection scripts, ingestion pipelines, and structured notification workflows.",
    whoFor: "Research teams, consulting firms, market analysts, and security operations.",
    icon: Workflow,
  },
];

export function FeaturedServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#030d0a] text-[#f4f2ea] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-[#2fa885]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073b32]/80 border border-[#34d399]/30 text-xs font-mono text-[#b7e4d5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span>SECTION 05 // SERVICES CATALOG</span>
            </div>

            <h2 className="text-editorial-title text-[#f4f2ea]">
              Six Verified{" "}
              <span className="italic font-normal text-[#34d399]">
                Intelligence Services.
              </span>
            </h2>

            <p className="text-base md:text-lg text-[#cbd5d1] font-light leading-relaxed">
              Every service is structured around transparent inputs, documented methodologies, and decision-ready deliverables.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-[#b7e4d5] bg-[#073b32]/80 hover:bg-[#34d399] hover:text-[#041f1b] border border-[#34d399]/30 transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            <span>View Full Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CARDS.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.code}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#06241c] via-[#041914] to-[#03130f] border border-[#34d399]/25 hover:border-[#34d399]/60 transition-all duration-300 shadow-[0_12px_40px_rgba(2,15,11,0.6)] hover:shadow-[0_16px_50px_rgba(52,211,153,0.15)] flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#073b32] border border-[#34d399]/40 flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-mono text-[#8da99e] tracking-widest">
                      {service.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea] group-hover:text-[#34d399] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#b7e4d5] font-medium leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>

                  <div className="pt-2 space-y-2 text-xs text-[#cbd5d1]">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8da99e] block">
                        Problem Solved:
                      </span>
                      <p className="font-light">{service.problem}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8da99e] block">
                        What You Receive:
                      </span>
                      <p className="font-light text-[#e2ece8]">{service.deliverable}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#34d399]/15 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8da99e]">
                    For: {service.whoFor.split(",")[0]}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#34d399] group-hover:text-[#b7e4d5] transition-colors"
                  >
                    <span>Specification</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
