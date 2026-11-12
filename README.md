# Infinity Real Estate: concept site

Front-end-only concept site for **Infinity Real Estate / Infinity Realty (NV)**, a boutique brokerage serving Pennsylvania, Illinois, Nevada and Maryland since 1994. Built by Lee Enterprises Unlimited as a spec demo.

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Framer Motion only for the Agent Match reflow. No backend, no database, no API keys.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start   # production build
```

## Demo and live mode

| Variable | Default | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` | `demo`: `noindex, nofollow`, empty sitemap, concept footer line. `live`: `index, follow`, sitemap in robots.txt, no concept line. |
| `NEXT_PUBLIC_SITE_URL` | Vercel production URL, else `http://localhost:3000` | Base for canonicals, OG URLs, sitemap and JSON-LD. |

The deployed demo stays in demo mode. See `SEO-LAUNCH.md` for launch day.

## Where things live

- `lib/business.ts` business facts, `lib/agents.ts` roster and bios, `lib/markets.ts` markets, `lib/states.ts` state outlines (generated), `lib/faq.ts`, `lib/schema.ts` JSON-LD.
- `components/sections/*` one file per section; `components/AgentMatch/*`, `components/MovePlanner/*`, `components/InfinityMark.tsx`, `components/RooflineFrame.tsx`.
- `scripts/` asset pipeline: `optimize-images.mjs` (sharp, raw photos to webp), `build-states.mjs` (us-atlas outlines), `build-contours.mjs` (contour texture), `build-og.cjs` (link preview image, Playwright), `build-llms.mjs` (`public/llms.txt`).
- `docs/screenshots/` desktop and mobile captures for the pitch.

Search the code for `DRAFT`, `TODO` and `Sample` for everything the owner still needs to confirm.

## Deploy

Import the repo in Vercel as its own project (framework preset: Next.js). No environment variables are needed for the demo.
