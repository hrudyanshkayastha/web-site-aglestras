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
      "Directly supported by evidence and verifiable through official filings or primary public records.",
    example:
      "Entity registered in California Secretary of State registry on March 14, 2021 with filing ID C4718290.",
    confidenceRange: "Primary Record Attributed — Directly Supported",
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
      "A signal requiring contextual interpretation to assess its relevance and significance.",
    example:
      "Lookalike domain 'auth-agletras-secure[.]com' registered via privacy proxy 48 hours following corporate brand announcement.",
    confidenceRange: "Empirically Observable — Contextual Signal",
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
      "A reasoned conclusion from available evidence, distinct indicators, and established facts.",
    example:
      "Infrastructure clustering and matching SSL certificates suggest domain is intended for phishing campaigns against corporate employees.",
    confidenceRange: "Corroborated Analysis — Reasoned Conclusion",
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
      "A proposition that remains unverified and is held as a working hypothesis pending empirical testing.",
    example:
      "Assumed that target corporate entity operates as a single operational parent rather than decentralized autonomous franchises.",
    confidenceRange: "Working Proposition — Remains Unverified",
    colorScheme: {
      bg: "bg-slate-900/60",
      border: "border-slate-500/30",
      text: "text-slate-300",
      badgeBg: "bg-slate-700/50 text-slate-300",
    },
  },
  {
    type: "UNRESOLVED",
    label: "UNKNOWN / UNRESOLVED",
    definition:
      "Information that cannot currently be established within accessible public boundaries.",
    example:
      "Beneficial owner behind offshore holding vehicle remains obscured behind nominee directors in non-public jurisdiction.",
    confidenceRange: "Identified Gap — Cannot Currently Be Established",
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
    phase: "Understand Requirement",
    shortLabel: "Requirement",
    title: "Understand the Requirement",
    visualMotif: "Directional Reticle & Question Inscription Stela",
    summary:
      "Establish the client's question, objective, and desired outcome.",
    purpose:
      "Establish the client's question, objective, and desired outcome before initiating any collection.",
    whatHappens:
      "Analysts engage with the client to dissect their core business inquiry, determine the factual decisions depending on the findings, and establish clear criteria for success.",
    inputs:
      "Client business inquiry, target context, operational objectives, and required decision timelines.",
    verificationChecks:
      "Confirm requirement clarity, ensure question feasibility within unclassified open domains, and establish evidentiary threshold.",
    expectedArtifact:
      "Client Requirement Brief & Inquiry Charter",
    evidenceQualityAssessment:
      "Assess whether the business question can be addressed through unclassified, lawful public-source intelligence.",
    outputAdvancingInvestigation:
      "Deconstructed research questions and defined outcome benchmarks.",
    deliverableOutcome: "Formal inquiry charter and objective definition.",
    businessServiceLink: {
      id: "osint-investigative-research",
      name: "OSINT Investigation",
      href: "/services/osint-investigative-research",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Human Strategic Consultation",
      description:
        "Senior intelligence specialists define the core problem with the client to ensure accurate scoping.",
    },
  },
  {
    step: "02",
    phase: "Define Scope",
    shortLabel: "Scope",
    title: "Define the Scope",
    visualMotif: "Calibrated Jurisdictional Perimeter Stela",
    summary:
      "Agree on targets, permitted sources, boundaries, deliverables, and authorization requirements.",
    purpose:
      "Establish strict boundaries, approved sources, legal compliance, and deliverables under explicit mutual agreement.",
    whatHappens:
      "Agree on specific entity names, identifier parameters, approved public databases, non-intrusive boundaries, and required client authorizations.",
    inputs:
      "Target corporate identifiers, trademark registrations, jurisdictional constraints, and client authorization documents.",
    verificationChecks:
      "Verify 100% public access legality, ensure zero intrusive methods, and establish explicit statement of work boundaries.",
    expectedArtifact:
      "Approved Statement of Work (SOW) & Jurisdictional Scope Charter",
    evidenceQualityAssessment:
      "Identify relevant statutory registers and establish permitted source catalog.",
    outputAdvancingInvestigation:
      "Formalized boundary charter specifying permitted sources, exclusions, and deliverables.",
    deliverableOutcome: "Signed Scope of Investigation and authorization protocol.",
    businessServiceLink: {
      id: "business-due-diligence",
      name: "Business Due Diligence",
      href: "/services/business-due-diligence",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Formal Scoping & Compliance Review",
      description:
        "Legal and scope verification ensuring full compliance with relevant jurisdictions.",
    },
  },
  {
    step: "03",
    phase: "Collect Information",
    shortLabel: "Collect",
    title: "Lawful Information Collection",
    visualMotif: "Telemetry Ingestion Funnel & Sensor Array",
    summary:
      "Research relevant public sources and approved client-provided material.",
    purpose:
      "Systematically gather verifiable, point-in-time public records and passive telemetry without intrusive probing.",
    whatHappens:
      "Collect records from statutory company registries, certificate transparency logs, passive DNS databases, regulatory gazettes, and approved client documents.",
    inputs:
      "Public corporate filings, gazettes, WHOIS records, SSL/TLS certificate logs, and client-provided reference files.",
    verificationChecks:
      "Enforce passive-only collection; verify source accessibility; generate SHA-256 capture hashes with universal UTC timestamps.",
    expectedArtifact:
      "Raw Evidence Vault with cryptographically timestamped public source captures",
    evidenceQualityAssessment:
      "Verify authenticity of source feeds and ensure captures maintain immutable chain of custody.",
    outputAdvancingInvestigation:
      "Sanitized raw evidence collection indexed for correlation.",
    deliverableOutcome: "Raw artifact repository with source attribution and capture hashes.",
    businessServiceLink: {
      id: "osint-investigative-research",
      name: "OSINT Investigation",
      href: "/services/osint-investigative-research",
    },
    workflowAutomationPotential: {
      automationType: "HYBRID_PIPELINE",
      title: "Automated Ingestion Pipelines",
      description:
        "Scheduled collectors query approved public endpoints, freeing analysts for verification.",
    },
  },
  {
    step: "04",
    phase: "Organize & Correlate",
    shortLabel: "Correlate",
    title: "Organize and Correlate Records",
    visualMotif: "Relational Topology Nexus & Link Conduits",
    summary:
      "Structure records, cross-reference data points, and identify patterns.",
    purpose:
      "Normalize unstructured data into relational models and cross-reference identifiers across sources.",
    whatHappens:
      "Normalize entity names, dates, addresses, and digital indicators. Ingest findings into relational link charts to surface shared ownership or common infrastructure.",
    inputs:
      "Normalized registry extracts, director lists, domain histories, IP allocations, and corporate filings.",
    verificationChecks:
      "Cross-reference duplicate records, resolve entity aliases, and test relationship graph edges.",
    expectedArtifact:
      "Relational Link Chart & Normalized Entity Data Schema",
    evidenceQualityAssessment:
      "Distinguish statutory legal relationships from coincidental shared virtual addresses or generic cloud hosting.",
    outputAdvancingInvestigation:
      "Multi-node relationship model connecting target entities, assets, and events.",
    deliverableOutcome: "Visual node-link graph mapping correlated findings.",
    businessServiceLink: {
      id: "brand-impersonation-research",
      name: "Brand Impersonation Research",
      href: "/services/brand-impersonation-research",
    },
    workflowAutomationPotential: {
      automationType: "HYBRID_PIPELINE",
      title: "Entity Resolution & Graph Clustering",
      description:
        "Graph algorithms identify co-located infrastructure, nominee overlaps, and domain permutations.",
    },
  },
  {
    step: "05",
    phase: "Analyze & Verify",
    shortLabel: "Verify",
    title: "Analyze and Verify",
    visualMotif: "Dual Counter-Rotating Cryptographic Crucible",
    summary:
      "Check evidence, corroborate where possible, and identify gaps or inconsistencies.",
    purpose:
      "Check evidence across independent records, corroborate factual claims, and isolate inconsistencies or gaps.",
    whatHappens:
      "Analysts test every observation against independent public primary sources, identify circular reporting, and evaluate confidence levels under our 5-Tier Epistemic Standard.",
    inputs:
      "Correlated relationship records, primary document extracts, and source authority ratings.",
    verificationChecks:
      "Multi-source corroboration check; require independent sources for key assertions; explicitly identify unresolved gaps.",
    expectedArtifact:
      "Sanitized Epistemic Evidence Register with 5-Tier confidence tags",
    evidenceQualityAssessment:
      "Classify findings strictly as Fact, Indicator, Inference, Assumption, or Unresolved.",
    outputAdvancingInvestigation:
      "Sanitized findings register graded by confidence and corroborated evidence.",
    deliverableOutcome: "Evaluated evidence matrix with transparent epistemic classifications.",
    businessServiceLink: {
      id: "recruitment-verification",
      name: "Recruitment Verification",
      href: "/services/recruitment-verification",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Analytical Verification Oversight",
      description:
        "Human analysts evaluate nuance, credibility, and contradictory evidence that algorithms miss.",
    },
  },
  {
    step: "06",
    phase: "Formulate Conclusions",
    shortLabel: "Conclusions",
    title: "Formulate Conclusions",
    visualMotif: "Epistemic Plinth & Multi-Tier Spectrum Prisms",
    summary:
      "Distinguish verified facts from indicators, inferences, assumptions, and unresolved questions.",
    purpose:
      "Synthesize analytical deductions while strictly preserving the boundary between verified facts and inferences.",
    whatHappens:
      "Senior intelligence researchers perform Analysis of Competing Hypotheses (ACH), test alternative explanations, search for contradictory evidence, and formulate objective conclusions.",
    inputs:
      "Draft findings register, preliminary inferences, relationship maps, and unresolved questions log.",
    verificationChecks:
      "Adversarial review; challenge potential cognitive biases; ensure no inference is presented as a confirmed fact.",
    expectedArtifact:
      "Peer-Reviewed Analytical Conclusions & Validated Hypotheses Matrix",
    evidenceQualityAssessment:
      "Ensure all conclusions distinguish verified facts from indicators, inferences, and assumptions.",
    outputAdvancingInvestigation:
      "Peer-validated intelligence synthesis cleared for reporting.",
    deliverableOutcome: "Objective findings and reasoned conclusions with documented confidence.",
    businessServiceLink: {
      id: "external-threat-intelligence",
      name: "Cyber Threat Intelligence",
      href: "/services/external-threat-intelligence",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Senior Analyst Analytical Judgment",
      description:
        "Senior human intelligence oversight to eliminate hallucinations and confirm context.",
    },
  },
  {
    step: "07",
    phase: "Prepare Structured Report",
    shortLabel: "Report",
    title: "Prepare a Structured Report",
    visualMotif: "Crystalline Documentation Monolith",
    summary:
      "Present findings with sources, limitations, confidence, and recommended next steps.",
    purpose:
      "Synthesize verified findings into a structured, decision-ready intelligence dossier tailored to decision-makers.",
    whatHappens:
      "Authors compile an executive synthesis, structured finding tables, primary source citations with timestamps, visual relationship charts, actionable recommendations, and explicit scope disclaimers.",
    inputs:
      "Peer-reviewed findings, epistemic scorecard, entity relationship graphs, and defensive recommendations.",
    verificationChecks:
      "Complete citation check: every material assertion must link to an attributed primary source and state its confidence rating.",
    expectedArtifact:
      "Executive Intelligence Report & Source Citation Appendix",
    evidenceQualityAssessment:
      "Final editorial and legal review ensuring full traceability, limitations disclosure, and zero unverified superlatives.",
    outputAdvancingInvestigation:
      "Complete intelligence deliverable formatted for executive clarity.",
    deliverableOutcome: "Structured Intelligence Report with full source attribution and clear limitations.",
    businessServiceLink: {
      id: "research-automation",
      name: "Research Automation & Pipelines",
      href: "/services/research-automation",
    },
    workflowAutomationPotential: {
      automationType: "HYBRID_PIPELINE",
      title: "Structured Brief Generation",
      description:
        "Templates and schema engines automate tabular layouts, leaving narrative synthesis to analysts.",
    },
  },
  {
    step: "08",
    phase: "Review Findings",
    shortLabel: "Review",
    title: "Review Findings with the Client",
    visualMotif: "Ascending Beacon & Executive Delivery Terminus",
    summary:
      "Walk through the report, answer questions, and discuss further research if needed.",
    purpose:
      "Deliver the findings securely, brief stakeholders on key takeaways, and discuss further research if needed.",
    whatHappens:
      "Walk through the completed report with the client, clarify technical findings and limitations, answer executive questions, and address feedback or next-phase scoping.",
    inputs:
      "Completed Intelligence Report, executive summary slides, and source documentation.",
    verificationChecks:
      "Confirm secure client receipt, address client questions, and record feedback.",
    expectedArtifact:
      "Client Debriefing & Final Project Sign-Off Document",
    evidenceQualityAssessment:
      "Ensure client fully understands confidence levels, documented limitations, and actionable next steps.",
    outputAdvancingInvestigation:
      "Informed client decision and documented project completion.",
    deliverableOutcome: "Secure brief delivery and executive debriefing consultation.",
    businessServiceLink: {
      id: "osint-investigative-research",
      name: "OSINT Investigation",
      href: "/services/osint-investigative-research",
    },
    workflowAutomationPotential: {
      automationType: "HUMAN_LEAD",
      title: "Executive Debrief Consultation",
      description:
        "Direct communication between lead researchers and client decision-makers.",
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
