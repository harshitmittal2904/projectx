# SchemeWise — AI Advisor for Indian Government Savings Schemes

India has some of the best government savings schemes in the world — NPS, PPF, EPF, Sukanya Samriddhi, SCSS, and more. Over 18 lakh crore sits in these accounts. But information is scattered across outdated portals, withdrawal rules contradict each other, and tax implications change based on your regime. SchemeWise is the layer that makes them actually understandable.

**Live:** [schemewise-one.vercel.app](https://schemewise-one.vercel.app)
**Portfolio:** [harshitmittal.dev/projects/schemewise](https://harshitmittal2904.github.io/portfolio/projects/schemewise)

---

## The Problem

Groww does mutual funds. Zerodha does stocks. ClearTax does ITR. Nobody does government schemes. Information is fragmented across EPFO, PFRDA, India Post, and NSDL portals. Withdrawal rules contradict each other. Tax implications change based on old vs new regime. First-time investors are overwhelmed.

## What SchemeWise Does

SchemeWise is a free, AI-powered web app that answers any question about any Indian government investment scheme — in plain, simple language. It doesn't invest your money. It makes sure you understand what you're investing in. Free, no signup, in plain English and Hindi.

---

## Schemes Covered (11)

NPS, PPF, EPF, SSY (Sukanya Samriddhi), SCSS, APY (Atal Pension), NSC, SGB (Sovereign Gold Bonds), KVP, POMIS, NPS Vatsalya

## Features (11 Pages)

| Page | What It Does |
|------|-------------|
| **Dashboard** | At-a-glance view with current rates, quick actions, trending questions |
| **AI Chat** | Ask any question about any scheme — powered by Claude Sonnet with SSE streaming |
| **Scheme Explorer** | Browse all schemes with filterable card grid |
| **Scheme Detail** | 5-tab deep dive: Overview, How to Open, Tax, Withdrawal, FAQs |
| **Compare** | Side-by-side comparison of up to 4 schemes |
| **Calculators** | PPF, NPS, EPF, Tax Savings calculators with interactive charts |
| **Eligibility Quiz** | Answer questions to find which schemes you qualify for |
| **Withdrawal Guides** | Step-by-step guides with checklists, pro tips, rejection warnings |
| **Troubleshoot** | UAN, PRAN, KYC mismatch, claim rejection resolution guides |
| **Document Checklists** | Interactive checklists with progress tracking |
| **Glossary** | 50+ financial terms in plain English with Hindi translations |

---

## AI Architecture

- **Primary:** Claude Sonnet API with SSE streaming for real-time responses
- **Fallback:** Keyword-matching system ensures users always get useful answers, even when the API is down
- **System prompt:** Auto-generated from scheme data — single source of truth
- **Recommendation engine:** Scoring algorithm for personalized scheme rankings based on age, employment, risk, and goals

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| AI | Claude Sonnet API (SSE streaming) |
| Charts | Recharts |
| Icons | Lucide React |
| Deploy | Vercel |
| Fonts | Plus Jakarta Sans, Source Sans 3 |

## Architecture

```
src/
  pages/          Dashboard, Chat, Schemes, SchemeDetail, Compare, Calculators,
                  Troubleshoot, Eligibility, Glossary, Documents, WithdrawalGuides
  components/     calculators/, chat/, compare/, layout/, shared/
  data/           schemes.ts (single source of truth), quiz-questions, withdrawal-guides,
                  troubleshoot-guides, portal-links, suggested-questions
  hooks/          useChat, useTheme
  lib/            chat-api, fallback-answers, system-prompt, calculator-utils, theme
  types/          scheme, chat, quiz, calculator
```

## Design System

- **Colors:** Navy #1B2A4A (primary), Saffron #F59E0B (accent), Cream #FFF8F0 (background)
- **Dark mode:** Full support via Tailwind class strategy
- **Cultural theming:** Hindi scheme names, Indian numbering (lakhs/crores), Rangoli patterns, Ashoka Chakra spinner

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

```
ANTHROPIC_API_KEY=your_claude_api_key
```

## Current Interest Rates

| Scheme | Rate |
|--------|------|
| PPF | 7.1% |
| EPF | 8.25% |
| SSY | 8.2% |
| SCSS | 8.2% |
| NSC | 7.7% |
| KVP | 7.5% |
| POMIS | 7.4% |

---

Built by [Harshit Mittal](https://linkedin.com/in/harshitmittal2904)
