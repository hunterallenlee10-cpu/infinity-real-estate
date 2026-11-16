import Link from "next/link";
import { Phone } from "lucide-react";
import { MatchButton } from "../MatchButton";
import { RooflineFrame } from "../RooflineFrame";
import { HeroRoute } from "./HeroRoute";
import { agentBySlug } from "@/lib/agents";
import { business } from "@/lib/business";

// Five prints on a contour field, all real faces, each linking to that agent's page. One DOM: a peeking horizontal row on mobile, an overlapping cluster on desktop.
const CLUSTER = [
  {
    slug: "ellie-plante",
    caption: "Ellie Plante · NV",
    // never above native size: 01 is 1792px wide
    desk: "lg:absolute lg:left-[24%] lg:top-[9%] lg:z-20 lg:w-[52%]",
    mob: "w-[160px] md:w-[168px]",
    sizes: "(min-width: 1024px) 340px, 168px",
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
    slug: "breanna-freeburg-smith",
    caption: "Breanna Freeburg-Smith · IL",
    desk: "lg:absolute lg:left-[1%] lg:top-[5%] lg:z-30 lg:w-[25%] lg:-rotate-[2deg]",
    mob: "w-[132px] md:w-[128px]",
    sizes: "132px",
  },
] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="wrap grid grid-cols-1 items-center gap-8 pt-3 pb-4 sm:gap-10 sm:pt-6 sm:pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-28">
        {/* Type */}
        <div className="hero-head relative z-10 min-w-0 lg:col-span-6">
          {/* One h1: their own line large, then the what-and-where line in plain sentence case. */}
          <h1 id="hero-title" className="font-semibold">
            <span className="hero-title text-ink">
              <HeroRoute variant={{ key: "wide", lines: 2, fs: 9.4 }} />
              <HeroRoute variant={{ key: "narrow", lines: 3, fs: 12.6 }} />
              <span className="relative block">
                Making realty <span className="hero-dreams">dreams</span>
              </span>{" "}
              <span className="relative block">come true.</span>
            </span>{" "}
            <span className="mt-3 block max-w-[34ch] font-sans text-[length:var(--text-lead)] leading-snug font-medium tracking-normal text-ink sm:mt-2">
              Real estate agents in Pennsylvania, Illinois, Nevada and Maryland.
            </span>
          </h1>

          <p className="mt-2 max-w-[46ch] text-[1rem] leading-relaxed text-muted sm:text-[1.0625rem]">
            A boutique firm since 1994. Tell us where you are moving and we will put you with one local agent who
            handles it start to finish.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
            <MatchButton className="btn btn-ink w-full sm:w-auto" prefill={{ source: "hero" }} />
            <a href={business.phone.tel} className="btn btn-ghost hidden sm:inline-flex">
              <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
              Call {business.phone.display}
            </a>
          </div>

          {/* Proof he is real, in the firm's own licence wording. No invented numbers. */}
          <p className="mt-6 hidden text-[0.875rem] text-muted sm:block">
            {business.displayName} &middot; {business.nvLicence} &middot; Equal Housing Opportunity
          </p>
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
                  <Link href={`/agents/${a.slug}`} className="block transition-transform duration-200 hover:-translate-y-0.5">
                    <RooflineFrame agent={a} mat sizes={c.sizes} preload={"preload" in c} monogramSize="md" caption={c.caption} />
                  </Link>
                </li>
              );
            })}
          </ul>
<p className="mt-5 text-[0.875rem] text-muted sm:hidden">
            {business.displayName} &middot; {business.nvLicence}
          </p>
        </div>
      </div>
    </section>
  );
}
