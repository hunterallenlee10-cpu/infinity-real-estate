# Infinity Real Estate concept site

Read `AGENTS.md` first: this Next.js version has breaking changes, and its docs are in `node_modules/next/dist/docs/`.

- Stack: Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4 (tokens in the `@theme` block of `app/globals.css`), `motion` (lazy, Agent Match only), `lucide-react`.
- Commands: `npm run dev`, `npm run build`, `npm run check` (after a build), `npm run verify` (lint, build, check).
- The brief is `BUILD-SPEC.md`. Re-read the matching part before changing a page type. Research is in `docs/benchmark.md`.
- Facts live in `lib/business.ts`, `lib/agents.ts`, `lib/markets.ts`, `lib/services.ts` and `lib/faq.ts`. Pages never hard-code a fact.
- Never invent a fact, review, rating, price or statistic. Never add stock or AI images. Never ask about or filter by a protected class.
- No em dashes or double hyphens in copy.
- Demo mode (default) must stay hidden from search. Live mode is `NEXT_PUBLIC_SITE_MODE=live` and fails `npm run check` while draft or placeholder content remains.
- `main` is production on Vercel. Work on a branch.
