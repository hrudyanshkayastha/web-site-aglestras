import Link from "next/link";
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { LivingKnowledgeSystem } from "@/components/visuals/LivingKnowledgeSystem";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#041F1B] via-[#073B32]/40 to-[#041F1B]">
      {/* Background organic light accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#2FA885]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#B7E4D5]/5 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Subtle decorative motif */}
      <BotanicalMotif
        variant="leaf-vein"
        className="absolute top-20 right-10 w-96 text-[#B7E4D5] opacity-15 hidden xl:block"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Positioning */}
          <div className="lg:col-span-7 space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25">
              <span className="w-2 h-2 rounded-full bg-[#2FA885]" />
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#B7E4D5] font-medium">
                Evidence-First Intelligence
              </span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-editorial-hero text-[#F4F2EA]">
              Turn Information{" "}
              <span className="italic text-[#B7E4D5] font-normal">
                Into Intelligence.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg md:text-xl text-[#C5D9D2] max-w-2xl leading-relaxed font-light">
              AGLETRAS helps organizations investigate markets, understand external threats,
              evaluate business risk, and turn fragmented public information into evidence-backed decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_20px_rgba(47,168,133,0.25)] hover:shadow-[0_6px_28px_rgba(47,168,133,0.4)]"
              >
                <span>Discuss an Engagement</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/70 hover:bg-[#073B32] border border-[#B7E4D5]/30 hover:border-[#B7E4D5]/60 transition-all"
              >
                <span>Explore Our Methodology</span>
                <ArrowRight size={16} className="text-[#B7E4D5]" />
              </Link>
            </div>

            {/* Three Restrained Trust Principles */}
            <div className="pt-8 border-t border-[#B7E4D5]/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#073B32]/60 border border-[#B7E4D5]/20 text-[#2FA885] shrink-0 mt-0.5">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#F4F2EA]">AI-Assisted</h4>
                  <p className="text-xs text-[#8DA99E] mt-0.5 font-light">
                    Accelerated signal extraction
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#073B32]/60 border border-[#B7E4D5]/20 text-[#2FA885] shrink-0 mt-0.5">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#F4F2EA]">Evidence-First</h4>
                  <p className="text-xs text-[#8DA99E] mt-0.5 font-light">
                    Every assertion source-linked
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#073B32]/60 border border-[#B7E4D5]/20 text-[#2FA885] shrink-0 mt-0.5">
                  <UserCheck size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#F4F2EA]">Human-Reviewed</h4>
                  <p className="text-xs text-[#8DA99E] mt-0.5 font-light">
                    Expert analyst governance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Living Knowledge System Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <LivingKnowledgeSystem />
          </div>
        </div>
      </div>
    </section>
  );
}
