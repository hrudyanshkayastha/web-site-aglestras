"use client";

import { useState } from "react";
import { Mail, ShieldCheck, MapPin, Copy, Check, Send, AlertTriangle, ExternalLink } from "lucide-react";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { SocialLinks } from "@/components/ui/SocialLinks";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    service: "external-threat-intelligence",
    targetEntity: "",
    timeframe: "2-4 weeks",
    objective: "",
    authorized: false,
  });

  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedServiceObj = servicesData.find((s) => s.id === formData.service);

  const generateEmailSubject = () => {
    return encodeURIComponent(
      `[AGLETRAS Engagement Scope] ${selectedServiceObj?.code || "INQUIRY"} - ${formData.organization || "New Client"}`
    );
  };

  const generateEmailBodyText = () => {
    return `CLIENT ENGAGEMENT INQUIRY
----------------------------------------
Requestor Name: ${formData.name || "[Not Provided]"}
Organization: ${formData.organization || "[Not Provided]"}
Business Email: ${formData.email || "[Not Provided]"}
Requested Capability: ${selectedServiceObj?.title || formData.service} (${selectedServiceObj?.code || "N/A"})
Target / Digital Scope: ${formData.targetEntity || "[To be defined in SOW]"}
Estimated Timeline: ${formData.timeframe}

RESEARCH OBJECTIVE & QUESTIONS:
${formData.objective || "[Provide details on the business or threat inquiry]"}

AUTHORIZATION CONFIRMATION:
${formData.authorized ? "YES - Requestor confirms legal authorization for public-source scoping." : "PENDING - Written authorization to be finalized."}
----------------------------------------
Transmitted directly to AGLETRAS Research Team.`;
  };

  const handleLaunchEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.organization.trim() || !formData.email.trim() || !formData.objective.trim()) {
      setErrorMsg("Please complete all required fields before initiating an engagement.");
      return;
    }

    if (!formData.authorized) {
      setErrorMsg("Please confirm that you are authorized to request scoping for this engagement.");
      return;
    }

    const mailtoUrl = `mailto:${companyData.contacts.corporateEmail}?cc=${companyData.contacts.alternativeEmail}&subject=${generateEmailSubject()}&body=${encodeURIComponent(generateEmailBodyText())}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyBrief = () => {
    navigator.clipboard.writeText(generateEmailBodyText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#041F1B] text-[#F4F2EA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-16">
        {/* Page Hero */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073B32] border border-[#B7E4D5]/25 text-xs font-mono text-[#B7E4D5] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Scope An Engagement</span>
          </div>

          <h1 className="text-editorial-hero text-[#F4F2EA]">
            Initiate a Research{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Intelligence Scope.
            </span>
          </h1>

          <p className="text-base md:text-lg text-[#C5D9D2] font-light leading-relaxed">
            Every engagement begins with understanding your objective. Fill out the structured scoping form
            below to formulate your project brief and transmit it directly to our senior analysts.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form: Real Working Structured Scoping Mechanism */}
          <div className="lg:col-span-7 bg-[#073B32]/40 p-8 sm:p-10 rounded-3xl border border-[#B7E4D5]/20 shadow-[0_15px_40px_rgba(3,23,20,0.4)]">
            <div className="border-b border-[#B7E4D5]/15 pb-4 mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
                Engagement Scope Generator
              </span>
              <span className="text-[11px] font-mono text-[#8DA99E]">
                Direct Email Channel
              </span>
            </div>

            {errorMsg && (
              <div className="p-4 mb-6 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                <span>{errorMsg}</span>
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
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                    Organization / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Apex Global Corp"
                    className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. elena@apexcorp.com"
                    className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                    Capability Area *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl px-4 py-3 text-sm text-[#F4F2EA] focus:outline-none focus:border-[#2FA885]"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.code} — {s.title}
                      </option>
                    ))}
                    <option value="custom-inquiry">Custom Research Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                    Target Entity / Domain
                  </label>
                  <input
                    type="text"
                    value={formData.targetEntity}
                    onChange={(e) => setFormData({ ...formData, targetEntity: e.target.value })}
                    placeholder="e.g. targetdomain.com or Target Entity"
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
                    <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                    <option value="Standard (2-4 weeks)">Standard (2-4 weeks)</option>
                    <option value="Comprehensive (4-8 weeks)">Comprehensive (4-8 weeks)</option>
                    <option value="Ongoing Periodic Retainer">Ongoing Periodic Retainer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#C5D9D2]">
                  Specific Question or Research Objective *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  placeholder="Outline the commercial question, counterparty concern, or external threat indicator you require investigated..."
                  className="w-full bg-[#041F1B] border border-[#B7E4D5]/20 rounded-xl p-4 text-sm text-[#F4F2EA] placeholder-[#718E84] focus:outline-none focus:border-[#2FA885] resize-none"
                />
              </div>

              {/* Authorization Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.authorized}
                  onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded accent-[#2FA885]"
                />
                <span className="text-xs text-[#A1B8B0] leading-relaxed font-light">
                  I represent that I am authorized to request this research inquiry and that any supplied
                  parameters are lawful for passive open-source discovery.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#041F1B] bg-[#B7E4D5] hover:bg-[#C8EFE2] transition-all shadow-[0_2px_12px_rgba(47,168,133,0.25)]"
                >
                  <Send size={15} />
                  <span>Transmit Scoping Brief via Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-widest font-mono font-medium text-[#F4F2EA] bg-[#073B32] hover:bg-[#073B32]/80 border border-[#B7E4D5]/20 transition-all"
                >
                  {copied ? <Check size={15} className="text-[#2FA885]" /> : <Copy size={15} />}
                  <span>{copied ? "Copied Brief!" : "Copy Scoping Brief"}</span>
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#041F1B]/60 text-[11px] font-mono text-[#718E84] leading-relaxed">
                Security Architecture Note: In accordance with our static architecture, client scoping data
                is never stored in a third-party web database. The form formats your inquiry and launches your
                secure email client directly to our verified analysts.
              </div>
            </form>
          </div>

          {/* Right Column: Verified Corporate Information & Transparency Disclosures */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#031714] border border-[#B7E4D5]/15 space-y-6">
              <h2 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                Verified Corporate Coordinates
              </h2>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8DA99E] block uppercase">Primary Inquiries:</span>
                    <a
                      href={`mailto:${companyData.contacts.corporateEmail}`}
                      className="text-[#F4F2EA] hover:text-[#B7E4D5] text-sm font-medium transition-colors"
                    >
                      {companyData.contacts.corporateEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8DA99E] block uppercase">Secondary Corporate:</span>
                    <a
                      href={`mailto:${companyData.contacts.alternativeEmail}`}
                      className="text-[#F4F2EA] hover:text-[#B7E4D5] text-sm font-medium transition-colors"
                    >
                      {companyData.contacts.alternativeEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8DA99E] block uppercase">Registered Operations:</span>
                    <span className="text-[#C5D9D2] leading-relaxed block">
                      {companyData.registration.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck size={16} className="text-[#2FA885] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8DA99E] block uppercase">Enterprise Status:</span>
                    <span className="text-[#2FA885]">Registered Micro Enterprise</span>
                    <span className="text-[#718E84] block text-[10px]">
                      Ministry of MSME, Government of India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect with Agletras */}
            <div className="p-8 rounded-3xl bg-[#031714] border border-[#B7E4D5]/15 space-y-4">
              <div className="flex items-center justify-between border-b border-[#073B32] pb-3">
                <h3 className="text-base font-editorial font-semibold text-[#F4F2EA]">
                  Connect with Agletras
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8DA99E]">
                  Official Links
                </span>
              </div>
              <p className="text-xs text-[#A1B8B0] font-light leading-relaxed">
                Explore our official developer repositories on GitHub and follow executive intelligence briefs on LinkedIn.
              </p>
              <SocialLinks variant="cards" />
            </div>

            {/* Mandatory Discrepancy Transparency Box */}
            <div className="p-6 rounded-2xl bg-[#073B32]/30 border border-[#B7E4D5]/20 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B7E4D5] font-semibold">
                <AlertTriangle size={15} className="text-[#2FA885]" />
                <span>Contact Record Transparency</span>
              </div>
              <p className="text-xs text-[#A1B8B0] leading-relaxed font-light">
                To maintain full transparency: While prospective client engagements are coordinated via
                our primary domain email (<span className="text-[#F4F2EA]">{companyData.contacts.corporateEmail}</span>),
                our official statutory enterprise filing records the administrative filing address
                (<span className="text-[#F4F2EA]">{companyData.contacts.registeredOwnerEmail}</span>). Both are
                verified channels corresponding to the same enterprise entity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
