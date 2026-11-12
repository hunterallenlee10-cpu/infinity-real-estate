import { ArrowUpRight } from "lucide-react";
import { StateOutline } from "../StateOutline";
import { FaceChip } from "../RooflineFrame";
import { TeamLink } from "../Team/TeamLink";
import { agentsInState } from "@/lib/agents";
import { markets, type Market } from "@/lib/markets";

const LAYOUT: Record<Market["code"], { tile: string; outline: string }> = {
  NV: { tile: "md:col-span-7 md:min-h-[440px]", outline: "md:h-64 md:w-64" },
  PA: { tile: "md:col-span-5 md:min-h-[440px]", outline: "md:h-44 md:w-44" },
  IL: { tile: "md:col-span-5", outline: "md:h-44 md:w-44" },
  MD: { tile: "md:col-span-7", outline: "md:h-44 md:w-44" },
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
                <StateOutline
                  slug={m.slug}
                  contour
                  className={`pointer-events-none absolute top-5 right-4 h-20 w-20 opacity-90 md:top-auto md:-right-4 md:-bottom-4 ${LAYOUT[m.code].outline}`}
                />
                <div className="relative max-w-[30rem] pr-20 md:pr-0">
                  <h3 className="text-[2rem] md:text-[2.5rem]">
                    {m.name}
                    <span className="label mt-2 block font-sans text-[0.75rem] font-medium tracking-[0.12em] text-muted">
                      {m.phrase}
                    </span>
                  </h3>
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
