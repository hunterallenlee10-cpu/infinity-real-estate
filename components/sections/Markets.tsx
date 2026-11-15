import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StateOutline } from "../StateOutline";
import { FaceChip } from "../RooflineFrame";
import { agentsInState } from "@/lib/agents";
import { markets, type Market } from "@/lib/markets";

const LAYOUT: Record<Market["code"], { tile: string; outline: string }> = {
  // Equal 2x2 on tablets; the unequal bento (Nevada largest) from lg up.
  NV: { tile: "md:col-span-6 lg:col-span-7 lg:min-h-[400px]", outline: "lg:h-32 lg:w-32" },
  PA: { tile: "md:col-span-6 lg:col-span-5 lg:min-h-[400px]", outline: "lg:h-24 lg:w-24" },
  IL: { tile: "md:col-span-6 lg:col-span-5", outline: "lg:h-24 lg:w-24" },
  MD: { tile: "md:col-span-6 lg:col-span-7", outline: "lg:h-24 lg:w-24" },
};

// Bento order: Nevada (largest, five agents) first, then PA, IL, MD.
const BENTO = (["NV", "PA", "IL", "MD"] as const).map((c) => markets.find((m) => m.code === c)!);

function intro(m: Market) {
  if (m.code === "MD") return "Looking for a Frederick County MD real estate agent? We serve Washington and Frederick counties.";
  return `Looking for a ${m.phrase}? We serve ${m.serviceArea}.`;
}

export function MarketTiles({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid gap-4 md:grid-cols-12 md:gap-5">
      {BENTO.map((m) => {
        const team = [...agentsInState(m.code)].sort((a, b) => Number(!!b.photo) - Number(!!a.photo));
        return (
          <li key={m.code} id={m.slug} className={`sheet relative flex min-w-0 scroll-mt-28 flex-col p-5 md:p-8 ${LAYOUT[m.code].tile}`}>
            {/* Outline sits in the header row, so it can never run under the text or buttons. */}
            <div className="flex items-start justify-between gap-4">
              <H className="min-w-0 text-[1.875rem] lg:text-[2.5rem]">
                <Link href={`/markets/${m.slug}`} className="underline-offset-[6px] hover:underline">
                  {m.name}
                </Link>
                <span className="mt-2 block font-sans text-[0.9375rem] leading-snug font-medium tracking-normal text-muted">
                  {m.headline}
                </span>
              </H>
              <StateOutline slug={m.slug} contour className={`pointer-events-none h-16 w-16 shrink-0 ${LAYOUT[m.code].outline}`} />
            </div>
            <p className="mt-4 max-w-[36rem] text-text">{intro(m)}</p>

            <div className="mt-auto pt-7">
              <ul className="flex -space-x-2" aria-label={`${m.name} agents`}>
                {team.map((a) => (
                  <li key={a.slug} title={a.name}>
                    <FaceChip agent={a} size={m.code === "NV" ? 56 : 48} />
                    <span className="sr-only">{a.name}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href={`/markets/${m.slug}`} className="btn btn-ink !min-h-11 max-w-full !px-4 text-[0.9375rem] !whitespace-normal">
                  Meet the {m.name} team
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                </Link>
                <a
                  href={m.idx}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-ghost !min-h-11 max-w-full bg-plat !px-4 text-[0.9375rem] !whitespace-normal"
                  aria-label={
                    m.code === "MD"
                      ? "Search Maryland homes on the Pennsylvania and Maryland MLS search, opens in a new tab"
                      : `${m.searchLabel} on the live MLS search, opens in a new tab`
                  }
                >
                  {m.searchLabel}
                  <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Markets() {
  return (
    <section id="markets" aria-labelledby="markets-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="reveal max-w-2xl">
          <h2 id="markets-title" className="text-[length:var(--text-h2)]">
            Four states. Local people in each.
          </h2>
          <p className="mt-3 text-[length:var(--text-lead)] text-muted">
            Real estate agents in PA, IL, NV and MD, in the places they know best.
          </p>
        </div>
        <div className="mt-8 md:mt-12">
          <MarketTiles />
        </div>
      </div>
    </section>
  );
}
