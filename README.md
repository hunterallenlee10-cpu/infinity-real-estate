# Infinity Real Estate: concept site

Front-end-only concept site for **Infinity Real Estate / Infinity Realty (NV)**, a boutique brokerage serving Pennsylvania, Illinois, Nevada and Maryland since 1994. Built by Lee Enterprises Unlimited as a spec demo.

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. The `motion` library is used only for the Agent Match reflow. No backend, no database, no API keys.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start   # production build
npm run verify         # lint, build and the content checks
```

## Demo and live mode

| Variable | Default | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` | `demo`: `noindex, nofollow` tag and `X-Robots-Tag` header, empty sitemap, no `llms.txt`, AI crawlers disallowed, concept footer line. `live`: `index, follow`, sitemap, `llms.txt`, no concept line. |
| `NEXT_PUBLIC_SITE_URL` | Vercel production URL, else `http://localhost:3000` | Base for canonicals, OG URLs, sitemap and JSON-LD. |

The deployed demo stays in demo mode. See `SEO-LAUNCH.md` for launch day.

## Pages

Home, `/agents`, a page per agent with a published bio, `/markets` and a page per state, `/buy`, `/sell`, `/search`, `/about` and `/contact`. The brief is `BUILD-SPEC.md` and the competitor research is `docs/benchmark.md`.

## Where things live

- `lib/business.ts` business facts, `lib/agents.ts` roster and bios, `lib/markets.ts` markets, `lib/services.ts` who-to-ask lists, `lib/faq.ts`, `lib/schema.ts` JSON-LD, `lib/states.ts` state outlines (generated).
- `components/sections/*` home page sections; `components/AgentMatch/*`, `components/MovePlanner/*`, `components/PageHero.tsx`, `components/AgentRow.tsx`, `components/AgentCard.tsx`, `components/ServicePage.tsx`.
- `scripts/` asset pipeline and `check.mjs` (`npm run check`).
- `docs/screenshots/` desktop and mobile captures for the pitch.

Search the code for `DRAFT`, `TODO` and `Sample` for everything the owner still needs to confirm.

## Deploy

Live demo: https://infinity-real-estate-six.vercel.app (Vercel project `infinity-real-estate`, team `leu`).

- `main` is the production branch. Every merge to `main` builds and goes live automatically.
- Other branches and pull requests get preview deployments. Preview URLs are behind Vercel login (team default); the production URL is public.
- No environment variables are needed for the demo. For launch, see `SEO-LAUNCH.md`.
