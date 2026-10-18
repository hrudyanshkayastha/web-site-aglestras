export interface PhilosophyStage {
  step: string;
  stageNumber: number;
  id: "discover" | "verify" | "connect" | "deliver";
  label: string;
  tagline: string;
  title: string;
  visualMotif: string;
  summary: string;
  lawfulInputs: string;
  verificationChecks: string;
  expectedDeliverable: string;
  clientOutcome: string;
  businessModelNote: string;
}

export const philosophyStages: PhilosophyStage[] = [
  {
    step: "01",
    stageNumber: 1,
    id: "discover",
    label: "Discover",
    tagline: "Lawful Public Ingestion",
    title: "1. Discover: Question Scoping & Lawful Ingestion",
    visualMotif: "Sensor Obelisk & Ingestion Crucible",
    summary:
      "Transform business and security inquiries into systematic collection vectors across lawful public registries, technical archives, and authorized records.",
    lawfulInputs:
      "Public corporate filings, official gazettes, passive DNS telemetry, certificate transparency logs, and client-authorized technical domains.",
    verificationChecks:
      "Confirm 100% public access legality, enforce strict compliance with robots.txt and platform rate limits, and establish verifiable audit trails.",
    expectedDeliverable:
      "Timestamped Source Ingestion Manifest with cryptographic capture hashes.",
    clientOutcome:
      "Replaces ad-hoc search attempts with structured, legally defensible evidentiary baselines covering unclassified threat vectors and counterparty data.",
    businessModelNote:
      "Delivered as custom research engagements today; recurring ingestion patterns are engineered into reusable collection pipelines.",
  },
  {
    step: "02",
    stageNumber: 2,
    id: "verify",
    label: "Verify",
    tagline: "Provenance & 5-Tier Epistemics",
    title: "2. Verify: Provenance Authentication & Epistemic Filtering",
    visualMotif: "Cryptographic Provenance Portal",
    summary:
      "Subject every extracted indicator to rigorous multi-source corroboration, provenance verification, and transparent 5-tier epistemic grading.",
    lawfulInputs:
      "Raw scraped records, DNS mutation history, historical certificate archives, registrar contact fingerprints.",
    verificationChecks:
      "Cross-source validation against at least two independent primary registries; separate verified FACTS from INDICATORS and working INFERENCES.",
    expectedDeliverable:
      "Attributed Evidence Register with confidence scoring and explicit knowledge boundary disclosures.",
    clientOutcome:
      "Protects executive leadership from acting on unverified rumours, fabricated disclosures, or adversary misinformation.",
    businessModelNote:
      "Senior intelligence analysts perform final validation; deterministic verification engines eliminate noise across repeat investigations.",
  },
  {
    step: "03",
    stageNumber: 3,
    id: "connect",
    label: "Connect",
    tagline: "Relational Topology & Graph Linkage",
    title: "3. Connect: Entity Resolution & Structural Correlation",
    visualMotif: "Synaptic Relational Cluster",
    summary:
      "Correlate disparate findings across jurisdictions, hosting infrastructure, and corporate registries into unified relational topology graphs.",
    lawfulInputs:
      "Director entity profiles, shared IP subnet allocations, lookalike domain clusters, cross-border holding vehicles.",
    verificationChecks:
      "Phonetic name normalization, temporal overlap verification, and corroboration of indirect corporate associations.",
    expectedDeliverable:
      "Bidirectional Entity Relationship Graph with documented link rationale.",
    clientOutcome:
      "Uncovers concealed conflicts of interest, undisclosed corporate cross-holdings, and infrastructure staging before malicious deployment.",
    businessModelNote:
      "Currently assembled by specialized graph analysts; graph clustering heuristics are incrementally automated for recurring client threat monitoring.",
  },
  {
    step: "04",
    stageNumber: 4,
    id: "deliver",
    label: "Deliver",
    tagline: "Decision-Ready Briefs & APIs",
    title: "4. Deliver: Decision-Ready Intelligence & Repeatable Feeds",
    visualMotif: "Crystalline Decision Spire",
    summary:
      "Deliver findings in clear, executive-ready intelligence briefs alongside structured machine-readable formats with full citation trails.",
    lawfulInputs:
      "Synthesized findings register, epistemic scorecard, defensive remediation advisories, STIX/JSON structured feeds.",
    verificationChecks:
      "Senior peer review sign-off; verify that every material assertion links directly to an authoritative, verifiable source hash.",
    expectedDeliverable:
      "Executive Intelligence Brief, Machine-Readable STIX/JSON Export, and Proactive Advisory Roadmap.",
    clientOutcome:
      "Empowers legal, security, and executive teams to make decisive risk-mitigation, counterparty negotiation, or defensive maneuvers with absolute confidence.",
    businessModelNote:
      "Direct bespoke analytical briefs provide client value immediately; automated notification webhooks and feed exports maintain continuous post-engagement posture.",
  },
];
