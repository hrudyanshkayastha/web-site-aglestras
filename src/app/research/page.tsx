import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research Domains & Capabilities — AGLETRAS",
  description:
    "Review Agletras's ongoing open intelligence research domains, technical workflows, illustrative demonstrations, and publication ethics.",
};

const researchDomains = [
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

export default function ResearchPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
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
                <div
                  key={index}
                  className="p-8 rounded-3xl bg-[#073B32]/30 border border-[#B7E4D5]/15 shadow-3d-card backdrop-blur-sm flex flex-col justify-between space-y-6 hover:border-[#2FA885]/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885]">
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
                </div>
              );
            })}
          </div>
        </div>

        {/* Conceptual Visual Feature: The Neural Network Model of Open Records */}
        <div className="relative rounded-3xl overflow-hidden border border-[#B7E4D5]/25 bg-[#031714] shadow-2xl">
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full">
            <Image
              src="/images/agletras-emerald-world.png"
              alt="Agletras Neural Intelligence Topology Model"
              fill
              className="object-cover object-center filter brightness-[0.75] contrast-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031714] via-[#031714]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-2xl space-y-3 z-10">
              <span className="text-[10px] uppercase tracking-widest font-mono text-[#2FA885] bg-[#073B32]/90 px-3 py-1 rounded-full border border-[#B7E4D5]/20 backdrop-blur-md">
                Topological Intelligence Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
                Neural Architecture of Disparate Open Records
              </h3>
              <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                Conceptualizing open-source investigation as a dimensional network where isolated observations converge through verified relational edges into synthesized intelligence. Every node represents a primary source; every edge represents an empirically verified relationship.
              </p>
            </div>
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
                className="p-8 rounded-3xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-5 flex flex-col justify-between"
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

                <div className="p-4 rounded-xl bg-[#041F1B] border border-[#B7E4D5]/10 space-y-1 text-xs font-mono">
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
                className="p-8 rounded-3xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
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
        <div className="p-8 sm:p-10 rounded-3xl bg-[#031714] border border-[#B7E4D5]/20 space-y-4">
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

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA]">
              Collaborate on an Intelligence Research Question
            </h3>
            <p className="text-sm text-[#C5D9D2] font-light max-w-xl">
              We partner with organizations to build specialized data collection pipelines and explore complex threat domains.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shrink-0"
          >
            <span>Initiate Research Inquiry</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
