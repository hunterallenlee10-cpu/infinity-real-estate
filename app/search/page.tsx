import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { MatchButton } from "@/components/MatchButton";
import { StateOutline } from "@/components/StateOutline";
import { FinalCta } from "@/components/sections/FinalCta";
import { WEST_TO_EAST, marketByCode } from "@/lib/markets";
import { simplePageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Search Homes in PA, IL, NV & MD | Infinity Real Estate",
  description:
    "Search live MLS listings in Nevada, Illinois, Pennsylvania and Maryland with Infinity Real Estate, or ask a local agent to send you a short list.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <Shell schema={simplePageSchema("Search homes", "/search")}>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Search homes" }]}
        display="Search live MLS listings."
        headline="Homes for sale in Nevada, Illinois, Pennsylvania and Maryland."
        lead="Live search runs on Infinity's existing MLS feed. Pick a state. The search opens in a new tab."
      />
      <section aria-label="Search by state" className="section">
        <div className="wrap">
          {/* TODO at launch: embed the iHomefinder Kestrel widget on the new domain. */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WEST_TO_EAST.map((code) => {
              const m = marketByCode(code);
              return (
                <li key={code} className="sheet flex flex-col p-5 md:p-6">
                  <StateOutline slug={m.slug} contour className="h-20 w-20" />
                  <h2 className="mt-4 text-[1.75rem]">{m.name}</h2>
                  <p className="mt-1 flex-1 text-[0.9375rem] text-muted">{m.serviceArea}</p>
                  <a
                    href={m.idx}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ink mt-5 w-full !justify-between !whitespace-normal text-left"
                    aria-label={`${m.searchLabel} on the live MLS search, opens in a new tab`}
                  >
                    {m.searchLabel}
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} className="shrink-0" />
                  </a>
                  <Link href={`/markets/${m.slug}`} className="mt-2 inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink underline underline-offset-4">
                    Meet the {m.name} team
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="sheet mt-10 grid items-center gap-5 p-5 md:grid-cols-[1fr_auto] md:p-7">
            <div>
              <h2 className="text-[length:var(--text-h3)]">Rather have a short list?</h2>
              <p className="mt-1 max-w-[56ch] text-muted">Tell a local agent what you are looking for and where, and ask for a short list.</p>
            </div>
            <MatchButton prefill={{ plan: "buying", source: "search" }} className="btn btn-ink w-full md:w-auto" />
          </div>
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}
