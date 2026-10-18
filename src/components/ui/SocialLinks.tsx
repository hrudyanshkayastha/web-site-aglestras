import React from "react";
import { ArrowUpRight } from "lucide-react";

export const officialSocialLinks = [
  {
    name: "GitHub",
    label: "Agletras on GitHub",
    href: "https://github.com/Agletras",
    description: "Open-source research tooling and automated pipeline repositories.",
  },
  {
    name: "LinkedIn",
    label: "Agletras on LinkedIn",
    href: "https://www.linkedin.com/company/agletras/",
    description: "Company intelligence updates, executive briefings, and methodology articles.",
  },
];

export function GitHubIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface SocialLinksProps {
  variant?: "icon-buttons" | "cards";
  className?: string;
}

export function SocialLinks({ variant = "icon-buttons", className = "" }: SocialLinksProps) {
  if (variant === "cards") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 ${className}`}>
        {officialSocialLinks.map((item) => {
          const isGitHub = item.name === "GitHub";
          const Icon = isGitHub ? GitHubIcon : LinkedInIcon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="group p-4 rounded-2xl bg-[#041F1B] border border-[#B7E4D5]/20 hover:border-[#2FA885]/50 hover:bg-[#073B32]/40 transition-all flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FA885]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#073B32] border border-[#B7E4D5]/20 flex items-center justify-center text-[#B7E4D5] group-hover:text-[#FFFFFF] group-hover:scale-105 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#8DA99E] group-hover:text-[#B7E4D5] transition-colors">
                  <span>Visit</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F4F2EA] group-hover:text-[#B7E4D5] transition-colors">
                  {item.label}
                </h4>
                <p className="text-[11px] text-[#A1B8B0] font-light leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {officialSocialLinks.map((item) => {
        const isGitHub = item.name === "GitHub";
        const Icon = isGitHub ? GitHubIcon : LinkedInIcon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-10 h-10 rounded-full border border-[#B7E4D5]/20 bg-[#073B32]/40 flex items-center justify-center text-[#C5D9D2] hover:text-[#FFFFFF] hover:border-[#2FA885]/50 hover:bg-[#073B32] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FA885]"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
