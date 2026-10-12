import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { companyData } from "@/data/company";

export function ContactOverlay() {
  return (
    <section
      id="destination-contact"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-28 pb-36 text-center relative z-20 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto space-y-7 pointer-events-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#031714]/95 via-[#031714]/92 to-[#031714]/90 border border-[#B7E4D5]/20 backdrop-blur-2xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32]/90 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
          <span>Destination 06 // Responsible Intelligence & Terminus</span>
        </div>

        <h2 className="text-editorial-hero text-[#F4F2EA] leading-tight drop-shadow-md">
          Have Information.{" "}
          <span className="italic font-normal text-[#B7E4D5]">
            Need Intelligence?
          </span>
        </h2>

        <p className="text-base md:text-lg text-[#C5D9D2] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Let&apos;s explore how research, automation, and security intelligence can address your information challenges.
        </p>

        {/* Section 5: Responsible Intelligence Substantive Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-left">
          <div className="p-4 rounded-2xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2FA885]">
              <ShieldCheck size={14} />
              <span>Lawful Open Sources</span>
            </div>
            <p className="text-[11px] text-[#A1B8B0] font-light leading-relaxed">
              Exclusively public or lawfully provided records. Zero unauthorized network intrusion, exploit attacks, or private surveillance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2FA885]">
              <Scale size={14} />
              <span>Privacy & Governance</span>
            </div>
            <p className="text-[11px] text-[#A1B8B0] font-light leading-relaxed">
              Strict statutory compliance, clear data boundaries, and mandatory subject authorizations secured prior to verification.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#041F1B]/90 border border-[#B7E4D5]/15 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2FA885]">
              <AlertCircle size={14} />
              <span>Documented Limits</span>
            </div>
            <p className="text-[11px] text-[#A1B8B0] font-light leading-relaxed">
              Transparent point-in-time boundaries, explicit investigative blind spots, and full attribution without overpromising.
            </p>
          </div>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_4px_24px_rgba(47,168,133,0.3)] hover:shadow-[0_6px_32px_rgba(47,168,133,0.45)]"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href="/terms#ethical-charter"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium tracking-wide text-[#F4F2EA] bg-[#073B32]/80 hover:bg-[#073B32] border border-[#B7E4D5]/35 hover:border-[#B7E4D5]/65 transition-all backdrop-blur-md"
          >
            <span>Ethical Charter</span>
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#8DA99E] border-t border-[#B7E4D5]/10">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#2FA885]" />
            <span>Direct Channel:</span>
            <a
              href={`mailto:${companyData.contacts.corporateEmail}`}
              className="text-[#F4F2EA] hover:text-[#B7E4D5] underline underline-offset-2 transition-colors"
            >
              {companyData.contacts.corporateEmail}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#2FA885]" />
            <span>{companyData.contacts.jurisdiction}</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#2FA885]" />
            <span>Point-in-Time Public Sources Only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
