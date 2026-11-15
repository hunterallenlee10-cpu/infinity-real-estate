// JSON-LD. Only true, published facts: no ratings, reviews, prices, awards, addresses or opening hours.
// Reviews about the business are never marked up on its own site.
import { agents, hasPage, shortName, type Agent } from "./agents";
import { SITE_URL, business } from "./business";
import { faq } from "./faq";
import type { Market } from "./markets";

const ORG_ID = `${SITE_URL}/#organization`;
export const OG_IMAGE = "/og-image.png";

const STATE_AREAS = ["Pennsylvania", "Illinois", "Nevada", "Maryland"].map((name) => ({ "@type": "AdministrativeArea", name }));
const AREAS = [
  ...STATE_AREAS,
  { "@type": "AdministrativeArea", name: "Central Pennsylvania" },
  { "@type": "Place", name: "Philadelphia area" },
  { "@type": "Place", name: "Chicagoland" },
  { "@type": "City", name: "Las Vegas" },
  { "@type": "City", name: "Henderson" },
  { "@type": "City", name: "Boulder City" },
  { "@type": "City", name: "Pahrump" },
  { "@type": "Place", name: "Lake Las Vegas" },
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

function person(a: Agent) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/agents#${a.slug}`,
    name: a.name.replace(/[“”]/g, '"'),
    ...(hasPage(a) ? { url: `${SITE_URL}/agents/${a.slug}` } : {}),
    ...(a.title ? { jobTitle: a.title } : {}),
    ...(a.cell ? { telephone: `+1-${a.cell.display.replace(/[()]/g, "").replace(" ", "-")}` } : {}),
    ...(a.email ? { email: a.email } : {}),
    ...(a.photo ? { image: `${SITE_URL}${a.photo.src}` } : {}),
    knowsLanguage: a.languages.map((l) => LANG_CODES[l]),
    worksFor: { "@id": ORG_ID },
  };
}

function service(name: string, description: string, path: string, areas = STATE_AREAS) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType: name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: areas,
  };
}

export type Crumb = { name: string; path: string };
function breadcrumbs(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "/" : c.path}`,
    })),
  };
}

const faqPage = (items: { q: string; a: string }[], path: string) => ({
  "@type": "FAQPage",
  "@id": `${SITE_URL}${path}#faq`,
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeSchema() {
  return graph(
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: business.name, publisher: { "@id": ORG_ID } },
    organization(),
    faqPage(faq, "/"),
  );
}

export const agentsSchema = () => graph(organization(), ...agents.map(person), breadcrumbs([{ name: "Agents", path: "/agents" }]));

export const agentSchema = (a: Agent) =>
  graph(
    organization(),
    person(a),
    breadcrumbs([
      { name: "Agents", path: "/agents" },
      { name: shortName(a), path: `/agents/${a.slug}` },
    ]),
  );

export const marketsSchema = () => graph(organization(), breadcrumbs([{ name: "Markets", path: "/markets" }]));

export const marketSchema = (m: Market, items: { q: string; a: string }[]) =>
  graph(
    organization(),
    service(`Real estate agent services in ${m.name}`, `${m.headline}. ${m.serviceArea}.`, `/markets/${m.slug}`, [
      { "@type": "AdministrativeArea", name: m.name },
    ]),
    faqPage(items, `/markets/${m.slug}`),
    breadcrumbs([
      { name: "Markets", path: "/markets" },
      { name: m.name, path: `/markets/${m.slug}` },
    ]),
  );

export const servicePageSchema = (name: string, description: string, path: string, label: string, items: { q: string; a: string }[]) =>
  graph(organization(), service(name, description, path), faqPage(items, path), breadcrumbs([{ name: label, path }]));

export const simplePageSchema = (label: string, path: string) => graph(organization(), breadcrumbs([{ name: label, path }]));
