import { Shield, Briefcase, Building2, Compass, Users2, Globe2 } from "lucide-react";

const audiences = [
  {
    icon: Shield,
    title: "Security & IT Operations",
    objective: "Identify external digital exposure, lookalike domains, credential leaks, and adversary staging.",
  },
  {
    icon: Briefcase,
    title: "Founders & Business Leaders",
    objective: "Vet strategic partners, evaluate acquisition candidates, and protect enterprise brand reputation.",
  },
  {
    icon: Building2,
    title: "Procurement & Vendor-Risk",
    objective: "Uncover undisclosed corporate affiliations, litigation markers, and third-party vendor risks.",
  },
  {
    icon: Compass,
    title: "Corporate Strategy & Research",
    objective: "Map emerging competitor positioning, market entry risks, and complex supply-chain dynamics.",
  },
  {
    icon: Users2,
    title: "Authorized Talent & Executive HR",
    objective: "Verify public role claims, educational credentials, and technical portfolios for key hires.",
  },
  {
    icon: Globe2,
    title: "Organizations Assessing Counterparties",
    objective: "Conduct structured, scope-controlled OSINT investigations into specific corporate questions.",
  },
];

export function AudienceSection() {
  return (
    <section className="py-24 md:py-32 bg-[#041F1B] text-[#F4F2EA] relative overflow-hidden border-t border-[#B7E4D5]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B7E4D5] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA885]" />
            <span>Target Stakeholders</span>
          </div>
          <h2 className="text-editorial-title text-[#F4F2EA]">
            Who We Work With.{" "}
            <span className="italic font-normal text-[#B7E4D5]">
              Decisions With Grounded Clarity.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#C5D9D2] font-light leading-relaxed">
            Our research briefs support decision-makers who require factual, evidence-based verification
            before committing capital, expanding perimeters, or initiating partnerships.
          </p>
        </div>

        {/* 6 Audience Cards (Strictly No Fake Logos or Unverified Client Counts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud, index) => {
            const Icon = aud.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#073B32]/35 border border-[#B7E4D5]/15 hover:border-[#2FA885]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#2FA885]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-editorial font-semibold text-[#F4F2EA]">
                    {aud.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1B8B0] leading-relaxed font-light">
                    {aud.objective}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#B7E4D5]/10 text-[11px] font-mono text-[#8DA99E]">
                  Scope-Controlled Engagement
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
