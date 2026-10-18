export interface DeliverablePreviewFinding {
  id: string;
  level: "FACT" | "INDICATOR" | "INFERENCE" | "ASSUMPTION" | "UNRESOLVED";
  observation: string;
  sourceCitation: string;
  confidence: string;
}

export interface DeliverablePreviewData {
  previewTitle: string;
  previewTypeBadge: string;
  reportId: string;
  date: string;
  scopeSummary: string;
  keyMetrics: { label: string; value: string; hint?: string }[];
  findingsTable: DeliverablePreviewFinding[];
  mitigationSteps: string[];
}

export interface ServiceWorkflowStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceValueLayer {
  technicalTitle: string;
  clientOutcome: string;
  technicalMethod: string;
  evidenceAndLimits: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortTagline: string;
  category: "threat" | "corporate" | "verification" | "automation";
  isPrimary?: boolean;
  overview: string;
  problemStatement: string; // backwards compatibility
  whoItHelps: string[];
  problemsAddressed: string[];
  scopeOfInvestigation: string[];
  workflow: string[]; // backwards compatibility
  workflowDetailed: ServiceWorkflowStep[];
  clientPrerequisites: string[];
  deliverables: string[];
  limitations: string[];
  ctaLabel: string;
  valueLayer: ServiceValueLayer;
  deliverablePreview: DeliverablePreviewData;
}

export const servicesData: ServiceItem[] = [
  {
    id: "external-threat-intelligence",
    code: "AGL-ETI",
    title: "Cyber Threat Intelligence",
    shortTagline: "Research relevant publicly available threat intelligence, indicators, infrastructure, and documented campaigns to provide defensive context and recommendations.",
    category: "threat",
    isPrimary: true,
    overview:
      "Agletras researches external public cyber-threat indicators, lookalike domain infrastructure, credential exposure, and exterior digital attack surfaces to help security teams identify adversary staging before targeted attacks materialize.",
    problemStatement:
      "Modern enterprises face expanding perimeter blind spots. Attackers leverage spoofed domains, exposed staging servers, leaked technical credentials, and public code repositories long before launching targeted campaigns. Traditional perimeter defenses fail to monitor open adversary staging.",
    whoItHelps: [
      "Security Operations Centers (SOC) & Threat Intelligence Teams",
      "Chief Information Security Officers (CISOs) & Security Directors",
      "Corporate Risk, Fraud & Brand Protection Units",
      "Incident Response & Digital Forensics Leads",
    ],
    problemsAddressed: [
      "Adversaries registering typosquat and lookalike domains to stage spear-phishing campaigns",
      "Forgotten or misconfigured perimeter staging servers, exposed ports, and expiring SSL certificates",
      "Sensitive corporate credentials, internal API keys, or private code fragments exposed on public repositories",
      "Disparate indicators of compromise (IoCs) circulating across open telemetry without contextual threat-actor mapping",
    ],
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
    workflowDetailed: [
      {
        step: "01",
        title: "Authorized Perimeter Scoping",
        detail: "Define verified corporate domains, IP ranges, brand marks, and geographic boundaries under written client authorization.",
      },
      {
        step: "02",
        title: "Passive Public Harvesting",
        detail: "Ingest passive DNS history, SSL/TLS certificate transparency logs, WHOIS telemetry, and public repository feeds.",
      },
      {
        step: "03",
        title: "Infrastructure & DNS Correlation",
        detail: "Map connected hostnames, shared nameservers, IP subnets, and MX records to surface adversary staging clusters.",
      },
      {
        step: "04",
        title: "Threat Correlation & MITRE Mapping",
        detail: "Cross-reference identified indicators against public threat feeds and map observed behaviors to the MITRE ATT&CK framework.",
      },
      {
        step: "05",
        title: "Human Analyst Verification",
        detail: "Senior security researchers filter noise, eliminate false positives, and evaluate actual business exposure severity.",
      },
      {
        step: "06",
        title: "Defensive Brief Delivery",
        detail: "Deliver executive synthesis, machine-readable IoC lists, mitigation recommendations, and documented scope limits.",
      },
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
    valueLayer: {
      technicalTitle: "Passive Attack Surface Discovery & Threat Telemetry Correlation",
      clientOutcome: "Identify active lookalike domains, credential disclosures, and perimeter exposures before adversaries exploit them.",
      technicalMethod: "Correlate passive DNS histories, SSL/TLS certificate transparency logs, and public IoC feeds without touching target networks.",
      evidenceAndLimits: "Strictly passive external telemetry; point-in-time assessment excluding internal network penetrations.",
    },
    deliverablePreview: {
      previewTitle: "External Attack Surface & Threat Telemetry Brief",
      previewTypeBadge: "Illustrative Threat Intelligence Brief",
      reportId: "AGL-2026-ETI-084",
      date: "October 2026",
      scopeSummary: "acme-global.com (Illustrative Scope Target)",
      keyMetrics: [
        { label: "Lookalike Domains", value: "2 Active", hint: "Staged for Phishing" },
        { label: "High-Risk Indicators", value: "4 Confirmed", hint: "Validated IoCs" },
        { label: "Telemetry Filter Rate", value: "94.2%", hint: "Noise Eliminated" },
        { label: "Epistemic Standard", value: "Observable Telemetry", hint: "High Confidence" },
      ],
      findingsTable: [
        {
          id: "ETI-01",
          level: "FACT",
          observation: "Lookalike domain 'acme-global-login[.]com' registered via NameCheap with privacy protection on Sep 28, 2026.",
          sourceCitation: "Public WHOIS / Passive DNS Database (Captured: 2026-10-02T14:22:00Z)",
          confidence: "High (Fact)",
        },
        {
          id: "ETI-02",
          level: "INDICATOR",
          observation: "Active DNS A-record resolved to IP 198.51.100.42 with open ports 80, 443, and Let's Encrypt SSL certificate.",
          sourceCitation: "Public Certificate Transparency Log & Shodan Query #91823",
          confidence: "High (Indicator)",
        },
        {
          id: "ETI-03",
          level: "INFERENCE",
          observation: "Page title and CSS asset references closely mirror corporate single-sign-on portal, indicating intent for employee credential harvesting.",
          sourceCitation: "Analyst Structural DOM & Layout Comparison (High Overlap Matrix)",
          confidence: "Moderate-High (Inference)",
        },
        {
          id: "ETI-04",
          level: "UNRESOLVED",
          observation: "Actor identity behind privacy proxy cannot be verified through open public records without legal registrar subpoena.",
          sourceCitation: "Investigative Boundary Disclosed (Registrar Privacy Enforced)",
          confidence: "Unresolved (Boundary)",
        },
      ],
      mitigationSteps: [
        "Deploy proactive DNS sinkholing / blocklist rules for lookalike domain on enterprise secure email gateways and firewalls.",
        "Submit brand impersonation abuse notification to domain registrar with timestamped cryptographic evidence hashes.",
        "Alert Security Operations Center (SOC) to monitor inbound mail logs for spoofed sender headers from resolved IP subnet.",
      ],
    },
  },
  {
    id: "business-due-diligence",
    code: "AGL-BDD",
    title: "Business Due Diligence",
    shortTagline: "Assess publicly available business information, relationships, digital presence, and relevant warning indicators to support informed decisions.",
    category: "corporate",
    isPrimary: false,
    overview:
      "Agletras conducts structured open-source due diligence into corporate entities, directors, beneficial ownership structures, and commercial counterparties to uncover hidden liabilities before agreements are signed.",
    problemStatement:
      "Cross-border partnerships, vendor contracts, mergers, and investments carry concealed liabilities. Undisclosed beneficial ownership, legal sanctions, shell company webs, and litigation histories often go unnoticed until contractual capital is committed.",
    whoItHelps: [
      "M&A Deal Teams, Private Equity & Venture Capital Investors",
      "Corporate Counsel & Legal Compliance Officers",
      "Vendor Risk & Procurement Governance Teams",
      "Executive Boards Evaluating Joint-Venture Counterparties",
    ],
    problemsAddressed: [
      "Concealed ultimate beneficial ownership obscured behind nominee directors and multi-jurisdiction holding webs",
      "Undisclosed regulatory enforcement orders, court judgments, or commercial fraud proceedings in foreign registers",
      "Conflicted director appointments and undisclosed cross-holdings with sanctioned entities or competitors",
      "Misrepresented operational scale, fabricated office addresses, or vanished historical entities",
    ],
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
    workflowDetailed: [
      {
        step: "01",
        title: "Target Definition & Scope Agreement",
        detail: "Formulate target entity names, incorporation numbers, jurisdictions, and specific commercial review parameters.",
      },
      {
        step: "02",
        title: "Official Registry Extraction",
        detail: "Harvest primary filings from statutory corporate registries, gazettes, and official commercial authorities.",
      },
      {
        step: "03",
        title: "Corporate Network Web Mapping",
        detail: "Map parent entities, subsidiaries, director cross-appointments, and shareholding percentages into a relational link chart.",
      },
      {
        step: "04",
        title: "Litigation & Sanctions Screening",
        detail: "Search public court databases, regulatory enforcement gazettes, and official international sanctions lists.",
      },
      {
        step: "05",
        title: "Discrepancy & Red-Flag Identification",
        detail: "Cross-reference claimed commercial history against archived records to identify temporal anomalies and address inconsistencies.",
      },
      {
        step: "06",
        title: "Due Diligence Dossier Formulation",
        detail: "Compile findings into a structured report with confidence scores, full source citations, and documented research limits.",
      },
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
    valueLayer: {
      technicalTitle: "Entity Resolution & Corporate Network Link Analysis",
      clientOutcome: "Discover hidden ownership networks, conflicts of interest, and regulatory histories before committing capital.",
      technicalMethod: "Extract, cross-reference, and correlate official corporate registers, court filings, and archived records into relational link graphs.",
      evidenceAndLimits: "Dependent upon public registry accessibility; provides objective factual findings rather than legal solvency guarantees.",
    },
    deliverablePreview: {
      previewTitle: "Counterparty Due Diligence & Corporate Integrity Dossier",
      previewTypeBadge: "Illustrative Due Diligence Brief",
      reportId: "AGL-2026-BDD-041",
      date: "October 2026",
      scopeSummary: "Apex Logistics Holdings Ltd (Illustrative Counterparty Target)",
      keyMetrics: [
        { label: "Incorporated Entities", value: "3 Associated", hint: "Verified in Registry" },
        { label: "Undisclosed Cross-Directorships", value: "2 Identified", hint: "Common Directorships" },
        { label: "Regulatory Sanctions", value: "0 Sanctions / 1 Dispute", hint: "Public Court Records" },
        { label: "Primary Citations", value: "14 Official Filings", hint: "Attributed Sources" },
      ],
      findingsTable: [
        {
          id: "BDD-01",
          level: "FACT",
          observation: "Target entity incorporated in Singapore ACRA on 14 Feb 2022 under UEN 202204819K; active operational status confirmed.",
          sourceCitation: "Singapore Accounting and Corporate Regulatory Authority (ACRA Registry Extract)",
          confidence: "High (Fact)",
        },
        {
          id: "BDD-02",
          level: "FACT",
          observation: "100% share capital held by an offshore holding entity incorporated in British Virgin Islands (BVI).",
          sourceCitation: "ACRA Shareholder Register & Annual Return Filing (FY2025)",
          confidence: "High (Fact)",
        },
        {
          id: "BDD-03",
          level: "INDICATOR",
          observation: "Managing director concurrently holds active directorship in a direct regional freight competitor registered in Hong Kong.",
          sourceCitation: "Hong Kong Companies Registry Integrated Search & Gazette Notice #4410",
          confidence: "High (Indicator)",
        },
        {
          id: "BDD-04",
          level: "INFERENCE",
          observation: "Registered address matches a commercial virtual office hosting 84 unrelated commercial enterprises, suggesting decentralized operations.",
          sourceCitation: "Commercial Tenancy Register & Physical Site Address Indexing",
          confidence: "Moderate-High (Inference)",
        },
      ],
      mitigationSteps: [
        "Include mandatory Beneficial Ownership Disclosure warranties in draft transaction documentation.",
        "Obtain written clarification from managing director regarding non-compete agreements with the Hong Kong sister entity.",
        "Require independent escrow conditions for initial contractual disbursement pending operational site verification.",
      ],
    },
  },
  {
    id: "recruitment-verification",
    code: "AGL-RVR",
    title: "Recruitment Verification",
    shortTagline: "Compare relevant public professional information with details supplied for a recruitment workflow, identifying inconsistencies for human review. Respect privacy, authorization, consent, and fair-use requirements.",
    category: "verification",
    isPrimary: false,
    overview:
      "Agletras conducts empirical, open-source verification of public professional claims, executive employment timelines, technical code contributions, and published track records to validate key hires.",
    problemStatement:
      "Critical executive and engineering hires represent existential trust decisions. Inflated resumes, fabricated technical portfolios, and misrepresented institutional affiliations are increasingly common in remote hiring environments.",
    whoItHelps: [
      "Executive Search Committees & Nominations Boards",
      "People, Talent & HR Operations Leaders",
      "Chief Technology Officers & Engineering Directors Vetting Key Leads",
      "Venture Capital Funds Evaluating Founding Team Credentials",
    ],
    problemsAddressed: [
      "Resumes claiming non-existent executive positions, exaggerated tenures, or inflated organizational seniority",
      "Fictitious technical achievements, ghostwritten patents, or copied open-source repositories presented as original work",
      "Inconsistencies between self-declared qualifications and verifiable institutional public records",
      "Undisclosed concurrent corporate directorships or outside business activities that violate contract terms",
    ],
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
    workflowDetailed: [
      {
        step: "01",
        title: "Consent & Scope Formalization",
        detail: "Confirm candidate name, scope boundaries, and required candidate authorizations under relevant regional privacy regulations.",
      },
      {
        step: "02",
        title: "Multi-Source Public Profile Harvesting",
        detail: "Aggregate public professional profiles, corporate announcements, speaker listings, and published interviews.",
      },
      {
        step: "03",
        title: "Technical Portfolio & Code Audit",
        detail: "Examine open-source code repositories, commit timestamps, author signatures, and patent registries to verify technical claims.",
      },
      {
        step: "04",
        title: "Chronology & Role Cross-Referencing",
        detail: "Compare declared employment windows against contemporaneous corporate press releases, filing dates, and archives.",
      },
      {
        step: "05",
        title: "Anomaly & Gap Detection",
        detail: "Identify overlapping tenures, unverified leadership claims, or inconsistencies between declared and observable facts.",
      },
      {
        step: "06",
        title: "Verification Dossier Formulation",
        detail: "Deliver a structured side-by-side comparison matrix with timestamped source archives and documented limits.",
      },
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
    valueLayer: {
      technicalTitle: "Public Profile Chronology & Technical Provenance Verification",
      clientOutcome: "Validate candidate credentials, executive tenures, and code portfolios with empirical evidence prior to senior hiring.",
      technicalMethod: "Triangulate public professional records, code commit timestamps, patent registries, and academic publications against stated CV claims.",
      evidenceAndLimits: "Strictly objective empirical observations; Agletras does not make employment decisions or conduct private surveillance.",
    },
    deliverablePreview: {
      previewTitle: "Executive Candidate Background & Portfolio Verification Brief",
      previewTypeBadge: "Illustrative Recruitment Verification Brief",
      reportId: "AGL-2026-RVR-019",
      date: "October 2026",
      scopeSummary: "Candidate Ref: ENG-VP-2026 (Illustrative Demonstration Profile)",
      keyMetrics: [
        { label: "Chronology Consistency", value: "91% Verified", hint: "Documented Alignments" },
        { label: "Code Repository Provenance", value: "Verified Original", hint: "Authentic Contributor" },
        { label: "Outside Directorships", value: "1 Active", hint: "Requires Corporate Disclosure" },
        { label: "Source Artifacts Captured", value: "9 Primary Sources", hint: "Timestamped Evidence" },
      ],
      findingsTable: [
        {
          id: "RVR-01",
          level: "FACT",
          observation: "Candidate verified as Principal Systems Architect at predecessor tech firm from Jan 2022 to Jun 2024 via corporate patent filings.",
          sourceCitation: "USPTO Published Patent Records (Filing US-2023-018290) & Corporate Tech Blog",
          confidence: "High (Fact)",
        },
        {
          id: "RVR-02",
          level: "FACT",
          observation: "Author of 4 public open-source libraries with continuous commit activity dating back to 2021; cryptographic commit keys match candidate.",
          sourceCitation: "Public GitHub Repositories & Cryptographic GPG Key Verification",
          confidence: "High (Fact)",
        },
        {
          id: "RVR-03",
          level: "INDICATOR",
          observation: "Curriculum vitae claims tenure extended through Dec 2024; corporate filing confirms resignation occurred in Jun 2024 (6-month discrepancy).",
          sourceCitation: "Corporate Quarterly Regulatory Filing & Public Staff Announcement Archive",
          confidence: "High (Indicator)",
        },
        {
          id: "RVR-04",
          level: "UNRESOLVED",
          observation: "Postgraduate degree verification requires candidate-initiated release token from university registrar.",
          sourceCitation: "Institutional Privacy Policy Boundary Disclosed",
          confidence: "Unresolved (Boundary)",
        },
      ],
      mitigationSteps: [
        "Request candidate clarify 6-month consulting interim between June and December 2024 during panel interview.",
        "Obtain standard student clearinghouse authorization token to complete formal degree registrar confirmation.",
      ],
    },
  },
  {
    id: "brand-impersonation-research",
    code: "AGL-BIR",
    title: "Brand Impersonation & Scam Research",
    shortTagline: "Investigate publicly visible suspicious profiles, lookalike domains, scam pages, and potential brand impersonation indicators. Do not guarantee that external platforms will remove reported content.",
    category: "threat",
    isPrimary: false,
    overview:
      "Agletras uncovers and documents counterfeit domains, fraudulent social channels, cloned web portals, and scam campaigns that exploit corporate brand equity to deceive customers and partners.",
    problemStatement:
      "Adversaries exploit trusted brand equity to defraud customers, host deceptive web portals, run fraudulent recruitment scams, and establish counterfeit customer support channels, causing acute financial and reputational injury.",
    whoItHelps: [
      "Brand Protection & Intellectual Property Counsel",
      "Corporate Communications & Public Relations Teams",
      "Fraud Operations & Customer Trust Departments",
      "Enterprise Risk & Digital Threat Management Leads",
    ],
    problemsAddressed: [
      "Permuted domain registrations hosting phishing portals that steal enterprise customer credentials",
      "Fraudulent executive profiles and counterfeit support accounts redirecting customer payments",
      "Bogus recruitment scams soliciting candidate application fees in the enterprise's name",
      "Lookalike domains configured with active MX records capable of sending deceptive supplier invoices",
    ],
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
    workflowDetailed: [
      {
        step: "01",
        title: "Brand Asset Baseline Definition",
        detail: "Catalog official brand trademarks, approved domain portfolios, corporate colors, and legitimate social media handles.",
      },
      {
        step: "02",
        title: "Lexical & Phonic Permutation Generation",
        detail: "Generate algorithmic variations including typosquats, homoglyphs, alternate TLDs, and keyword combinations.",
      },
      {
        step: "03",
        title: "Public DNS & Telemetry Harvesting",
        detail: "Query passive DNS, WHOIS registries, certificate transparency logs, and mail exchanger (MX) configurations.",
      },
      {
        step: "04",
        title: "Visual DOM & Similarity Scoring",
        detail: "Compare page layout, CSS stylesheets, logo assets, and page titles against legitimate corporate properties.",
      },
      {
        step: "05",
        title: "Infrastructure Clustering",
        detail: "Connect discovered deceptive assets by shared IP addresses, ASN allocations, SSL certificates, and hosting providers.",
      },
      {
        step: "06",
        title: "Evidence Packaging & Escalation Dossier",
        detail: "Compile timestamped forensic screenshots and technical registrar metadata ready for registrar abuse escalations.",
      },
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
    valueLayer: {
      technicalTitle: "Brand Permutation Discovery & Fraud Infrastructure Clustering",
      clientOutcome: "Detect, document, and prepare evidence dossiers against counterfeit websites, scam portals, and lookalike domains.",
      technicalMethod: "Algorithmic homoglyph permutation, passive DNS monitoring, visual similarity hashing, and registrar infrastructure mapping.",
      evidenceAndLimits: "Research and evidence packaging only; Agletras does not operate legal takedown services or control registrar enforcement.",
    },
    deliverablePreview: {
      previewTitle: "Brand Impersonation & Fraud Infrastructure Evidence Package",
      previewTypeBadge: "Illustrative Brand Impersonation Dossier",
      reportId: "AGL-2026-BIR-062",
      date: "October 2026",
      scopeSummary: "Apex Wealth Global (Illustrative Brand Focus)",
      keyMetrics: [
        { label: "Deceptive Domains", value: "3 Discovered", hint: "Active Registrations" },
        { label: "Layout Overlap Score", value: "96.4%", hint: "Cloned CSS & DOM" },
        { label: "Active MX Records", value: "2 Domains", hint: "Armed for Email Spoofing" },
        { label: "Evidence Captures", value: "18 Artifacts", hint: "Timestamped Records" },
      ],
      findingsTable: [
        {
          id: "BIR-01",
          level: "FACT",
          observation: "Domain 'apex-wealth-portal[.]com' registered via offshore registrar with Cloudflare proxy shielding on Oct 01, 2026.",
          sourceCitation: "Public WHOIS / Certificate Transparency Stream (Capture Hash SHA256: 7f8d...)",
          confidence: "High (Fact)",
        },
        {
          id: "BIR-02",
          level: "FACT",
          observation: "MX record resolves to third-party mail server; lacking SPF/DMARC alignment, enabling outbound sender spoofing.",
          sourceCitation: "DNS Query Telemetry (MX Record Inspection)",
          confidence: "High (Fact)",
        },
        {
          id: "BIR-03",
          level: "INDICATOR",
          observation: "Page mirrors corporate logo, brand typography, and login dialog with payload pointing to external credential capture script.",
          sourceCitation: "Analyst Structural DOM & DOM Comparison Report",
          confidence: "High (Indicator)",
        },
        {
          id: "BIR-04",
          level: "INFERENCE",
          observation: "Registration pattern and hosting ASN match a known fraud syndicate targeting wealth management client portals.",
          sourceCitation: "Infrastructure Cluster Correlation Matrix",
          confidence: "Moderate-High (Inference)",
        },
      ],
      mitigationSteps: [
        "Transmit compiled evidence dossier to domain registrar abuse desk and upstream hosting provider.",
        "Issue corporate security advisory alerting customers regarding verified domain boundaries.",
        "Publish DMARC reject policies to prevent unauthorized spoofed emails from leveraging corporate domain identity.",
      ],
    },
  },
  {
    id: "research-automation",
    code: "AGL-PRA",
    title: "Research Automation & Pipelines",
    shortTagline: "Develop scoped workflows for collecting, normalizing, deduplicating, correlating, and reporting information from approved sources.",
    category: "automation",
    isPrimary: false,
    overview:
      "Agletras designs, engineers, and deploys custom open-source collection pipelines, data normalization engines, and reporting automation workflows that eliminate repetitive manual research tasks.",
    problemStatement:
      "Research and security teams waste thousands of analyst hours copying data across portals, manually monitoring competitor filings, and compiling repetitive briefs. Manual workflows cause analytical latency and human omission.",
    whoItHelps: [
      "Intelligence & Security Research Units",
      "Corporate Strategy & Competitive Intelligence Teams",
      "Regulatory Compliance & Gazette Monitoring Departments",
      "Analytical Agencies Seeking Workflow Acceleration",
    ],
    problemsAddressed: [
      "Analyst fatigue and human omission resulting from repetitive manual data copying across government registries",
      "Slow response times when tracking public gazette announcements, trademark filings, or DNS changes",
      "Unstandardized, messy public text data requiring tedious deduplication and schema normalization",
      "Analytical bottlenecks when compiling weekly executive briefs from disparate information feeds",
    ],
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
    workflowDetailed: [
      {
        step: "01",
        title: "Manual Process Decomposition",
        detail: "Audit current analyst workflows to isolate time-consuming manual steps, target data structures, and desired outputs.",
      },
      {
        step: "02",
        title: "Source API & Parser Architecture",
        detail: "Design lawful collection routines respecting platform rate limits, robots.txt, and public endpoint specifications.",
      },
      {
        step: "03",
        title: "ETL & Schema Transformation Logic",
        detail: "Implement automated data cleaning, phonetic name normalization, entity resolution, and schema standardization.",
      },
      {
        step: "04",
        title: "Quality Assurance & Anomaly Rules",
        detail: "Build automated validation checks to flag anomalies, discard corrupt records, and verify cryptographic data integrity.",
      },
      {
        step: "05",
        title: "Pipeline Deployment & Automation",
        detail: "Deploy serverless runners, scheduled cron jobs, or local CLI scripts tailored to client infrastructure requirements.",
      },
      {
        step: "06",
        title: "Documentation & Analyst Handover",
        detail: "Deliver comprehensive architecture documentation, schema dictionaries, error-handling manuals, and operational training.",
      },
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
    valueLayer: {
      technicalTitle: "Open-Source ETL Pipelines & Normalization Engines",
      clientOutcome: "Eliminate repetitive manual data entry with reliable, scheduled intelligence pipelines and custom research dashboards.",
      technicalMethod: "Custom TypeScript/Python collection engines with deterministic schema validation, rate-limiting, and local database indexing.",
      evidenceAndLimits: "Pipelines strictly respect robots.txt and terms of service; no bypass of technical security protections or CAPTCHA.",
    },
    deliverablePreview: {
      previewTitle: "Automated Regulatory Intelligence Pipeline Architecture & Data Flow",
      previewTypeBadge: "Illustrative Pipeline Technical Blueprint",
      reportId: "AGL-2026-RAP-033",
      date: "October 2026",
      scopeSummary: "Cross-Registry Gazette Monitor (Illustrative Blueprint)",
      keyMetrics: [
        { label: "Weekly Ingestion", value: "14,200 Filings", hint: "Processed Automatically" },
        { label: "Entity Resolution", value: "99.1% Accuracy", hint: "Phonetic & Hash Matching" },
        { label: "Analyst Hours Saved", value: "~18 Hrs / Week", hint: "Operational Efficiency" },
        { label: "Pipeline Latency", value: "< 4 Minutes", hint: "From Gazette Release" },
      ],
      findingsTable: [
        {
          id: "RAP-01",
          level: "FACT",
          observation: "Pipeline ingests 4 public corporate registries daily at 04:00 UTC using lawful public endpoints.",
          sourceCitation: "Automated Pipeline Telemetry Log (Run #1042)",
          confidence: "High (Fact)",
        },
        {
          id: "RAP-02",
          level: "FACT",
          observation: "Normalization engine standardizes disparate Unicode and UTF-8 representations into single relational schema.",
          sourceCitation: "JSON Schema Validation Output (Zero Dropped Fields)",
          confidence: "High (Fact)",
        },
        {
          id: "RAP-03",
          level: "INDICATOR",
          observation: "Fuzzy deduplication algorithm clusters entity name variants with 0.94 Levenshtein confidence.",
          sourceCitation: "Deduplication Classifier Validation Matrix",
          confidence: "High (Indicator)",
        },
        {
          id: "RAP-04",
          level: "INFERENCE",
          observation: "Cross-registry velocity metrics surfaced 3 rapid succession shell corporate incorporations for analyst review.",
          sourceCitation: "Anomaly Detection Module Alert #89",
          confidence: "Moderate-High (Inference)",
        },
      ],
      mitigationSteps: [
        "Establish monthly schema verification test suite to detect unannounced government registry layout adjustments.",
        "Implement exponential backoff retry algorithms to guarantee zero rate-limit infractions.",
      ],
    },
  },
  {
    id: "osint-investigative-research",
    code: "AGL-OIR",
    title: "OSINT Investigation",
    shortTagline: "Research publicly accessible information, evaluate sources, and connect relevant findings to answer a defined investigative question.",
    category: "corporate",
    isPrimary: false,
    overview:
      "Agletras conducts rigorous, hypothesis-driven human intelligence investigations into complex commercial questions, opaque ownership webs, and cross-border digital footprints using open public records.",
    problemStatement:
      "When standard automated search engines return millions of noisy results or fail to connect obscure corporate entities, organizations require rigorous, hypothesis-driven human intelligence investigations to discover ground truth.",
    whoItHelps: [
      "Executive Leadership & Strategic Decision-Makers",
      "Corporate Advisory, Forensics & Litigation Support Teams",
      "Cross-Border Supply Chain & Risk Management Consultancies",
      "Governance & Special Committee Investigative Leads",
    ],
    problemsAddressed: [
      "Complex commercial questions where automated search engines produce noise and unverified opinions",
      "Cross-border corporate webs concealing commercial counterparties and supplier lineages",
      "High-stakes decisions requiring empirical verification of claims before entering major contracts",
      "Knowledge gaps where public records exist across multiple jurisdictions but have never been linked into a coherent chronology",
    ],
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
    workflowDetailed: [
      {
        step: "01",
        title: "Question Formulation & Hypothesis Tree",
        detail: "Deconstruct the core business question into testable hypotheses and identify prerequisite evidentiary thresholds.",
      },
      {
        step: "02",
        title: "Multi-Vector Source Triangulation",
        detail: "Gather public evidence across official gazettes, corporate registries, digital archives, and regulatory disclosures.",
      },
      {
        step: "03",
        title: "Evidence Weighting & Provenance Verification",
        detail: "Evaluate each data point against the 5-Tier Epistemic Standard, separating primary facts from inferences and assumptions.",
      },
      {
        step: "04",
        title: "Relational Node-Link Mapping",
        detail: "Construct visual entity link charts connecting individuals, companies, assets, and historical events.",
      },
      {
        step: "05",
        title: "Red-Teaming & Competing Hypotheses",
        detail: "Senior analysts challenge conclusions, test alternative explanations, and document identified knowledge gaps.",
      },
      {
        step: "06",
        title: "Decision-Ready Dossier Delivery",
        detail: "Deliver comprehensive executive report with source citations, visual relationship maps, and clear strategic takeaways.",
      },
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
    valueLayer: {
      technicalTitle: "Structured OSINT Link Analysis & Epistemic Synthesis",
      clientOutcome: "Obtain clear, evidence-backed answers to complex commercial questions supported by primary public records.",
      technicalMethod: "Multi-source open-source intelligence harvesting, relational network analysis, and deterministic hypothesis testing.",
      evidenceAndLimits: "Strictly restricted to lawful public records; clearly states analytical boundaries and open gaps when data is non-public.",
    },
    deliverablePreview: {
      previewTitle: "Deep OSINT Investigative Dossier & Entity Link Chart",
      previewTypeBadge: "Illustrative OSINT Research Dossier",
      reportId: "AGL-2026-OIR-095",
      date: "October 2026",
      scopeSummary: "Cross-Border Trade Entity Network (Illustrative Demonstration Scope)",
      keyMetrics: [
        { label: "Mapped Network Nodes", value: "12 Entities", hint: "Correlated in Link Chart" },
        { label: "Attributed Primary Records", value: "26 Filings", hint: "Public Document Citations" },
        { label: "Investigated Jurisdictions", value: "3 Registries", hint: "Statutory Filings" },
        { label: "Epistemic Certainty", value: "High Confidence", hint: "On Core Commercial Network" },
      ],
      findingsTable: [
        {
          id: "OIR-01",
          level: "FACT",
          observation: "Target trading vehicle shares registered corporate office with 4 dissolved shipping entities in Cyprus official registry.",
          sourceCitation: "Department of Registrar of Companies and Intellectual Property (Cyprus Filing Record #CY-98402)",
          confidence: "High (Fact)",
        },
        {
          id: "OIR-02",
          level: "FACT",
          observation: "Historical domain registration archives confirm matching contact email handle utilized across a cross-border logistics consortium.",
          sourceCitation: "Historical WHOIS Archive (2021-2024 Telemetry)",
          confidence: "High (Fact)",
        },
        {
          id: "OIR-03",
          level: "INFERENCE",
          observation: "Overlapping operational directorships and shared registry agents suggest centralized operational control despite separate legal personality.",
          sourceCitation: "Relational Entity Matrix Analysis",
          confidence: "Moderate-High (Inference)",
        },
        {
          id: "OIR-04",
          level: "UNRESOLVED",
          observation: "Ultimate beneficial ownership behind offshore nominee holding vehicle in Seychelles remains non-disclosable under local statutory privacy rules.",
          sourceCitation: "Investigative Boundary Disclosed",
          confidence: "Unresolved (Boundary)",
        },
      ],
      mitigationSteps: [
        "Include mandatory indemnities regarding affiliate liabilities in proposed transaction agreement.",
        "Require direct representation of beneficial ownership in contractual declarations.",
      ],
    },
  },
];

export const serviceAliases: Record<string, string> = {
  "osint-investigation": "osint-investigative-research",
  "osint-investigations": "osint-investigative-research",
  "cyber-threat-intelligence": "external-threat-intelligence",
  "brand-impersonation-and-scam-research": "brand-impersonation-research",
  "research-automation-and-pipelines": "research-automation",
};

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const canonicalId = serviceAliases[slug] || slug;
  return servicesData.find((s) => s.id === canonicalId);
}
