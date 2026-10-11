import { epistemicStandards } from "@/data/methodology";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export function MethodologySection() {
  return (
    <section className="py-24 md:py-32 bg-[#041F1B] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/15">
      <BotanicalMotif
        variant="canopy-burst"
        className="absolute top-10 left-10 w-80 text-[#B7E4D5] opacity-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Epistemic Rigor & Evidence Standards</span>
          </div>
          <h2 className="text-editorial-title text-[#F4F2EA]">
            Separating Verified Facts{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              From Subjective Inferences.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#C5D9D2] font-light leading-relaxed">
            In high-stakes corporate and threat intelligence, confusing an unverified indicator
            with an established fact causes catastrophic errors. Agletras categorizes every piece
            of research into five explicit epistemic tiers.
          </p>
        </div>

        {/* 5 Epistemic Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {epistemicStandards.map((item) => (
            <div
              key={item.type}
              className={`p-6 rounded-2xl border ${item.colorScheme.border} ${item.colorScheme.bg} flex flex-col justify-between transition-all hover:scale-[1.01]`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wider ${item.colorScheme.badgeBg}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[11px] font-mono text-[#8DA99E]">
                    {item.confidenceRange}
                  </span>
                </div>

                <p className="text-sm text-[#E2F4EE] leading-relaxed mb-4 font-light">
                  {item.definition}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="block text-[10px] font-mono text-[#8DA99E] uppercase mb-1">
                  Illustrative Reference:
                </span>
                <p className="text-xs text-[#A1B8B0] italic font-light">
                  &ldquo;{item.example}&rdquo;
                </p>
              </div>
            </div>
          ))}

          {/* Epistemic Governance Summary Card */}
          <div className="p-6 rounded-2xl border border-[#2FA885]/40 bg-[#073B32]/60 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wider bg-[#2FA885]/20 text-[#B7E4D5] inline-block mb-4">
                ANALYST GOVERNANCE
              </span>
              <h4 className="text-lg font-editorial font-medium text-[#F4F2EA] mb-2">
                Human Review Overrides Automation
              </h4>
              <p className="text-xs text-[#C5D9D2] leading-relaxed font-light mb-4">
                AI algorithms accelerate collection and pattern matching, but senior human researchers
                verify each finding, challenge baseline assumptions, and certify reporting accuracy.
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-[#B7E4D5] font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#2FA885]" />
                <span>Zero Generative Hallucinations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#2FA885]" />
                <span>Traceable Evidence Provenance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#2FA885]" />
                <span>Transparent Boundary Disclosures</span>
              </div>
            </div>
          </div>
        </div>

        {/* Illustrative Notice Disclaimer */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#749187] justify-center text-center">
          <ShieldAlert size={14} className="text-[#8DA99E]" />
          <span>
            * All examples displayed across this methodology are strictly illustrative and do not reflect client cases.
          </span>
        </div>
      </div>
    </section>
  );
}
