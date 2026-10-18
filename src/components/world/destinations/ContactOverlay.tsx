import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, ShieldCheck, Scale, AlertCircle } from "lucide-react";
import { companyData } from "@/data/company";

export function ContactOverlay() {
  return (
    <section
      id="destination-contact"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 pt-28 pb-32 text-center relative z-20 pointer-events-none"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Destination Header */}
        <div className="space-y-4 max-w-2xl mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32]/90 border border-[#B7E4D5]/30 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885] animate-pulse" />
            <span>Destination 06 // The Intelligence Inquiry Chamber</span>
          </div>

          <h2 className="text-editorial-hero text-[#F4F2EA] leading-tight drop-shadow-md">
            Let&apos;s Define{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              the Question.
            </span>
          </h2>

          <p className="text-sm md:text-base text-[#C5D9D2] font-light leading-relaxed drop-shadow-sm">
            Every engagement begins with an empirical scope definition. We align on specific questions, lawful public boundaries, and actionable deliverables.
          </p>
        </div>

        {/* Lateral Flanking Panels leaving central 3D focal monolith in clear view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Panel: Direct Engagement Initiation */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#031714]/75 border border-[#B7E4D5]/20 backdrop-blur-md shadow-[0_12px_40px_rgba(2,15,12,0.5)] text-left space-y-6 pointer-events-auto">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block mb-1">
                Engagement Initiation
              </span>
              <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                Formulate an Inquiry Scope
              </h3>
              <p className="text-xs text-[#A1B8B0] font-light mt-1.5 leading-relaxed">
                Use our structured scope formulator to specify target domains, investigation questions, and required timelines without third-party brokers.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/contact"
                className="w-full py-3.5 px-6 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#041F1B]/50 hover:shadow-[0_4px_20px_rgba(47,168,133,0.35)]"
              >
                <span>Launch Scope Formulator</span>
                <ArrowUpRight size={14} />
              </Link>

              <Link
                href="/terms#ethical-charter"
                className="w-full py-3 px-6 rounded-full text-xs font-mono uppercase tracking-widest text-[#F4F2EA] bg-[#073B32]/70 hover:bg-[#073B32] border border-[#B7E4D5]/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Review Ethical Charter</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-[#B7E4D5]/10 space-y-2 text-xs font-mono text-[#8DA99E]">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#2FA885]" />
                <span>Direct:</span>
                <a
                  href={`mailto:${companyData.contacts.corporateEmail}`}
                  className="text-[#F4F2EA] hover:text-[#B7E4D5] underline underline-offset-2 transition-colors"
                >
                  {companyData.contacts.corporateEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#2FA885]" />
                <span>{companyData.contacts.jurisdiction}</span>
              </div>
            </div>
          </div>

          {/* Center Column: Open Frustum Window for 3D Monolith Sightline */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center pointer-events-none">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#2FA885]/70 bg-[#041F1B]/80 px-3 py-1 rounded-full border border-[#2FA885]/20 backdrop-blur-sm">
              Confidential Sanctum
            </div>
          </div>

          {/* Right Panel: 3 Substantive Principles */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-[#031714]/75 border border-[#B7E4D5]/20 backdrop-blur-md shadow-[0_12px_40px_rgba(2,15,12,0.5)] text-left space-y-4 pointer-events-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2FA885] font-semibold block">
              Ethical Governance & Boundaries
            </span>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#041F1B]/90 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2FA885]">
                  <ShieldCheck size={14} />
                  <span>Lawful Open Sources Only</span>
                </div>
                <p className="text-[11px] text-[#A1B8B0] font-light leading-snug">
                  Exclusively public or lawfully provided records. Zero unauthorized network intrusion or credential attacks.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#041F1B]/90 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2FA885]">
                  <Scale size={14} />
                  <span>Privacy & Authority Verification</span>
                </div>
                <p className="text-[11px] text-[#A1B8B0] font-light leading-snug">
                  Strict statutory compliance, defined SOW boundaries, and mandatory subject authorizations secured prior to verification.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#041F1B]/90 border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2FA885]">
                  <AlertCircle size={14} />
                  <span>Transparent Confidence & Limits</span>
                </div>
                <p className="text-[11px] text-[#A1B8B0] font-light leading-snug">
                  Point-in-time boundaries, explicit knowledge gaps, and complete source attribution without overpromising.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
