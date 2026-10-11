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

export const intelligenceStages = [
  {
    step: "01",
    phase: "Define Objective",
    title: "Question & Scope Definition",
    summary:
      "Define the precise business or threat question. Establish legal boundaries, geographic jurisdictions, and approved sources.",
    deliverableOutcome: "Formalized Statement of Work and research taxonomy.",
  },
  {
    step: "02",
    phase: "Permitted Collection",
    title: "Lawful Public Harvesting",
    summary:
      "Passive harvesting across authorized public sources: registries, passive DNS, transparency logs, indexed filings, and open repositories.",
    deliverableOutcome: "Raw artifact archive with cryptographic capture hashes.",
  },
  {
    step: "03",
    phase: "Validation & Filtering",
    title: "Evidence Extraction",
    summary:
      "Filtering signal from noise. Validating source authenticity, timestamps, and provenance while discarding hallucinations and duplicate signals.",
    deliverableOutcome: "Sanitized data tables and validated primary sources.",
  },
  {
    step: "04",
    phase: "Correlation",
    title: "Relationship & Graph Linkage",
    summary:
      "Connecting disparate data points across infrastructure, corporate affiliations, and digital footprints to identify structural relationships.",
    deliverableOutcome: "Visual node-link graph mapping correlated entities.",
  },
  {
    step: "05",
    phase: "Analytical Review",
    title: "Human Intelligence Review",
    summary:
      "Human analysts review algorithmic patterns, test competing hypotheses, assign confidence ratings, and separate facts from inferences.",
    deliverableOutcome: "Peer-reviewed intelligence synthesis and defensive findings.",
  },
  {
    step: "06",
    phase: "Delivery",
    title: "Decision-Ready Intelligence",
    summary:
      "Delivering a structured intelligence dossier with executive summary, evidence citations, defensive recommendations, and documented limitations.",
    deliverableOutcome: "Actionable Intelligence Brief ready for executive decisions.",
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
