import { Phone } from "lucide-react";
import { MatchButton } from "../MatchButton";
import { RooflineFrame } from "../RooflineFrame";
import { HeroRoute } from "./HeroRoute";
import { agentBySlug, AGENT_COUNT } from "@/lib/agents";
import { business } from "@/lib/business";

// Five prints on a contour field. One DOM: a peeking horizontal row on mobile, an overlapping cluster on desktop.
const CLUSTER = [
  {
    slug: "ellie-plante",
    caption: "Ellie Plante · NV",
    // never above native size: 01 is 1792px wide
    desk: "lg:absolute lg:left-[24%] lg:top-[9%] lg:z-20 lg:w-[52%]",
    mob: "w-[188px] md:w-[168px]",
    sizes: "(min-width: 1024px) 340px, 188px",
    preload: true,
  },
  {
    slug: "shannon-davis",
    caption: "Shannon Davis · NV",
    desk: "lg:absolute lg:left-[72%] lg:top-[1%] lg:z-30 lg:w-[28%] lg:rotate-[2deg]",
    mob: "w-[150px] md:w-[128px]",
    sizes: "(min-width: 1024px) 190px, 150px",
  },
  {
    slug: "jenny-lynn-johnston",
    caption: "Jenny Lynn Johnston · NV",
    desk: "lg:absolute lg:left-[0%] lg:top-[50%] lg:z-30 lg:w-[31%] lg:-rotate-[1.5deg]",
    mob: "w-[150px] md:w-[128px]",
    sizes: "(min-width: 1024px) 210px, 150px",
  },
  {
    slug: "joe-geeting",
    caption: "Joe Geeting · PA",
    desk: "lg:absolute lg:left-[73%] lg:top-[50%] lg:z-30 lg:w-[27%] lg:rotate-[1.5deg]",
    mob: "w-[132px] md:w-[128px]",
    sizes: "(min-width: 1024px) 170px, 132px",
  },
  {
    slug: "peg-steich",
    caption: "Peg Steich · MD",
    desk: "lg:absolute lg:left-[1%] lg:top-[5%] lg:z-30 lg:w-[25%] lg:-rotate-[2deg]",
    mob: "w-[132px] md:w-[128px]",
    sizes: "132px",
  },
] as const;

// DRAFT: recount the agents once the roster is confirmed
const FACTS = ["Since 1994", `4 states, ${AGENT_COUNT} local agents`, "Listing agent or buyer\u2019s agent"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="wrap grid grid-cols-1 items-center gap-10 pt-3 pb-16 sm:pt-6 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-28">
        {/* Type */}
        <div className="hero-head relative z-10 min-w-0 lg:col-span-6">
          <h1 id="hero-title" className="font-semibold">
            <span className="label block max-w-[46ch] font-sans text-[0.75rem] font-medium tracking-[0.16em] text-muted md:text-[0.8125rem]">
              Real estate agents in Pennsylvania, Illinois, Nevada and Maryland
            </span>{" "}
            <span className="hero-title text-ink">
              <HeroRoute variant={{ key: "wide", lines: 2, fs: 9.4 }} />
              <HeroRoute variant={{ key: "narrow", lines: 3, fs: 12.6 }} />
              <span className="relative block">
                Making realty <span className="hero-dreams">dreams</span>
              </span>{" "}
              <span className="relative block">come true.</span>
            </span>
          </h1>

          <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-text sm:mt-2 sm:text-[1.0625rem] md:text-[1.1875rem]">
            A boutique real estate firm in Pennsylvania, Illinois, Nevada and Maryland since 1994. Tell us where you are
            moving and we will put you with one local agent who handles it start to finish.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
            <MatchButton className="btn btn-ink w-full sm:w-auto" prefill={{ source: "hero" }} />
            <a href={business.phone.tel} className="btn btn-ghost hidden sm:inline-flex">
              <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
              Call {business.phone.display}
            </a>
          </div>

          <ul className="label mt-9 hidden max-w-[34rem] grid-cols-3 text-[0.75rem] leading-snug tracking-[0.1em] text-ink sm:grid">
            {FACTS.map((f, i) => (
              <li key={f} className={i === 0 ? "pr-4" : "border-l border-rule px-4"}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Portraits */}
        <div className="relative min-w-0 lg:col-span-6">
          <div className="contour-bg pointer-events-none absolute inset-y-[-20%] right-[-40%] left-[-14%] hidden [mask-image:linear-gradient(to_right,transparent,black_30%),linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [mask-composite:intersect] lg:block" aria-hidden="true" />
          <ul
            aria-label="Some of the Infinity agents"
            className="no-scrollbar -mr-4 flex snap-x gap-3 overflow-x-auto pr-4 pb-2 md:mr-0 md:justify-between md:overflow-visible md:pr-0 lg:relative lg:mr-0 lg:block lg:aspect-[1/0.98] lg:overflow-visible lg:pr-0"
          >
            {CLUSTER.map((c) => {
              const a = agentBySlug(c.slug)!;
              return (
                <li key={c.slug} className={`shrink-0 snap-start ${c.mob} ${c.desk}`}>
                  <RooflineFrame
                    agent={a}
                    mat
                    sizes={c.sizes}
                    preload={"preload" in c}
                    monogramSize="md"
                    caption={c.caption}
                  />
                </li>
              );
            })}
          </ul>
          <ul className="label mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.75rem] text-ink sm:hidden">
            {FACTS.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 border border-ink" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
