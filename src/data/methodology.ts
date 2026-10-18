export interface EpistemicStandard {
  type: "FACT" | "INDICATOR" | "INFERENCE" | "ASSUMPTION" | "UNRESOLVED";
  label: string;
  definition: string;
  example: string;
  confidenceRange: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
  };
}

export const epistemicStandards: EpistemicStandard[] = [
  {
    type: "FACT",
    label: "FACT",
    definition:
      "Information directly verified through primary, authoritative public records or official filings. Must be attributable to a specific source.",
    example:
      "Entity registered in California Secretary of State registry on March 14, 2021 with filing ID C4718290.",
    confidenceRange: "Primary Record Attributed — High Confidence",
    colorScheme: {
      bg: "bg-emerald-950/40",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      badgeBg: "bg-emerald-500/20 text-emerald-300",
    },
  },
  {
    type: "INDICATOR",
    label: "INDICATOR",
    definition:
      "An observable, timestamped technical or behavioral signal with contextual relevance to the investigation objective.",
    example:
      "Lookalike domain 'auth-agletras-secure[.]com' registered via privacy proxy 48 hours following corporate brand announcement.",
    confidenceRange: "Empirically Observable — Direct Telemetry",
    colorScheme: {
      bg: "bg-teal-950/40",
      border: "border-teal-500/30",
      text: "text-teal-400",
      badgeBg: "bg-teal-500/20 text-teal-300",
    },
  },
  {
    type: "INFERENCE",
    label: "INFERENCE",
    definition:
      "A logical analytical deduction drawn from the correlation of multiple distinct indicators and verified facts.",
    example:
      "Infrastructure clustering and matching SSL certificates suggest domain is intended for phishing campaigns against corporate employees.",
    confidenceRange: "Corroborated Analysis — Evaluative Assessment",
    colorScheme: {
      bg: "bg-amber-950/30",
      border: "border-amber-500/30",
      text: "text-amber-400",
      badgeBg: "bg-amber-500/20 text-amber-300",
    },
  },
  {
    type: "ASSUMPTION",
    label: "ASSUMPTION",
    definition:
      "An explicitly stated working hypothesis or operating condition required to proceed with analysis, pending empirical verification.",
    example:
      "Assumed that target corporate entity operates as a single operational parent rather than decentralized autonomous franchises.",
    confidenceRange: "Operational Hypothesis — Requires Empirical Testing",
    colorScheme: {
      bg: "bg-slate-900/60",
      border: "border-slate-500/30",
      text: "text-slate-300",
      badgeBg: "bg-slate-700/50 text-slate-300",
    },
  },
  {
    type: "UNRESOLVED",
    label: "UNRESOLVED",
    definition:
      "An identified knowledge gap or open investigative question that could not be resolved within current public boundaries.",
    example:
      "Beneficial owner behind offshore holding vehicle remains obscured behind nominee directors in non-public jurisdiction.",
    confidenceRange: "Identified Gap — Boundary Explicitly Disclosed",
    colorScheme: {
      bg: "bg-rose-950/30",
      border: "border-rose-500/30",
      text: "text-rose-400",
      badgeBg: "bg-rose-500/20 text-rose-300",
    },
  },
];

export interface IntelligenceStage {
  step: string;
  phase: string;
  shortLabel: string;
  title: string;
  visualMotif: string;
  summary: string;
  purpose: string;
  whatHappens: string;
  inputs: string;
  verificationChecks: string;
  expectedArtifact: string;
  evidenceQualityAssessment: string;
  outputAdvancingInvestigation: string;
  deliverableOutcome: string;
  businessServiceLink: {
    id: string;
    name: string;
    href: string;
  };
  workflowAutomationPotential: {
    automationType: "HUMAN_LEAD" | "HYBRID_PIPELINE" | "AUTOMATED_MONITOR";
    title: string;
    description: string;
  };
}

export const intelligenceStages: IntelligenceStage[] = [
  {
    step: "01",
    phase: "Define Objective",
    shortLabel: "Define",
    title: "Question & Scope Definition",
    visualMotif: "Calibrated Scope Stela & Directional Reticle Prism",
    summary:
      "Define the precise business or threat question. Establish legal boundaries, geographic jurisdictions, and approved sources.",
    purpose:
      "Transform ambiguous commercial questions or security inquiries into tightly scoped, testable research hypotheses under agreed legal authorizations.",
    whatHappens:
      "Analysts decompose client objectives into primary research questions, define jurisdictional and entity boundaries, secure requisite subject authorizations, and formalize a Statement of Work.",
    inputs:
      "Client investigative brief, target corporate identifiers, trademark registrations, jurisdictional constraints, statutory compliance mandates.",
    verificationChecks:
      "Confirm 100% public access legality, ensure non-intrusive scope, and establish agreed evidentiary confidence thresholds.",
    expectedArtifact:
      "Approved Research Protocol Charter & Jurisdictional Scope Document.",
    evidenceQualityAssessment:
      "Evaluate whether the inquiry can be answered through lawful, unclassified public domains; identify prerequisite source registries and determine necessary confidence thresholds.",
    outputAdvancingInvestigation:
      "Formalized Research Scope Document, evidentiary taxonomy, and approved source catalog specifying lawful discovery parameters.",
    deliverableOutcome: "Formalized Statement of Work and research taxonomy.",
    businessServiceLink: {
      id: "business-due-diligence",
      name: "Business Due Diligence",
      href: "/services/business-due-diligence",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Human Strategic Scoping",
      description:
        "Human analysts define the legal parameters and question boundaries. Automation potential is limited to structured intake questionnaires and conflict checks.",
    },
  },
  {
    step: "02",
    phase: "Permitted Collection",
    shortLabel: "Collect",
    title: "Lawful Public Harvesting",
    visualMotif: "Telemetry Ingestion Funnel & Sensor Needle Array",
    summary:
      "Passive harvesting across authorized public sources: registries, passive DNS, transparency logs, indexed filings, and open repositories.",
    purpose:
      "Systematically gather verifiable, point-in-time public records and passive telemetry without engaging in unauthorized access or active network probing.",
    whatHappens:
      "Automated scripts and human researchers extract records from statutory corporate registries, certificate transparency logs, passive DNS databases, court registers, and indexed public repositories.",
    inputs:
      "RFC 6962 Certificate Transparency logs, Passive DNS time-series, BGP routing tables, statutory company house registers, gazettes.",
    verificationChecks:
      "Enforce passive-only constraints; verify source reachability; compute SHA-256 capture hashes with universal UTC timestamps.",
    expectedArtifact:
      "Raw Evidence Vault containing cryptographically hashed, immutable public records and historical telemetry archives.",
    evidenceQualityAssessment:
      "Verify source accessibility and integrity; generate cryptographic SHA-256 capture hashes with universal UTC timestamps for every retrieved document and artifact.",
    outputAdvancingInvestigation:
      "Raw Evidence Vault containing cryptographically hashed, immutable public records, historical archives, and telemetry artifacts.",
    deliverableOutcome: "Raw artifact archive with cryptographic capture hashes.",
    businessServiceLink: {
      id: "osint-investigative-research",
      name: "OSINT Investigative Research",
      href: "/services/osint-investigative-research",
    },
    workflowAutomationPotential: {
      automationType: "HYBRID_PIPELINE",
      title: "Automated Ingestion Pipelines",
      description:
        "Repeatable collection pipelines ingest RFC 6962 CT logs and passive DNS in real time, freeing analysts to focus on anomaly verification.",
    },
  },
  {
    step: "03",
    phase: "Verify",
    shortLabel: "Verify",
    title: "Evidence Filtering & Provenance",
    visualMotif: "Dual Counter-Rotating Cryptographic Crucible",
    summary:
      "Assess reliability, corroborate findings, and validate source authenticity while separating facts from noise.",
    purpose:
      "Separate authoritative signal from deceptive noise, outdated records, homoglyphs, and AI-generated hallucinations.",
    whatHappens:
      "Records are parsed, deduplicated, and attributed to specific primary issuers. Analysts confirm document registration numbers, evaluate temporal relevance, and discard fabricated or unverified claims.",
    inputs:
      "Raw scraped files, registrar records, WHOIS archives, historical snapshots, corporate charter records.",
    verificationChecks:
      "Multi-source corroboration; adversarial noise elimination; discard unverified rumors; grade source reliability.",
    expectedArtifact:
      "Sanitized Evidence Register with 4-tier epistemic tags, cryptographic hashes, and primary citations.",
    evidenceQualityAssessment:
      "Classify every validated artifact under the 4-Tier Epistemic Standard (Fact, Indicator, Inference, Unverified); compute source authority ratings.",
    outputAdvancingInvestigation:
      "Sanitized Evidence Register with attributed primary citations, capture metadata, and verified historical timestamps.",
    deliverableOutcome: "Sanitized data tables and validated primary sources.",
    businessServiceLink: {
      id: "recruitment-verification",
      name: "Recruitment Verification",
      href: "/services/recruitment-verification",
    },
    workflowAutomationPotential: {
      automationType: "HYBRID_PIPELINE",
      title: "Deterministic Verification Engines",
      description:
        "Automated cryptographic hash comparisons and registrar sanity filters eliminate 90% of noise, while analysts verify questionable anomalies.",
    },
  },
  {
    step: "04",
    phase: "Correlation",
    shortLabel: "Correlate",
    title: "Relational Topology & Graph Linkage",
    visualMotif: "Relational Topology Nexus & Orbital Conduits",
    summary:
      "Connecting disparate data points across infrastructure, corporate affiliations, and digital footprints to identify structural relationships.",
    purpose:
      "Link isolated data points into cohesive relationship graphs that reveal hidden connections, corporate control, or adversary infrastructure clusters.",
    whatHappens:
      "Entities, directors, domain registrations, IP subnets, and corporate cross-holdings are ingested into relational link graphs to discover direct and indirect paths of association.",
    inputs:
      "Verified domain records, server IP allocations, shared TLS certificate SANs, corporate director registries, historical WHOIS contacts.",
    verificationChecks:
      "Distinguish statutory corporate ownership from coincidental shared cloud hosting; confirm entity resolution paths.",
    expectedArtifact:
      "Interactive 3D Entity Relationship Topology and multi-hop association matrix.",
    evidenceQualityAssessment:
      "Test graph edge validity; distinguish verified contractual or statutory links from coincidental shared virtual addresses or generic infrastructure overlaps.",
    outputAdvancingInvestigation:
      "Dimensional Entity Relationship Graph mapping correlated individuals, parent companies, staging hosts, and corporate lineages.",
    deliverableOutcome: "Visual node-link graph mapping correlated entities.",
    businessServiceLink: {
      id: "brand-impersonation-research",
      name: "Brand Impersonation Research",
      href: "/services/brand-impersonation-research",
    },
    workflowAutomationPotential: {
      automationType: "HYBRID_PIPELINE",
      title: "Graph Correlation & Entity Clustering",
      description:
        "Graph algorithms automatically identify co-located infrastructure clusters, nominee director overlaps, and lookalike domain permutations.",
    },
  },
  {
    step: "05",
    phase: "Analytical Review",
    shortLabel: "Analyze",
    title: "Human Intelligence Review",
    visualMotif: "Epistemic Plinth & Multi-Tier Spectrum Prisms",
    summary:
      "Human analysts review algorithmic patterns, test competing hypotheses, assign confidence ratings, and separate facts from inferences.",
    purpose:
      "Apply rigorous cognitive evaluation and structured analytic techniques to challenge assumptions, weigh evidence, and eliminate algorithmic bias.",
    whatHappens:
      "Senior intelligence researchers perform Analysis of Competing Hypotheses (ACH), formulate alternative explanations, identify negative evidence, and document remaining knowledge gaps.",
    inputs:
      "Correlated relationship graph, timeline telemetry, epistemic evidence register, adversary capability baselines.",
    verificationChecks:
      "Challenge cognitive bias; verify that inferences have at least two independent corroborating indicators; document explicit unknown boundaries.",
    expectedArtifact:
      "Peer-Reviewed Analytical Synthesis and Evaluative Threat Assessment.",
    evidenceQualityAssessment:
      "Peer review findings against epistemic criteria; ensure no unverified inference is presented as empirical fact and disclose all methodological limitations.",
    outputAdvancingInvestigation:
      "Peer-Reviewed Analytical Synthesis detailing confirmed findings, evaluated threats, and quantified confidence levels.",
    deliverableOutcome: "Peer-reviewed intelligence synthesis and defensive findings.",
    businessServiceLink: {
      id: "external-threat-intelligence",
      name: "Cyber Threat Intelligence",
      href: "/services/external-threat-intelligence",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Senior Human Intelligence Evaluation",
      description:
        "Human analysts apply critical judgment, adversarial empathy, and contextual domain expertise that machines cannot replicate.",
    },
  },
  {
    step: "06",
    phase: "Deliver",
    shortLabel: "Deliver",
    title: "Decision-Ready Intelligence",
    visualMotif: "Crystalline Transmission Monolith & Ascending Beacon",
    summary:
      "Present findings, source references, confidence assessments, limitations, and next steps in an organized report or technical deliverable.",
    purpose:
      "Synthesize technical observations and relational findings into clear, defensible, actionable briefs tailored to executive decision-makers.",
    whatHappens:
      "Analysts author an executive brief containing clear business takeaways, tabular evidence registers, full citation links, defensive recommendations, and scope disclaimers.",
    inputs:
      "Final verified findings, epistemic scorecard, high-resolution topology map, strategic defensive mitigations.",
    verificationChecks:
      "Senior analyst sign-off; citation check: every key observation must trace back to a verifiable SHA-256 hashed source artifact.",
    expectedArtifact:
      "Executive Intelligence Brief, Machine-Readable STIX/JSON Export, and Proactive Risk Advisory.",
    evidenceQualityAssessment:
      "Final editorial and legal compliance review ensuring complete traceability, transparent disclaimers, and zero unsupported superlatives.",
    outputAdvancingInvestigation:
      "Delivered Intelligence Brief Dossier ready for board-level risk decisions, transaction closing, or security remediation.",
    deliverableOutcome: "Actionable Intelligence Brief ready for executive decisions.",
    businessServiceLink: {
      id: "research-automation",
      name: "Research Automation & Pipelines",
      href: "/services/research-automation",
    },
    workflowAutomationPotential: {
      automationType: "AUTOMATED_MONITOR",
      title: "Continuous Monitoring & Feed Export",
      description:
        "Automated monitoring can continuously track identified assets, alerting human analysts when new telemetry or infrastructure changes emerge.",
    },
  },
];

export const sampleBriefData = {
  briefId: "AGL-2026-IB-084",
  classification: "CLIENT CONFIDENTIAL // PREPARED FOR EXECUTIVE REVIEW",
  title: "External Threat & Brand Exposure Assessment: Lookalike Infrastructure Discovery",
  date: "October 2026",
  scopeTarget: "acme-global.com (Illustrative Scope Target)",
  executiveSummary:
    "During passive OSINT surface reconnaissance, analysts identified two active lookalike domains configured with matching TLS certificates and MX records pointed to disposable email hosting. Passive DNS telemetry indicates active staging, presenting elevated phishing and brand-spoofing risk.",
  evidenceSummary: [
    {
      id: "EVD-01",
      category: "FACT",
      observation: "Domain 'acme-global-login[.]com' registered via NameCheap with privacy protection on Sep 28, 2026.",
      source: "Public WHOIS / Passive DNS Database (Captured: 2026-10-02T14:22:00Z)",
      confidence: "High (Fact)",
    },
    {
      id: "EVD-02",
      category: "INDICATOR",
      observation: "Active DNS A-record resolved to IP 198.51.100.42 with open ports 80, 443, and Let's Encrypt SSL certificate.",
      source: "Public Certificate Transparency Log & Shodan Query #91823",
      confidence: "High (Indicator)",
    },
    {
      id: "EVD-03",
      category: "INFERENCE",
      observation: "Page title and CSS asset references closely mirror corporate single-sign-on portal, indicating intent for employee credential collection.",
      source: "Analyst Structural DOM & Layout Comparison (High Overlap Matrix)",
      confidence: "Moderate-High (Inference)",
    },
    {
      id: "EVD-04",
      category: "UNRESOLVED",
      observation: "Actor identity behind privacy proxy cannot be verified through open public records without legal registrar subpoena.",
      source: "Investigative Boundary Disclosed",
      confidence: "Unresolved (Boundary)",
    },
  ],
  recommendations: [
    "Execute proactive DNS sinkholing / blocklist injection for discovered lookalike domain on corporate firewalls.",
    "Submit brand impersonation abuse notification to domain registrar with documented artifact hashes.",
    "Alert security operations center (SOC) to monitor inbound mail logs for spoofed sender headers.",
  ],
};
