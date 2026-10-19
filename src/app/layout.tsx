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
    default: "AGLETRAS — Researching Information. Engineering Intelligence.",
    template: "%s | AGLETRAS",
  },
  description:
    "Agletras researches public information, evaluates evidence, connects relevant findings, and delivers structured intelligence to help businesses make better-informed decisions.",
  metadataBase: new URL("https://agletras.com"),
  keywords: [
    "AGLETRAS",
    "Research Intelligence",
    "OSINT Investigation",
    "Business Due Diligence",
    "Recruitment Verification",
    "Brand Impersonation Research",
    "Cyber Threat Intelligence",
    "Research Automation",
    "Evidence-Backed Intelligence",
  ],
  authors: [{ name: "Agletras Research Team" }],
  openGraph: {
    title: "AGLETRAS — Researching Information. Engineering Intelligence.",
    description:
      "Agletras researches public information, evaluates evidence, connects relevant findings, and delivers structured intelligence to help businesses make better-informed decisions.",
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
      "https://www.linkedin.com/company/agletras/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#030d0a] text-[#f4f2ea]"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
