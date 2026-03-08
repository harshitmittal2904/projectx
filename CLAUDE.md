# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NidhiSetu ("Bridge to Wealth") — an AI-powered React web application that helps Indian citizens understand, invest in, and manage government savings/pension schemes (NPS, PPF, EPF, SSY, SCSS, APY, NSC, SGBs).

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript check + production build (`tsc -b && vite build`)
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

## Tech Stack

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, config in `src/index.css` using `@theme`)
- **Recharts** for interactive charts in calculators
- **react-router-dom** for client-side routing
- **react-markdown** for AI chat message rendering
- **lucide-react** for icons
- **Claude API** (Sonnet) for AI chat with SSE streaming

## Architecture

### Routing (`src/App.tsx`)
All routes wrapped in `<AppLayout>` (sidebar + mobile nav):
- `/` — Dashboard with quick actions, scheme rates, trending questions
- `/chat` — AI chat assistant (supports `?q=` param for pre-filled questions)
- `/schemes` — Filterable scheme card grid
- `/schemes/:schemeId` — Scheme detail with 5 tabs (Overview, How to Open, Tax, Withdrawal, FAQs)
- `/compare` — Side-by-side comparison table + "Which scheme is right for me?" quiz
- `/calculators` — Tabbed calculators (PPF, NPS, EPF, Tax Savings) with Recharts
- `/troubleshoot` — Issue categories → step-by-step resolution guides + escalation flowchart

### Data Architecture
- `src/data/schemes.ts` — **Single source of truth** for all 8 government schemes (rates, rules, eligibility, FAQs, withdrawal, tax). The AI system prompt is auto-generated from this data.
- `src/data/quiz-questions.ts` — Quiz flow questions + `getSchemeRecommendations()` scoring algorithm
- `src/data/troubleshoot-guides.ts` — Troubleshooting categories and step-by-step resolution data
- `src/data/portal-links.ts` — Official government portal URLs

### Calculator Logic
- `src/lib/calculator-utils.ts` — Pure functions: `calculatePPF()`, `calculateNPS()`, `calculateEPF()`, `calculateTaxSavings()`. All return `YearlyProjection[]` for chart rendering.

### AI Chat
- `src/lib/system-prompt.ts` — Builds system prompt dynamically from `schemes.ts` data + tax rules + behavioral guidelines
- `src/lib/chat-api.ts` — Claude API streaming via fetch + ReadableStream SSE parsing. Uses `anthropic-dangerous-direct-browser-access` header (MVP only; production needs backend proxy)
- `src/hooks/useChat.ts` — Chat state management with streaming response handling
- API key via `VITE_CLAUDE_API_KEY` env var

### Design System
Colors defined as CSS custom properties in `src/index.css` via `@theme`:
- Navy `#1B2A4A` (primary), Saffron `#F59E0B` (accent), Cream `#FFF8F0` (bg), Sage `#059669` (growth)
- Dark mode via Tailwind `class` strategy, toggled by `ThemeProvider`
- Fonts: Plus Jakarta Sans (headings), Source Sans 3 (body) — loaded from Google Fonts in `index.html`

### Key Patterns
- Theme context split: `src/lib/theme-context.ts` (context) + `src/lib/theme.tsx` (provider component) + `src/hooks/useTheme.ts` (hook) — required by react-refresh lint rule
- Path aliases: `@/` maps to `src/` (configured in `vite.config.ts` + `tsconfig.app.json`)
- Scheme data uses `SchemeId` union type for type-safe lookups
- Recharts Tooltip `formatter` requires `(value: number | undefined)` parameter type

## Environment Variables

Copy `.env.example` to `.env` and set:
```
VITE_CLAUDE_API_KEY=sk-ant-...
```

## Updating Scheme Data

When government rates change (quarterly), update the `interestRate.current` and `asOf` fields in `src/data/schemes.ts`. The AI system prompt, scheme cards, and comparison table all read from this single source.
