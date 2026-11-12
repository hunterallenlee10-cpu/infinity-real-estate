// Market data. Service areas are word for word from infinitypa.com/service-locations/.
import { idx } from "./business";
import type { StateSlug } from "./states";

export type StateCode = "PA" | "IL" | "NV" | "MD";

export type Market = {
  code: StateCode;
  slug: StateSlug;
  name: string;
  /** Exact wording from their Service Locations page */
  serviceArea: string;
  /** Market search phrase, used in the tile's h3 and first sentence */
  phrase: string;
  /** Area chips for Agent Match and the Move Planner */
  areas: string[];
  idx: string;
  searchLabel: string;
};

export const markets: Market[] = [
  {
    code: "PA",
    slug: "pennsylvania",
    name: "Pennsylvania",
    serviceArea: "Central Pennsylvania and the Philadelphia area",
    phrase: "Central Pennsylvania real estate agent",
    areas: ["Central Pennsylvania", "Philadelphia area"],
    idx: idx.pennsylvania,
    searchLabel: "Search Pennsylvania homes",
  },
  {
    code: "IL",
    slug: "illinois",
    name: "Illinois",
    serviceArea: "Chicagoland and surrounding areas",
    phrase: "Chicagoland real estate broker",
    areas: ["Chicagoland", "Surrounding areas"],
    idx: idx.illinois,
    searchLabel: "Search Illinois homes",
  },
  {
    code: "NV",
    slug: "nevada",
    name: "Nevada",
    serviceArea: "Las Vegas, Henderson, Boulder City, Pahrump, and surrounding areas",
    phrase: "Las Vegas and Henderson real estate agent",
    areas: ["Las Vegas", "Henderson", "Boulder City", "Pahrump", "Lake Las Vegas", "Las Vegas Valley"],
    idx: idx.nevada,
    searchLabel: "Search Nevada homes",
  },
  {
    code: "MD",
    slug: "maryland",
    name: "Maryland",
    serviceArea: "Washington and Frederick counties",
    phrase: "Frederick County MD real estate agent",
    areas: ["Washington County", "Frederick County"],
    idx: idx.maryland,
    searchLabel: "Search Maryland homes",
  },
];

/** West to east, used by the hero route and the Agent Match tiles */
export const WEST_TO_EAST: StateCode[] = ["NV", "IL", "PA", "MD"];

export const marketByCode = (code: StateCode) => markets.find((m) => m.code === code)!;
