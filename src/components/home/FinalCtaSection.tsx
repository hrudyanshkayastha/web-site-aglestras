"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Check, 
  Copy, 
  ArrowUpRight, 
  ShieldCheck, 
  Send,
  Building,
  Sparkles
} from "lucide-react";
import { companyData } from "@/data/company";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FinalCtaSection() {
  const [serviceType, setServiceType] = useState("Competitor Intelligence Report [AGL-CIR]");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [targetEntity, setTargetEntity] = useState("");
  const [researchQuestion, setResearchQuestion] = useState("");
  const [copied, setCopied] = useState(false);

  const generateBriefText = () => {
    return `=== AGLETRAS RESEARCH SCOPE INQUIRY ===
Date: ${new Date().toISOString().split("T")[0]}
Service: ${serviceType}
Client Name: ${clientName || "[Your Name]"}
Business Email: ${clientEmail || "[Your Email]"}
Target Entity / Competitors: ${targetEntity || "[Named entities or competitors]"}
Core Inquiry Objective:
${researchQuestion || "[Specific questions you need answered]"}

Authorization Notice: I confirm this inquiry seeks lawful public-source information or authorized exterior discovery.
=========================================`;
  };

  const handleCopy = () => {
    const brief = generateBriefText();
    navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailto = (e: React.FormEvent) => {
    e.preventDefault();
    const brief = generateBriefText();
    const subject = encodeURIComponent(`Research Inquiry: ${serviceType} - ${targetEntity || "New Scope"}`);
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:${companyData.contacts.corporateEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#030d0a] text-[#f4f2ea] relative overflow-hidden border-t border-[#34d399]/25">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#2fa885]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#073b32]/90 border border-[#34d399]/40 text-xs font-mono text-[#34d399] tracking-wider shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span>SECTION 08 // ENGAGEMENT INITIATION</span>
          </div>

          <h2 className="text-editorial-hero text-[#f4f2ea] tracking-tight">
            Let&apos;s Define{" "}
            <span className="italic font-normal text-[#34d399]">
              the Question.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#cbd5d1] font-light leading-relaxed">
            Every engagement begins with an empirical scope definition.
            Tell us what you need to understand, verify, or investigate.
          </p>
        </div>

        {/* Dual Column Layout: Formulator on Left, Verified Contact Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Scope Formulator */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#06241c] via-[#041a15] to-[#03130f] border border-[#34d399]/35 shadow-[0_20px_50px_rgba(2,15,11,0.7)] space-y-6">
            <div className="border-b border-[#34d399]/20 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#34d399] font-semibold block mb-1">
                Structured Scope Formulator
              </span>
              <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                Draft Your Inquiry Brief
              </h3>
              <p className="text-xs text-[#a1b8b0] mt-1 font-light">
                Fill in your parameters below to generate an unencrypted, structured research brief sent directly via your email client.
              </p>
            </div>

            <form onSubmit={handleMailto} className="space-y-4">
              {/* Service Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#b7e4d5] block">
                  Select Service of Interest *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#03110e] border border-[#34d399]/30 text-xs sm:text-sm text-[#f4f2ea] focus:outline-none focus:border-[#34d399]"
                >
                  <option value="Competitor Intelligence Report [AGL-CIR]">
                    Competitor Intelligence Report (3 to 5 Competitors)
                  </option>
                  <option value="OSINT Investigation [AGL-OIR]">
                    OSINT Investigation (Targeted Entity & Public Records)
                  </option>
                  <option value="Business Due Diligence [AGL-BDD]">
                    Business Due Diligence (Corporate Filings & Risk)
                  </option>
                  <option value="Recruitment Verification [AGL-RVR]">
                    Recruitment Verification (Authorized Scope)
                  </option>
                  <option value="Brand Impersonation & Scam Research [AGL-BIR]">
                    Brand Impersonation & Scam Research
                  </option>
                  <option value="Cyber Threat Intelligence [AGL-ETI]">
                    Cyber Threat Intelligence (Exterior Discovery)
                  </option>
                  <option value="Research Automation & Pipelines [AGL-RAP]">
                    Research Automation & Pipelines
                  </option>
                </select>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#b7e4d5] block">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni / Nexus Consulting"
                    className="w-full px-4 py-3 rounded-xl bg-[#03110e] border border-[#34d399]/30 text-xs sm:text-sm text-[#f4f2ea] focus:outline-none focus:border-[#34d399] placeholder:text-[#5a7d71]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#b7e4d5] block">
                    Business Email
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. ramesh@nexusagency.in"
                    className="w-full px-4 py-3 rounded-xl bg-[#03110e] border border-[#34d399]/30 text-xs sm:text-sm text-[#f4f2ea] focus:outline-none focus:border-[#34d399] placeholder:text-[#5a7d71]"
                  />
                </div>
              </div>

              {/* Target Entity / Competitors */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#b7e4d5] block">
                  Target Competitors or Entities of Concern
                </label>
                <input
                  type="text"
                  value={targetEntity}
                  onChange={(e) => setTargetEntity(e.target.value)}
                  placeholder="e.g. Competitor A, Competitor B, or Target Company Name"
                  className="w-full px-4 py-3 rounded-xl bg-[#03110e] border border-[#34d399]/30 text-xs sm:text-sm text-[#f4f2ea] focus:outline-none focus:border-[#34d399] placeholder:text-[#5a7d71]"
                />
              </div>

              {/* Specific Inquiry Objectives */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#b7e4d5] block">
                  What Specific Questions Do You Need Answered?
                </label>
                <textarea
                  rows={3}
                  value={researchQuestion}
                  onChange={(e) => setResearchQuestion(e.target.value)}
                  placeholder="e.g. We need to understand their pricing structure, regional marketing footprint, and key supplier relationships."
                  className="w-full px-4 py-3 rounded-xl bg-[#03110e] border border-[#34d399]/30 text-xs sm:text-sm text-[#f4f2ea] focus:outline-none focus:border-[#34d399] placeholder:text-[#5a7d71]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full text-xs font-mono uppercase tracking-widest font-semibold text-[#041f1b] bg-[#34d399] hover:bg-[#b7e4d5] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#041f1b]/50"
                >
                  <Send size={14} />
                  <span>Open Formatted Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full text-xs font-mono uppercase tracking-widest text-[#f4f2ea] bg-[#073b32]/80 hover:bg-[#073b32] border border-[#34d399]/30 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={14} className="text-[#34d399]" /> : <Copy size={14} />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy Brief"}</span>
                </button>
              </div>

              <p className="text-[11px] font-mono text-[#8da99e] text-center pt-1">
                Zero spam. Brief opens directly in your email client addressed to <span className="text-[#34d399]">contact@agletras.com</span>.
              </p>
            </form>
          </div>

          {/* Right Column: Verified Contact Disclosures & Regional Operations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#031511]/95 border border-[#34d399]/25 shadow-xl space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#34d399] font-semibold block mb-1">
                  Verified Contact Channels
                </span>
                <h3 className="text-xl font-editorial font-semibold text-[#f4f2ea]">
                  Direct Enterprise Inquiries
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#041f1b] border border-[#34d399]/20">
                  <Mail size={16} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8da99e] block text-[10px]">PRIMARY INQUIRIES:</span>
                    <a
                      href={`mailto:${companyData.contacts.corporateEmail}`}
                      className="text-[#f4f2ea] hover:text-[#34d399] font-semibold text-sm transition-colors"
                    >
                      {companyData.contacts.corporateEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#041f1b] border border-[#34d399]/20">
                  <Mail size={16} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8da99e] block text-[10px]">ALTERNATIVE ROUTING:</span>
                    <a
                      href={`mailto:${companyData.contacts.alternativeEmail}`}
                      className="text-[#f4f2ea] hover:text-[#34d399] font-semibold text-sm transition-colors"
                    >
                      {companyData.contacts.alternativeEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#041f1b] border border-[#34d399]/20">
                  <MapPin size={16} className="text-[#34d399] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8da99e] block text-[10px]">OPERATIONAL HEADQUARTERS:</span>
                    <span className="text-[#f4f2ea] text-xs">
                      Nashik, Maharashtra, India, PIN 422003
                    </span>
                    <span className="text-[11px] text-[#8da99e] block mt-0.5">
                      Regional Advisory: Mumbai & Pune
                    </span>
                  </div>
                </div>
              </div>

              {/* Statutory Disclosure */}
              <div className="p-4 rounded-xl bg-[#073b32]/30 border border-[#34d399]/15 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8da99e] block">
                  Statutory Registration Disclosure
                </span>
                <p className="text-[11px] text-[#cbd5d1] leading-relaxed">
                  Registered Micro Enterprise (Services) under the Ministry of Micro, Small and Medium Enterprises, Government of India.
                  Official filing contact: <span className="text-[#34d399] font-mono">{companyData.contacts.registeredOwnerEmail}</span>.
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-[#34d399]/15 flex items-center justify-between">
                <span className="text-xs font-mono text-[#8da99e]">
                  Official Repositories:
                </span>
                <SocialLinks variant="icon-buttons" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
