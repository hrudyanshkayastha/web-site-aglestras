import { Shield, EyeOff, Scale, UserCheck, AlertTriangle } from "lucide-react";
import { companyData } from "@/data/company";

export function ResponsibleResearchSection() {
  return (
    <section className="py-24 md:py-32 bg-[#FCFCF8] text-[#041F1B] relative overflow-hidden border-t border-[#073B32]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#073B32] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Ethical Governance & Operating Charter</span>
          </div>
          <h2 className="text-editorial-title text-[#041F1B]">
            Responsible Intelligence.{" "}
            <span className="italic font-normal text-[#073B32]">
              Rigorous Ethical Boundaries.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#3D524C] font-light leading-relaxed">
            Our commitment to credibility requires unambiguous ethical principles.
            We do not cut corners, compromise user privacy, or engage in intrusive surveillance.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#073B32]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#073B32]/5 flex items-center justify-center text-[#2FA885]">
              <Scale size={22} />
            </div>
            <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
              Lawful Public Sources & Written Scope
            </h3>
            <p className="text-sm text-[#3D524C] leading-relaxed font-light">
              All intelligence activities utilize exclusively lawful public records, indexed disclosures,
              and client-authorized datasets. Every project operates strictly within an agreed Statement of Work.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#073B32]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#073B32]/5 flex items-center justify-center text-[#2FA885]">
              <EyeOff size={22} />
            </div>
            <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
              Explicit Exclusions & Prohibitions
            </h3>
            <p className="text-sm text-[#3D524C] leading-relaxed font-light">
              Agletras strictly prohibits unauthorized access, credential stuffing, malware deployment,
              phishing attacks, account takeover, private surveillance, or the acquisition of illegally leaked private data.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#073B32]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#073B32]/5 flex items-center justify-center text-[#2FA885]">
              <Shield size={22} />
            </div>
            <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
              Privacy & Regulatory Compliance
            </h3>
            <p className="text-sm text-[#3D524C] leading-relaxed font-light">
              Personal data processing complies with applicable privacy laws. Recruitment verification
              strictly mandates candidate authorization. Data is retained only as long as required for the engagement.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#073B32]/10 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#073B32]/5 flex items-center justify-center text-[#2FA885]">
              <UserCheck size={22} />
            </div>
            <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
              Human Review & Transparent Limitations
            </h3>
            <p className="text-sm text-[#3D524C] leading-relaxed font-light">
              Every deliverable undergoes senior analyst review. We transparently report investigative boundaries,
              ambiguities, and unresolved areas rather than claiming infallible coverage.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-6 rounded-2xl bg-[#F4F2EA] border border-[#073B32]/15 flex items-start gap-4">
          <AlertTriangle size={20} className="text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#041F1B] font-semibold">
              Legal & Advisory Boundary Statement
            </h4>
            <p className="text-xs text-[#4A5D57] leading-relaxed font-light">
              Agletras provides research, external threat signals, and analytical intelligence. Our deliverables do NOT
              constitute formal legal counsel, financial or investment advice, automatic employment decisions, guaranteed
              fraud prevention, or a guarantee that all risks have been discovered. Agletras does not claim government
              accreditation, certification, or third-party auditing beyond its statutory micro-enterprise incorporation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
