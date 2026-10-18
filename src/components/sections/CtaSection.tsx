import Link from "next/link";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import { companyData } from "@/data/company";

export function CtaSection() {
  return (
    <section className="py-24 md:py-36 bg-[#041F1B] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/15">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#2FA885]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073B32] border border-[#B7E4D5]/20 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
          <span>Initiate Research Scope</span>
        </div>

        <h2 className="text-editorial-hero text-[#F4F2EA] leading-tight">
          Start With the Question{" "}
          <span className="italic font-normal text-[#B7E4D5]">
            You Need Answered.
          </span>
        </h2>

        <p className="text-base md:text-lg text-[#C5D9D2] max-w-2xl mx-auto font-light leading-relaxed">
          Tell us what you need to understand. We&apos;ll establish the appropriate research scope,
          objectives, permitted sources, and expected deliverables.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_24px_rgba(47,168,133,0.3)] hover:shadow-[0_6px_32px_rgba(47,168,133,0.45)]"
          >
            <span>Discuss an Engagement</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href="/methodology"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/60 hover:bg-[#073B32] border border-[#B7E4D5]/25 hover:border-[#B7E4D5]/50 transition-all"
          >
            <span>Review Our Methodology</span>
            <ArrowRight size={16} className="text-[#B7E4D5]" />
          </Link>
        </div>

        <div className="pt-8 flex items-center justify-center gap-2 text-xs font-mono text-[#8DA99E]">
          <Mail size={14} className="text-[#2FA885]" />
          <span>Direct Inquiry:</span>
          <a
            href={`mailto:${companyData.contacts.corporateEmail}`}
            className="text-[#F4F2EA] hover:text-[#B7E4D5] underline underline-offset-2 transition-colors"
          >
            {companyData.contacts.corporateEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
