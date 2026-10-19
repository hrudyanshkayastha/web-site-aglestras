"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  FileCode,
  Network,
  ShieldCheck,
  Database,
  Terminal,
  Cpu,
  Layers,
  Code2,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SpatialEntityGraph } from "@/components/visuals/SpatialEntityGraph";

interface ResearchDomain {
  icon: React.ElementType;
  title: string;
  summary: string;
  scope: string;
}

const researchDomains: ResearchDomain[] = [
  {
    icon: Search,
    title: "OSINT Automation Systems",
    summary:
      "Engineering deterministic workflows to ingest, validate, and index passive open-source records without violating platform rate limits or access terms.",
    scope: "Public registries, passive DNS, certificate transparency logs, and code repositories.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Threat Telemetry Correlation",
    summary:
      "Correlating observable indicators of compromise (IoCs), adversary campaign staging, and lookalike domain permutations against threat actor profiles.",
    scope: "Public threat intelligence feeds, MITRE ATT&CK framework alignment, and malware hash databases.",
  },
  {
    icon: Network,
    title: "Graph Correlation & Entity Resolution",
    summary:
      "Resolving multi-node entity clusters to uncover hidden corporate cross-holdings, shared digital assets, and indirect counterparty relationships.",
    scope: "Disparate corporate filings, gazettes, and public beneficial ownership registries.",
  },
  {
    icon: Database,
    title: "Digital Attack Surface Discovery",
    summary:
      "Passive reconnaissance of organization perimeters: exposed staging infrastructure, expiring certificates, misconfigured subdomains, and DNS mutations.",
    scope: "Passive DNS history, SSL/TLS certificate transparency, and open public indexers.",
  },
  {
    icon: Cpu,
    title: "AI-Assisted Signal Extraction",
    summary:
      "Utilizing structured machine-learning models to summarize high-volume public filings, identify textual inconsistencies, and score visual brand similarity.",
    scope: "Document OCR, semantic clustering, and logo similarity classification algorithms.",
  },
  {
    icon: Terminal,
    title: "Open-Source Intelligence Tooling",
    summary:
      "Evaluating and maintaining specialized open-source investigative utilities tailored for reproducible, peer-reviewed forensic workflows.",
    scope: "Custom Python/TypeScript extraction scripts, local SQLite intelligence databases, and export utilities.",
  },
];

const technicalDemonstrations = [
  {
    title: "Passive DNS Lookalike Cluster Detection",
    type: "Demonstration Workflow",
    description:
      "Ingests certificate transparency streams in real time, generates Levenshtein and homoglyph mutations of primary domains, and correlates resolving A-records to isolate staging clusters before phishing campaigns launch.",
    architecture: "Node.js Stream Ingestion → Levenshtein Permutation Filter → DNS Over HTTPS Telemetry → Risk Scoring Engine",
  },
  {
    title: "Cross-Jurisdiction Corporate Directorship Linker",
    type: "Demonstration Workflow",
    description:
      "Ingests structured public registry filings across multiple jurisdictions, normalizes director identities using phonetic algorithms (Double Metaphone + Jaro-Winkler), and constructs bidirectional entity relationship graphs.",
    architecture: "Registry Extractor → Entity Normalizer → Graph Adjacency Matrix → Community Detection Clusterer",
  },
];

const illustrativeDatasets = [
  {
    tag: "Demonstration Dataset",
    title: "Acme Global Staging Discovery (Simulated Scope)",
    findingSummary:
      "Illustrated how passive TLS certificate logging detected 2 adversary lookalike endpoints 48 hours prior to targeted credential phishing operations.",
    status: "Fictional Demonstration Dataset",
    linkText: "View Sample Threat Brief",
    href: "/services/external-threat-intelligence",
  },
  {
    tag: "Demonstration Dataset",
    title: "Apex Logistics Cross-Holding Analysis (Simulated Scope)",
    findingSummary:
      "Demonstrated how public registry filings in Singapore and BVI resolved an undisclosed common directorship with a competing regional freight consortium.",
    status: "Fictional Demonstration Dataset",
    linkText: "View Sample Due Diligence Matrix",
    href: "/services/business-due-diligence",
  },
];

export function ResearchPageClient() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-transparent via-[#041F1B]/40 to-[#041F1B]/80 text-[#F4F2EA] min-h-screen overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Open Intelligence Research</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Research Domains,{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Workflows & Demonstrations.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Agletras investigates the technical frontier where open-source intelligence, cybersecurity,
            automation, and machine-assisted analysis intersect.
          </p>
        </div>

        {/* What Research Means at Agletras */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#073B32]/35 border border-[#2FA885]/40 shadow-2xl backdrop-blur-xl space-y-8 relative overflow-hidden">
          <div className="space-y-3 border-b border-[#B7E4D5]/15 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block">
              Core Principles // Epistemic Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              What Research Means at Agletras
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light max-w-3xl leading-relaxed">
              At Agletras, research is not passive browsing or unstructured aggregation. It is a systematic, hypothesis-driven discipline focused on delivering structured, verifiable findings that support informed business decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {[
              {
                num: "01",
                title: "Define the Business Question",
                desc: "Establish the client's commercial question, factual criteria, and decision context before research commences.",
              },
              {
                num: "02",
                title: "Identify Relevant, Lawful Sources",
                desc: "Map authorized public records, statutory registries, official publications, and lawful unclassified data sources.",
              },
              {
                num: "03",
                title: "Collect and Organize Information",
                desc: "Systematically gather relevant public records and organize disparate data points into structured investigative repositories.",
              },
              {
                num: "04",
                title: "Compare and Corroborate Sources",
                desc: "Cross-reference observations across independent publications and registries to assess consistency and corroboration.",
              },
              {
                num: "05",
                title: "Identify Relationships and Inconsistencies",
                desc: "Examine corporate networks, ownership links, timeline anomalies, and contradictory evidence across sources.",
              },
              {
                num: "06",
                title: "Evaluate Evidence and Alternative Explanations",
                desc: "Challenge cognitive assumptions, test competing hypotheses, and eliminate single-source hearsay.",
              },
              {
                num: "07",
                title: "Document Confidence and Unresolved Questions",
                desc: "Clearly distinguish confirmed facts from indicators and inferences, while documenting knowledge gaps and research boundaries.",
              },
              {
                num: "08",
                title: "Deliver Structured Findings and Practical Next Steps",
                desc: "Author decision-ready executive reports with source citations, clear limitations, and objective guidance.",
              },
            ].map((principle) => (
              <div
                key={principle.num}
                className="p-5 rounded-2xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1.5 hover:border-[#2FA885]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#2FA885] px-2 py-0.5 rounded bg-[#073B32]">
                    {principle.num}
                  </span>
                  <h3 className="font-editorial text-sm sm:text-base font-semibold text-[#F4F2EA]">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-xs text-[#C5D9D2] font-light leading-relaxed pl-8">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#031714] border border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E] flex items-start gap-2.5">
            <span className="text-[#2FA885] font-bold mt-0.5">ℹ</span>
            <span>
              <strong>Epistemic Integrity Notice:</strong> Public information can be incomplete, outdated, misleading, or unavailable. Agletras does not imply that every source is authoritative or that every finding can be independently verified. Where data is restricted, contradictory, or absent from lawful public records, we explicitly document the investigative boundary rather than speculate.
            </span>
          </div>
        </div>

        {/* Category 1: Ongoing Research Domains */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Category 01 // Active Lines of Inquiry
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Ongoing Research Domains
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light mt-1">
              Methodological areas under active development across our engineering and intelligence practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchDomains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="p-8 rounded-3xl bg-[#073B32]/35 border border-[#B7E4D5]/20 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[#2FA885]/60 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885] group-hover:border-[#2FA885] group-hover:shadow-[0_0_16px_rgba(47,168,133,0.35)] transition-all">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                      {domain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C5D9D2] leading-relaxed font-light">
                      {domain.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#8DA99E]">
                    <span className="block text-[10px] uppercase text-[#2FA885] mb-1">
                      Primary Data Vectors:
                    </span>
                    <span>{domain.scope}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Interactive 3D Spatial Entity Graph Explorer */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#2FA885] font-semibold block">
                Topological Intelligence Explorer
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                Neural Architecture of Disparate Open Records
              </h2>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
                INTERACTIVE 3D GRAPH
              </span>
              <Link
                href="/#destination-atlas"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] font-semibold transition-all shadow-md group"
                title="Explore full-screen 3D Evidence Atlas in the sanctuary"
              >
                <span>Sanctuary View</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#C5D9D2] font-light max-w-3xl">
            Explore our interactive relationship model. Click or drag to rotate in 3D; select any entity node to inspect its provenance, classification, and relational edges in the dossier inspector.
          </p>

          <div className="rounded-3xl border border-[#B7E4D5]/25 overflow-hidden shadow-2xl bg-[#031714]/85 backdrop-blur-2xl">
            <SpatialEntityGraph className="w-full" />
          </div>
        </div>

        {/* Category 2: Technical Demonstrations & Workflows */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Category 02 // Functional Architectures
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Technical Demonstrations & Workflows
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light mt-1">
              Engineered pipeline architectures illustrating how data flows from ingestion to synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalDemonstrations.map((demo, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/20 backdrop-blur-md space-y-5 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#2FA885]/20 text-[#B7E4D5] border border-[#2FA885]/30">
                      {demo.type}
                    </span>
                    <Code2 size={16} className="text-[#2FA885]" />
                  </div>
                  <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                    {demo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                    {demo.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#041F1B] border border-[#B7E4D5]/10 space-y-1 text-xs font-mono">
                  <span className="text-[10px] text-[#8DA99E] uppercase block">Pipeline Data Flow:</span>
                  <p className="text-[#2FA885] leading-relaxed">{demo.architecture}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 3: Illustrative Case Studies (Explicitly Labeled Demonstrations) */}
        <div className="space-y-8">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Category 03 // Illustrative Applications
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Illustrative Demonstration Datasets
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light mt-1">
              Representative intelligence briefs using simulated data to demonstrate analytical rigor without exposing client confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {illustrativeDatasets.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/20 backdrop-blur-md space-y-4 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="font-semibold tracking-wider">ILLUSTRATIVE DEMONSTRATION — NOT A REAL CLIENT INVESTIGATION</span>
                  </div>
                  <h3 className="text-lg font-editorial font-semibold text-[#F4F2EA]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                    {item.findingSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B7E4D5]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-[#8DA99E]">{item.status}</span>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 4: Formal Publications Status & Ethics */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#031714] border border-[#B7E4D5]/20 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
            <BookOpen size={16} className="text-[#2FA885]" />
            <span>Category 04 // Formal Publications Status & Scholarly Disclosure</span>
          </div>
          <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
            Research Integrity & Verified Publication Standards
          </h3>
          <p className="text-sm text-[#C5D9D2] font-light leading-relaxed">
            Agletras maintains strict scientific integrity: we do not fabricate published papers, authors, citations, or client case studies. Formal technical whitepapers, conference submissions, and open-source intelligence research tooling are undergoing peer review and will be published with authoritative DOI/arXiv identifiers as they are formally released.
          </p>
          <div className="pt-2 text-xs font-mono text-[#8DA99E] flex items-center gap-2">
            <CheckCircle2 size={13} className="text-[#2FA885]" />
            <span>All public research is licensed under open, non-commercial research principles.</span>
          </div>
        </div>

        {/* Practical Business Insights (Navigation Target: /research#insights) */}
        <div id="insights" className="space-y-8 scroll-mt-28">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
              Practical Insights // Executive Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              Answers to Critical Business Questions
            </h2>
            <p className="text-sm text-[#C5D9D2] font-light mt-1">
              Clear, evidence-backed perspectives for founders, business owners, consultants, and decision-makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                question: "How to check if a potential business partner is genuine",
                insight:
                  "Look beyond pitch decks and company marketing. Examine official statutory registries for incorporation dates, active directorships, registered office reality, and cross-holdings. Cross-reference court gazettes, public dispute registers, and regulatory filings to uncover undisclosed liabilities before signing agreements.",
                serviceLink: "/services/business-due-diligence",
                serviceName: "Business Due Diligence",
              },
              {
                question: "How to protect an e-commerce brand from lookalike scams",
                insight:
                  "Fraudulent copycats exploit customer trust with permuted domains, lookalike social handles, and cloned checkout pages. Monitor certificate transparency logs for new SSL registrations containing your trademarks, check for active mail exchanger (MX) records, and document technical registrar evidence for takedowns.",
                serviceLink: "/services/brand-impersonation-research",
                serviceName: "Brand Impersonation & Scam Research",
              },
              {
                question: "What to verify before hiring key personnel",
                insight:
                  "In remote and senior executive hiring, self-reported resumes frequently contain inflated titles, unverified tenures, or omitted affiliations. With candidate consent, verify claims against contemporaneous corporate announcements, public patent registrations, open-source code repositories, and statutory records.",
                serviceLink: "/services/recruitment-verification",
                serviceName: "Recruitment Verification",
              },
              {
                question: "How to know if your company’s public information is exposing you to risk",
                insight:
                  "Companies frequently leave test environments, expired certificates, unauthenticated staging subdomains, and misplaced API tokens observable on the public internet. Passive attack surface reconnaissance identifies these exterior blind spots without invasive network penetration.",
                serviceLink: "/services/external-threat-intelligence",
                serviceName: "Cyber Threat Intelligence",
              },
              {
                question: "What public records can reveal about a competitor",
                insight:
                  "Lawful open-source information provides remarkable visibility into competitor strategy. Public trademark filings reveal upcoming brand launches; archived hiring listings reveal technical investments; and corporate filings uncover regional expansion and supplier relationships.",
                serviceLink: "/services/osint-investigative-research",
                serviceName: "OSINT Investigation",
              },
              {
                question: "How to streamline research without drowning in tabs and duplicate files",
                insight:
                  "Manual research across government gazettes, registries, and domain feeds leads to analyst fatigue and missed updates. Custom open-source data pipelines automate collection, normalize disparate schemas, eliminate duplicate records, and generate structured executive digests.",
                serviceLink: "/services/research-automation",
                serviceName: "Research Automation & Pipelines",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/20 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-[#2FA885]/50 transition-all duration-300 group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#041F1B] border border-[#2FA885]/35 flex items-center justify-center text-[#2FA885] text-xs font-mono font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="font-editorial text-lg font-semibold text-[#F4F2EA] leading-snug group-hover:text-[#B7E4D5] transition-colors">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                    {item.insight}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B7E4D5]/10">
                  <Link
                    href={item.serviceLink}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#2FA885] hover:text-[#B7E4D5] transition-colors"
                  >
                    <span>Relevant: {item.serviceName}</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Discuss Your Research Requirement
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light">
              Explore our services or request a consultation tailored to your specific commercial questions. We define clear scope boundaries and deliver evidence-backed findings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0 relative z-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#0a4d40] border border-[#B7E4D5]/30 transition-all"
            >
              <span>Explore Our Services</span>
              <ArrowRight size={14} className="text-[#2FA885]" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-lg shadow-[#041F1B]/50 hover:shadow-[0_4px_24px_rgba(47,168,133,0.3)]"
            >
              <span>Request a Research Consultation</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
