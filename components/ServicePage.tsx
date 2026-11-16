import { Shell } from "./Shell";
import { PageHero } from "./PageHero";
import { MatchButton } from "./MatchButton";
import { AskGroups } from "./AskGroups";
import { SearchLinks } from "./SearchLinks";
import { HowItWorks } from "./sections/HowItWorks";
import { FaqSection } from "./sections/FaqSection";
import { FinalCta } from "./sections/FinalCta";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { servicePageSchema } from "@/lib/schema";
import type { AskGroup } from "@/lib/services";
import type { Plan } from "./MovePlanner/types";

export type ServiceContent = {
  path: string;
  label: string;
  plan: Plan;
  display: string;
  headline: string;
  lead: string;
  schemaName: string;
  schemaDescription: string;
  askTitle: string;
  askLead: string;
  groups: AskGroup[];
  stepsTitle: string;
  steps: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  ownWords: string[];
  showSearch?: boolean;
  ctaTitle: string;
  ctaText: string;
};

/** One template for the Buy and Sell pages, driven by lib/services.ts and the agents' own bios. */
export function ServicePage({ c }: { c: ServiceContent }) {
  const prefill = { plan: c.plan, source: c.path };
  return (
    <Shell schema={servicePageSchema(c.schemaName, c.schemaDescription, c.path, c.label, c.faq)}>
      <PageHero crumbs={[{ name: "Home", href: "/" }, { name: c.label }]} display={c.display} headline={c.headline} lead={c.lead}>
        <MatchButton prefill={prefill} className="btn btn-ink w-full sm:w-auto" />
        <a href={business.phone.tel} className="btn btn-ghost w-full bg-plat sm:w-auto">
          <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
          Call {business.phone.display}
        </a>
      </PageHero>

      <section aria-labelledby="ask-title" className="section">
        <div className="wrap">
          <div className="max-w-2xl">
            <h2 id="ask-title" className="text-[length:var(--text-h2)]">
              {c.askTitle}
            </h2>
            <p className="mt-3 text-[length:var(--text-lead)] text-muted">{c.askLead}</p>
          </div>
          <div className="mt-8 md:mt-12">
            <AskGroups groups={c.groups} />
          </div>
        </div>
      </section>

      <section aria-label="In their words" className="ink-band contour-ink section text-paper">
        <div className="wrap">
          <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
            {c.ownWords.map((w) => (
              <li key={w} className="border-t border-paper/25 pt-5">
                <p className="font-display text-[length:var(--text-h3)] leading-snug text-paper md:text-[1.625rem]">{w}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-paper/75">In Infinity&rsquo;s own words.</p>
        </div>
      </section>

      <HowItWorks title={c.stepsTitle} steps={c.steps} prefill={prefill} />

      {c.showSearch && (
        <section aria-labelledby="svc-search-title" className="section border-t border-rule">
          <div className="wrap">
            <h2 id="svc-search-title" className="text-[length:var(--text-h2)]">
              Search live MLS listings.
            </h2>
            <p className="mt-3 max-w-[56ch] text-[length:var(--text-lead)] text-muted">
              Live search runs on Infinity&rsquo;s existing MLS feed. Each search opens in a new tab.
            </p>
            <div className="mt-8">
              <SearchLinks />
            </div>
          </div>
        </section>
      )}

      <FaqSection items={c.faq} title="Before you call." />
      <FinalCta title={c.ctaTitle} text={c.ctaText} prefill={prefill} />
    </Shell>
  );
}
