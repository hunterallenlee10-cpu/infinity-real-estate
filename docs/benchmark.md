# Benchmark: the best brokerage sites, and where they are weak

Researched 15 November 2026 for the Infinity Real Estate demo. Two pools: award-level craft, and the sites that already rank in Infinity's four markets. Observation only. Nothing here was copied; no benchmark is named on the site.

**Honest limits:** no US boutique residential brokerage with a 2025-26 Awwwards, CSSDA, FWA or Webby win was found, so the craft pool uses the closest award-listed real estate sites plus the best people-first brokerage. Rankings come from web search results, not a live Google results page. Page weights are single lab runs.

---

# Part 1. Award-level craft


Captured 15 Nov 2026. Observation only: no code, copy or images were taken from any site.

## How this was done, and what could not be verified

- Every site below was loaded in headless Chromium (Playwright) at 1440x900 and 390x844 (iPhone user agent, touch). I looked at the top-of-page screenshots at both sizes plus scroll-step contact sheets, and read computed styles, loaded fonts, script and stylesheet URLs, response headers and network requests.
- Screenshots and raw observations: `bench-a/shots/<site>/` (`home-d-top.png`, `home-m-top.png`, `home-d-sheet.png`, `home-m-sheet.png`, `obs.json`). Sub-pages are in `<site>-sub/`.
- Timing and weight figures are one lab run each from a data-centre connection. Treat them as relative, not as field data. Weight is the sum of `content-length` headers, so it under-counts chunked responses.
- Colour shares come from sampling computed background colours by element area. Photographs and video are not counted, so shares describe the flat colour fields only. Where the sampler disagreed with the screenshot (BresicWhitney) I used the screenshot and say so.
- Award galleries: Awwwards real-estate category pages 1 and 2 were read (pages 3 and 4 returned 503). CSS Design Awards, FWA, Land-book (bot wall), SiteInspire (bot wall) and Lapa Ninja could not be read. Godly loaded but its entries could not be parsed. Webby 2026: the real-estate nominees I could find are developments and ranches, not brokerages, and I could not open the winners list.
- Honest headline: I found no US boutique residential brokerage with a 2025-26 Awwwards, CSSDA, FWA or Webby win. Award-level real-estate work in 2026 is almost all single developments and architects. The two genuine award sites below are a Cape Town commercial brokerage and a Mediterranean investment agency. The US entries are a nominee and a funded-brand control.
- Could not load: The Agency (429 "verify you are human"), Brown Harris Stevens (403 Cloudflare challenge; its Sept 2025 redesign is therefore unverified), Fantastic Frank (429 Vercel checkpoint), Official (connection failed, domain may be wrong).

## The four sites

| # | Site | Why it is here | Launched |
|---|---|---|---|
| 1 | RIO Property, rioproperty.co.za | Awwwards Honorable Mention, 11 Aug 2026 (DepartmentSix) | Built Mar-May 2026 (Webflow asset IDs decode to 8 Mar to 18 May 2026) |
| 2 | Realevate, realevate.agency | Awwwards Site of the Day and Developer Award, 27 Sep 2026 (Or Halevi, MAKETHECUT) | Footer "2026"; asset version stamp decodes to 12 Sep 2026 |
| 3 | BresicWhitney, bresicwhitney.com.au | No award verified. Chosen as the strongest people-system I loaded (design-led Sydney brokerage, site by Atollon) | Relaunch date not stated anywhere I could read. CMS asset stamps decode to 13 Jun 2024, so probably outside the 18-month window. Footer 2026 |
| 4 | Alexa Devaney, alexadevaney.com | Awwwards Nominee, 8 Nov 2026 (dmrmedia). Not a winner. The only current US agent site in the gallery | Footer 2026; nominated Nov 2026 |
| ref | SERHANT., serhant.com | No award. Best-funded US people-and-media brand, used as a control | Footer 2026; hero video file is named "final-2025" |

---

## 1. RIO Property

**URL** https://www.rioproperty.co.za/ (commercial brokerage, Cape Town; three named principals)

**Navigation and pages.** Hamburger only, no visible top nav. Five destinations: Home, Meet the Team, Done Deals, Services, Get in Touch. There are no listings, no search, no journal, no community pages and no individual bio URLs. The team page carries three bios inline, each with email, mobile, WhatsApp, LinkedIn and a portal profile link.

**Does better than anyone.** It turns "we do not show listings" into the positioning. A section headline says outright that the firm does not list its properties on purpose, and the site replaces inventory with proof: client logos, a Done Deals grid tagged by type and status, and a list of the firm's own "laws of brokering" written as rule plus counter-rule. Copy talks to four roles (buyers, sellers, tenants, landlords) in one plain sentence each.

**Pattern worth adopting.** Role-segmented cards near the top ("one of these? you're in the right place") and a closed-deals record as the main proof, for a firm with no property photography.

**Avoid.** Everything is set in capitals, including body-size labels, which tires quickly. The desktop hero pulls a 145-frame image sequence (about 45 MB in my run) from a third-party file host. The phone number is only in the footer and team page.

**Colour.**
- Background `#FFFEFC` warm white, about 57% desktop and 43% phone.
- Primary `#4725B8` violet, about 28% desktop and 38% phone: hero frame, full-screen menu, contact form card.
- Deep `#230F66`: footer field and all H2 text.
- Text `#666666` body, `#4725B8` links and small labels, `#B39CFF` lilac for secondary text on violet.
- Accent `#FFEA00` yellow, well under 1%: active menu item, footer email, "Let's talk", send link. Used only for "act here".
- Neutrals `#CCCCCC`, `#E0E0E0` for placeholders and rules.

**Type.** Two families. Blauer Nue 600 for display, uppercase, line-height about 0.97. Rubik 400 for body at 16px. Hero H1 is 74px on desktop and 49.6px on a 390px phone, wrapping to four lines; H2 is 52px and 35px. Sizes are fluid (clamp in the stylesheet).

**Layout.** Full-bleed image hero with the headline anchored bottom, lines staggered left and right, a small three-word service list at left and a one-line descriptor at right. Then white editorial sections: heading left with a small paragraph far right, a logo marquee, four image cards for the roles, a deals carousel, the laws list with hairline rules, a full-width violet enquiry card, deep-violet footer. Sections do not alternate colour: white throughout with violet at both ends. Very generous vertical space between sections.

**Motion.** Letter-mask reveal of the headline on load (SplitText). On desktop the hero is pinned and a scroll-scrubbed frame sequence drawn to canvas pulls the camera back through an office window to the skyline. Lenis smooth scroll, logo marquee, hover states on role cards, Flip-animated menu, Swiper for deals. On the phone the frame sequence is dropped for a single WebP (9 images, about 1.1 MB total, LCP under 1s in my run); text reveals and marquee remain. Reduced motion: one check in the custom JS, none in CSS.

**Build.** Webflow, plus a custom JS and CSS layer served from Cloudflare Pages (about 32 KB of JS). GSAP 3.15 with ScrollTrigger, SplitText, Flip, InertiaPlugin and CustomEase from jsDelivr; Lenis 1.3; Swiper 12; Finsweet Attributes; Webflow's jQuery. Awwwards also tags Contentful, which I did not see in source. Images are WebP from the Webflow CDN with srcset (500 to 1600 wide) and lazy loading. No video.

---

## 2. Realevate

**URL** https://realevate.agency/ (investment-property marketing agency for Cyprus, Montenegro and Georgia; not a brokerage with a visible team)

**Navigation and pages.** About and Contact at the top corners; a fixed dock at the bottom with "Our Selection" and a menu button. Our Selection opens four colour-coded categories (By The Sea, Evergreen, Urban Living, Rare Gems), each a long page leading to project pages (not examined). No agents, no people, no journal, no search. Phone and WhatsApp appear only on Contact.

**Does better than anyone.** Restraint. The home page is exactly one viewport with no scroll: a marquee word behind a small square image, one sentence saying what is sold and where, and one outlined price qualifier ("starting from"). A visitor knows the offer and the entry price in three seconds.

**Pattern worth adopting.** One colour per category, applied as a full-page field with a matching muted tint. For a four-state firm this maps directly to one colour per market.

**Avoid.** The one-screen home preloads 71 images (about 8.4 MB on the phone) and LCP landed at 3.6 to 4.6s behind a preloader. Inner pages hijack scroll with pinned sections; my scripted scrolling barely advanced. The fixed dock overlaps body text on the phone. Imagery is glossy lifestyle rendering with no real people from the firm.

**Colour.**
- Background `#FFFFFF`, about 99% of the home page.
- Text and primary `#1F2B5E` navy: every word, outlined buttons, solid menu button. Muted `#626C95`.
- Category fields: `#222A4C` By The Sea, `#36614D` Evergreen, `#2D1C2D` Urban Living, `#1C181D` Rare Gems, each about 57% of its own page.
- No separate accent. Colour comes from the photograph.

**Type.** Three families. Google Sans 500 for interface and display; Roslindale Display 300 for serif pull quotes; Monument Extended 400 for tiny wide capital labels. The marquee word runs 218px on desktop and 140px on the phone and is cropped by design. The actual H1 is small: 23.7px desktop, 21.5px phone, three centred lines.

**Layout.** Type-led and centred. Home is a single composition. Inner pages run label at far left in brackets, a large statement indented to the right, an inset video still, a serif quote, then a brand-name marquee as divider. White throughout until a category page floods with its colour.

**Motion.** Preloader, continuous marquee, image crossfades, SplitText line reveals, pinned scroll-scrubbed sections, colour transitions into categories. All of it runs on the phone, including the full preload. Five reduced-motion rules in CSS and matchMedia checks in JS, the best handling of the four.

**Build.** Hand-coded static site, no framework. Self-hosted GSAP 3.12.2 with ScrollTrigger and SplitText, one minified stylesheet, one 285 KB app script. Cloudflare with zstd. AVIF images with width variants and `<picture>`. Three self-hosted woff2 fonts (about 95 KB). Meta pixel and GA4. Awwwards tags Node.js and GSAP.

---

## 3. BresicWhitney

**URL** https://bresicwhitney.com.au/ (Sydney residential brokerage, six offices, roughly 80 staff shown)

**Navigation and pages.** Top: Buy, Lease, Appraise, Journal, plus a hamburger with About, Appraisals, Team, Careers, Store, Contact. Also Sold, Upcoming Inspections, Upcoming Auctions, an off-market section, Commercial, Property Alerts, Rental Resources. Agent bio pages at `/agent/<name>`: role, company, email, phone, one paragraph, enquiry form, My Listings (current and sold), My Articles, On My Team.

**Does better than anyone.** Two systems. A sentence system: the wordmark sits top-left in black and each page finishes the sentence in grey beneath it (the firm "knows" its city, "connects people and property", "is built different", "will move you forward"). And a portrait system: every person is shot seated, black and white, on the same draped backdrop, so 80 people read as one firm. The bio page links the person to their listings, their writing and their teammates.

**Pattern worth adopting.** The uniform portrait treatment with name, role and tappable mobile under every card, plus filters for team, region and name. For a 13-person firm this is the whole site.

**Avoid.** The grey second line is `#D1D1D1` on white, far below readable contrast for a headline. No phone number anywhere on the home page. The team page is a single column about 25,000px tall on a phone. The Appraisals page fetched about 115 MB of video on desktop and on phone in my run. Roughly ten ad-tech hosts load on every page, plus a chat widget. Bios are one paragraph of about 70 words.

**Colour.** (From screenshots; the sampler mis-read hidden grey layers.)
- Background `#FFFFFF`, about 90% or more.
- Text `#000000`; near-black `#121212` for the odd dark band.
- Secondary headline grey `#D1D1D1`; rule `#CCCCCC`; caption grey `#7B7B7B`.
- No accent colour at all. Colour arrives only through property photography; people are black and white.

**Type.** Four commercial families. NewGroteskSquare 500 condensed for display at 68px desktop and 40px phone, line-height about 0.94. National and National Narrow 500 for interface and body at 18 to 20px. Unica for small captions. The phone H1 is 40px on two lines.

**Layout.** Type-led header, then a search row with hairline dividers, then one large featured image. Below: four rotated vertical labels acting as an accordion, a full-bleed journal feature, a four-column listing grid, a newsletter line and six small office photographs in the footer. 28px page margins on desktop, 16px on phone, hairline rules, square corners, no shadows, a lot of empty white.

**Motion.** Loading-screen animation, the changing header sentence, hover accordion, carousels, autoplay mp4 banners with no poster image. The phone receives the same video files as desktop. One reduced-motion rule.

**Build.** Vite-built React front end (single hashed `/assets/main-*.js`, about 950 KB of script in total with third parties) on Netlify. DatoCMS for content, with images served through its image API as AVIF at requested widths inside `<picture>` with srcset. Listing photos from a property-CRM CDN. Video as plain mp4 from the agency's own file host. Slick carousel. Fonts self-hosted as WOFF, not WOFF2. Podium chat; Taboola, AppNexus, The Trade Desk, Loopa and Meta tags.

---

## 4. Alexa Devaney

**URL** https://www.alexadevaney.com/ (single agent, North County San Diego, under a national brokerage)

**Navigation and pages.** Buy, Sell, Communities (four areas, five neighbourhoods each), Search Homes (IDX), Portfolio, Exclusive Access, About, Let's Connect, plus a hamburger. Legal pages for privacy, terms, accessibility and fair housing. No journal, no press. Phone is in the footer and on the contact page, not in the header.

**Does better than anyone.** One personal thesis carried everywhere. The hero says "family-first", the intro is first person, the About page is a dated timeline of her career, and a section explains why raising children in the same neighbourhoods changes the advice she gives. It is the only site here where the copy could not be moved to another agent.

**Pattern worth adopting.** The career timeline on the bio page (licensed at 22, learning street by street, joining the brokerage, becoming a parent, today) and the separate, lighter phone video file.

**Avoid.** Visually it is the standard luxury template: aerial house video, centred spaced-capital wordmark, Montserrat throughout, near-black sections, count-up stats, listing carousel as section two. Body copy is 14.5px grey on black. The page overflows horizontally at 1440. Colour variables from another palette are left in the stylesheet.

**Colour.**
- Dark `#101010` about 34%, `#161616` about 10%, `#151A1C` for bands.
- Light `#F7F6F4` about 46% on the home page (footer and legal) and 73 to 81% on inner pages.
- Text on dark `#F4F1EC`, `#DCD7CF`, `#B6B0A6`; text on light `#333333`.
- Accent `#B71F37` crimson: eyebrow labels, "explore" links, a brush-stroke circle emblem, timeline dots; 5 to 8% as bands on About and Contact.
- Button: `#F4F1EC` fill, `#101010` text, square corners.

**Type.** One family, Montserrat, five weights loaded from Google Fonts. H1 84px desktop and 42px phone at weight 400, three lines on the phone. Eyebrows in spaced capitals at about 11px.

**Layout.** Full-screen video hero with left-aligned headline, a search box and four area chips. Dark sections follow: statement with a circular portrait, three stats, listing carousel, four area rows alternating image left and right, a portrait split, a family split, a call-to-action band over a photo, then a light footer. A sticky "Let's Connect" pill sits bottom-right throughout.

**Motion.** Autoplay muted looping hero video (1.4 MB desktop; a separate 1.1 MB phone file, with poster and metadata preload). Count-up stats, fade-up on scroll, no animation library. Thirteen reduced-motion rules. Everything survives on the phone. LCP was recorded at 7.7s on the phone profile in my single run, which I could not explain and did not re-test.

**Build.** Next.js App Router on Vercel, prerendered with a 300s revalidation window. Images through the Next image optimiser as WebP with srcset and lazy loading. Self-hosted mp4. Montserrat via a Google Fonts stylesheet link. Google Tag Manager and Google Ads. About 170 KB of script by content-length and 39 requests on the phone.

---

## Reference: SERHANT. (US funded brand, not an award site)

https://serhant.com/ runs on the Luxury Presence platform (response header says so), as do Carolwood Estates and Smith & Berg. Navigation: Buy, Rent, Sell, New Development, Agents, a vanity phone number in the desktop header, All Homes; footer adds studios, about, offices, careers, press, newsroom, guides. Hero is a video of people at work, not houses, with a four-tab search (Buy, Rent, Sell, Agents). Palette white `#FFFFFF` about 50%, `#F7F7F7`, black, navy `#001A72` for a pill header and buttons. Montserrat 800 only; H1 68px desktop, 36px phone.

What it shows: the agent page is the richest I loaded (portrait, licence number, direct phone, email, personal site, socials, Instagram strip, long first-name bio, selected recognition with years, education, active listings). What it costs: the phone home page is about 20,900px tall and pulled about 42 MB, including three 1920-wide webm files (about 22 MB) sent to the phone. The agents index puts the whole roster on one page (about 2,400 links). A cookie banner, an accessibility overlay widget and a consent tool all appear on first paint. The state picker is a flat grid of state-name buttons.

## Also screened and rejected

| Site | What I saw | Why not |
|---|---|---|
| Carolwood Estates | Luxury Presence; full-bleed house video; cookie banner and overlay widget on load | Template, listing-led |
| Smith & Berg | Luxury Presence; video hero; 31 scripts | Template |
| The Oppenheim Group | Agent Image on WordPress; 8 videos; 56 scripts; H1 literally reads "Home" | Dated |
| Hilton & Hyland | Agent Image; video hero; 41 scripts | Dated |
| Bespoke Real Estate | WordPress; 103 scripts; three office phone numbers in a top bar | Dated build, though phone-forward |
| Whitefox (Australia) | Mux video and Lenis; centred wordmark over a house at dusk | Listing-led |
| The Modern House (UK) | Next.js; editorial; H1 is the current listing | Listing-led, older design |
| Luxury Places (Switzerland) | Awwwards HM Jun 2026; WordPress, Lenis; property video hero | Listing-led |
| Emarat Realty, Aretè Immobiliare, Lenval, Woonpact | Awwwards HMs 2026, tagged Next.js or Webflow with GSAP | Developers, not brokerages; not loaded |

---

## What the best have in common

- One typographic idea carries the brand, and it is about the firm, not a house: a sentence the page completes, a giant set of capitals, a single marquee word.
- A two-colour system: one neutral field plus one brand colour in large flat areas, with at most one tiny accent reserved for "act here". No gradients, no shadows, square corners.
- Two or three licensed typefaces, never a free default. Phone headlines of 40 to 50px with line-height at or just under 1.0, on two to four lines.
- Very short navigation, five to nine destinations, in plain verbs ("Done Deals", "Appraise", "Let's Talk").
- Copy with a point of view, written in first person or addressed to a role, that could not be pasted onto a competitor.
- Proof stands in for inventory: closed deals, client logos, a few hard numbers.
- A uniform portrait treatment (same backdrop, crop and tone) so the team reads as one firm.
- A lot of empty space and hairline rules; every page ends on a contact block.

## How the newest ones are built

- Three stacks. Webflow or hand-coded static pages with a GSAP layer for the motion-led award sites. Next.js on Vercel, prerendered, for content and IDX sites (also tagged on two other 2026 Awwwards real-estate mentions). Vite and React over a headless CMS on Netlify for the large roster site.
- GSAP 3.12 to 3.15 with ScrollTrigger and SplitText, Lenis for smooth scroll, Flip for menu transitions. Scroll-scrubbed image sequences on canvas are replacing background video.
- AVIF or WebP at several widths with srcset and lazy loading, either from the platform CDN, the Next optimiser or a CMS image API.
- Self-hosted fonts (woff2 on the newest), fluid sizes with clamp.
- Media decided per device: a separate phone video file, or the heavy sequence removed on phones.
- Edge or static hosting (Cloudflare, Vercel, Netlify), tens of requests rather than hundreds.
- The funded US brands are not built this way. They sit on Luxury Presence or Agent Image templates with jQuery and 30 to 100 scripts. That is the craft gap.

## Dated patterns to avoid

- Full-bleed drone or twilight-house video hero with a centred, letter-spaced wordmark and a search box on top.
- Montserrat for everything, thin weights, spaced-capital navigation, taupe or gold on black as shorthand for luxury.
- "Featured Properties" carousel as the second section, count-up stat row, generic three-word headlines.
- Cookie banner, accessibility overlay widget and chat bubble all stacked on first paint.
- Preloaders and scroll hijacking that delay or block reading.
- Brand-name marquees used as filler between sections.
- A whole roster dumped on one long page; a flat grid of state buttons as the only way into markets.
- Template platforms shipping dozens of scripts and desktop-size video to phones.

## Where they are all weak (what a people-first boutique can beat)

- **Agent pages are thin or missing.** The best award site has three bios on one page with no individual URLs. The Site of the Day shows nobody who works there. The best roster site gives each person about 70 words. Only the funded control has depth, and it is a template. None shows how the person works, what a first call is like, named client words tied to that agent, a short video hello, languages, or towns served.
- **The phone number is hidden.** None of the four has a tappable number in the first phone screen. Two keep it in the footer, one has none on its home page, one only on Contact. The control puts it in the desktop header and folds it into the menu on phones.
- **Phones get desktop weight.** 8.4 MB for a one-screen home page; about 42 MB with 22 MB of video on the control; about 115 MB of video on one inner page. Only one site drops its heavy hero on phones and only one ships a separate phone video.
- **Motion gets in the way.** Preloaders push LCP past 3.5s; pinned sections fight the thumb; a fixed dock covers text.
- **Accessibility is an afterthought.** Reduced-motion handling ranges from none to token on three of the four. Headline grey at about 1.5:1 contrast. 14.5px grey body copy on black. All-capitals body text. An overlay widget instead of real fixes. A page that scrolls sideways at desktop width.
- **Nobody solves "one firm, several markets".** No site ties person to market to licence. Markets are a button grid or absent. Community pages exist on one site only.
- **Proof is impersonal.** Logos and totals, but no named client voice on any home page I captured, and no proof attached to an individual.
- **Generic copy and imagery on the funded sites**, and glossy rendered lifestyle images on the Site of the Day. Real photographs of the actual team are rare.
- **Compliance text is dumped, not designed.** Licence numbers and fair-housing notices sit in grey fine print. A firm licensed in four states could present that as a trust feature.
- **Tracking bloat.** Up to ten advertising hosts and a chat widget on every page of the roster site.


---

# Part 2. Top-ranked structure


Captured 2026-11-15. Observation only: no code, copy or images were taken from any site. Page titles and headings are quoted solely as evidence of how each site phrases "what + where".

## How this was done, and what it can and cannot prove

- Searches were run through the WebSearch tool (US results), not a live Google SERP. Treat positions as "appears near the top for this phrase", not as exact Google rank. No local pack / Google Business Profile results were visible to me.
- Each of the five chosen sites was opened in headless Chromium (Playwright) at 1440x900 and 390x844: home page, agent directory, one agent page, one community page, plus reviews pages where they exist. Screenshots and extracted facts are in `shots/` and `info/` beside this file.
- Performance numbers are one cold load from a datacentre connection in a 390px mobile context. They are indicative, not Lighthouse scores.
- Count-up stat animations were sometimes caught mid-count in screenshots, so stats below are taken from the DOM text.

### Could not load or verify

| Site | Problem |
|---|---|
| hendersonvegas.com (Steve Ord, first result for the Henderson phrase) | HTTP 403 to curl; not reviewed |
| warthenteam.com (Frederick) | Cloudflare challenge, 403; not reviewed |
| frederickmdproperties.com → machomes.com (Mackintosh Realtors) | Desktop loaded once; mobile got a Cloudflare challenge. Only the desktop home page was seen, so it is a runner-up note, not one of the five |
| Vesta "Featured Properties" carousel | Rendered collapsed in my full-page screenshot; probably a capture artefact, not confirmed as a real bug |
| Design age | No site states a redesign date. Every footer says 2026 (auto-updating), so "age" is my judgement from the look and the platform |

## Search results (top organic brokerage/team sites per phrase)

Portals and directories skipped (Zillow, Realtor.com, Redfin, Homes.com, Yelp, US News, Yellow Pages, Ramsey, RE/MAX and Compass national directories, agent-ranking directories).

| Phrase | 1 | 2 | 3 | Also seen |
|---|---|---|---|---|
| real estate agents Henderson NV | hendersonvegas.com (Steve Ord, solo agent) | nevadarealestategroup.com (two blog posts rank) | kwthemarketplace.com (franchise office) | faraneshlv.com, liferealtydistrict.com |
| Las Vegas real estate brokerage | thebrokerage.vegas | huntingtonandellis.com (home + about both rank) | lasvegasrealtyllc.com | galindogrouprealestate.com, newhomeresource.com, joetaylorgroup.com, thezhurealtygroup.com |
| Chicago real estate brokerage | joinkale.com (agent-recruiting site) | kmrealtygroup.net | carriemccormickre.com (solo luxury agent) | chiprop.com, vestapreferred.com (6th), secondcityagents.com |
| real estate agent York PA | jerryriggleman.com (solo) | faassociates.net | spencer-blake.com (solo) | ricksmithteam.com, randelljackson.com |
| Harrisburg PA real estate agents | theheiligteam.com (first non-directory result) | homesale.com/harrisburg (BHHS franchise office) | howardhanna.com agent page | |
| Frederick MD real estate agents | frederickrealestateonline.com | jimbassgroup.com | frederickmdproperties.com (Mackintosh) | warthenteam.com |

Pattern worth noting before the detail: in the smaller markets (York, Harrisburg, Frederick, Henderson) the top results are solo agents and small teams whose title tag literally says the phrase. In the big metros the brokerage sites that rank are the ones with deep city and neighbourhood pages.

## The five sites chosen

| # | Site | Market | Size | Platform | Why chosen |
|---|---|---|---|---|---|
| 1 | nevadarealestategroup.com | Las Vegas / Henderson NV | ~150 agents (team under LPT Realty) | Custom Next.js on Vercel | Newest and deepest build seen; ranks for Henderson agent phrases |
| 2 | huntingtonandellis.com | Las Vegas / Henderson NV | ~200 agent pages, self-described boutique independent | Luxury Presence | Ranks 2nd for "Las Vegas real estate brokerage" |
| 3 | vestapreferred.com | Chicago IL | ~50 agents, independent | Luxury Presence | Independent Chicago brokerage, recent redesign, strong neighbourhood guides |
| 4 | theheiligteam.com | Harrisburg / Central PA | 7 people (Keller Williams team) | Luxury Presence | First non-directory result for Harrisburg agents; closest to Infinity's Central PA market |
| 5 | jimbassgroup.com | Frederick MD | 12 people, independent small brokerage | WordPress + BoomTown IDX | Ranks for Frederick agents; closest in head-count to Infinity; the "dated but still ranking" example |

Honest caveat: only #4 and #5 are truly Infinity-sized. #1 and #2 are large operations that present as teams/boutiques. They are included because they set the structural bar in Infinity's Nevada market.

---

## 1. Nevada Real Estate Group - https://www.nevadarealestategroup.com/

**Footer year / age:** © 2026. Looks rebuilt 2025-26: custom Next.js, content stamped "Last updated October 21, 2026", MLS data stamped the day of capture.

**Ranks for:** two of its blog posts appear for "real estate agents Henderson NV" (it also has a dedicated `/realtor-henderson/` landing page aimed at that phrase). Title claims "#1 Realtor Team in Las Vegas & Reno".

**Top navigation:** Buy a Home (mega menu: browse, map search, recently reduced, open houses, first-time buyers, homes with pools / casitas / RV garages, 55+, luxury, high-rise, mortgage calculator, pre-approval, listing alerts, compare listings, market reports by ZIP, relocation guides incl. California tax savings and Nellis AFB) · Sell a Home (home value estimator, free market analysis, 7-day listing agreement, cash offer, resources) · New Construction · Communities (mega menu of ~25 named communities plus lifestyle groupings) · About Us · Blog · market switcher (Las Vegas / Reno) · phone number · Sign Up.

**Page types that exist:** home, search (list + map), listing detail, buyers, sellers, agents directory, per-city "real estate agents" landing pages, individual agent pages (~150), city pages, community pages nested under city (`/henderson/anthem/`), lifestyle collection pages, about, blog, guides (e.g. Summerlin vs Henderson), market reports by ZIP, contact, home value estimator, mortgage calculator, join-the-team. Reviews live on the home page and agent pages rather than a standalone reviews page (none found in nav).

**Individual agent page (sampled: one agent):** square photo, name as H1, licence number, "part of the Las Vegas agents team" link back to the directory, chips for Zillow rating and review count, "Zillow Pro", "Speaks English"; buttons Call (direct mobile) / Send Message / Search For Homes / Home Valuation; social icons. Then a team-wide stats block, team-wide review counts by platform, three long reviews that name this agent and the client type and area (buyer - Lake Las Vegas, seller - Henderson), a first-person bio of roughly 250 words, then a contact card (direct phone, email, licence, languages) with a message form. ~1,200 words total. **No listings, no sold history, no specialties list, no areas served on the agent page.**

**Agents directory:** opens with stats and a "Match me with an agent" button, explains how matching works, "Find the right agent for your specific situation" (8 need-based cards: buyer, seller, luxury, new construction, relocation, 55+, investment, property tax) and by-submarket cards, a match form, FAQ, then the roster split South / North. The roster is name-only tiles and most photos were missing in my capture (grey placeholder circles for the large majority).

**Community page (Henderson, ~8,000 words; Anthem similar):** breadcrumb, credibility strip (rank, homes sold, reviews, call-or-text button), hero with "last updated" date, read time and named author; live listings; "at a glance" facts; sales by price band; browse by property type / lifestyle / price band / bedrooms; listing-alert form; schools by address; crime lookup; "what it's like living here" (known for, who should live here, daily life); census housing data; "Best fit for / Pros / Honest considerations"; top-6 submarket comparison; market by ZIP; builders; outdoor amenities; a weekend itinerary; economy and employers; comparison with neighbouring cities; monthly cost and mortgage; drive times; closing timeline; long FAQ. Every H2 is phrased as a question. Schema: Place, City, Article, Dataset, FAQPage, BreadcrumbList, RealEstateAgent, Person.

**Proof and where:** rank badges in the hero with a named source and year directly underneath; six-stat grid as section 4 (rank, agents, 9,097+ five-star reviews, 9,600+ homes sold, $4.85B+ volume); reviews section splits the total by platform (Google / Zillow / FastExpert each with rating and count), individual reviews carry a "Google" tag and "worked with [agent]"; awards are shown with a note that they belong to the founder individually, not the team; "verified" stat cards each cite their source (roster, MLS, review platforms); founder quote with licence number linked to the state regulator.

**Contact / lead path:** phone in the nav on desktop and as the main header button on mobile; a chat launcher bottom-right ("How can I help?"); pre-approval form and home-value form inline on the home page; match-me form on agent pages; on mobile community pages a sticky bottom bar appears on scroll with Call and Get Matched. **No forced registration:** I opened three listings in a row with no sign-up wall. No cookie banner or pop-up on load.

**Home page section order:** nav → hero (rank badges with source, H1, two big market-entry cards South / North) → choose-your-market map → city chips → "Why work with us" stat grid → browse-listings category tiles (tabbed by market) → hiring banner → live MLS tools (ticker of median price, days on market, active listings; home value estimator, tax-savings calculator, market reports by ZIP, recently reduced, open houses) → market reports → communities (editorial "cover story" + list) → blog → pre-approval form → home-value form → verified reviews + awards → "from our listing agents" (listings with agent-written notes) → about / verified stats / founder → FAQ → CTA band → footer with both offices.

**Does better than anyone:** depth with honesty signals. Sources next to every claim, "honest considerations" on area pages, freshness dates, and a market switcher that makes a two-region business feel like one site.

**Adopt:** the two-level area structure (city → community) with a consistent, question-led template, and the market switcher in the nav. Infinity has four regions; this is the cleanest multi-market pattern seen.

**Avoid:** the roster. 150 name-only tiles with missing photos and no filter is the weakest part of an otherwise excellent site; and the agent page repeats team-wide stats instead of telling you what this agent actually does. Also 8,000-word area pages run 78,000-82,000px tall on mobile, which is exhausting.

**Build notes:** espresso #2B221A, gold #D4B27C, cream #F7F4EE, dark gold text #7A5B2A, terracotta accent #9C5F4E. Fonts: Mulish (headings, with italic emphasis words) and Inter (body). Hero: single static photo with dark overlay, no video. Platform: Next.js on Vercel (response headers), custom chat widget, in-house MLS search. Mobile: best of the five. One load: LCP ~1.2s, 38 requests, ~1.6MB, 4 hosts, zero layout shift.

---

## 2. Huntington & Ellis - https://huntingtonandellis.com/

**Footer year / age:** © 2026, "Website design by Luxury Presence". The look (full-screen hero, hamburger-only nav, circle image tiles, marble texture) reads as a 2021-23 luxury template.

**Ranks for:** 2nd for "Las Vegas real estate brokerage"; its /about page also appears for the same phrase.

**Top navigation:** none visible. Desktop and mobile both show only a logo and a hamburger. Inside: Talent (team) · Who We Are · Join Us · H&E For Good · Henderson Office · Our Collection (listings) · Notable Sales (solds) · Search Listings · Sell With Us · Buy With Us · Communities · High Rise · Relocation · Insights (blog) · In The Press · Contact Us · Preferred Partners · search-account and agent portal logins.

**Page types:** home, IDX search, listing detail, own listings, sold listings, buy, sell, cash-offer landing page, team directory, individual agent pages (~205), neighbourhood index and pages, a Henderson office page, about, press, blog, relocation, community-giving page, contact. No standalone reviews page (testimonials are a section of About). No dedicated home-valuation page found (cash-offer page instead).

**Individual agent page:** stock interior photo as hero with "About [Name]", portrait, email, mobile, licence number, a "Meet [first name]" bio, then current listings and a long grid of sold properties with prices, then the generic brokerage contact form. Bio length is wildly uneven: of the six agents sampled, one page had an empty bio under the heading, others ran 73, 252, 338 and 833 words. No reviews, specialties, areas or languages. Title tags are inconsistent ("Name", "About Name", "Name | Huntington and Ellis").

**Team directory:** broker bio at top with press mentions and awards, name search box, "team leads" grid, then everyone else. One page ~39,000px tall on desktop. Name search only.

**Community page (Henderson):** title "Henderson | Area Guide". Almost entirely automated: IDX listing grid with filters, census "overview" numbers, a points-of-interest table from Yelp/Walk Score (many rows showing 0 reviews and 0/5 stars), demographic and employment charts, schools table. ~800 words, almost none written by a person.

**Proof and where:** three stats directly under the hero (23+ years, $5B+ sales over six years, 14,000+ properties sold); press logo strip two-thirds down; sold-property grids on agent pages (the most convincing proof on the site); testimonials only on About. No review source or count on the home page.

**Contact / lead path:** phone number is not visible until the footer. One long "Connect with us" form near the bottom (name, phone, email, how can we help, how did you hear). Cookie consent banner covers the bottom of the hero on desktop and roughly half the screen on mobile. A small floating contact button stack on mobile. IDX search is the same Luxury Presence product as site 3, which walls listings behind sign-up (verified on site 3, not re-tested here).

**Home page section order:** full-bleed hero slideshow with a tagline → H1 + three milestones → three circle tiles (search / about / sell) → listing carousel → Instagram → three service tiles (team / relocation / blog) → press logos → areas served (three) → FAQ → contact form → footer.

**Does better than anyone:** sold history on each agent page, and a restrained, expensive-feeling brand.

**Adopt:** per-agent "sold" grid as proof, and a short "milestones" row immediately under the hero.

**Avoid:** hiding the whole navigation behind a hamburger on desktop, hero with no search, no phone and no clear next step; auto-generated area pages that display "0 reviews, 0/5".

**Build notes:** navy #072C49, grey text #464846, white, light grey #F7F7F7. Fonts: Montserrat (body, wide-tracked uppercase labels), a display serif ("Medio"), Raleway. Hero: full-screen image slideshow. Platform: Luxury Presence. Mobile: heavy. One load: LCP ~2.5s, 132 requests, ~6.9MB (3.8MB of it JavaScript), 42 third-party hosts.

---

## 3. Vesta Preferred Realty - https://vestapreferred.com/

**Footer year / age:** © 2026, Luxury Presence. Markup carries a "redesign" header class and the look is current (white header, visible nav, navy accent, light display face): I judge it a 2024-25 refresh.

**Ranks for:** 6th organic for "Chicago real estate brokerage" in my results; title targets "Chicago Real Estate Agents".

**Top navigation:** For Sale · Buying · Selling · About · Contact · search icon · hamburger (Home Valuation, Neighborhoods, Rental Application, Mortgage Calculator, Testimonials, Careers, Blog, My Search Portal).

**Page types:** home, IDX search (buy and rent), listing detail, buying, selling, home valuation (third-party tool on a subdomain), team directory, individual agent pages (~50), neighbourhood index, neighbourhood pages, three region pages (Chicago / North Shore / Western Suburbs), testimonials, blog (very local, very recent posts), mortgage calculator, contact, careers.

**Individual agent page (sampled):** tinted stock-interior banner "About [Name]", portrait, direct phone, licence number, email, office address, seven social/review-profile icons (LinkedIn, Zillow, YouTube, Google, Facebook, Yelp, Instagram), "Get To Know Me" bio of ~130 words in three paragraphs (who they serve, how they work, a personal line), a testimonial carousel for that agent, the agent's listings, a search CTA, generic contact. ~450 words. Sampled bios ranged 75-270 words. No specialties, areas or languages as structured fields.

**Team directory:** one-line "Vesta Way" promise with three icons, name search, five-across grid of consistent studio headshots on a pale background, name and role. The consistency of the photography is the best of the five.

**Community page (Lincoln Park, ~3,300 words):** hero photo, "Neighborhood Guide" label, a hook paragraph, four key numbers, "at a glance", quick-facts table (ZIP, known for, housing mix, transit, parks, schools), "why buyers choose" bullets, history, housing by pocket, institutions, schools, dining and shopping, parks, getting around, community life, comparison with nearby neighbourhoods, "who it's right for", FAQ, next steps; then the automated blocks (listings, map, census overview, points of interest, demographics, schools) and nearby neighbourhoods. Genuinely written, with boxed "local tip" notes.

**Proof and where:** four award stats directly under the hero, each with the awarding body and years (top 1% producing brokerage 2015-2023; Chicago Association of Realtors platinum 2018-2024; RealTrends 2022-2024; $1B+ volume); "As Seen In" logo strip; a real group photo of the whole team; testimonials near the bottom and on a dedicated page (first name + initial, no source or date shown); Zillow and Google profile links in the footer.

**Contact / lead path:** phone not in the header; floating "Let's Connect" button bottom-left on desktop and a full-width sticky "Let's Connect" bar on mobile; cookie banner on load (about 40% of the mobile screen); accessibility widget button. **Forced registration:** opening the first listing from search immediately showed a blocking "Log in or sign up" dialog over the listing. Agent-specific "exclusive listings" email capture near the bottom.

**Home page section order:** header → video hero with Buy/Rent search → positioning line + four sourced award stats → three tiles (valuation / search / contact) → press logos → team photo + about → featured properties (for sale / sold tabs) → neighbourhood guides by region → recent blog posts → testimonials → exclusive-listings sign-up → work with us → footer.

**Does better than anyone:** consistent team photography and hand-written neighbourhood guides with a quick-facts table and "who it's right for".

**Adopt:** the neighbourhood template (hook → numbers → quick facts → who it suits → comparison with neighbours → FAQ) and grouping areas by region on the home page.

**Avoid:** the sign-up wall on the very first listing view; a home-page H1 that says only "Welcome Home"; shipping full-size photos to phones.

**Build notes:** navy #0C2345, grey #6C6F76, white, pale grey #EEEEEE. Fonts: a light display face ("Solare") for headings, Montserrat body. Hero: background video. Platform: Luxury Presence. Mobile: looks fine, loads badly. One load pulled ~111MB, ~107MB of it images; the largest files were 2-3MB listing JPEGs served unresized to a 390px screen. 222 requests, 35 hosts.

---

## 4. The Heilig Team - https://theheiligteam.com/

**Footer year / age:** © 2026, Luxury Presence. Copy mentions a team member who joined in 2025, so content is current; template look is 2023-25.

**Ranks for:** first non-directory result for "Harrisburg PA real estate agents".

**Top navigation:** Buyers · Sellers · Home Search · Home Valuation · Meet The Team · Property Management (external sister site) · Contact Us · Resources (Buying & Selling Advice, Community Guides, Real Estate FAQ, Market Reports, Portfolio, Mortgage Calculator, Upcoming Events, Testimonials).

**Page types:** home, IDX search, buyers, sellers, home valuation, team page, neighbourhood index and pages, testimonials, blog, FAQ, market reports, portfolio (their listings), mortgage calculator, events, contact. **Individual agent pages are not really used:** the team page links to no profiles; the only `/agent/` URL linked from the home page is for the operations director and its title tag is just her name.

**Agent content (on the single team page):** alternating left/right blocks per person: large candid photo, name, role, a 70-110 word bio that reads like a person (fifth-generation local, owns rentals, bilingual in Arabic, "tallest Realtor in Central PA"), email, mobile, and a row of profile icons (Google, Zillow, TikTok, Instagram, LinkedIn, Facebook). No reviews per agent, no listings per agent, no specialties.

**Community page (Harrisburg, ~3,000 words):** hero with a one-line promise to explain city boundaries and the buying process; listings; a written "practical guide for homebuyers" (city living versus the wider search area, parks, "what to verify before making an offer", home-search questions); then automated census, points of interest, demographics and schools; "explore other neighbourhoods" cards for adjacent townships. Home page links to three practical local explainers (cost to sell in Harrisburg; mailing address versus municipality; East Shore versus West Shore).

**Proof and where:** four stats mid-page (40+ years, 900+ sales, price range sold $60K-$2.1M, $200M+ volume) placed directly above the team headshots; testimonials section and a dedicated page (first names only, no source shown, though several name the agent); Google and Zillow profile links in the footer. No awards.

**Contact / lead path:** vanity phone number in the footer only; floating "Contact Us" button (desktop) and full-width sticky "Contact Us" bar (mobile); a home-valuation form embedded on the home page; exclusive-listings email capture; cookie banner plus a pop-in consent/chat frame on load. Same IDX product as site 3 (sign-up wall not re-tested here).

**Home page section order:** nav → hero (logo, H1 = what + where, team + brokerage line, one-sentence promise) → team story paragraph + three local-guide links → three tiles (search / contact / valuation) → stats + team headshots → Instagram → testimonials → valuation form → neighbourhoods (three) → featured properties → exclusive-listings sign-up → contact CTA → footer.

**Does better than anyone:** says exactly what and where in the title, the H1 and the first sentence, and its local explainers answer questions only a local would know to ask. Bios sound like people.

**Adopt:** the H1 = "[City] & [Region] Real Estate" discipline, a price-range-sold stat (reassures both ends of the market), and stats placed next to faces.

**Avoid:** no real agent profile URLs (nothing for an agent's name to rank on, nothing to link a review or listing to); a stock-looking house as the hero when the team photo is further down.

**Build notes:** charcoal #272624, red accent #D23241, white. Fonts: Cormorant (serif headings, uppercase), Questrial (body). Hero: background video/photo of a house. Platform: Luxury Presence. Mobile: LCP ~0.7s but ~15.6MB transferred (11.5MB images), 133 requests, 31 hosts.

---

## 5. Jim Bass Group - https://www.jimbassgroup.com/

**Footer year / age:** © 2026 (auto), "BoomTown" in the footer. The design is a 2017-2020 BoomTown template: system font, red buttons, circle image links, logo baked into a photo.

**Ranks for:** 2nd brokerage/team result for "Frederick MD real estate agents". Title tag repeats "Frederick, MD Real Estate" twice.

**Top navigation:** Home · Search (map search, photo search, our listings, finance) · Sellers · Home Valuation · Join Our Team · Our Reviews · Blog · Contact Us · Saved Searches · Favorites · Sign In.

**Page types:** home, IDX search (gallery and map), listing detail, buy, sell, home valuation, agents directory, individual agent pages (12), area "guides" (about 15), testimonials, blog, about our team, vendors list, finance, contact.

**Individual agent page (sampled: transaction manager):** small portrait in a sidebar card, name, role, office line, ~170-word bio in four short paragraphs (joined 1999, what she does, where she lives, a personal line), and a contact form beside it. No direct email, no reviews, no listings, no specialties, no languages. ~640 words including boilerplate.

**Directory:** mission and vision statements, then a two-column card list: small photo, name, role (seller specialist, referral partner, transaction manager), office phone, "View Profile", with a contact form alongside. Roles are a useful signal the other sites lack.

**Community page (Urbana "guide"):** an H1, "View 46 listings", a list of other guides and the IDX grid. No written content at all (~340 words, all navigation and legal text).

**Proof and where:** none on the home page beyond five stars in the logo. A long testimonials page: a "Best Place to Work in Frederick County" award note followed by dozens of client letters signed with first name and initial; no dates, sources or ratings.

**Contact / lead path:** phone numbers are part of the logo image, so not tappable (no tel: links found on the home page). Hero toggles between home search and home valuation. **Forced registration:** the second listing I opened was covered by a "Personalize your home search" sign-up dialog (Google / Facebook / email). Listing pages push "Tour in person / Video tour".

**Home page section order:** utility nav → hero photo of downtown Frederick with logo and tabbed search/valuation bar → three circles (gallery view, map view, meet the team) → "Top areas & neighbourhoods" as a list of IDX links with live counts → footer. ~560 words.

**Does better than anyone:** local identity in one image (a recognisable downtown scene, not a stock interior), and listing counts next to each area name.

**Adopt:** real local landmark photography as the hero, and showing each person's role on the roster.

**Avoid:** the whole "IDX portal with a logo" model: empty area pages, a home page with no proof and no people until you click away, phone number trapped in an image, sign-up wall on the second listing.

**Build notes:** red #DD3333, near-black #222222, off-white #F9F9F9. Fonts: system UI stack. Hero: static photo. Platform: WordPress + BoomTown IDX/CRM. Mobile: usable but generic. One load: LCP ~2.0s, 125 requests, ~11.2MB, layout shift 0.10.

---

## Runners-up seen but not fully reviewed

- **chiprop.com (Chicago Properties):** WordPress (Divi-style). Hero is a real team photo beside a block stating "800+ five-star reviews on Zillow and 20 years of experience" with a "Meet the Team" button. Nav: Home, About Us, Press, Neighborhoods, Find Homes, Insights, Contact. The clearest "people + sourced proof in the first screen" hero of anything opened. Home page has no H1.
- **thebrokerage.vegas:** WordPress. Aerial local hero, three big entry tiles (residential / commercial / management), phone in the nav, "Find an Agent" in the nav. Title tag is just "The Brokerage | Home", yet it is first for "Las Vegas real estate brokerage" (exact-match name and domain).
- **jerryriggleman.com (York PA):** solo agent on an IDX vendor template. Title "Best Realtor in York PA | …", H1 "York County Listing Specialist & Award-Winning REALTOR", phone and email in a top bar, hero with two buttons (home worth / featured listings) and a search box. Dated look, textbook what + where.
- **machomes.com (Mackintosh Realtors, Frederick and Hagerstown):** older regional-brokerage template, hero search with a "Search with AI (beta)" toggle, chat button, nav weighted to Agents, Offices, Free CMA, Relocation. Relevant because it covers Washington County, but only the desktop home loaded.

---

## Title tag and H1 patterns (best two, plus the cleanest small-team example)

### Nevada Real Estate Group

| Page | Title tag | H1 |
|---|---|---|
| Home | Nevada Real Estate Group: #1 Realtor Team in Las Vegas & Reno | Nevada Real Estate, From Las Vegas to Reno |
| Agents directory | Las Vegas Real Estate Agents \| Nevada Real Estate Group | Las Vegas real estate agents, without the runaround. |
| City agent landing | Henderson NV Real Estate Agents - Nevada Real Estate Group | Henderson NV Real Estate Agents - 150-Agent Team With 9,097+ Five-Star Reviews |
| Agent | Amanda Bolton \| REALTOR® \| Nevada Real Estate Group | Amanda Bolton |
| City | Henderson NV Real Estate 2026 - Prices, Neighborhoods & Schools | Henderson Real Estate |
| Community | Anthem Henderson NV: Homes for Sale, Villages & HOA Guide | Anthem Homes For Sale |
| Listing | 1921 Spring Lake Dr, Henderson NV 89002 \| 3 Bed Home for Sale $425,000 | (not captured) |

Pattern: **[Place + State] [thing] [year] - [three things you get]** for areas; **[Brand]: [claim] in [places]** for home; agent pages carry name + credential + brand but **no place**.

### Vesta Preferred Realty

| Page | Title tag | H1 |
|---|---|---|
| Home | Chicago Real Estate Agents \| Vesta Preferred Realty Brokerage | Welcome Home |
| Team | Meet the Vesta Preferred Realty Team \| Illinois Real Estate | Meet The Team |
| Agent (three sampled, three formats) | Meet Arlette Quinones - Your Real Estate Advocate / Aidan Kelly Chicago Real Estate Agent \| Let's Connect / Alyse Martinez - Chicago Real Estate \| Vesta Preferred Realty | About Arlette Quinones |
| Community | Lincoln Park, Chicago: Built Around Chicago's Largest Park | LINCOLN PARK |
| Reviews | Client Success Stories \| Vesta Preferred Realty | Testimonials |

Pattern: **[City] [what] \| [Brand]** in titles, but H1s are generic ("Welcome Home", "Meet The Team") so the what + where lives only in the title tag. Agent titles are hand-written and inconsistent.

### The Heilig Team (cleanest what + where)

| Page | Title tag | H1 |
|---|---|---|
| Home | Harrisburg & Central PA Real Estate \| The Heilig Team | Harrisburg & Central PA Real Estate |
| Team | Meet The Heilig Team \| Top Realtors in Central Pennsylvania | Meet The Heilig Team - Your Trusted Central PA Realtors |
| Community | Harrisburg PA Homes & Local Guide \| The Heilig Team | Harrisburg |
| Valuation | What is My Home Worth in Central PA? \| The Heilig Team | Find Out What Your Pennsylvania Home Is Worth |
| Reviews | Client Reviews \| The Heilig Team Realtors in Pennsylvania | What Our Clients Say - Heilig Team Testimonials |
| Agent | Abby Yurkovic | About Abby Yurkovic |

Pattern: **[City] & [Region] [what] \| [Team]**, repeated in the H1. Every utility page still names the region. Agent page is the exception: name only.

**Shared gap:** none of the three puts a place or a speciality in an individual agent's title tag. "[Name] - [City] Real Estate Agent, [speciality / language] \| [Brand]" is open ground.

---

## What the top-ranked sites have in common (structure)

1. The same core page set: home, listing search, buy, sell, agents directory, area pages, about, blog, contact, plus a home-valuation entry point. Reviews are a section more often than a destination.
2. What + where in the title tag of every important page. The small-market winners also repeat it in the H1.
3. Area pages are the SEO engine. The sites that rank in big metros have one page per city and per neighbourhood, with live listings on top and written local content underneath.
4. Three or four headline numbers (years, homes sold, volume, reviews) placed within the first two scrolls.
5. A three-tile "what do you want to do" row near the top: search, value my home, contact / meet the team.
6. Agent profile = photo, direct phone, email, licence number, a bio, a contact form. Anything beyond that is rare.
7. Listings shown on the home page (featured or the firm's own) and a search box or search entry in or just below the hero.
8. One lead form on the home page, usually valuation or "exclusive listings", plus a floating contact button.
9. A footer carrying phone, email, office address, licence and brokerage disclosure, and links to Google / Zillow profiles.

## How the newest ones are built

1. Either a luxury template platform (Luxury Presence on three of five) or, at the top end, a custom Next.js build on Vercel with its own MLS search and tools.
2. Two-font systems: an elegant display face for headings (serif or light geometric, often with one italic or coloured emphasis word) over a plain sans body (Inter, Montserrat, Questrial).
3. Restrained palettes: one dark (navy, charcoal or espresso), one warm or pale neutral, one accent (gold or red). Lots of white or cream space.
4. Full-bleed photo or background-video hero with a dark overlay, a short H1 and one action.
5. Visible five-to-eight item top nav on desktop with mega menus that double as internal linking (buy by lifestyle, communities by name). A market or region switcher where there is more than one market.
6. Proof with attribution: award body and year, review counts split by platform, "last updated" dates, licence numbers linked to the regulator.
7. Structured data on the newest build (RealEstateAgent, Place/City, FAQPage, Article, BreadcrumbList, Dataset) and question-style H2s written for answer engines.
8. Tools as content: instant home-value estimate, market reports by ZIP, price-drop and open-house feeds, calculators, with "no sign-up required" stated as a selling point.
9. Mobile: phone number promoted to a header button, a sticky bottom action bar on long pages, a chat launcher.
10. Consistent studio headshots (same background, same crop) on the better rosters; candid in-home portraits on the small team.

## Dated patterns to avoid

1. The "IDX portal with a logo" home page: search bar, three circles, a list of area links, no people and no proof.
2. Area "guide" pages that are only a listing grid, or only auto-generated census and Yelp tables (including rows reading "0 reviews, 0/5").
3. Forced registration pop-ups on the first or second listing view.
4. Phone numbers inside images or hidden until the footer.
5. Logo, tagline and stars baked into a hero photograph.
6. Hamburger-only navigation on desktop.
7. Stock interiors as page banners on agent and team pages, and stock houses as the home hero.
8. Cookie banner, Google one-tap sign-in, accessibility widget and chat bubble all landing on the first mobile screen at once.
9. Testimonials as an undated wall of first-name quotes with no source.
10. Mission and vision statements above the roster.
11. Title tags that repeat the same phrase twice, or say only "Home".
12. Instagram feed embeds as a major home-page section.

## Where they are all weak (the opening for Infinity)

1. **No way to choose an agent by need, area or language.** Every roster is a name search at best. Nobody lets you filter by city, speciality (first-time buyer, relocation, investor, 55+, military) or language spoken. The most advanced site replaces choice with "we will match you", which is a lead form, not help. With 13 agents across four regions, a filterable roster is easy for Infinity and nobody here has one.
2. **Agent pages are template-thin and inconsistent.** Bios range from empty to 800 words on the same site. Agent pages show team-wide stats instead of the agent's own record, areas, or what they are good at. Only one site shows an agent's sold homes; only two show reviews about that agent; only one shows languages, and only as a chip. One ranking team has no agent pages at all.
3. **Agent title tags carry no place or speciality.** Name-only titles mean agents cannot rank for "[name] realtor [city]" variants or for a niche.
4. **Reviews are rarely verifiable.** Only one site shows review counts per platform with a source tag on each quote. The rest show first-name quotes with no date, source or link, and none ties a review to a specific area page.
5. **Area pages are either empty or overwhelming.** Three sites lean on auto-generated data; the best one swings to 8,000 words and 80,000px on a phone. Nobody offers a tight, scannable area page of a few hundred well-chosen words, a handful of real numbers, who it suits, and which named agent knows it.
6. **Agents and areas are not connected.** No area page says "these two agents live and work here"; no agent page lists the neighbourhoods they cover with links. This is the most obvious missing internal link on all five.
7. **Lead capture before trust.** Sign-up walls on listings (two of three tested), stacked banners on mobile, and long forms asking for phone numbers before any value is given. Only the newest site lets you browse freely and says so.
8. **Heavy mobile pages.** Four of five shipped 7MB to 111MB on a single mobile load, mostly unresized photos and 30-40 third-party hosts. Only the custom build was light (1.6MB).
9. **Generic photography.** Stock interiors and stock houses stand in for the place and the people on most hero and banner images. Only two sites lead with a recognisably local scene, and only one runner-up puts the actual team in the hero.
10. **Phone is hard to find.** Three of five have no phone number in the header; one has it only as part of an image.
11. **Multi-region is unsolved for small firms.** Only the largest site handles more than one market, with a switcher. No small brokerage here presents several distant regions (as Infinity must: NV, IL, PA, MD) as one coherent brand with a local front door for each.
12. **Sameness.** Three of the five share one vendor's layout: hero, three tiles, stats, Instagram, testimonials, form. They are pleasant and interchangeable; nothing about the page tells you which city you are in until you read the words.

