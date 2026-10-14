"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  ShieldCheck,
  MapPin,
  Copy,
  Check,
  Send,
  AlertTriangle,
  ExternalLink,
  Lock,
  Scale,
  Sparkles,
} from "lucide-react";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { AmbientLivingCanvas } from "@/components/visuals/AmbientLivingCanvas";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "external-threat-intelligence";

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    service: initialService,
    targetEntity: "",
    timeframe: "2-4 weeks",
    objective: "",
    authorized: false,
  });

  // Sync if URL search param changes
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam && servicesData.some((s) => s.id === serviceParam)) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedServiceObj = servicesData.find((s) => s.id === formData.service) || servicesData[0];

  const generateEmailSubject = () => {
    return encodeURIComponent(
      `[AGLETRAS Scope Inquiry] ${selectedServiceObj?.code || "GENERAL"} - ${formData.organization || formData.name || "Client"}`
    );
  };

  const generateEmailBodyText = () => {
    return `CLIENT ENGAGEMENT INQUIRY BRIEF
--------------------------------------------------------
Requestor Name: ${formData.name || "[Not Provided]"}
Organization: ${formData.organization || "[Not Provided]"}
Business Email: ${formData.email || "[Not Provided]"}
Service Category: ${selectedServiceObj?.title || formData.service} (${selectedServiceObj?.code || "N/A"})
Target / Digital Perimeter: ${formData.targetEntity || "[To be defined in Statement of Work]"}
Estimated Timeline: ${formData.timeframe}

RESEARCH OBJECTIVE & CORE QUESTIONS:
${formData.objective || "[Provide specific details regarding the inquiry]"}

LEGAL AUTHORIZATION CONFIRMATION:
${formData.authorized ? "YES - Requestor confirms legal standing and authorization for public-source scoping." : "PENDING - Formal authorization to be finalized in Statement of Work."}
--------------------------------------------------------
Transmitted directly to AGLETRAS Research Operations.`;
  };

  const handleLaunchEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.objective.trim()) {
      setErrorMsg("Please complete all required fields (Name, Business Email, Research Objective) before generating your inquiry brief.");
      return;
    }

    if (!formData.authorized) {
      setErrorMsg("Please confirm that your organization authorizes lawful public-source scoping for this inquiry.");
      return;
    }

    setSubmitted(true);
    const mailtoUrl = `mailto:${companyData.contacts.corporateEmail}?cc=${companyData.contacts.alternativeEmail}&subject=${generateEmailSubject()}&body=${encodeURIComponent(generateEmailBodyText())}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(generateEmailBodyText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Form: Real Working Structured Scoping Mechanism */}
      <div className="lg:col-span-7 bg-[#073B32]/35 p-8 sm:p-10 rounded-3xl border border-[#B7E4D5]/20 shadow-[0_15px_40px_rgba(3,23,20,0.4)]">
        <div className="border-b border-[#B7E4D5]/15 pb-4 mb-6 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold block">
              Engagement Scope Formulator
            </span>
            <span className="text-[11px] font-mono text-[#8DA99E]">
              Direct Cryptographic Brief Generation
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#041F1B] border border-[#2FA885]/30 text-[10px] font-mono text-[#2FA885]">
            <Lock size={11} />
            <span>Encrypted Direct Channel</span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {submitted && (
          <div className="p-4 mb-6 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
            <Check size={16} className="shrink-0 mt-0.5 text-[#2FA885]" />
            <span>Email client launched with preformatted brief. You can also copy the brief text below if your email client didn&apos;t open automatically.</span>
          </div>
        )}

        <form onSubmit={handleLaunchEmailClient} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Jennifer Vance"
                className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                Organization / Entity
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Meridian Capital Group"
                className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                Business Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. j.vance@meridiancap.com"
                className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                Service of Interest *
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] focus:outline-none focus:border-[#2FA885]"
              >
                {servicesData.map((s) => (
                  <option key={s.id} value={s.id} className="bg-[#041F1B] text-[#F4F2EA]">
                    [{s.code}] {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                Target Entity / Domain / Keyword
              </label>
              <input
                type="text"
                value={formData.targetEntity}
                onChange={(e) => setFormData({ ...formData, targetEntity: e.target.value })}
                placeholder="e.g. target-domain.com or Legal Entity Name"
                className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                Target Timeline
              </label>
              <select
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] focus:outline-none focus:border-[#2FA885]"
              >
                <option value="1-2 weeks (Expedited Priority)">1-2 weeks (Expedited Priority)</option>
                <option value="2-4 weeks (Standard Research Window)">2-4 weeks (Standard Research Window)</option>
                <option value="Ongoing / Retainer Monitoring">Ongoing / Retainer Monitoring</option>
                <option value="Exploratory Advisory Discussion">Exploratory Advisory Discussion</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
              Research Objective & Questions to Answer *
            </label>
            <textarea
              required
              rows={4}
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              placeholder="Describe the business or security challenge, specific questions you need answered, and any context that will help us scope the inquiry."
              className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl p-4 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
            />
          </div>

          {/* Authorization Checkbox */}
          <div className="p-4 rounded-xl bg-[#041F1B]/70 border border-[#B7E4D5]/15 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.authorized}
                onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-[#B7E4D5]/30 text-[#2FA885] focus:ring-[#2FA885] accent-[#2FA885]"
              />
              <span className="text-xs text-[#C5D9D2] font-light leading-relaxed">
                I confirm that my organization has legitimate commercial standing and authority to request research regarding the named targets or candidate under applicable privacy laws.
              </span>
            </label>
          </div>

          {/* Action Buttons: Mailto Launch + Copy Brief */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              className="w-full sm:flex-1 py-4 px-6 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#041F1B]/50 cursor-pointer"
            >
              <Send size={14} />
              <span>Generate & Transmit Brief</span>
            </button>

            <button
              type="button"
              onClick={handleCopyBrief}
              className="w-full sm:w-auto py-4 px-6 rounded-full text-xs font-mono uppercase tracking-widest text-[#F4F2EA] bg-[#041F1B] hover:bg-[#073B32] border border-[#B7E4D5]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#2FA885]" />
                  <span>Brief Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-[#B7E4D5]" />
                  <span>Copy Brief</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-[#8DA99E] font-light text-center">
            Transmits directly to {companyData.contacts.corporateEmail}. No unencrypted third-party marketing brokers are involved.
          </p>
        </form>
      </div>

      {/* Right Column: Verified Direct Details & Ethical Standards */}
      <div className="lg:col-span-5 space-y-8">
        {/* Direct Verified Contacts Card */}
        <div className="p-8 rounded-3xl bg-[#073B32]/25 border border-[#B7E4D5]/15 space-y-6">
          <div className="border-b border-[#B7E4D5]/15 pb-4">
            <h2 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
              Direct Contact Channels
            </h2>
            <p className="text-xs font-mono text-[#8DA99E] mt-1">
              Official enterprise communication points
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono text-[#C5D9D2]">
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#8DA99E] uppercase block mb-0.5 text-[10px]">
                  Primary Inquiries:
                </span>
                <a
                  href={`mailto:${companyData.contacts.corporateEmail}`}
                  className="text-[#F4F2EA] hover:text-[#B7E4D5] underline underline-offset-2 transition-colors font-medium text-sm"
                >
                  {companyData.contacts.corporateEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#8DA99E] uppercase block mb-0.5 text-[10px]">
                  Alternative Routing:
                </span>
                <a
                  href={`mailto:${companyData.contacts.alternativeEmail}`}
                  className="text-[#F4F2EA] hover:text-[#B7E4D5] underline underline-offset-2 transition-colors"
                >
                  {companyData.contacts.alternativeEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#8DA99E] uppercase block mb-0.5 text-[10px]">
                  Jurisdiction & Office:
                </span>
                <span className="text-[#F4F2EA] block">
                  {companyData.registration.location}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#8DA99E] uppercase block mb-0.5 text-[10px]">
                  Research Mandate:
                </span>
                <span className="text-[#F4F2EA] block">
                  Point-in-Time Public Records & Passive Telemetry Only
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#B7E4D5]/15">
            <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8DA99E] mb-3">
              Official Profiles
            </span>
            <SocialLinks variant="icon-buttons" />
          </div>
        </div>

        {/* Ethical Charter Summary Card */}
        <div className="p-8 rounded-3xl bg-[#031714] border border-[#B7E4D5]/15 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
            <Scale size={15} className="text-[#2FA885]" />
            <span>Ethical Scope Commitments</span>
          </div>
          <p className="text-xs text-[#C5D9D2] font-light leading-relaxed">
            All investigations strictly observe statutory boundaries:
          </p>
          <ul className="space-y-2 text-xs text-[#A1B8B0] font-light">
            <li className="flex items-start gap-2">
              <span className="text-[#2FA885] font-bold">✓</span>
              <span>100% lawful, unclassified public records & passive DNS telemetry.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✕</span>
              <span>No unauthorized network intrusions, exploit deployments, or surveillance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✕</span>
              <span>No private credit files or interception of private communications.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen overflow-hidden">
      {/* Background Ambient Living World Canvas */}
      <AmbientLivingCanvas opacity={0.6} particleCount={40} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 space-y-16">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Scope An Engagement</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Let&apos;s Define{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              the Question.
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#C5D9D2] font-light leading-relaxed">
            Tell us what you need to investigate, verify, or automate. We can discuss the requirements, appropriate scope, and possible next steps.
          </p>
        </div>

        {/* Suspense Wrapper around Search Params Reader */}
        <Suspense
          fallback={
            <div className="p-12 text-center font-mono text-xs text-[#8DA99E]">
              Initializing Engagement Scope Formulator...
            </div>
          }
        >
          <ContactFormInner />
        </Suspense>
      </div>
    </div>
  );
}
