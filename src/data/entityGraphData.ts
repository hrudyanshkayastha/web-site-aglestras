export type EntityCategory =
  | "ORGANIZATION"
  | "DOMAIN"
  | "INFRASTRUCTURE"
  | "DIGITAL_IDENTITY"
  | "EVIDENCE_RECORD";

export interface GraphNode {
  id: string;
  name: string;
  category: EntityCategory;
  categoryLabel: string;
  position: [number, number, number];
  epistemicTier: "FACT" | "INDICATOR" | "INFERENCE" | "ASSUMPTION" | "UNRESOLVED";
  epistemicLabel: string;
  summary: string;
  details: string;
  evidenceSource: string;
  evidenceArtifact?: string;
  sampleRelationships: string[];
  color: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  epistemicTier: "FACT" | "INDICATOR" | "INFERENCE";
  directional: boolean;
}

export const ENTITY_CATEGORIES: Record<
  EntityCategory,
  { label: string; color: string; description: string; badgeClass: string }
> = {
  ORGANIZATION: {
    label: "Corporate Entity",
    color: "#2FA885", // Restrained Emerald
    description: "Registered commercial enterprise, holding parent, or legal entity.",
    badgeClass: "bg-[#2FA885]/20 text-[#B7E4D5] border-[#2FA885]/40",
  },
  DOMAIN: {
    label: "Domain Asset",
    color: "#B7E4D5", // Muted Mint
    description: "Primary apex domain, staging host, or adversary lookalike domain.",
    badgeClass: "bg-[#B7E4D5]/20 text-[#E2F4EE] border-[#B7E4D5]/40",
  },
  INFRASTRUCTURE: {
    label: "Hosting & Network",
    color: "#60A5FA", // Steel Sky Blue
    description: "Passive DNS resolution, hosting IP address, ASN, or MX mail relay.",
    badgeClass: "bg-blue-500/20 text-blue-200 border-blue-500/40",
  },
  DIGITAL_IDENTITY: {
    label: "Digital Persona",
    color: "#FBBF24", // Warm Amber
    description: "Registrant contact handle, privacy proxy identity, or nominee officer.",
    badgeClass: "bg-amber-500/20 text-amber-200 border-amber-500/40",
  },
  EVIDENCE_RECORD: {
    label: "Public Record",
    color: "#C084FC", // Epistemic Purple
    description: "Certificate transparency log, official gazette filing, or WHOIS record.",
    badgeClass: "bg-purple-500/20 text-purple-200 border-purple-500/40",
  },
};

export const ILLUSTRATIVE_GRAPH_NODES: GraphNode[] = [
  {
    id: "target-enterprise",
    name: "Acme Global Enterprise",
    category: "ORGANIZATION",
    categoryLabel: "Target Corporate Entity",
    position: [0, 0.9, 0],
    epistemicTier: "FACT",
    epistemicLabel: "Primary Record Attributed — High Confidence",
    summary: "Legitimate enterprise entity under observation during attack surface evaluation.",
    details:
      "Enterprise incorporated under statutory jurisdiction. Active brand assets and web portals are subjects of lookalike monitoring.",
    evidenceSource: "Secretary of State Corporate Registry (Filing ID #C4718290)",
    evidenceArtifact: "SHA256: 8a4f91b0...d23e (Verified Corporate Charter)",
    sampleRelationships: [
      "Target of impersonation campaigns by lookalike domains",
      "Historical cross-director linkage to secondary holding vehicle",
    ],
    color: "#2FA885",
  },
  {
    id: "lookalike-domain",
    name: "acme-portal-sso[.]net",
    category: "DOMAIN",
    categoryLabel: "Impersonation Domain Asset",
    position: [-2.2, 0.1, 0.9],
    epistemicTier: "INDICATOR",
    epistemicLabel: "Empirically Observable — Direct Telemetry",
    summary: "Punycode-registered lookalike domain mimicking single sign-on authentication portal.",
    details:
      "Registered 48 hours following corporate brand announcement. WHOIS privacy proxy engaged. Structural DOM comparison reveals credential harvesting styling.",
    evidenceSource: "Passive DNS & Public WHOIS Registration Query #PDNS-8912",
    evidenceArtifact: "Captured 2026-10-02T14:22:00Z (WHOIS Record Hash: 4b219e...)",
    sampleRelationships: [
      "Active brand impersonation targeting Acme Global Enterprise",
      "Resolves to passive DNS IP 198.51.100.42",
      "Secured via Let's Encrypt TLS Certificate #98A1",
    ],
    color: "#B7E4D5",
  },
  {
    id: "ip-cluster",
    name: "198.51.100.42 (Staging Host)",
    category: "INFRASTRUCTURE",
    categoryLabel: "Hosting IP Infrastructure",
    position: [-1.4, -1.6, 1.4],
    epistemicTier: "FACT",
    epistemicLabel: "Primary Record Attributed — High Confidence",
    summary: "Dedicated virtual server hosting lookalike web server with open ports 80, 443.",
    details:
      "Geolocated in neutral hosting jurisdiction under AS64512. Observed hosting 3 distinct brand impersonation attempts over past 90 days.",
    evidenceSource: "BGP Routing Table & Public Shodan Internet Port Scan #91823",
    evidenceArtifact: "ASN: AS64512 CloudHost Ltd | PTR: unassigned.static.cloudhost[.]net",
    sampleRelationships: [
      "Provides A-Record resolution for acme-portal-sso[.]net",
      "Co-located on subnet with mail relay cluster",
    ],
    color: "#60A5FA",
  },
  {
    id: "tls-cert",
    name: "TLS Cert SHA-256 #98A1",
    category: "EVIDENCE_RECORD",
    categoryLabel: "Certificate Transparency Record",
    position: [-3.1, 1.1, -0.4],
    epistemicTier: "FACT",
    epistemicLabel: "Primary Record Attributed — High Confidence",
    summary: "Public SSL certificate issued automatically via ACME protocol for staging subdomain.",
    details:
      "SAN attributes include both apex lookalike and internal VPN authentication mimicry strings: 'vpn.acme-portal-sso[.]net'.",
    evidenceSource: "Public Certificate Transparency Log crt.sh Entry #19284711",
    evidenceArtifact: "Serial: 03:df:88:bc:21... Issued by Let's Encrypt Authority E6",
    sampleRelationships: [
      "Cryptographically attests deployment of lookalike domain",
      "Logged to Google Argon and Cloudflare Nimbus CT logs",
    ],
    color: "#C084FC",
  },
  {
    id: "registrant-proxy",
    name: "Privacy Proxy Handle #KY-90",
    category: "DIGITAL_IDENTITY",
    categoryLabel: "Registrant Identity Persona",
    position: [-1.8, 2.1, -1.0],
    epistemicTier: "INFERENCE",
    epistemicLabel: "Corroborated Analysis — Evaluative Assessment",
    summary: "Anonymized contact profile linked across multiple fraudulent registration campaigns.",
    details:
      "Disclosed registration email format matches pseudonym used in 2024 phishing campaign against regional logistics providers.",
    evidenceSource: "Historic DomainTools WHOIS Reverse Lookup & Analyst Cross-Reference",
    evidenceArtifact: "Pattern match: 'contact-support-proxy+90@private-reg[.]is'",
    sampleRelationships: [
      "Registered lookalike domain 'acme-portal-sso[.]net'",
      "Shared registrar contact with Vanguard Asset Proxy Ltd",
    ],
    color: "#FBBF24",
  },
  {
    id: "shell-company",
    name: "Vanguard Asset Proxy Ltd",
    category: "ORGANIZATION",
    categoryLabel: "Affiliated Shell Entity",
    position: [2.1, -0.4, 0.5],
    epistemicTier: "INDICATOR",
    epistemicLabel: "Empirically Observable — Direct Telemetry",
    summary: "Intermediary company incorporated in offshore registry with nominee governance.",
    details:
      "Capitalized with minimal statutory reserves. Shares registered agent office address with 400+ corporate shells.",
    evidenceSource: "Commercial Gazette Gazette Notice & Companies Registry Filing",
    evidenceArtifact: "Filing Number: OG-2025-88192 | Reg Agent: Sovereign Trustee Corp",
    sampleRelationships: [
      "Employs common nominee director identified in target corporate filings",
      "Statutory incorporation attested by official gazette publication",
    ],
    color: "#2FA885",
  },
  {
    id: "nominee-director",
    name: "Nominee Director: J. V. Sterling",
    category: "DIGITAL_IDENTITY",
    categoryLabel: "Corporate Officer Persona",
    position: [2.9, 1.2, -0.7],
    epistemicTier: "FACT",
    epistemicLabel: "Primary Record Attributed — High Confidence",
    summary: "Professional corporate nominee director serving across 18 known international entities.",
    details:
      "Cross-filing search uncovers concurrent directorship on historical subsidiary of Acme Global Enterprise prior to 2024 spin-off.",
    evidenceSource: "Public Corporate Registrars & Court Officer Appointment Indexes",
    evidenceArtifact: "Appointment Record ID: APPT-MH-2024-0012",
    sampleRelationships: [
      "Listed as active director for Vanguard Asset Proxy Ltd",
      "Historical board link to Acme Global Enterprise subsidiary",
    ],
    color: "#FBBF24",
  },
  {
    id: "gazette-record",
    name: "Gazette Notification #MH-09",
    category: "EVIDENCE_RECORD",
    categoryLabel: "Government Gazette Record",
    position: [1.7, -1.9, -0.8],
    epistemicTier: "FACT",
    epistemicLabel: "Primary Record Attributed — High Confidence",
    summary: "Official government gazette publishing enterprise formation and registered powers.",
    details:
      "Public legal notice certifying appointment of directors and statutory capitalization parameters.",
    evidenceSource: "Official State Gazette Issue #42/2025 (Public Archives)",
    evidenceArtifact: "Volume 114, Page 412, Official Gazette Authenticated PDF Hash",
    sampleRelationships: [
      "Legally corroborates formation of Vanguard Asset Proxy Ltd",
      "Provides verifiable date stamp for corporate capitalization",
    ],
    color: "#C084FC",
  },
  {
    id: "mail-infrastructure",
    name: "MX: mail-relay.inbound[.]org",
    category: "INFRASTRUCTURE",
    categoryLabel: "Mail Exchange Infrastructure",
    position: [0.1, -2.4, 0.4],
    epistemicTier: "FACT",
    epistemicLabel: "Primary Record Attributed — High Confidence",
    summary: "Disposable mail exchange server configured with low TTL DNS records.",
    details:
      "Accepts incoming email on behalf of lookalike domain. SPF record configured to permit spoofed outbound message routing.",
    evidenceSource: "DNS MX / SPF Query Telemetry (TTL: 300s)",
    evidenceArtifact: "v=spf1 include:_spf.disposable-relay.org ~all",
    sampleRelationships: [
      "Configured as active MX recipient for acme-portal-sso[.]net",
      "Points to staging network infrastructure cluster",
    ],
    color: "#60A5FA",
  },
];

export const ILLUSTRATIVE_GRAPH_EDGES: GraphEdge[] = [
  {
    id: "edge-1",
    source: "lookalike-domain",
    target: "target-enterprise",
    label: "Impersonates Brand Identity",
    epistemicTier: "INDICATOR",
    directional: true,
  },
  {
    id: "edge-2",
    source: "lookalike-domain",
    target: "ip-cluster",
    label: "A-Record Resolution (DNS)",
    epistemicTier: "FACT",
    directional: true,
  },
  {
    id: "edge-3",
    source: "lookalike-domain",
    target: "tls-cert",
    label: "Cryptographic Certificate SAN",
    epistemicTier: "FACT",
    directional: false,
  },
  {
    id: "edge-4",
    source: "lookalike-domain",
    target: "mail-infrastructure",
    label: "Configured MX Mail Ingestion",
    epistemicTier: "FACT",
    directional: true,
  },
  {
    id: "edge-5",
    source: "registrant-proxy",
    target: "lookalike-domain",
    label: "Registrant Persona Attribution",
    epistemicTier: "INFERENCE",
    directional: true,
  },
  {
    id: "edge-6",
    source: "registrant-proxy",
    target: "shell-company",
    label: "Shared Registrant Digital Handle",
    epistemicTier: "INFERENCE",
    directional: false,
  },
  {
    id: "edge-7",
    source: "shell-company",
    target: "nominee-director",
    label: "Director Appointment on Record",
    epistemicTier: "FACT",
    directional: true,
  },
  {
    id: "edge-8",
    source: "shell-company",
    target: "gazette-record",
    label: "Gazette Statutory Attestation",
    epistemicTier: "FACT",
    directional: false,
  },
  {
    id: "edge-9",
    source: "nominee-director",
    target: "target-enterprise",
    label: "Historical Board Cross-Holding",
    epistemicTier: "FACT",
    directional: false,
  },
];
