import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Scale, FileSpreadsheet } from "lucide-react";
import { epistemicStandards, intelligenceStages, sampleBriefData } from "@/data/methodology";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";

export const metadata: Metadata = {
  title: "Methodology & Epistemic Framework — AGLETRAS",
  description:
    "Examine Agletras's 6-stage intelligence cycle, 5-tier evidence classification standard, and human-analyst review governance.",
};

export default function MethodologyPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-24">
        {/* Page Hero */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Research Epistemics</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            The Architecture{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              of Certainty.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#C5D9D2] font-light leading-relaxed">
            Intelligence without provenance is conjecture. We subject every piece of public information
            to systematic verification, clear epistemic labeling, and senior analyst peer review.
          </p>
        </div>

        {/* The 6-Stage Intelligence Lifecycle */}
        <div className="space-y-10">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              The 6-Stage Intelligence Cycle
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              How fragmented data points transform into actionable intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intelligenceStages.map((stage) => (
              <div
                key={stage.step}
                className="p-8 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/15 shadow-3d-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#2FA885] font-semibold">
                      Phase {stage.step}
                    </span>
                    <span className="text-[10px] font-mono text-[#8DA99E] uppercase">
                      {stage.phase}
                    </span>
                  </div>
                  <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C5D9D2] leading-relaxed font-light">
                    {stage.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#B7E4D5]/10 text-xs font-mono text-[#B7E4D5]">
                  <span className="block text-[10px] text-[#8DA99E] uppercase mb-0.5">
                    Stage Outcome:
                  </span>
                  <span>{stage.deliverableOutcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Tier Epistemic Standard */}
        <div className="space-y-10">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <h2 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#F4F2EA]">
              The 5-Tier Epistemic Standard
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Separating observable evidence from analytical hypothesis
            </p>
          </div>

          <div className="space-y-4">
            {epistemicStandards.map((item) => (
              <div
                key={item.type}
                className={`p-6 sm:p-8 rounded-2xl border ${item.colorScheme.border} ${item.colorScheme.bg} grid grid-cols-1 md:grid-cols-12 gap-6 items-center`}
              >
                <div className="md:col-span-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider inline-block mb-1 ${item.colorScheme.badgeBg}`}
                  >
                    {item.label}
                  </span>
                  <span className="block text-xs font-mono text-[#8DA99E] mt-1">
                    {item.confidenceRange}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm text-[#E2F4EE] leading-relaxed font-light">
                    {item.definition}
                  </p>
                </div>

                <div className="md:col-span-4 p-4 rounded-xl bg-[#041F1B]/60 border border-white/5">
                  <span className="block text-[10px] font-mono text-[#8DA99E] uppercase mb-1">
                    Illustrative Pattern:
                  </span>
                  <p className="text-xs text-[#A1B8B0] italic font-light leading-snug">
                    &ldquo;{item.example}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#073B32] via-[#041F1B] to-[#073B32] border border-[#B7E4D5]/25 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-editorial font-medium text-[#F4F2EA]">
              Apply our methodology to your business question
            </h3>
            <p className="text-xs text-[#C5D9D2] font-light">
              We define clear project objectives and deliver evidence-backed briefs.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shrink-0"
          >
            <span>Initiate Scope Discussion</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
