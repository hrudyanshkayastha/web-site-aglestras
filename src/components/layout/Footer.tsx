import Link from "next/link";
import Image from "next/image";
import { Mail, ShieldCheck, ArrowUpRight, MapPin } from "lucide-react";
import { companyData } from "@/data/company";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-[#031714] text-[#C5D9D2] border-t border-[#B7E4D5]/15 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle organic watermark in background */}
      <div className="absolute right-[-80px] bottom-[-80px] w-96 h-96 opacity-[0.04] pointer-events-none select-none">
        <Image
          src="/logo.png"
          alt=""
          width={400}
          height={400}
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#073B32]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#0a4237] to-[#041F1B] p-1.5 border border-[#B7E4D5]/40 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(183,228,213,0.3)] flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Agletras Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain filter contrast-125"
                />
              </div>
              <span className="font-editorial text-2xl font-semibold tracking-wider text-[#F4F2EA]">
                AGLETRAS
              </span>
            </Link>

            <p className="text-sm text-[#A1B8B0] leading-relaxed max-w-md font-light">
              Research Intelligence — from business questions to evidence-backed decisions.
              We transform fragmented open information into structured, traceable, decision-ready intelligence.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs font-mono text-[#8DA99E]">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#2FA885]" />
                <a
                  href={`mailto:${companyData.contacts.corporateEmail}`}
                  className="hover:text-[#B7E4D5] transition-colors"
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
                <span>Lawful Open-Source Intelligence</span>
              </div>
            </div>

            {/* Official Social & Developer Channels */}
            <div className="pt-3">
              <span className="block text-[11px] font-mono uppercase tracking-widest text-[#8DA99E] mb-3">
                Connect With Agletras
              </span>
              <SocialLinks variant="icon-buttons" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 lg:col-start-7 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-[#FFFFFF] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[#FFFFFF] transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/services#solutions" className="hover:text-[#FFFFFF] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-[#FFFFFF] transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFFFFF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/research#insights" className="hover:text-[#FFFFFF] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFFFFF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/osint-investigative-research"
                  className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between"
                >
                  <span>OSINT Investigation</span>
                </Link>
              </li>
              <li>
                <Link href="/services/business-due-diligence" className="hover:text-[#FFFFFF] transition-colors">
                  Business Due Diligence
                </Link>
              </li>
              <li>
                <Link href="/services/recruitment-verification" className="hover:text-[#FFFFFF] transition-colors">
                  Recruitment Verification
                </Link>
              </li>
              <li>
                <Link href="/services/brand-impersonation-research" className="hover:text-[#FFFFFF] transition-colors">
                  Brand Impersonation & Scam Research
                </Link>
              </li>
              <li>
                <Link href="/services/external-threat-intelligence" className="hover:text-[#FFFFFF] transition-colors">
                  Cyber Threat Intelligence
                </Link>
              </li>
              <li>
                <Link href="/services/research-automation" className="hover:text-[#FFFFFF] transition-colors">
                  Research Automation & Pipelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
              Governance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-[#FFFFFF] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/terms#ethical-charter" className="hover:text-[#FFFFFF] transition-colors">
                  Ethical OSINT Charter
                </Link>
              </li>
              <li>
                <Link href="/terms#privacy" className="hover:text-[#FFFFFF] transition-colors">
                  Privacy & Data Scope
                </Link>
              </li>
              <li>
                <Link href="/terms#limitations" className="hover:text-[#FFFFFF] transition-colors">
                  Scope Disclaimers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#749187] gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} AGLETRAS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Evidence-First Intelligence</span>
            <span>•</span>
            <span>Strictly Lawful Public Sources</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
