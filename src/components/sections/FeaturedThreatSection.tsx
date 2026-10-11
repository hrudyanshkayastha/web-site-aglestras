import Link from "next/link";
import { Shield, ArrowUpRight, CheckCircle2, AlertTriangle, FileSpreadsheet } from "lucide-react";
import { servicesData } from "@/data/services";

export function FeaturedThreatSection() {
  const threatService = servicesData.find((s) => s.id === "external-threat-intelligence")!;

  return (
    <section className="py-24 md:py-32 bg-[#073B32] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/20">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2FA885]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#041F1B]/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Commercial Priority Flag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#041F1B] border border-[#B7E4D5]/30 mb-6 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
          <Shield size={14} className="text-[#2FA885]" />
          <span>Priority Commercial Offering • AGL-ETI</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Problem & Scope */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-editorial-hero text-[#F4F2EA]">
              See the External Signals{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                That Matter.
              </span>
            </h2>

            <p className="text-base md:text-lg text-[#C5D9D2] leading-relaxed font-light">
              Authorized engagements investigate publicly observable threat indicators across open surfaces.
              We identify adversary preparations, spoofed brand assets, and digital footprint exposures
              before malicious campaigns compromise customer trust.
            </p>

            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
                What Is Investigated Across Public Sources:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#D8E8E2]">
                {threatService.scopeOfInvestigation.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope & Authorization Non-Negotiable Boundary Notice */}
            <div className="p-4 rounded-2xl bg-[#041F1B]/80 border border-[#B7E4D5]/20 flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-[#B7CAC2] leading-relaxed font-light">
                <strong className="text-[#F4F2EA] font-medium">Authorization & Scope Requirement:</strong>{" "}
                All engagements require an agreed written scope and verified client authorization.
                External discovery strictly analyzes open and permitted public sources; it does NOT authorize
                exploitation, intrusion, or testing of third-party infrastructure.
              </p>
            </div>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_20px_rgba(47,168,133,0.3)] hover:shadow-[0_6px_28px_rgba(47,168,133,0.45)]"
              >
                <span>Discuss a Threat Intelligence Engagement</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Structured Intelligence Deliverable Mockup with 3D Depth */}
          <div className="lg:col-span-5 surface-matte-dark rounded-3xl p-6 sm:p-8 border border-[#B7E4D5]/25 shadow-3d-card space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#073B32] pb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-[#2FA885]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#F4F2EA] font-medium">
                  Deliverable Outcome
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
                Client Confidential Brief
              </span>
            </div>

            <p className="text-xs text-[#A1B8B0] leading-relaxed font-light">
              Organizations receive a structured intelligence dossier rather than raw logs:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between">
                <span className="text-[#C5D9D2]">Executive Threat Summary</span>
                <span className="text-[#2FA885]">Included</span>
              </div>
              <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between">
                <span className="text-[#C5D9D2]">Timestamped Evidence & Screenshots</span>
                <span className="text-[#2FA885]">Included</span>
              </div>
              <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between">
                <span className="text-[#C5D9D2]">Confidence Assessments (Fact / Indicator)</span>
                <span className="text-[#2FA885]">Included</span>
              </div>
              <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between">
                <span className="text-[#C5D9D2]">MITRE ATT&CK Behavioral Alignment</span>
                <span className="text-[#2FA885]">Included</span>
              </div>
              <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between">
                <span className="text-[#C5D9D2]">Prioritized Defensive Mitigations</span>
                <span className="text-[#2FA885]">Included</span>
              </div>
              <div className="p-3 rounded-xl bg-[#073B32]/40 border border-[#B7E4D5]/10 flex items-center justify-between">
                <span className="text-[#C5D9D2]">Explicit Investigative Boundaries</span>
                <span className="text-[#2FA885]">Included</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#073B32]/20 border border-[#B7E4D5]/10 text-[11px] text-[#8DA99E] font-light leading-relaxed">
              * Note: Continuous monitoring is available as an explicitly scoped periodic retainer;
              we do not imply that real-time feeds operate without an active custom engagement.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
