import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, Network, ShieldCheck, FileText } from "lucide-react";

const methodologySteps = [
  {
    step: "01",
    label: "Collect",
    icon: Database,
    summary: "Lawful passive harvesting of public infrastructure, registry filings, and certificate telemetry.",
  },
  {
    step: "02",
    label: "Connect",
    icon: Network,
    summary: "Relational graph correlation mapping corporate entities, lookalike hosts, and nominee officer networks.",
  },
  {
    step: "03",
    label: "Analyze",
    icon: ShieldCheck,
    summary: "Rigorous 5-tier epistemic tiering separating verified public facts from analytical inferences.",
  },
  {
    step: "04",
    label: "Deliver",
    icon: FileText,
    summary: "Defensible, executive-ready intelligence briefs with cryptographic source provenance.",
  },
];

export function CompactMethodologySection() {
  return (
    <section className="py-20 md:py-28 bg-[#041F1B] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#B7E4D5]/15 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
              <span>Epistemic Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial font-semibold text-[#F4F2EA]">
              From Raw Data{" "}
              <span className="italic font-normal text-[#B7E4D5]">
                to Defensible Decisions.
              </span>
            </h2>
            <p className="text-sm md:text-base text-[#C5D9D2] font-light">
              Intelligence without provenance is conjecture. We follow a deterministic four-phase research lifecycle.
            </p>
          </div>

          <Link
            href="/methodology"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B7E4D5] hover:text-[#FFFFFF] transition-colors shrink-0 font-medium"
          >
            <span>Explore Epistemic Tiers</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* The Elegant 4-Phase Sequence: Collect → Connect → Analyze → Deliver */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {methodologySteps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === methodologySteps.length - 1;

            return (
              <div
                key={item.step}
                className="p-7 rounded-2xl bg-[#073B32]/40 border border-[#B7E4D5]/15 shadow-3d-card flex flex-col justify-between space-y-6 relative group hover:border-[#2FA885]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold tracking-wider">
                      Phase {item.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#041F1B] text-[#B7E4D5] group-hover:text-[#2FA885] transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-editorial font-semibold text-[#F4F2EA] mb-2">
                    {item.label}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C5D9D2] font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Bottom Step Indicator with Arrow connector */}
                <div className="pt-4 border-t border-[#B7E4D5]/10 flex items-center justify-between text-xs font-mono text-[#8DA99E]">
                  <span className="uppercase tracking-wider">Cycle {item.step}/04</span>
                  {!isLast && (
                    <ArrowRight
                      size={14}
                      className="text-[#2FA885] hidden lg:block opacity-75 group-hover:translate-x-1 transition-transform"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
