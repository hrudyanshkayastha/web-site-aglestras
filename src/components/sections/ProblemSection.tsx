import { Layers, History, ShieldAlert, CheckCircle2 } from "lucide-react";
import { BotanicalMotif } from "@/components/ui/BotanicalMotif";
import { EntityGraphVisual } from "@/components/visuals/EntityGraphVisual";

export function ProblemSection() {
  return (
    <section id="intelligence" className="py-24 md:py-32 bg-[#F4F2EA] text-[#041F1B] relative overflow-hidden">
      {/* Botanical mesh accent on ivory */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B7E4D5]/30 rounded-full blur-3xl pointer-events-none" />
      <BotanicalMotif
        variant="stem-junction"
        className="absolute bottom-10 left-8 w-40 text-[#073B32] opacity-10 hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#073B32] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>The Intelligence Challenge</span>
          </div>
          <h2 className="text-editorial-title text-[#041F1B]">
            Information Is Everywhere.{" "}
            <span className="italic font-normal text-[#073B32]">
              Clarity Isn&apos;t.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#2C3E3A] font-light leading-relaxed">
            Organizations are inundated with digital data, yet critical business decisions are still
            hindered by scattered records, fleeting evidence, and unverified assertions.
          </p>
        </div>

        {/* Editorial Layout: Visual Synthesis Graphic on Left, Detailed Problem Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Meaningful Graphic Representation: Fragmented Noise vs Structured Intelligence */}
          <div className="lg:col-span-5 bg-[#FCFCF8] rounded-3xl p-8 border border-[#073B32]/10 shadow-[0_10px_35px_rgba(7,59,50,0.06)] relative overflow-hidden">
            <div className="border-b border-[#073B32]/10 pb-4 mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold">
                Epistemic Synthesis
              </span>
              <span className="text-[11px] font-mono text-[#5A736C]">
                Noise → Structured Signal
              </span>
            </div>

            {/* Comparison Visual: Unstructured vs Agletras Structured */}
            <div className="space-y-6">
              {/* Top: Fragmented State */}
              <div className="p-4 rounded-xl bg-[#F4F2EA] border border-[#073B32]/10">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-800 font-semibold block mb-2">
                  Unstructured Ingestion Dilemma
                </span>
                <p className="text-xs text-[#4A5D57] leading-relaxed mb-3">
                  Thousands of disconnected public records: disparate DNS entries, isolated filings,
                  forum chatter, and misleading duplicate profiles.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white border border-[#073B32]/10 text-[#4A5D57]">
                    Scattered Signals
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white border border-[#073B32]/10 text-[#4A5D57]">
                    Temporal Decay
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-rose-100/70 border border-rose-300 text-rose-900 font-medium">
                    No Provenance
                  </span>
                </div>
              </div>

              {/* Connecting Botanical Arrow */}
              <div className="flex items-center justify-center -my-2 text-[#2FA885]">
                <div className="w-px h-6 bg-[#2FA885]/40" />
              </div>

              {/* Bottom: Agletras Structured State with 3D Entity Graph */}
              <div className="space-y-3">
                <EntityGraphVisual />
                <div className="p-3.5 rounded-xl bg-[#041F1B] text-[#F4F2EA] border border-[#073B32] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#B7E4D5]">
                    <CheckCircle2 size={14} className="text-[#2FA885]" />
                    <span>Structured OSINT Synthesis</span>
                  </div>
                  <span className="text-[#8DA99E] text-[10px]">Traceable Provenance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Documented Problems */}
          <div className="lg:col-span-7 space-y-8">
            {/* Problem 1 */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#FCFCF8] border border-[#073B32]/10 flex items-center justify-center text-[#073B32] shrink-0 shadow-sm mt-1">
                <Layers size={22} className="text-[#2FA885]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
                  1. Fragmented & Disconnected Sources
                </h3>
                <p className="text-sm md:text-base text-[#3D524C] leading-relaxed font-light">
                  Public registries, technical infrastructure records, news archives, and open code
                  reside in isolated silos. Without systematic correlation, establishing a coherent,
                  defensible picture of corporate or threat reality remains nearly impossible.
                </p>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#FCFCF8] border border-[#073B32]/10 flex items-center justify-center text-[#073B32] shrink-0 shadow-sm mt-1">
                <History size={22} className="text-[#2FA885]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
                  2. Rapidly Shifting Information Landscapes
                </h3>
                <p className="text-sm md:text-base text-[#3D524C] leading-relaxed font-light">
                  Infrastructure mutates overnight. Domains expire, adversarial campaigns rotate IP addresses,
                  and corporate filings are amended. Intelligence that lacks precise temporal capture dates
                  quickly becomes misleading or invalid.
                </p>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-[#FCFCF8] border border-[#073B32]/10 flex items-center justify-center text-[#073B32] shrink-0 shadow-sm mt-1">
                <ShieldAlert size={22} className="text-[#2FA885]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-editorial font-semibold text-[#041F1B]">
                  3. Unsupported & Untraceable Assertions
                </h3>
                <p className="text-sm md:text-base text-[#3D524C] leading-relaxed font-light">
                  Generic AI search tools and unvetted briefs often deliver confident conclusions without
                  primary evidence. When decisions carry legal, financial, or cybersecurity stakes,
                  unsubstantiated claims introduce unacceptable organizational risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
