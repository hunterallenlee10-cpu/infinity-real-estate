import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { Shell } from "@/components/Shell";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RooflineFrame } from "@/components/RooflineFrame";
import { MatchButton } from "@/components/MatchButton";
import { AgentCard } from "@/components/AgentCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { agentBySlug, agentMeta, agentsInState, agentsWithPages, quoteText, shortName } from "@/lib/agents";
import { business } from "@/lib/business";
import { smsFor, telFor } from "@/lib/contact";
import { marketByCode } from "@/lib/markets";
import { agentSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return agentsWithPages.map((a) => ({ slug: a.slug }));
}

const ROLE = { PA: "agent", IL: "broker", NV: "agent", MD: "agent" } as const;

export async function generateMetadata({ params }: PageProps<"/agents/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = agentBySlug(slug);
  if (!a) return {};
  const m = marketByCode(a.state);
  const known = a.highlights[0]?.toLowerCase();
  const role = ROLE[a.state] === "broker" ? "Broker" : "Agent";
  let description = `${shortName(a)} is an Infinity Real Estate ${ROLE[a.state]} in ${m.name}${known ? `, known for ${known}` : ""}. Read ${a.first}'s story, then call or text directly.`;
  if (description.length > 158) description = `${shortName(a)} is an Infinity Real Estate ${ROLE[a.state]} in ${m.name}. Read ${a.first}'s story, then call or text directly.`;
  return pageMeta({
    title: `${shortName(a)}, ${m.name} Real Estate ${role} | Infinity`,
    description,
    path: `/agents/${a.slug}`,
  });
}

export default async function AgentPage({ params }: PageProps<"/agents/[slug]">) {
  const { slug } = await params;
  const a = agentBySlug(slug);
  if (!a || !agentsWithPages.includes(a)) notFound();
  const m = marketByCode(a.state);
  const others = agentsInState(a.state).filter((x) => x.slug !== a.slug);
  const langs = a.languages.filter((l) => l !== "english");
  // Portraits are never shown wider than the file's own width.
  const frameMax = a.photo ? Math.min(a.photo.w, 380) : 300;

  return (
    <Shell schema={agentSchema(a)}>
      <article>
        <section className="relative border-b border-rule">
          <div aria-hidden="true" className="contour-bg pointer-events-none absolute inset-0 hidden opacity-70 md:block" />
          <div className="wrap relative pt-2 pb-10 md:pt-6 md:pb-14">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Agents", href: "/agents" }, { name: shortName(a) }]} />
            <div className="mt-3 grid items-end gap-6 md:mt-8 md:grid-cols-[auto_1fr] md:gap-12">
              <div className="w-[62%] max-w-[240px] md:w-auto md:max-w-none" style={{ ["--frame" as string]: `${frameMax}px` }}>
                <div className="md:w-[min(var(--frame),32vw)]">
                  <RooflineFrame agent={a} sizes={`(min-width: 768px) ${frameMax}px, 240px`} monogramSize="lg" preload />
                </div>
              </div>
              <div className="min-w-0">
                <h1>
                  <span className="block text-[length:var(--text-h1)] leading-[1.02]" style={{ fontVariationSettings: '"opsz" 144' }}>
                    {a.name}
                  </span>
                  <span className="mt-3 block font-sans text-[length:var(--text-lead)] leading-snug font-medium tracking-normal text-text">
                    {m.name} real estate {ROLE[a.state]}
                  </span>
                </h1>
                {agentMeta(a) && <p className="mt-1 text-muted">{agentMeta(a)}</p>}
                {a.slug === "sylwia-baker" && <p className="text-muted">Pronounced Sylvia.</p>}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <MatchButton prefill={{ agentSlug: a.slug, state: a.state, source: "agent-page" }} className="btn btn-ink w-full sm:w-auto">
                    Match Me With {a.first}
                  </MatchButton>
                  <a href={telFor(a)} className="btn btn-ghost flex-1 bg-plat sm:flex-none">
                    <Phone aria-hidden="true" size={17} strokeWidth={1.5} />
                    Call {a.first}
                  </a>
                  <a href={smsFor(a)} className="btn btn-ghost flex-1 bg-plat sm:flex-none">
                    <MessageSquare aria-hidden="true" size={17} strokeWidth={1.5} />
                    Text {a.first}
                  </a>
                </div>
                {!a.cell && (
                  <p className="mt-3 text-[0.9375rem] text-muted">
                    {a.first}&rsquo;s direct number is not published. Calls and texts go to the main line, {business.phone.display}.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section aria-label={`About ${a.first}`} className="section">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              {a.quote && (
                <blockquote className="font-display border-l-2 border-clay pl-5 text-[length:var(--text-h3)] leading-snug text-ink italic md:text-[1.875rem]">
                  {quoteText(a.quote)}
                </blockquote>
              )}
              <h2 className="mt-10 text-[length:var(--text-h3)]">In {a.first}&rsquo;s words</h2>
              <div className="mt-4 max-w-[66ch] space-y-4 text-[1.0625rem] leading-relaxed text-text">
                {a.bio.map((p, i) => (
                  <p key={i}>{p.replace(/\s{2,}/g, " ")}</p>
                ))}
                {a.bioList && (
                  <div>
                    {a.bioList.heading && <p className="font-medium text-ink">{a.bioList.heading}</p>}
                    <ul className="mt-2 space-y-2">
                      {a.bioList.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rotate-45 bg-clay" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <aside aria-label={`${a.first} at a glance`} className="lg:col-span-4 lg:col-start-9">
              <div className="sheet p-5 md:p-6 lg:sticky lg:top-28">
                <h2 className="text-[length:var(--text-h3)]">Ask {a.first} about</h2>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {a.highlights.map((h) => (
                    <li key={h} className="chip">
                      {h}
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 space-y-3 border-t border-rule pt-5 text-[0.9375rem]">
                  <div>
                    <dt className="text-muted">Works in</dt>
                    <dd className="text-ink">
                      <Link href={`/markets/${m.slug}`} className="font-medium underline underline-offset-4">
                        {m.name}
                      </Link>
                      {a.areas.length > 0 ? `: ${a.areas.join(", ")}` : `: ${m.serviceArea}`}
                    </dd>
                  </div>
                  {langs.length > 0 && (
                    <div>
                      <dt className="text-muted">Languages</dt>
                      <dd className="text-ink">English and {langs.map((l) => l[0].toUpperCase() + l.slice(1)).join(", ")}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-muted">Cell</dt>
                    <dd>
                      <a href={telFor(a)} className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4">
                        {a.cell ? a.cell.display : `${business.phone.display} (main line)`}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${a.email ?? business.email}`}
                        className="inline-flex min-h-11 items-center gap-2 font-medium [overflow-wrap:anywhere] text-ink underline underline-offset-4"
                      >
                        <Mail aria-hidden="true" size={15} strokeWidth={1.5} className="shrink-0" />
                        {a.email ?? business.email}
                      </a>
                    </dd>
                  </div>
                </dl>
                <a href={m.idx} target="_blank" rel="noopener" className="btn btn-ghost mt-4 w-full !whitespace-normal" aria-label={`${m.searchLabel}, opens the live MLS search in a new tab`}>
                  {m.searchLabel}
                </a>
              </div>
            </aside>
          </div>
        </section>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="others-title" className="section border-t border-rule bg-plat">
          <div className="wrap">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 id="others-title" className="text-[length:var(--text-h2)]">
                More {m.name} agents
              </h2>
              <Link href={`/markets/${m.slug}`} className="btn btn-ghost self-start md:self-auto">
                The {m.name} team
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 lg:gap-x-6">
              {others.slice(0, 4).map((o) => (
                <li key={o.slug}>
                  <AgentCard agent={o} sizes="(min-width: 768px) 23vw, 46vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta
        title={`Work with ${a.first}.`}
        text={`Tell us about your move and ${a.first} will pick it up from there.`}
        prefill={{ agentSlug: a.slug, state: a.state, source: "agent-page-cta" }}
        buttonLabel={`Match Me With ${a.first}`}
      />
    </Shell>
  );
}
