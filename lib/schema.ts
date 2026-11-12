// JSON-LD. Only true, published facts: no ratings, reviews, prices, awards, addresses or opening hours.
import { agents } from "./agents";
import { SITE_URL, business } from "./business";
import { faq } from "./faq";

const ORG_ID = `${SITE_URL}/#organization`;
export const OG_IMAGE = "/og-image.png";

const AREAS = [
  { "@type": "AdministrativeArea", name: "Pennsylvania" },
  { "@type": "AdministrativeArea", name: "Central Pennsylvania" },
  { "@type": "Place", name: "Philadelphia area" },
  { "@type": "AdministrativeArea", name: "Illinois" },
  { "@type": "Place", name: "Chicagoland" },
  { "@type": "AdministrativeArea", name: "Nevada" },
  { "@type": "City", name: "Las Vegas" },
  { "@type": "City", name: "Henderson" },
  { "@type": "City", name: "Boulder City" },
  { "@type": "City", name: "Pahrump" },
  { "@type": "Place", name: "Lake Las Vegas" },
  { "@type": "AdministrativeArea", name: "Maryland" },
  { "@type": "AdministrativeArea", name: "Washington County, Maryland" },
  { "@type": "AdministrativeArea", name: "Frederick County, Maryland" },
];

const LANG_CODES = { english: "en", greek: "el", polish: "pl" } as const;

function organization() {
  return {
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: business.name,
    alternateName: [business.alternateName, business.displayName],
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/00-logo-2-logo-infinity-realty-large.png`, width: 1200, height: 563 },
    image: `${SITE_URL}${OG_IMAGE}`,
    telephone: business.phone.schema,
    email: business.email,
    foundingDate: business.founded,
    slogan: business.lines.headline,
    description:
      "Infinity Real Estate is a boutique real estate firm serving Pennsylvania, Illinois, Nevada and Maryland since 1994.",
    areaServed: AREAS,
    knowsLanguage: ["en", "el", "pl"],
  };
}

function people() {
  return agents.map((a) => ({
    "@type": "Person",
    "@id": `${SITE_URL}/#agent-${a.slug}`,
    name: a.name.replace(/[“”]/g, '"'),
    ...(a.title ? { jobTitle: a.title } : {}),
    ...(a.cell ? { telephone: `+1-${a.cell.display.replace(/[()]/g, "").replace(" ", "-")}` } : {}),
    ...(a.email ? { email: a.email } : {}),
    ...(a.photo ? { image: `${SITE_URL}${a.photo.src}` } : {}),
    knowsLanguage: a.languages.map((l) => LANG_CODES[l]),
    worksFor: { "@id": ORG_ID },
  }));
}

function services() {
  const items = [
    { name: "Buyer representation", desc: "A local agent who guides buyers through every step of finding and buying a home." },
    { name: "Seller representation", desc: "A local agent who handles listing and selling a home, with clear communication from list price to closing." },
    {
      name: "Investment and commercial real estate help",
      desc: "Help with investment, rental and commercial property, and leasing, from agents with that experience in their own bios.",
    },
  ];
  return items.map((s, i) => ({
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${i + 1}`,
    name: s.name,
    serviceType: s.name,
    description: s.desc,
    provider: { "@id": ORG_ID },
    areaServed: AREAS.filter((x) => ["Pennsylvania", "Illinois", "Nevada", "Maryland"].includes(x.name)),
  }));
}

function faqPage() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: business.name, publisher: { "@id": ORG_ID } },
      organization(),
      ...people(),
      ...services(),
      faqPage(),
    ],
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
        ],
      },
    ],
  };
}
