import { Metadata } from "next";
import Link from "next/link";
import { companyData } from "@/data/company";
import { ShieldCheck, Scale, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Engagement & Ethical Charter — AGLETRAS",
  description:
    "Review Agletras's formal terms of engagement, ethical open-source research charter, and legal liability limitations.",
};

export default function TermsPage() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-transparent via-[#041F1B]/40 to-[#041F1B]/80 text-[#F4F2EA] min-h-screen overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 space-y-16">
        {/* Page Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Governance & Legal Terms</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Terms of Engagement{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              & Ethical Charter.
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#C5D9D2] font-light leading-relaxed">
            Effective as of August 2026. These terms govern all research services, external threat assessments,
            and due diligence investigations provided by AGLETRAS.
          </p>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-12 text-sm text-[#C5D9D2] font-light leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#073B32]/25 border border-[#B7E4D5]/15">
            <h2 className="text-xl font-editorial font-semibold text-[#F4F2EA] flex items-center gap-2">
              <Scale size={18} className="text-[#2FA885]" />
              <span>1. Scope of Engagement & Service Agreements</span>
            </h2>
            <p>
              Agletras provides research, threat intelligence, and analytical services based strictly upon
              lawfully accessible public records and client-authorized data. Every commercial engagement
              is formalized through a bespoke Statement of Work (SOW) defining the specific inquiry, approved
              sources, deliverables, delivery schedule, and fee schedule.
            </p>
          </section>

          {/* Section 2 */}
          <section id="ethical-charter" className="space-y-4 p-6 rounded-2xl bg-[#073B32]/35 border border-[#B7E4D5]/20">
            <h2 className="text-xl font-editorial font-semibold text-[#F4F2EA] flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#2FA885]" />
              <span>2. Ethical Research Charter & Strict Prohibitions</span>
            </h2>
            <p>
              Agletras adheres unreservedly to lawful, non-intrusive open-source intelligence (OSINT) standards.
              Under no circumstances does Agletras engage in or accept instructions for:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#D8E8E2]">
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Unauthorized network access or intrusion
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Credential theft, stuffing, or harvesting
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Active exploit deployment or malware
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Unauthorized account takeover
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Targeted private surveillance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Circumvention of technical access controls
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Acquisition of unlawfully exfiltrated data
              </li>
              <li className="flex items-center gap-2">
                <span className="text-rose-400">✕</span> Interception of private communications
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-editorial font-semibold text-[#F4F2EA]">
              3. Client Representation & Authorization
            </h2>
            <p>
              By commissioning an investigation, the client represents, warrants, and covenants that they possess
              legitimate commercial standing and legal authority to request research regarding the named entity,
              digital asset, or candidate. For recruitment verification (AGL-RVR), the client represents that all
              required subject notices and consents have been secured under applicable employment privacy laws.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-editorial font-semibold text-[#F4F2EA]">
              4. Public Information Limitations & Temporal Decay
            </h2>
            <p>
              Open-source intelligence is fundamentally reliant upon publicly discoverable records. External public
              information may be altered, expunged, intentionally fabricated by third parties, or outdated.
              Reports produced by Agletras reflect observable data at the exact moment of capture. Agletras does not
              warrant that public registers are exhaustive or free from clerical omissions.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-editorial font-semibold text-[#F4F2EA]">
              5. Intellectual Property & Deliverables
            </h2>
            <p>
              Unless expressly stipulated in a bespoke agreement, Agletras retains all proprietary rights, title,
              and interest in its underlying methodologies, correlation algorithms, taxonomy trees, and automation
              script frameworks. Upon full payment of engagement fees, the client is granted a perpetual, non-exclusive,
              internal license to use the final Intelligence Brief and deliverable dossier.
            </p>
          </section>

          {/* Section 6 */}
          <section id="privacy" className="space-y-3">
            <h2 className="text-lg font-editorial font-semibold text-[#F4F2EA]">
              6. Privacy, Data Minimization & Retention
            </h2>
            <p>
              Agletras adheres to data minimization principles. Personal information collected during authorized
              investigations is restricted strictly to evidence necessary to answer the agreed inquiry. Working
              data and capture files are securely retained only for the engagement validation period, after which
              non-deliverable operational scratch data is purged.
            </p>
          </section>

          {/* Section 7 */}
          <section id="limitations" className="space-y-3 p-6 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-[#D8E8E2]">
            <h2 className="text-lg font-editorial font-semibold text-amber-200 flex items-center gap-2">
              <AlertCircle size={18} />
              <span>7. Non-Advisory Disclaimer & Limitation of Liability</span>
            </h2>
            <p className="text-xs leading-relaxed">
              AGLETRAS DELIVERS EMPIRICAL RESEARCH AND ANALYTICAL ASSESSMENTS. OUR DELIVERABLES DO NOT CONSTITUTE
              LEGAL COUNSEL, FORMAL AUDIT ASSURANCE, INVESTMENT RECOMMENDATIONS, OR EMPLOYMENT DECISIONS.
              AGLETRAS CANNOT GUARANTEE THE DISCOVERY OF ALL ADVERSARIAL THREATS OR ABSENCE OF MALICIOUS INTENT.
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AGLETRAS&apos;S TOTAL AGGREGATE LIABILITY ARISING FROM
              ANY ENGAGEMENT SHALL BE CAPPED AT THE TOTAL FEES PAID BY THE CLIENT FOR THAT SPECIFIC SERVICE.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-editorial font-semibold text-[#F4F2EA]">
              8. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and any dispute arising out of or in connection with them shall be governed by and
              construed in accordance with the laws of India, with courts having competent jurisdiction in
              Nashik, Maharashtra, India.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2 pt-6 border-t border-[#B7E4D5]/15">
            <p className="text-xs font-mono text-[#8DA99E]">
              Corporate Communications Address: {companyData.contacts.corporateEmail} • Registered Office: {companyData.registration.location}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
