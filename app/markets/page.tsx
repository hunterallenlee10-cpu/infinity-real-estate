import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { MatchButton } from "@/components/MatchButton";
import { MarketTiles } from "@/components/sections/Markets";
import { FinalCta } from "@/components/sections/FinalCta";
import { marketsSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Where We Work: PA, IL, NV & MD | Infinity Real Estate",
  description:
    "Infinity Real Estate serves Central Pennsylvania and Philadelphia, Chicagoland, Las Vegas and Henderson, and Washington and Frederick counties in Maryland.",
  path: "/markets",
});

const PLACES = [
  "Central Pennsylvania",
  "the Philadelphia area",
  "Chicagoland",
  "Las Vegas",
  "Henderson",
  "Boulder City",
  "Pahrump",
  "Lake Las Vegas",
  "Washington County MD",
  "Frederick County MD",
];

export default function MarketsPage() {
  return (
    <Shell schema={marketsSchema()}>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Markets" }]}
        display="Four states. Local people in each."
        headline="Real estate agents in Pennsylvania, Illinois, Nevada and Maryland."
        lead="Established in 1994 in Nevada, later expanded elsewhere in the country. Pick a state to meet its agents and search its homes."
      >
        <MatchButton prefill={{ source: "markets" }} />
      </PageHero>
      <section aria-label="Markets" className="section">
        <div className="wrap">
          <MarketTiles headingLevel={2} />
          <p className="mt-10 max-w-[70ch] text-muted">Places we serve: {PLACES.join(", ")}.</p>
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}
