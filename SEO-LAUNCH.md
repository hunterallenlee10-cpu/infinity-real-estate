# SEO launch checklist

The site ships in **demo mode** (noindex, no sitemap, concept footer line). Launch day switches it to **live mode**.

## 1. Flip the switch in Vercel
- [ ] Project Settings, Environment Variables (Production):
  - `NEXT_PUBLIC_SITE_MODE=live`
  - `NEXT_PUBLIC_SITE_URL=https://<real domain>` (no trailing slash)
- [ ] Redeploy (these are build-time variables; a redeploy is required).

## 2. Confirm on the live domain
- [ ] View source on `/` and `/contact`: `<meta name="robots" content="index, follow">`.
- [ ] Canonicals point at the real domain (`<link rel="canonical" href="https://<domain>/">`).
- [ ] `https://<domain>/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml`.
- [ ] `https://<domain>/sitemap.xml` lists every page with real last-modified dates (edit `app/sitemap.ts` when content changes).
- [ ] Response headers no longer carry `X-Robots-Tag: noindex`.
- [ ] The footer no longer shows "Concept preview by Lee Enterprises Unlimited."
- [ ] Paste both URLs into the Schema.org validator and Google's Rich Results Test. Fix any warnings.
- [ ] Share the URL in a private chat to check the link preview (`/og-image.png`).

## 3. Listings
- [ ] Embed the iHomefinder Kestrel widget on the new domain (search the `TODO at launch` comment in `lib/business.ts` and `components/SearchLinks.tsx`). Until then the Search buttons open the existing IDX pages on infinitypa.com.

## 4. Search engines and profiles
- [ ] Google Search Console: verify the domain, submit `sitemap.xml`, request indexing for `/` and `/contact`.
- [ ] Bing Webmaster Tools: import from Search Console or verify, then submit the sitemap.
- [ ] Link the site from each Google Business Profile (one per office or state, if they exist).

## 5. Redirects from the old WordPress site (301)
These are already built into `next.config.ts`, page by page, and take effect when the domain points here:

| Old URL | New URL |
|---|---|
| `/nevada/` | `/markets/nevada` |
| `/illinois/` | `/markets/illinois` |
| `/pennsylvania/` | `/markets/pennsylvania` |
| `/maryland/` | `/markets/maryland` |
| `/about-us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/service-locations/` | `/markets` |
| `/real-estate-search/` and the three state search pages | `/search` |

- [ ] The old site has a Privacy Policy page. Add one here before launch and redirect `/privacy-policy/` to it.
- [ ] Once the Kestrel widget is embedded, point each state search redirect at that state's search.

## 5b. Listings and profiles
- [ ] The Google Business Profile should link to the home page. If a profile exists per state, link each to its market page (`/markets/nevada` and so on).
- [ ] Update the name, phone and web address on Google Business Profile, Apple Business, Bing Places, Yelp, the BBB, Zillow and Realtor.com agent profiles, and each state association directory.
- [ ] After the switch: request indexing in Search Console, confirm the host's bot protection is not blocking search or AI search crawlers, and redirect or retire the preview address.
- [ ] The live build fails `npm run check` while any draft or placeholder content remains. That is deliberate.

One honest line for the owner: the site is technically complete. Ranking from here depends mostly on the Google profile, reviews, links and listings.

## 6. Replace every DRAFT and Sample item
Search the code for `DRAFT`, `TODO` and `Sample`:
- [ ] Roster, titles, years and phone numbers (`lib/agents.ts`). Recount the agent number in the hero.
- [ ] Headshots for Fred Shibler, Johnathan Luckenbaugh, Brittany Gruver and Peg Steich; a better one for Victoria Ledon-Knapik. Drop them in `public/images/raw/`, run `node scripts/optimize-images.mjs`, set `photo` in `lib/agents.ts`.
- [ ] Victoria's phone and email.
- [ ] Dina's years (bio says eight, card says 11) and Sylwia's (licensed 2014 vs 9 years).
- [ ] Bios for Johnathan and Brittany.
- [ ] Ellie's bio: three ranking sentences were left off; confirm.
- [ ] Real Google or Zillow reviews, shown as plain text with month, year and a link to the source (`components/sections/Proof.tsx`). Never add rating or review markup about the firm to its own site.
- [ ] The year each state opened (`app/about/page.tsx`).
- [ ] Fees: the Buy and Sell pages say fees are not published. Confirm the wording or supply numbers (`lib/faq.ts`).
- [ ] Each state's brokerage name, office address and licence disclosure (footer).
- [ ] Robin Keefover's permission to be featured.
- [ ] Reply method and timing after a Move Planner request.
- [ ] `llms.txt` is generated from the facts files and served in live mode only. Nothing to rebuild by hand.
