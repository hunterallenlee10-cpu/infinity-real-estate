import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { MatchButton } from "@/components/MatchButton";
import { StateOutline } from "@/components/StateOutline";
import { AgentRow } from "@/components/AgentRow";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { agentsInState } from "@/lib/agents";
import { business } from "@/lib/business";
import { marketFaq } from "@/lib/faq";
import { marketBySlug, markets } from "@/lib/markets";
import { marketSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

// Only the listed pages exist. Anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/markets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = marketBySlug(slug);
  if (!m) return {};
  return pageMeta({ title: m.metaTitle, description: m.metaDescription, path: `/markets/${m.slug}` });
}

export default async function MarketPage({ params }: PageProps<"/markets/[slug]">) {
  const { slug } = await params;
  const m = marketBySlug(slug);
  if (!m) notFound();
  // Agents with a photo and a published bio first.
  const team = [...agentsInState(m.code)].sort((a, b) => Number(!!b.photo) + Number(b.bio.length > 0) - (Number(!!a.photo) + Number(a.bio.length > 0)));
  const faq = marketFaq(m);
  const one = team.length === 1;
  const others = markets.filter((x) => x.code !== m.code);

  return (
    <Shell schema={marketSchema(m, faq)}>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Markets", href: "/markets" }, { name: m.name }]}
        display={m.name}
        headline={`${m.headline}.`}
        lead={`${m.serviceArea}.`}
        art={<StateOutline slug={m.slug} contour strokeWidth={1.75} className="hidden h-56 w-56 shrink-0 lg:block xl:h-64 xl:w-64" />}
      >
        <MatchButton prefill={{ state: m.code, source: `market-${m.slug}` }} className="btn btn-ink w-full sm:w-auto">
          Match Me With {one ? team[0].first : `${/^[AEIOU]/.test(m.name) ? "an" : "a"} ${m.name} Agent`}
        </MatchButton>
        <a
          href={m.idx}
          target="_blank"
          rel="noopener"
          className="btn btn-ghost w-full bg-plat sm:w-auto"
          aria-label={`${m.searchLabel} on the live MLS search, opens in a new tab`}
        >
          {m.searchLabel}
          <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
        </a>
      </PageHero>

      <section aria-labelledby="team-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id="team-title" className="text-[length:var(--text-h2)]">
                {one ? `Your ${m.name} agent.` : `Your ${m.name} agents.`}
              </h2>
              <p className="mt-3 text-[length:var(--text-lead)] text-muted">
                {one ? "Call or text directly." : "Call or text whoever fits."} The chips come from their own bios.
              </p>
              <p className="mt-6 font-medium text-ink">Areas</p>
              <p className="mt-1 text-muted">{m.areas.join(", ")}.</p>
            </div>
          </div>
          <ul className="space-y-4 lg:col-span-8">
            {team.map((a) => (
              <li key={a.slug} className="reveal">
                <AgentRow agent={a} chips={a.highlights} prefill={{ source: `market-${m.slug}` }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="mk-search-title" className="section border-t border-rule bg-plat">
        <div className="wrap grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="mk-search-title" className="text-[length:var(--text-h2)]">
              Search {m.name} homes.
            </h2>
            <p className="mt-3 max-w-[52ch] text-[length:var(--text-lead)] text-muted">
              {m.code === "MD"
                ? "Maryland listings are on the same live MLS search as Pennsylvania. It opens in a new tab."
                : "Live MLS listings, on Infinity’s existing feed. The search opens in a new tab."}
            </p>
          </div>
          {/* TODO at launch: embed the iHomefinder Kestrel widget for this state here. */}
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a
              href={m.idx}
              target="_blank"
              rel="noopener"
              className="btn btn-ink w-full sm:w-auto"
              aria-label={`${m.searchLabel} on the live MLS search, opens in a new tab`}
            >
              {m.searchLabel}
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </a>
            <a href={business.phone.tel} className="btn btn-ghost w-full sm:w-auto">
              <Phone aria-hidden="true" size={17} strokeWidth={1.5} />
              Call {business.phone.display}
            </a>
          </div>
        </div>
      </section>

      <FaqSection items={faq} title={`${m.name} questions.`} />

      <section aria-label="Other markets" className="border-t border-rule py-10">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-1">
          <p className="font-medium text-ink">Moving somewhere else?</p>
          {others.map((o) => (
            <Link key={o.code} href={`/markets/${o.slug}`} className="inline-flex min-h-11 items-center text-ink underline underline-offset-4">
              {o.name} agents
            </Link>
          ))}
        </div>
      </section>

      <FinalCta
        title={one ? `Talk to ${team[0].first}.` : `Find your ${m.name} agent.`}
        text={`Tell us about your move in ${m.name}. We will take it from there.`}
        prefill={{ state: m.code, source: `market-${m.slug}-cta` }}
      />
    </Shell>
  );
}
