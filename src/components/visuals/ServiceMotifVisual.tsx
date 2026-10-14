"use client";

import React, { useState } from "react";
import {
  Network,
  Search,
  ShieldAlert,
  Users,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Lock,
  FileText,
  Clock,
  Layers,
  Terminal,
  Cpu,
} from "lucide-react";

interface ServiceMotifVisualProps {
  serviceId: string;
  serviceTitle: string;
  serviceCode: string;
}

export function ServiceMotifVisual({
  serviceId,
  serviceTitle,
  serviceCode,
}: ServiceMotifVisualProps) {
  // Common state for interactive inspection
  const [activeNode, setActiveNode] = useState<number>(0);

  // 1. OSINT Investigative Research: Interactive Relational Node Graph
  if (serviceId === "osint-investigative-research") {
    const nodes = [
      {
        id: "public-registry",
        title: "Commercial Registry",
        tier: "FACT (Primary)",
        detail: "Ingested official gazette filings, director appointments, and statutory annual returns.",
        citation: "Ministry of Corporate Affairs / Companies House Gazette",
        timestamp: "2026-08-14T09:22:00Z",
        status: "Verified",
      },
      {
        id: "passive-dns",
        title: "Passive DNS & TLS Logs",
        tier: "FACT (Technical)",
        detail: "Certificate transparency entries and historically resolving A/AAAA records.",
        citation: "Public Certificate Transparency Ingestion (RFC 6962)",
        timestamp: "2026-08-14T09:25:30Z",
        status: "Verified",
      },
      {
        id: "identity-anchor",
        title: "Corporate Identity Anchor",
        tier: "INDICATOR (High)",
        detail: "Deterministic matching of primary identifiers, official domains, and tax numbers.",
        citation: "Cross-Jurisdiction Directorship Registry",
        timestamp: "2026-08-14T09:30:10Z",
        status: "Correlated",
      },
      {
        id: "synthesized-dossier",
        title: "Synthesized Intelligence",
        tier: "INFERENCE (Peer-Reviewed)",
        detail: "Correlated evidence mapping beneficial ownership and digital perimeter dependencies.",
        citation: "AGLETRAS Senior Analyst Peer Review",
        timestamp: "2026-08-14T10:00:00Z",
        status: "Delivered",
      },
    ];

    const current = nodes[activeNode] || nodes[0];

    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-[#031714] border border-[#2FA885]/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
              <Network size={18} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Investigative Architecture Motif
              </span>
              <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#F4F2EA]">
                Relational OSINT Convergence Matrix
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            DEMONSTRATION TOPOLOGY
          </span>
        </div>

        {/* Interactive Node Flow Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {nodes.map((node, idx) => {
            const isActive = activeNode === idx;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.3)] scale-[1.02]"
                    : "bg-[#041F1B] border-[#B7E4D5]/15 hover:border-[#2FA885]/40 hover:bg-[#073B32]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#2FA885] font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#2FA885]" />
                </div>
                <div>
                  <h4 className="font-editorial text-xs sm:text-sm font-semibold text-[#F4F2EA] truncate">
                    {node.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                    {node.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Inspection Card */}
        <div className="p-5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B7E4D5]/10 pb-3">
            <span className="font-mono text-xs text-[#2FA885] font-semibold">
              Selected Node: {current.title}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-900/60 text-emerald-200 border border-emerald-500/40">
              {current.tier}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#D8E8E2] font-light leading-relaxed">
            {current.detail}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-[#8DA99E] border-t border-[#B7E4D5]/10">
            <div>
              <span className="text-[#2FA885] block">Authoritative Provenance:</span>
              <span className="truncate block">{current.citation}</span>
            </div>
            <div>
              <span className="text-[#2FA885] block">Capture Timestamp:</span>
              <span>{current.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Business Due Diligence: Corporate Ownership & Directorship Hierarchy Tree
  if (serviceId === "business-due-diligence") {
    const entities = [
      {
        name: "Target Holding Co (Overseas)",
        role: "Ultimate Holding Entity",
        jurisdiction: "British Virgin Islands / Singapore",
        finding: "Registered parent entity disclosed in statutory register.",
        riskLevel: "Low Risk",
        status: "Verified",
      },
      {
        name: "Regional Operating Subsidiary",
        role: "Primary Commercial Operator",
        jurisdiction: "United Kingdom / EU",
        finding: "Operational entity holding primary commercial contracts.",
        riskLevel: "Normal",
        status: "Active",
      },
      {
        name: "Undisclosed Directorship Overlap",
        role: "Affiliated Cross-Holding",
        jurisdiction: "Delaware, United States",
        finding: "Common nominee director shares board seats with competing regional logistics consortium.",
        riskLevel: "Attention Required",
        status: "Correlated",
      },
    ];

    const current = entities[activeNode] || entities[0];

    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-[#031714] border border-[#2FA885]/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
              <Search size={18} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Due Diligence Hierarchy Motif
              </span>
              <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#F4F2EA]">
                Cross-Jurisdiction Corporate Tree & Directorship Analysis
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            SIMULATED DUE DILIGENCE
          </span>
        </div>

        {/* Tree Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {entities.map((item, idx) => {
            const isActive = activeNode === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.3)]"
                    : "bg-[#041F1B] border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#2FA885] uppercase tracking-wider">
                    Tier 0{idx + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                      item.riskLevel.includes("Attention")
                        ? "bg-amber-900/50 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-900/50 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>
                <div>
                  <h4 className="font-editorial text-xs sm:text-sm font-semibold text-[#F4F2EA]">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                    {item.role}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection */}
        <div className="p-5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#2FA885] font-semibold">
              Jurisdiction: {current.jurisdiction}
            </span>
            <span className="text-[#8DA99E]">Direct Registry Extraction</span>
          </div>
          <p className="text-xs sm:text-sm text-[#D8E8E2] font-light leading-relaxed">
            {current.finding}
          </p>
        </div>
      </div>
    );
  }

  // 3. Recruitment Verification: Credential Integrity Pathway
  if (serviceId === "recruitment-verification") {
    const steps = [
      {
        phase: "Identity Provenance",
        source: "Official Civil Registry & Identity Validation",
        result: "Confirmed full legal name, historical records, and national registration compliance.",
        status: "PASS",
      },
      {
        phase: "Academic Accreditation",
        source: "University Registrar Archive & Degree Verification",
        result: "Conferred Bachelor of Science & Master of Engineering directly confirmed by institutional records.",
        status: "PASS",
      },
      {
        phase: "Professional & Regulatory",
        source: "Bar Association / Medical Council / Financial Authority Register",
        result: "Active license confirmed without disciplinary actions, reprimands, or active disqualifications.",
        status: "PASS",
      },
      {
        phase: "Public Adverse Media",
        source: "Open Court Gazettes & Sanction Watchlists",
        result: "Zero adverse litigation matches across national and international sanctions databases.",
        status: "CLEAR",
      },
    ];

    const current = steps[activeNode] || steps[0];

    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-[#031714] border border-[#2FA885]/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
              <Users size={18} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Verification Audit Motif
              </span>
              <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#F4F2EA]">
                Candidate Credential Integrity & Provenance Pathway
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            LAWFUL CONSENT-BACKED AUDIT
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((st, idx) => {
            const isActive = activeNode === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.3)]"
                    : "bg-[#041F1B] border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#2FA885]">Step 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-900/60 text-emerald-200 border border-emerald-500/40">
                    {st.status}
                  </span>
                </div>
                <h4 className="font-editorial text-xs sm:text-sm font-semibold text-[#F4F2EA]">
                  {st.phase}
                </h4>
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 space-y-2">
          <span className="text-xs font-mono text-[#2FA885] font-semibold block">
            Verification Vector: {current.source}
          </span>
          <p className="text-xs sm:text-sm text-[#D8E8E2] font-light leading-relaxed">
            {current.result}
          </p>
        </div>
      </div>
    );
  }

  // 4. Brand Impersonation: Lookalike Permutation & Phishing Cluster Map
  if (serviceId === "brand-impersonation-research") {
    const clusters = [
      {
        mutation: "agletras-secure[.]com",
        type: "Hyphenated Lookalike",
        registrar: "Offshore Privacy Proxy",
        ip: "198.51.100.44",
        mxRecord: "Configured (Active Phishing Staging)",
        action: "Takedown Evidence Package Generated",
        risk: "Critical",
      },
      {
        mutation: "aglеtras[.]net",
        type: "Cyrillic Homoglyph (е -> U+0435)",
        registrar: "Domain Provider X",
        ip: "203.0.113.88",
        mxRecord: "Pending DNS Resolution",
        action: "Passive Watcher Alerted",
        risk: "High",
      },
      {
        mutation: "login-agletras[.]io",
        type: "Subdomain Phishing Decoy",
        registrar: "Standard Registrar",
        ip: "192.0.2.112",
        mxRecord: "Inactive",
        action: "Perimeter Monitoring Active",
        risk: "Medium",
      },
    ];

    const current = clusters[activeNode] || clusters[0];

    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-[#031714] border border-[#2FA885]/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
              <AlertTriangle size={18} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Brand Defense Motif
              </span>
              <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#F4F2EA]">
                Lookalike Mutation & Phishing Telemetry Cluster
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            PASSIVE DETECTION (ZERO INTRUSION)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {clusters.map((item, idx) => {
            const isActive = activeNode === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.3)]"
                    : "bg-[#041F1B] border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#2FA885] uppercase">
                    Cluster 0{idx + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                      item.risk === "Critical"
                        ? "bg-rose-900/60 text-rose-200 border border-rose-500/40"
                        : "bg-amber-900/60 text-amber-200 border border-amber-500/40"
                    }`}
                  >
                    {item.risk}
                  </span>
                </div>
                <div>
                  <h4 className="font-mono text-xs sm:text-sm font-semibold text-[#F4F2EA] truncate">
                    {item.mutation}
                  </h4>
                  <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                    {item.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <span className="text-[#8DA99E] block">Resolving IP:</span>
            <span className="text-[#F4F2EA]">{current.ip}</span>
          </div>
          <div>
            <span className="text-[#8DA99E] block">MX Configuration:</span>
            <span className="text-[#2FA885]">{current.mxRecord}</span>
          </div>
          <div>
            <span className="text-[#8DA99E] block">Defensive Action:</span>
            <span className="text-amber-300">{current.action}</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Cyber Threat Intelligence: Adversary Threat Telemetry & IoC Matrix
  if (serviceId === "external-threat-intelligence") {
    const telemetry = [
      {
        ioc: "45.142.214[.]12",
        type: "IPv4 C2 Infrastructure",
        threatActor: "UNC3944 (Tracked Staging Cluster)",
        classification: "FACT (Empirical)",
        mitreTtp: "T1583.001 - Acquire Infrastructure",
        detail: "Observed issuing TLS certificates matching legitimate enterprise SSO portal naming schemas.",
      },
      {
        ioc: "login-sso-verification[.]net",
        type: "Credential Harvesting Endpoint",
        threatActor: "Adversary Campaign Alpha",
        classification: "INDICATOR (Correlated)",
        mitreTtp: "T1566.002 - Spearphishing Link",
        detail: "Resolves to shared hosting AS block known for hosting phishing kit frameworks.",
      },
      {
        ioc: "SHA256: 7a8f9c2e...b3d1",
        type: "Phishing Kit Archive Hash",
        threatActor: "Commodity Infostealer Loader",
        classification: "FACT (Cryptographic)",
        mitreTtp: "T1204.002 - Malicious File",
        detail: "Correlated across public malware repositories; aligns with observed staging endpoints.",
      },
    ];

    const current = telemetry[activeNode] || telemetry[0];

    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-[#031714] border border-[#2FA885]/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Threat Intelligence Telemetry Motif
              </span>
              <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#F4F2EA]">
                Adversary Campaign Staging & IoC Correlation Grid
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            PUBLIC TELEMETRY CORRELATION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {telemetry.map((item, idx) => {
            const isActive = activeNode === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.3)]"
                    : "bg-[#041F1B] border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#2FA885]">IoC 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-900/60 text-emerald-200 border border-emerald-500/40">
                    {item.classification.split(" ")[0]}
                  </span>
                </div>
                <div>
                  <h4 className="font-mono text-xs sm:text-sm font-semibold text-[#F4F2EA] truncate">
                    {item.ioc}
                  </h4>
                  <span className="text-[10px] font-mono text-[#8DA99E] block truncate">
                    {item.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#B7E4D5]/10 pb-3 text-xs font-mono">
            <span className="text-[#2FA885]">Threat Profile: {current.threatActor}</span>
            <span className="text-[#B7E4D5]">{current.mitreTtp}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#D8E8E2] font-light leading-relaxed">
            {current.detail}
          </p>
        </div>
      </div>
    );
  }

  // 6. Research Automation: Deterministic Ingestion Pipeline Flow
  if (serviceId === "research-automation") {
    const pipeline = [
      {
        stage: "01. Stream Watcher",
        tool: "Certificate Transparency Daemon",
        process: "Continuous passive listening for new TLS certificates issued containing target keywords.",
        throughput: "~1,200 certs/sec",
        policy: "RFC 6962 Compliance",
      },
      {
        stage: "02. Normalizer & Filter",
        tool: "Deterministic Regex & Homoglyph Engine",
        process: "Strip unresolving records, calculate Levenshtein distance, normalize Unicode homoglyphs.",
        throughput: "< 5ms processing delta",
        policy: "Zero False Positive Filter",
      },
      {
        stage: "03. Local Knowledge Storage",
        tool: "Encrypted SQLite & Vector Index",
        process: "Index structured findings with cryptographic capture hash, timestamp, and source URI.",
        throughput: "Deterministic deduplication",
        policy: "Client Isolation Enforced",
      },
      {
        stage: "04. Analyst Alert Webhook",
        tool: "Automated Incident Notification",
        process: "Dispatch actionable notification payload directly to analyst SIEM or ticketing endpoint.",
        throughput: "Real-time dispatch",
        policy: "Configurable Webhook Standard",
      },
    ];

    const current = pipeline[activeNode] || pipeline[0];

    return (
      <div className="p-6 sm:p-8 rounded-3xl bg-[#031714] border border-[#2FA885]/30 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#B7E4D5]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#2FA885]/40 flex items-center justify-center text-[#2FA885]">
              <Workflow size={18} />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#2FA885] font-semibold block">
                Automation Architecture Motif
              </span>
              <h3 className="text-base sm:text-lg font-editorial font-semibold text-[#F4F2EA]">
                Deterministic OSINT Ingestion & ETL Pipeline Flow
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
            DETERMINISTIC ETL ARCHITECTURE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {pipeline.map((item, idx) => {
            const isActive = activeNode === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveNode(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-[#073B32] border-[#2FA885] shadow-[0_0_16px_rgba(47,168,133,0.3)]"
                    : "bg-[#041F1B] border-[#B7E4D5]/15 hover:border-[#2FA885]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#2FA885]">{item.stage.split(" ")[0]}</span>
                  <Workflow size={13} className={isActive ? "text-[#2FA885]" : "text-[#718E84]"} />
                </div>
                <h4 className="font-editorial text-xs sm:text-sm font-semibold text-[#F4F2EA]">
                  {item.stage.split(" ")[1]}
                </h4>
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-[#041F1B]/95 border border-[#B7E4D5]/20 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[#B7E4D5]/10 pb-2">
            <span className="text-[#2FA885] font-semibold">Engine: {current.tool}</span>
            <span className="text-[#8DA99E]">{current.throughput}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#D8E8E2] font-light leading-relaxed">
            {current.process}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
