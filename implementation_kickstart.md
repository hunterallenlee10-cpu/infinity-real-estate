# Infinity Real Estate: implementation kickstart

Concept site for Infinity Real Estate / Infinity Realty (NV). Front end only. Built by Lee Enterprises Unlimited as a spec demo.

## Plan

One landing page plus `/contact`. Every action leads to **Match Me With an Agent** (opens the Move Planner). Calling or texting (888) 213-6110, or an agent's own cell, is the always-visible second path.

Design direction: **Ink and Contour**. Black ink, pale survey paper, fine topographic contour lines, the roofline from their own logo used as the portrait frame for every agent.

Stack: Next.js 16 (App Router, cache components) + TypeScript + Tailwind CSS 4. Framer Motion only for the Roofline Route and the Agent Match reflow. `lucide-react` icons. No backend.

### Assets
- Source: Google Drive `photos/` (13 files) downloaded to `public/images/raw/`.
- `scripts/optimize-images.mjs` converts every file to `.webp` in `public/images/` (logo kept as PNG too).
- No stock, no AI images, no house photos. Agents without a photo get a monogram card in the same roofline frame.

### Page order
1. Hero (split, Roofline Route, five-frame portrait cluster)
2. "We wear both hats." (Ink band)
3. Agent Match (two-column tool) + "Moving to the coast?" referral card
4. Markets (2x2 bento, drawn state outlines from `us-atlas`)
5. The team (tabs + bio drawer)
6. Search homes (IDX links)
7. Since 1994 (narrow timeline + values)
8. How it works
9. Sample reviews
10. FAQ
11. Final call to action (Ink)
12. Footer

## Design tokens

| Token | Value | Use |
|---|---|---|
| `paper` | `#F3F6F8` | Survey Paper, page background |
| `plat` | `#FFFFFF` | Plat White, cards, 1px `#D7DEE2` border |
| `rule` | `#D7DEE2` | Borders, dividers |
| `ink` | `#0E0F10` | Infinity Ink, primary button, wordmark, key numbers, active states |
| `slate` | `#9BA8AE` | Contour Slate. Lines, route, frame strokes only. Never text |
| `text` | `#16191B` | Body text |
| `muted` | `#56636A` | Muted text (AA on paper and white) |

- Ink band: `#0E0F10` background, `#F3F6F8` text, contour lines at 12% white.
- Fonts: Fraunces 500/600 (display, optical size on), Jost 400/500 (body, nav, buttons, small-caps labels).
- Radius 6px. Registration ticks: 6px L marks in Contour Slate just outside each card corner.
- 8px grid. Section padding 112 to 128px desktop, 72px mobile.
- Motion: Roofline Route (hero, ~1.2s once) and Agent Match reflow (250ms layout). Nothing else. `prefers-reduced-motion` respected.

## Build checklist

- [x] Phase 1: scaffold, design tokens, fonts, `<InfinityMark />`, `<RooflineFrame />` and monogram cards, contour SVG, nav, hero with the Roofline Route, footer
- [x] Phase 2: "both hats" band, Agent Match with `lib/agents.ts` complete, the Robin referral card
- [x] Phase 3: markets bento with state outlines (source cited), team grid with tabs and the bio drawer
- [x] Phase 4: search band, Since 1994 timeline, how it works, sample reviews, FAQ, final call to action
- [x] Phase 5: Move Planner modal, wiring with pre-selects, prefilled SMS, mobile sticky bar, `/contact` page
- [x] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD (validated), robots and sitemap, `llms.txt`, OG image, favicon, 404, image optimisation, `SEO-LAUNCH.md`
- [x] Phase 6b: Lighthouse on a production build, live and demo mode, mobile and desktop
- [x] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [x] Hero sells the job. Roofline Route plays once. Headline and primary button visible at 375px without scrolling.
- [x] Agent Match returns the right agents for every state and need, never empty, works with mouse, touch and keyboard.
- [x] No protected-class question or filter anywhere. Equal Housing Opportunity mark and text in the footer.
- [x] State outlines from public-domain data, cited.
- [x] Every Match button opens the planner with the right pre-selects. Every phone and text link is correct. Search links open the right IDX page.
- [x] Every "only this firm has" item is on the page.
- [x] Zero em dashes, zero double hyphens, zero stock or AI images, zero house photos, zero invented facts.
- [x] Sample reviews, roster, agent count, state timeline, licence disclosures labelled DRAFT or Sample.
- [x] 2 fonts, 3 colours plus text and contour line, motion in 2 places.
- [x] 375px: no overflow, burger works, sticky bar works, drawer and modal usable one-handed.
- [x] Footer on both pages; concept line in demo mode only. Demo serves noindex; live serves index, sitemap.
- [x] OG image and favicon are Infinity's.
- [x] Lighthouse SEO 100 live mode; others 90+. Demo mode only fails the indexing audit.
- [x] One h1 per page. Unique titles and descriptions. JSON-LD validates and claims nothing untrue.
