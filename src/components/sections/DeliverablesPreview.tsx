import { sampleBriefData } from "@/data/methodology";
import { FileText, Shield, Hash, Calendar, CheckCircle2, AlertOctagon } from "lucide-react";

export function DeliverablesPreview() {
  return (
    <section className="py-24 md:py-32 bg-[#F4F2EA] text-[#041F1B] relative overflow-hidden border-t border-[#073B32]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#073B32] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Illustrative Client Deliverable</span>
          </div>
          <h2 className="text-editorial-title text-[#041F1B]">
            What an Engagement Produces:{" "}
            <span className="italic font-normal text-[#073B32]">
              Structured Intelligence Briefs.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#3D524C] font-light leading-relaxed">
            Our deliverables present leadership with unambiguous conclusions, backed by cryptographic
            capture timestamps, source citations, risk scores, and clear mitigation advice.
          </p>
        </div>

        {/* Illustrative Deliverable Preview Document Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#FFFFFF] border border-[#073B32]/15 shadow-[0_15px_45px_rgba(7,59,50,0.08)] overflow-hidden">
          {/* Top Document Header Band */}
          <div className="bg-[#041F1B] text-[#F4F2EA] px-8 py-5 border-b border-[#073B32] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#073B32] flex items-center justify-center text-[#B7E4D5]">
                <FileText size={16} />
              </div>
              <div>
                <span className="font-mono text-xs text-[#2FA885] font-semibold tracking-wider block">
                  AGLETRAS RESEARCH DOSSIER
                </span>
                <span className="text-[11px] font-mono text-[#8DA99E]">
                  Report ID: {sampleBriefData.briefId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-[#073B32] text-[#B7E4D5] border border-[#B7E4D5]/20">
                {sampleBriefData.classification}
              </span>
            </div>
          </div>

          {/* Document Content Body */}
          <div className="p-8 sm:p-12 space-y-10">
            {/* Meta Attributes Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl bg-[#F8F6F0] border border-[#073B32]/10 text-xs font-mono text-[#4A5D57]">
              <div>
                <span className="block text-[#8DA99E] uppercase mb-1">Target Scope</span>
                <strong className="text-[#041F1B] font-medium">{sampleBriefData.scopeTarget}</strong>
              </div>
              <div>
                <span className="block text-[#8DA99E] uppercase mb-1">Date of Release</span>
                <strong className="text-[#041F1B] font-medium">{sampleBriefData.date}</strong>
              </div>
              <div>
                <span className="block text-[#8DA99E] uppercase mb-1">Methodology Standard</span>
                <strong className="text-[#041F1B] font-medium">AGL-OSINT v2.4 (Strict Lawful)</strong>
              </div>
            </div>

            {/* Document Title & Executive Summary */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-editorial font-semibold text-[#041F1B] leading-tight">
                {sampleBriefData.title}
              </h3>
              <div className="p-5 rounded-2xl bg-[#F4F2EA] border-l-4 border-[#2FA885] space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold block">
                  Executive Summary
                </span>
                <p className="text-sm text-[#2C3E3A] leading-relaxed font-light">
                  {sampleBriefData.executiveSummary}
                </p>
              </div>
            </div>

            {/* Evidence & Findings Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold">
                  Evidence Register & Epistemic Attribution
                </h4>
                <span className="text-[11px] font-mono text-[#5A736C]">
                  4 Attributed Artifacts
                </span>
              </div>

              <div className="overflow-x-auto border border-[#073B32]/10 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8F6F0] border-b border-[#073B32]/10 font-mono text-[#073B32]">
                    <tr>
                      <th className="p-3 font-semibold">ID</th>
                      <th className="p-3 font-semibold">Level</th>
                      <th className="p-3 font-semibold">Observation / Finding</th>
                      <th className="p-3 font-semibold">Primary Source Citation</th>
                      <th className="p-3 font-semibold">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#073B32]/10 text-[#3D524C]">
                    {sampleBriefData.evidenceSummary.map((evd) => (
                      <tr key={evd.id} className="hover:bg-[#F8F6F0]/60 transition-colors">
                        <td className="p-3 font-mono font-medium text-[#041F1B] whitespace-nowrap">
                          {evd.id}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              evd.category === "FACT"
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : evd.category === "INDICATOR"
                                ? "bg-teal-100 text-teal-900 border border-teal-300"
                                : evd.category === "INFERENCE"
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : "bg-rose-100 text-rose-900 border border-rose-300"
                            }`}
                          >
                            {evd.category}
                          </span>
                        </td>
                        <td className="p-3 font-light leading-relaxed max-w-xs">{evd.observation}</td>
                        <td className="p-3 font-mono text-[11px] text-[#5A736C] max-w-xs truncate">
                          {evd.source}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-[#073B32] whitespace-nowrap">
                          {evd.confidence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actionable Recommendations & Boundaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#073B32]/10">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#073B32] font-semibold">
                  <CheckCircle2 size={15} className="text-[#2FA885]" />
                  <span>Actionable Defensive Recommendations</span>
                </div>
                <ul className="space-y-2 text-xs text-[#3D524C] font-light">
                  {sampleBriefData.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-[#073B32] font-semibold">0{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F6F0] border border-[#073B32]/10 space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-900 font-semibold">
                  <AlertOctagon size={14} />
                  <span>Documented Boundaries & Disclaimers</span>
                </div>
                <p className="text-[11px] text-[#5A736C] leading-relaxed font-light">
                  Findings represent passive public intelligence captured within the authorized window.
                  Agletras does not certify absence of other threats or guarantee third-party infrastructure actions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
