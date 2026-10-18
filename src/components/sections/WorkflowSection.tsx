import Link from "next/link";
import { ArrowRight, CheckCircle, FileText } from "lucide-react";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";

const workflowSteps = [
  { step: "01", label: "Define the Question", detail: "Formalize the exact commercial inquiry or threat concern." },
  { step: "02", label: "Scope Engagement", detail: "Establish legal jurisdiction, approved public sources, and limits." },
  { step: "03", label: "Collect Sources", detail: "Lawfully harvest passive records, certificates, and registries." },
  { step: "04", label: "Extract Evidence", detail: "Filter noise, capture cryptographic hashes, and verify provenance." },
  { step: "05", label: "Correlate Information", detail: "Map entity links, infrastructure clusters, and historical records." },
  { step: "06", label: "Analyze Signals", detail: "Evaluate patterns, assign confidence, and detect anomalies." },
  { step: "07", label: "Human Review", detail: "Expert intelligence analysts validate context and remove bias." },
  { step: "08", label: "Deliver Intelligence", detail: "Deliver actionable, executive-ready brief with clear citations." },
];

export function WorkflowSection() {
  return (
    <section className="py-24 md:py-32 bg-[#041F1B] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/10">
      <BotanicalMotif
        variant="root-mesh"
        className="absolute top-10 right-10 w-96 text-[#2FA885] opacity-10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>The Research Cycle</span>
          </div>
          <h2 className="text-editorial-title text-[#F4F2EA]">
            From Business Question{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              to Decision Intelligence.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#C5D9D2] font-light leading-relaxed">
            Our output is not a raw list of search queries or disconnected links.
            It is a rigorously researched, human-evaluated intelligence brief engineered
            to guide strategic, defensive, or commercial decisions.
          </p>
        </div>

        {/* 8-Step Architectural Workflow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {workflowSteps.map((item, index) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#073B32]/40 border border-[#B7E4D5]/15 hover:border-[#2FA885]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#2FA885] font-semibold">
                    Step {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
                    {index < 4 ? "Collection" : "Synthesis"}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#F4F2EA] group-hover:text-[#B7E4D5] transition-colors mb-2">
                  {item.label}
                </h3>
                <p className="text-xs text-[#A1B8B0] leading-relaxed font-light">
                  {item.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B7E4D5]/10 flex items-center justify-between text-[11px] font-mono text-[#718E84]">
                <span>Validated</span>
                <CheckCircle size={12} className="text-[#2FA885]" />
              </div>
            </div>
          ))}
        </div>

        {/* Deliverable Callout Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#073B32]/70 via-[#041F1B] to-[#073B32]/70 border border-[#B7E4D5]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
              <FileText size={16} className="text-[#2FA885]" />
              <span>Traceable Deliverable Standard</span>
            </div>
            <h4 className="text-xl md:text-2xl font-editorial font-medium text-[#F4F2EA]">
              Every Material Claim Attributed to Primary Public Sources
            </h4>
            <p className="text-xs md:text-sm text-[#C5D9D2] font-light leading-relaxed">
              When an engagement concludes, leadership receives a structured intelligence document containing
              timestamped artifacts, relationship diagrams, explicit limitations, and practical recommendations.
            </p>
          </div>

          <Link
            href="/methodology"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] shrink-0 transition-all shadow-[0_2px_12px_rgba(47,168,133,0.2)]"
          >
            <span>Review Full Methodology</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
