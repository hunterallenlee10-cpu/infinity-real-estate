# Infinity Real Estate: build spec (version 2, 15 November 2026)

Concept site for Infinity Real Estate / Infinity Realty (NV). This file is the brief the build follows. Facts live in `lib/`. Research lives in `docs/benchmark.md`.

## The one goal

Every page leads to **Match Me With an Agent**, which opens the Move Planner. Real estate is a considered decision, so the planner is the primary action, with call and text visible beside it on every page (the sticky bar on phones, the header on desktop, each agent's own number on their card).

## Site shape: full multi-page site, 24 pages

Reason: every ranked brokerage in the four markets has agents, area pages, buy, sell, search and about as separate pages, and Infinity has real material for each: 11 published bios, four distinct markets and a published service-area line for each.

| Page | Job | Search phrase |
|---|---|---|
| `/` | Win the first five seconds, then route people to a person | real estate agents in PA, IL, NV and MD |
| `/agents` | The filterable roster (state, need, language) | Infinity Real Estate agents |
| `/agents/[slug]` x11 | One person, in their own words, with direct contact | {name}, {state} real estate agent |
| `/markets` | Hub for the four markets | where Infinity works |
| `/markets/[state]` x4 | Local front door: that state's agents, areas and search | Las Vegas and Henderson real estate agents, etc. |
| `/buy`, `/sell` | Who to ask for, by need, from the agents' own bios | buyer's agents / listing agents in PA, IL, NV and MD |
| `/search` | Live MLS search by state | homes for sale in NV, IL, PA and MD |
| `/about` | Since 1994, values, licence, referral partner | about Infinity Real Estate |
| `/contact` | Main line, inline planner, every agent's number | contact Infinity Real Estate |

Rules applied: one template per page type, driven by `lib/`. No page for agents without a published bio (Johnathan, Brittany): their cards carry a call link. No blog and no home valuation form: there are no real articles, and one goal per site. No town-by-service grid.

## What the best sites in this niche do (patterns, in our words)

1. One typographic idea about the firm, not a house photo. Ours: the roofline from their logo.
2. One neutral, one brand colour, and a tiny accent kept for "act here".
3. A display face over a plain sans. Phone headlines of 40 to 50px with tight leading.
4. What plus where in every title tag and h1.
5. Proof with a source and a date, never a wall of undated first-name quotes.
6. A phone button and a sticky bar on phones.
7. Area pages that lead with the people who work there.

Dated patterns we avoid: drone or stock-house video heroes, count-up statistics, an all-caps label over the headline, hamburger-only desktop navigation, sign-up walls, chat bubbles and pop-ups on first paint, preloaders and scroll hijacking.

## Where every benchmark is weak, and what this site does about it

| Their weakness | This site |
|---|---|
| No way to choose an agent by need, area or language | Agent Match on the home page and on `/agents` |
| Agent pages thin and uneven; name-only title tags | A page per published bio, in their own words, with place in the title, areas, languages and direct contact |
| Agents and areas never linked to each other | Every market page lists its agents; every agent page links to its market |
| Phone number missing from the first phone screen | Call, Text and Find My Agent bar on every phone screen |
| 7MB to 111MB sent to phones | Static pages, sized images, two fonts, motion in two places |
| Lead capture before trust | The show-stopper is ungated; nothing asks for details before giving a result |
| No small firm presents distant regions as one brand | The Roofline Route through NV, IL, PA and MD, and a local front door for each |
| Reviews without source or date | No reviews shown until real ones arrive. When they do, each carries its month, year and source |

## Design: Ink and Contour

- Palette (tokens in `app/globals.css`, OKLCH with hex beside): Survey Paper `#f3f6f8` about 60%, Plat `#fbfcfd` and Infinity Ink `#0e0f10` about 30%, Roof Clay `#b5502f` about 10% and only on the route, active states and the best-match marker. Clay is the contour-line brown of a printed survey map and the roofline of their mark. Text `#16191b` (16.6:1 on paper), muted `#56636a` (5.8:1), clay (4.7:1), error `#a3312a` (6.6:1 on plat). No pure black or white.
- Type: Fraunces (display) and Jost (body). Seven clamp steps in the token block.
- Signature motion, home page only: the Roofline Route in the hero, and the Agent Match reflow. Everything else is hover, press and a CSS scroll reveal.
- Portraits: one roofline frame for every agent, never shown wider than the file's own width. Monogram cards for agents without a photo.

## Rules that never bend

- Real facts only. Nothing invented: no reviews, ratings, statistics, prices, awards or addresses.
- No stock or AI images. No house photos.
- No question or filter touches a protected class. Equal Housing Opportunity in the footer.
- No em dashes or double hyphens in copy.
- Demo mode is hidden from search by the page tag and by an `X-Robots-Tag` header on every response. One switch, `NEXT_PUBLIC_SITE_MODE`, controls it.

## Checks

`npm run verify` runs lint, a production build and `npm run check` (one h1 per page, unique titles and descriptions, no broken links, alt text and dimensions, every phone and email on the pages matches the facts files, no placeholder text, no draft content in live mode).
