import { ArrowUpRight } from "lucide-react";
import { StateOutline } from "../StateOutline";
import { FaceChip } from "../RooflineFrame";
import { TeamLink } from "../Team/TeamLink";
import { agentsInState } from "@/lib/agents";
import { markets, type Market } from "@/lib/markets";

const LAYOUT: Record<Market["code"], { tile: string; outline: string }> = {
  // Equal 2x2 on tablets; the unequal bento (Nevada largest) from lg up.
  NV: { tile: "md:col-span-6 lg:col-span-7 lg:min-h-[420px]", outline: "lg:h-32 lg:w-32" },
  PA: { tile: "md:col-span-6 lg:col-span-5 lg:min-h-[420px]", outline: "lg:h-24 lg:w-24" },
  IL: { tile: "md:col-span-6 lg:col-span-5", outline: "lg:h-24 lg:w-24" },
  MD: { tile: "md:col-span-6 lg:col-span-7", outline: "lg:h-24 lg:w-24" },
};

// Bento order: Nevada (largest, five agents) first, then PA, IL, MD.
const BENTO = (["NV", "PA", "IL", "MD"] as const).map((c) => markets.find((m) => m.code === c)!);

function intro(m: Market) {
  if (m.code === "MD") return "Looking for a Frederick County MD real estate agent? We serve Washington and Frederick counties.";
  return `Looking for a ${m.phrase}? We serve ${m.serviceArea}.`;
}

export function Markets() {
  return (
    <section id="markets" aria-labelledby="markets-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="label text-muted">Markets</p>
          <h2 id="markets-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
            Four states. Local people in each.
          </h2>
          <p className="mt-3 text-[1.125rem] text-muted">
            Real estate agents in PA, IL, NV and MD, in the places they know best.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          {BENTO.map((m) => {
            const team = [...agentsInState(m.code)].sort((a, b) => Number(!!b.photo) - Number(!!a.photo));
            const peg = m.code === "MD" ? team[0] : null;
            return (
              <li key={m.code} id={m.slug} className={`sheet relative flex scroll-mt-28 flex-col overflow-hidden p-6 md:p-8 ${LAYOUT[m.code].tile}`}>
                {/* Outline sits in the header row, so it can never run under the text or buttons. */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-[1.875rem] lg:text-[2.5rem]">
                    {m.name}
                    <span className="label mt-2 block font-sans text-[0.75rem] font-medium tracking-[0.12em] text-muted">
                      {m.phrase}
                    </span>
                  </h3>
                  <StateOutline
                    slug={m.slug}
                    contour
                    className={`pointer-events-none h-16 w-16 shrink-0 opacity-90 ${LAYOUT[m.code].outline}`}
                  />
                </div>
                <div className="max-w-[36rem]">
                  <p className="mt-4 text-text">{intro(m)}</p>
                  {peg && (
                    <p className="mt-2 text-text">
                      {peg.name.replace("Peggy “Peg”", "Peg")}, licensed in Maryland, {peg.experience}.
                    </p>
                  )}
                </div>

                <div className="relative mt-auto pt-8">
                  <ul className="flex -space-x-2" aria-label={`${m.name} agents`}>
                    {team.map((a) => (
                      <li key={a.slug} title={a.name}>
                        <FaceChip agent={a} size={m.code === "NV" ? 56 : 48} />
                        <span className="sr-only">{a.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <a
                      href={m.idx}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-ink !min-h-11 !px-4 text-[0.9375rem]"
                      aria-label={
                        m.code === "MD"
                          ? "Search Maryland homes on the Pennsylvania and Maryland MLS search, opens in a new tab"
                          : `${m.searchLabel} on the live MLS search, opens in a new tab`
                      }
                    >
                      {m.searchLabel}
                      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
                    </a>
                    <TeamLink state={m.code} className="btn btn-ghost !min-h-11 bg-plat !px-4 text-[0.9375rem]">
                      Meet the {m.name} team
                    </TeamLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
