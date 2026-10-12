import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AGLETRAS — Research Intelligence & External Threat OSINT",
    template: "%s | AGLETRAS",
  },
  description:
    "Agletras transforms fragmented open-source information into structured, evidence-backed decisions. Specializing in external cyber threat intelligence, digital attack-surface discovery, and business risk investigation.",
  metadataBase: new URL("https://agletras.com"),
  keywords: [
    "AGLETRAS",
    "Research Intelligence",
    "External Threat Intelligence",
    "OSINT",
    "Open-Source Intelligence",
    "Digital Attack Surface",
    "Brand Impersonation Research",
    "Business Due Diligence",
    "Cyber Threat Intelligence",
    "Evidence-Backed Intelligence",
  ],
  authors: [{ name: "Agletras Research Team" }],
  openGraph: {
    title: "AGLETRAS — Turn Information Into Intelligence",
    description:
      "Evidence-first research intelligence. Transforming fragmented public information into structured, traceable, decision-ready intelligence.",
    url: "https://agletras.com",
    siteName: "AGLETRAS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 600,
        alt: "Agletras Living Knowledge Tree Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGLETRAS — Turn Information Into Intelligence",
    description:
      "Evidence-first research intelligence from business questions to evidence-backed decisions.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AGLETRAS",
    legalName: "AGLETRAS",
    url: "https://agletras.com",
    logo: "https://agletras.com/logo.png",
    description:
      "Agletras is an evidence-first research intelligence initiative specializing in external cyber-threat OSINT, digital attack surface analysis, and structured intelligence reports.",
    email: "contact@agletras.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      postalCode: "422003",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Open-Source Intelligence (OSINT)",
      "External Cyber Threat Intelligence",
      "Brand Protection & Scam Research",
      "Business Due Diligence",
      "Information Correlation Systems",
    ],
    sameAs: [
      "https://github.com/Agletras",
      "https://www.linkedin.com/company/agletras/posts/?viewAsMember=true",
    ],
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#041F1B] text-[#F4F2EA]"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
