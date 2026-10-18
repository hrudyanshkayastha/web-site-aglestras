# AGLETRAS — Nature-Inspired Research Intelligence Website

[![Production Build Status](https://img.shields.io/badge/Build-Passing-2FA885.svg)](#local-development)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.3_App_Router-041F1B.svg)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-073B32.svg)](https://tailwindcss.com)
[![Static Export](https://img.shields.io/badge/Export-Pure_HTML%2FCSS-B7E4D5.svg)](#deployment)

A completely new, independent, production-grade website for **AGLETRAS**, an evidence-first research intelligence company.

This project was built from scratch in an isolated directory (`agletras-new-website`), leaving the original repository (`Agletras.github.io`) entirely untouched.

---

## 1. Brand Identity & The Living Knowledge System

Agletras's visual identity is built around the **original Agletras living tree/leaf logo**:

- **Visual Metaphor**: Root systems ground in lawful public records, passive DNS telemetry, and official registries. The trunk and stem nexus filter and correlate signals. The expansive canopy branches into structured, decision-ready intelligence dossiers.
- **Botanical Geometry**: Clean editorial typography (Newsreader serif and Inter sans) paired with custom organic vein and node SVG motifs.
- **Natural Color Palette**:
  - **Forest Green** (`#073B32`): Depth and analytical rigor
  - **Midnight Pine** (`#041F1B`): Foundation and high-contrast dark surfaces
  - **Warm Ivory & Soft White** (`#F4F2EA`, `#FCFCF8`): Clean, editorial rhythm for analysis sections
  - **Muted Mint & Sage** (`#B7E4D5`, `#8DA99E`): Natural secondary accents
  - **Restrained Emerald** (`#2FA885`): Verified signal highlights and callouts

---

## 2. Core Capabilities & Service Portfolio

| Service Code | Capability Title | Primary Objective | Key Output |
| :--- | :--- | :--- | :--- |
| **AGL-ETI** | **External Threat Intelligence** *(Priority)* | Detect external lookalike domains, spoofed assets, open exposure, and threat actor staging. | Executive Threat Brief & IoC Dossier |
| **AGL-BDD** | **Business Due Diligence** | Investigate corporate entity filings, officer affiliations, litigation indicators, and risk markers. | Due Diligence Investigation Report |
| **AGL-RVR** | **Recruitment Verification** | Cross-reference public role claims, academic records, and technical code portfolios. | Candidate Verification Summary |
| **AGL-BIR** | **Brand Impersonation & Scam Research** | Uncover deceptive lookalike domains, fake social profiles, and fraudulent phishing portals. | Takedown Evidence Package |
| **AGL-RAP** | **Research Automation Pipelines** | Engineer automated collection scripts, normalization engines, and reporting pipelines. | Custom Pipeline & Technical Documentation |
| **AGL-OIR** | **OSINT Investigative Research** | Hypothesis-driven deep investigations into opaque corporate and security questions. | Comprehensive Intelligence Dossier |

---

## 3. Epistemic Architecture & Evidence Standards

Agletras classifies all research findings into 5 distinct epistemic tiers:

1. **FACT**: Directly corroborated by primary public filings or official registries (95–100% confidence).
2. **INDICATOR**: An observable technical or behavioral signal with contextual relevance (80–90% confidence).
3. **INFERENCE**: A logical deduction drawn from correlated indicators and verified facts (60–80% confidence).
4. **ASSUMPTION**: An explicitly declared hypothesis required for analysis, pending validation.
5. **UNRESOLVED**: An identified knowledge gap or investigative boundary that cannot be resolved within public boundaries.

---

## 4. Local Development

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Setup Instructions

1. Clone or navigate to the project directory:
   ```bash
   cd agletras-new-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Production Build & Static Export

To create an optimized, static production build:

```bash
npm run build
```

This generates purely static HTML, CSS, JavaScript, and assets in the `out/` directory:
- `out/index.html` (Homepage)
- `out/about/index.html` (About Agletras & Statutory Filing)
- `out/services/index.html` (Capabilities & Scope)
- `out/methodology/index.html` (Methodology & Epistemic Standards)
- `out/research/index.html` (Research Domains)
- `out/contact/index.html` (Interactive Scoping Brief & Intake)
- `out/terms/index.html` (Terms of Engagement & Ethical Charter)
- `out/robots.txt` & `out/sitemap.xml`

---

## 6. Deployment Guide

Because the website compiles to pure static HTML (`output: 'export'` with `trailingSlash: true`), it can be hosted on any static hosting platform:

### Cloudflare Pages
1. Create a project in Cloudflare Pages connected to your repository.
2. Build command: `npm run build`
3. Build output directory: `out`
4. Root directory: `.`

### GitHub Pages
1. Push `out/` to the `gh-pages` branch, or configure GitHub Actions to deploy static pages from `out`.

### Vercel / Netlify
- Build command: `npm run build`
- Publish directory: `out`

---

## 7. Credibility & Verification Audit

- **No Fabricated Data**: Zero simulated clients, fake customer logos, fabricated testimonials, or unverified statistics (e.g. lab counts).
- **Statutory Transparency**: Agletras is documented as an enterprise registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India, incorporated on August 1, 2026 in Nashik, Maharashtra, India.
- **Contact Transparency**: Business inquiries are routed through verified domain emails (`contact@agletras.com` / `hello@agletras.com`), while the administrative filing email from the government certificate (`pranavbpawar13@gmail.com`) is disclosed openly.
- **Truthful Intake Form**: The contact form does not pretend to hit a non-existent database or use a fake success timer. Instead, it validates required fields, formats a structured scoping brief, and launches direct business email channels or copies the formatted brief.
- **Repository Isolation**: The reference repository `Agletras.github.io` remains 100% clean and untouched.

---

## 8. License

Copyright © 2026 AGLETRAS. All rights reserved.
