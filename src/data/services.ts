export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortTagline: string;
  category: "threat" | "corporate" | "verification" | "automation";
  isPrimary?: boolean;
  problemStatement: string;
  scopeOfInvestigation: string[];
  workflow: string[];
  clientPrerequisites: string[];
  deliverables: string[];
  limitations: string[];
  ctaLabel: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "external-threat-intelligence",
    code: "AGL-ETI",
    title: "Cyber Threat Intelligence",
    shortTagline: "External cyber-threat signals, lookalike infrastructure, and attack-surface OSINT.",
    category: "threat",
    isPrimary: true,
    problemStatement:
      "Modern enterprises face expanding perimeter blind spots. Attackers leverage spoofed domains, exposed staging servers, leaked technical credentials, and public code repositories long before launching targeted campaigns. Traditional perimeter defenses fail to monitor open adversary staging.",
    scopeOfInvestigation: [
      "Brand impersonation, typosquats, and lookalike domain registrations",
      "Public phishing and credential harvesting infrastructure indicators",
      "Public threat-actor campaigns and darknet forum references relating to your entity",
      "External digital exposure observable through passive DNS, SSL certificate logs, and open ports",
      "Indicators of Compromise (IoCs) and malware hashes correlated with public telemetry",
      "Public source-code leaks, misplaced credentials, and sensitive asset disclosures in public repositories",
      "Reputation and threat severity scoring for discovered external endpoints",
    ],
    workflow: [
      "Authorized Perimeter Scoping",
      "Passive Public Source Harvesting",
      "Infrastructure & DNS Correlation",
      "Threat Correlation & MITRE ATT&CK Mapping",
      "Human Analyst Verification",
      "Defensive Brief Delivery",
    ],
    clientPrerequisites: [
      "Authorized corporate identity and official primary domains",
      "Declared geographic and digital scope of investigation",
      "Written confirmation of authorization for exterior discovery",
      "Specific threat concerns or prior incident indicators (if applicable)",
    ],
    deliverables: [
      "Executive Threat Brief summarizing active external exposure",
      "Technical Indicator Dossier (IoCs, domain mappings, IP ownership, hash values)",
      "MITRE ATT&CK Contextual Alignment for mapped actor behaviors",
      "Infrastructure Relationship Graph connecting suspicious clusters",
      "Prioritized Defensive Recommendations and mitigation guidance",
      "Explicit Scope Disclaimers and remaining investigative blindspots",
    ],
    limitations: [
      "Strictly passive and open-source: Agletras does NOT conduct active vulnerability scanning, exploit testing, penetration attacks, or unauthorized access against any infrastructure.",
      "Intelligence reflects point-in-time public indicators. Ongoing monitoring is an available engagement option upon agreed scope rather than an implied automated platform.",
      "Discovery does not guarantee detection of internal threats or unindexed zero-day adversaries.",
    ],
    ctaLabel: "Discuss a Threat Intelligence Engagement",
  },
  {
    id: "business-due-diligence",
    code: "AGL-BDD",
    title: "Business Due Diligence",
    shortTagline: "Corporate integrity, ownership transparency, and counterparty risk analysis.",
    category: "corporate",
    isPrimary: false,
    problemStatement:
      "Cross-border partnerships, vendor contracts, mergers, and investments carry concealed liabilities. Undisclosed beneficial ownership, legal sanctions, shell company webs, and litigation histories often go unnoticed until contractual capital is committed.",
    scopeOfInvestigation: [
      "Public company registry filings, business entity history, and jurisdiction status",
      "Director, officer, and executive leadership public affiliations and track records",
      "Associated corporate networks, parent entities, subsidiaries, and corporate cross-holdings",
      "Publicly indexed court filings, regulatory sanctions, and commercial dispute indicators",
      "Historical digital footprint, past domain registrations, and corporate website archives",
      "Public adverse media, reputation sentiment, and commercial anomalies",
    ],
    workflow: [
      "Corporate Target Definition",
      "Official Registry Extraction",
      "Corporate Entity Web Mapping",
      "Litigation & Sanctions Screening",
      "Discrepancy Identification",
      "Due Diligence Report Compilation",
    ],
    clientPrerequisites: [
      "Exact legal entity name, jurisdiction of incorporation, and known registration numbers",
      "Known directors, founders, or key stakeholders under review",
      "Contextual rationale for due diligence (vendor evaluation, acquisition, partnership)",
      "Target investigation timeframe",
    ],
    deliverables: [
      "Comprehensive Business Due Diligence Report",
      "Corporate Presence & Registration Verification Matrix",
      "Entity & Ownership Relationship Visual Mapping",
      "Public Risk & Discrepancy Register",
      "Source Citation Index linking every material claim to public filings",
      "Confidence Level Scoring across each investigated parameter",
    ],
    limitations: [
      "Does not constitute legal, accounting, investment, or financial advisory advice.",
      "Agletras does not certify that an organization is financially solvent or completely free from commercial hazard.",
      "Analysis is constrained to lawful public registers and accessible commercial filings within the scope period.",
    ],
    ctaLabel: "Request Due Diligence Scope",
  },
  {
    id: "recruitment-verification",
    code: "AGL-RVR",
    title: "Recruitment Verification",
    shortTagline: "Public professional profile verification and technical track record evaluation.",
    category: "verification",
    isPrimary: false,
    problemStatement:
      "Critical executive and engineering hires represent existential trust decisions. Inflated resumes, fabricated technical portfolios, and misrepresented institutional affiliations are increasingly common in remote hiring environments.",
    scopeOfInvestigation: [
      "Public professional profiles across industry platforms and publications",
      "Verification of public role claims, tenure consistency, and published corporate timelines",
      "Open academic records, published alumni listings, and verified credential databases",
      "Public technical portfolios, open-source repositories, and code commit timelines",
      "Published research papers, patent filings, and industry conference appearances",
      "Cross-referencing stated claims against observable historical open-source footprints",
    ],
    workflow: [
      "Consent & Scope Formalization",
      "Multi-Source Profile Harvesting",
      "Portfolio & Commit Verification",
      "Chronology & Role Cross-Referencing",
      "Anomaly Detection",
      "Verification Dossier Formulation",
    ],
    clientPrerequisites: [
      "Candidate name and client-supplied curriculum vitae or self-declared profile",
      "Specific verification categories requested (academic, role chronology, technical claims)",
      "Written candidate authorization/consent where mandated by applicable regional data laws",
    ],
    deliverables: [
      "Structured Recruitment Verification Brief",
      "Claim-versus-Record Chronology Comparison Table",
      "Technical Portfolio & Public Work Analysis",
      "Flagged Public Inconsistencies & Unverified Claims Log",
      "Traceable Source Archive with capture timestamps",
    ],
    limitations: [
      "Agletras delivers objective empirical findings; we DO NOT make hiring, termination, or adverse employment decisions.",
      "Research utilizes only lawfully accessible public data with appropriate subject consent.",
      "Private credit checks, background surveillance, or invasive personal records are strictly excluded.",
    ],
    ctaLabel: "Initiate Recruitment Verification",
  },
  {
    id: "brand-impersonation-research",
    code: "AGL-BIR",
    title: "Brand Impersonation & Scam Research",
    shortTagline: "Public fraud infrastructure, lookalike domains, and brand deception investigation.",
    category: "threat",
    isPrimary: false,
    problemStatement:
      "Adversaries exploit trusted brand equity to defraud customers, host deceptive web portals, run fraudulent recruitment scams, and establish counterfeit customer support channels, causing acute financial and reputational injury.",
    scopeOfInvestigation: [
      "Permuted domain registrations, spoofed TLDs, and lookalike SSL certificates",
      "Counterfeit social media profiles, fraudulent executive handles, and deceptive support channels",
      "Active public scam campaigns targeting enterprise customers or partner ecosystems",
      "Fraudulent advertising campaigns and deceptive digital ad creative indicators",
      "Cloned web portals, trademark infringement in public DNS registries, and phishing kit signatures",
    ],
    workflow: [
      "Brand Asset Baseline Definition",
      "Lexical & Phonic Domain Generation",
      "Public DNS & WHOIS Correlation",
      "Visual & Content Similarity Scoring",
      "Evidence Packaging & Dossier Creation",
    ],
    clientPrerequisites: [
      "Official brand names, protected trademarks, and legitimate domain inventories",
      "Known instances of active customer complaints or suspicious links",
      "Defined geographical and linguistic focus areas",
    ],
    deliverables: [
      "Actionable Deceptive Asset Registry with active status and risk priority",
      "Forensic Screenshot & Artifact Evidence Archive",
      "Hosting, Registrar, and Infrastructure Metadata Dossier ready for takedown escalations",
      "Recommended Brand Defense Strategies and proactive DNS monitoring guidance",
    ],
    limitations: [
      "Agletras provides research, evidence collection, and analysis. We do not operate legal takedown services or guarantee third-party host compliance.",
      "Third-party hosts, registrars, and platforms retain sole discretion over domain suspensions and enforcement actions.",
    ],
    ctaLabel: "Investigate Brand Impersonation",
  },
  {
    id: "research-automation",
    code: "AGL-PRA",
    title: "Research Automation",
    shortTagline: "Custom intelligence collection scripts, data normalization, and reporting workflows.",
    category: "automation",
    isPrimary: false,
    problemStatement:
      "Research and security teams waste thousands of analyst hours copying data across portals, manually monitoring competitor filings, and compiling repetitive briefs. Manual workflows cause analytical latency and human omission.",
    scopeOfInvestigation: [
      "Design of specialized open-source data collection pipelines for permitted public sources",
      "Normalization, entity resolution, and deduplication workflows for high-volume text streams",
      "Scheduled tracking systems for public registry updates, DNS mutations, and regulatory gazettes",
      "Semi-automated research brief compilation and structured report generation engines",
      "Internal analyst research dashboards and secure local search interfaces",
    ],
    workflow: [
      "Manual Process Decomposition",
      "Source API & Scraper Architecture",
      "ETL & Transformation Logic Specification",
      "Quality Assurance & Deduplication Rules",
      "Deployment & Analyst Handover",
    ],
    clientPrerequisites: [
      "Documentation of existing manual research workflow and pain points",
      "Explicit list of target public sources, data feeds, and desired output formats",
      "Technical environment specifications (cloud runner, local CLI, serverless worker)",
    ],
    deliverables: [
      "Engineered Collection Pipeline and automation scripts",
      "Data Normalization & Correlation Engine",
      "Comprehensive Technical Documentation & API Schemas",
      "Deployment Guide and Operational Maintenance Manual",
      "Ownership and licensing terms as defined in the specific Statement of Work",
    ],
    limitations: [
      "Intellectual property and source-code rights are explicitly specified in each project contract; ownership is not automatically transferred without express contractual terms.",
      "Automation respects website terms of service, robots.txt, and rate limits. We do not construct scrapers intended to bypass security protections.",
    ],
    ctaLabel: "Discuss an Automation Pipeline",
  },
  {
    id: "osint-investigative-research",
    code: "AGL-OIR",
    title: "OSINT Investigation",
    shortTagline: "Structured, scope-controlled deep research into specific corporate and security questions.",
    category: "corporate",
    isPrimary: false,
    problemStatement:
      "When standard automated search engines return millions of noisy results or fail to connect obscure corporate entities, organizations require rigorous, hypothesis-driven human intelligence investigations to discover ground truth.",
    scopeOfInvestigation: [
      "Ad-hoc business inquiries requiring deep open-source source correlation",
      "Historical entity reconstruction across archives, gazettes, and public papers",
      "Uncovering indirect corporate relationships and hidden commercial counterparties",
      "Investigating cross-border supply chain risks and opaque vendor lineages",
      "Specialized open-source research tailored to legal, strategic, or counterparty objectives",
    ],
    workflow: [
      "Research Question Formulation",
      "Hypothesis Tree Construction",
      "Multi-Vector Source Triangulation",
      "Evidence Weighting & Synthesis",
      "Red-Teaming & Human Peer Review",
      "Final Intelligence Dossier Delivery",
    ],
    clientPrerequisites: [
      "Specific, clearly articulated research question or problem statement",
      "Known factual parameters and previously gathered baseline materials",
      "Explicit purpose of intelligence use and agreed confidentiality boundaries",
    ],
    deliverables: [
      "Definitive Intelligence Research Report with executive synthesis",
      "Evidence Matrix with full attribution and confidence scoring",
      "Visual Entity Link Chart mapping all identified counterparties",
      "Unresolved Hypotheses Log highlighting areas requiring further discovery",
    ],
    limitations: [
      "Investigations are strictly limited to publicly available or lawfully supplied records.",
      "We cannot guarantee that an answer exists within open public domains, but will clearly report negative findings and research boundaries.",
    ],
    ctaLabel: "Scope an Investigative Project",
  },
];
