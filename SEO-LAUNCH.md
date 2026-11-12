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
- [ ] `https://<domain>/sitemap.xml` lists `/` and `/contact` with real last-modified dates (edit `app/sitemap.ts` when content changes).
- [ ] The footer no longer shows "Concept preview by Lee Enterprises Unlimited."
- [ ] Paste both URLs into the Schema.org validator and Google's Rich Results Test. Fix any warnings.
- [ ] Share the URL in a private chat to check the link preview (`/og-image.png`).

## 3. Listings
- [ ] Embed the iHomefinder Kestrel widget on the new domain (search the `TODO at launch` comment in `lib/business.ts` and `components/sections/SearchBand.tsx`). Until then the Search buttons open the existing IDX pages on infinitypa.com.

## 4. Search engines and profiles
- [ ] Google Search Console: verify the domain, submit `sitemap.xml`, request indexing for `/` and `/contact`.
- [ ] Bing Webmaster Tools: import from Search Console or verify, then submit the sitemap.
- [ ] Link the site from each Google Business Profile (one per office or state, if they exist).

## 5. Redirects from the old WordPress site (301)
Add to `next.config.ts` (`redirects()`) or Vercel, once the domain moves:

| Old URL | New URL |
|---|---|
| `/maryland/` | `/#maryland` |
| `/pennsylvania/` | `/#pennsylvania` |
| `/illinois/` | `/#illinois` |
| `/nevada/` | `/#nevada` |
| `/about-us/` | `/#about` |
| `/contact-us/` | `/contact` |
| `/service-locations/` | `/#markets` |
| `/real-estate-search/` | `/#search` |

Keep the IDX search pages (`/nevada-real-estate-search/` and friends) working until the Kestrel widget is embedded.

## 6. Replace every DRAFT and Sample item
Search the code for `DRAFT`, `TODO` and `Sample`:
- [ ] Roster, titles, years and phone numbers (`lib/agents.ts`). Recount the agent number in the hero.
- [ ] Headshots for Fred Shibler, Johnathan Luckenbaugh, Brittany Gruver and Peg Steich; a better one for Victoria Ledon-Knapik. Drop them in `public/images/raw/`, run `node scripts/optimize-images.mjs`, set `photo` in `lib/agents.ts`.
- [ ] Victoria's phone and email.
- [ ] Dina's years (bio says eight, card says 11) and Sylwia's (licensed 2014 vs 9 years).
- [ ] Bios for Johnathan and Brittany.
- [ ] Ellie's bio: three ranking sentences were left off; confirm.
- [ ] Real Google or Zillow reviews (`components/sections/Reviews.tsx`). Do not add review or rating schema unless the reviews are real and first-party.
- [ ] The year each state opened (`components/sections/Since1994.tsx`).
- [ ] Each state's brokerage name, office address and licence disclosure (footer).
- [ ] Robin Keefover's permission to be featured.
- [ ] Reply method and timing after a Move Planner request.
- [ ] Rebuild `public/llms.txt` after data changes: `node --experimental-strip-types scripts/build-llms.mjs`.
