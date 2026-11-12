// Every business fact used on the site lives here. Source: infinitypa.com (Home, About Us,
// Service Locations and the four state team pages), read November 2026. Invent nothing.

export const SITE_MODE: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";

// NEXT_PUBLIC_SITE_URL wins. On Vercel the production URL is exposed automatically as a fallback.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const IS_LIVE = SITE_MODE === "live";

export const business = {
  name: "Infinity Real Estate",
  displayName: "Infinity Real Estate / Infinity Realty (NV)",
  alternateName: "Infinity Realty (NV)",
  shortName: "Infinity",
  copyrightName: "Infinity Real Estate/Realty",
  founded: "1994",
  foundedLine: "Established in 1994 in Nevada.",
  expandedLine: "Later expanded elsewhere in the country.",
  phone: {
    display: "(888) 213-6110",
    tel: "tel:+18882136110",
    sms: "sms:+18882136110",
    e164: "+18882136110",
    schema: "+1-888-213-6110",
  },
  email: "support@infinityresupport.com",
  nvLicence: "NV LIC #B.1002433.LLC",
  currentWebsite: "https://infinitypa.com",
  mainSearchPhrase: "real estate agents in PA, IL, NV and MD",
  // Their own words
  lines: {
    headline: "Making realty dreams come true.",
    since: "Offering Personalized Real Estate Services to Each Client Since 1994.",
    dedicated: "Dedicated to helping each client.",
    clear: "Our communication is always clear.",
    values: "authentic, conscientious, and thorough representation",
    individual: "Each client is treated as an individual.",
    handsOn: "Hands-on approach",
    bothHats: "We can quickly wear both hats, a listing agent and a buyer’s agent.",
    network: "We guide them through every step of the process with an extended network of brokers/agents in each state.",
  },
} as const;

// Current IDX search pages (iHomefinder Kestrel) on the existing WordPress site.
// TODO at launch: embed the iHomefinder Kestrel widget on the new domain.
export const idx = {
  nevada: "https://infinitypa.com/nevada-real-estate-search/",
  illinois: "https://infinitypa.com/illinois-real-estate-search/",
  pennsylvania: "https://infinitypa.com/pennsylvania-real-estate-search/",
  // The Pennsylvania search also covers Maryland.
  maryland: "https://infinitypa.com/pennsylvania-real-estate-search/",
} as const;

// Robin is a referral partner, not on the active roster.
// DRAFT: confirm Robin is happy to be featured as a referral partner.
export const referral = {
  name: "Robin Keefover",
  firstName: "Robin",
  title: "REALTOR, Myrtle Beach, SC",
  phoneDisplay: "(843) 902-8411",
  tel: "tel:+18439028411",
  email: "robinkeefover@gmail.com",
  photo: "/images/10-agent-PA-SC-robin-keefover-crop.webp",
  photoW: 397,
  photoH: 692,
  alt: "Robin Keefover, Myrtle Beach South Carolina REALTOR, smiling on the beach",
};

export const nav = [
  { label: "Agents", href: "/#agents" },
  { label: "Markets", href: "/#markets" },
  { label: "Search Homes", href: "/#search" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
] as const;
