import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { MatchButton } from "@/components/MatchButton";
import { ReferralCard } from "@/components/ReferralCard";
import { FeaturedAgents } from "@/components/sections/FeaturedAgents";
import { FinalCta } from "@/components/sections/FinalCta";
import { business } from "@/lib/business";
import { markets } from "@/lib/markets";
import { simplePageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Infinity Real Estate | Boutique Firm Since 1994",
  description:
    "Infinity Real Estate / Infinity Realty (NV) was established in 1994 in Nevada and now serves Pennsylvania, Illinois, Nevada and Maryland.",
  path: "/about",
});

const VALUES = [
  { t: "Authentic, conscientious, and thorough representation.", d: "The firm's core value, in its own words." },
  { t: "Our communication is always clear.", d: "Stated on their About page, and worth holding them to." },
  { t: "Each client is treated as an individual.", d: "One local agent, start to finish." },
  { t: "We can quickly wear both hats, a listing agent and a buyer’s agent.", d: "The same firm for the sale and the purchase." },
];

export default function AboutPage() {
  return (
    <Shell schema={simplePageSchema("About", "/about")}>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
        display="Since 1994."
        headline="About Infinity Real Estate, a boutique real estate firm in Pennsylvania, Illinois, Nevada and Maryland."
        lead={`${business.displayName} was established in 1994 in Nevada. Our company was later expanded elsewhere in the country.`}
      >
        <MatchButton prefill={{ source: "about" }} />
      </PageHero>

      <section aria-labelledby="story-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="story-title" className="text-[length:var(--text-h2)]">
              How we got here.
            </h2>
            <ol className="relative mt-8 ml-2 border-l border-slate pl-7">
              <li className="relative pb-8">
                <span aria-hidden="true" className="absolute top-1.5 -left-[35px] h-3.5 w-3.5 rounded-full bg-clay" />
                <p className="font-display text-[length:var(--text-h3)] leading-snug font-semibold text-ink">Established in 1994 in Nevada.</p>
              </li>
              <li className="relative pb-8">
                <span aria-hidden="true" className="absolute top-1.5 -left-[35px] h-3.5 w-3.5 rounded-full border-2 border-ink bg-paper" />
                <p className="font-display text-[length:var(--text-h3)] leading-snug font-semibold text-ink">Later expanded elsewhere in the country.</p>
              </li>
              {/* DRAFT: ask the owner the year each state opened */}
              {markets.map((m, i) => (
                <li key={m.code} className={`relative ${i === markets.length - 1 ? "" : "pb-5"}`}>
                  <span aria-hidden="true" className="absolute top-2 -left-[33px] h-2.5 w-2.5 rotate-45 border border-ink bg-plat" />
                  <Link href={`/markets/${m.slug}`} className="font-medium text-ink underline underline-offset-4">
                    {m.name}
                  </Link>
                  <p className="text-[0.9375rem] text-muted">{m.serviceArea}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="text-[length:var(--text-h2)]">What we hold to.</h2>
            <ul className="mt-8">
              {VALUES.map((v) => (
                <li key={v.t} className="reveal border-t border-rule py-6">
                  <p className="font-display text-[length:var(--text-h3)] leading-snug text-ink md:text-[1.625rem]">{v.t}</p>
                  <p className="mt-2 text-muted">{v.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[56ch] text-text">
              We guide clients through every step of the process, with an extended network of brokers and agents in each
              state, taking a hands-on approach to finding and buying or listing and selling your home.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/buy" className="btn btn-ghost">
                How we help buyers <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </Link>
              <Link href="/sell" className="btn btn-ghost">
                How we help sellers <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedAgents />

      <section aria-labelledby="fine-title" className="section border-t border-rule">
        <div className="wrap">
          <h2 id="fine-title" className="text-[length:var(--text-h2)]">
            The fine print.
          </h2>
          {/* DRAFT: add each state's required brokerage name, office address and licence disclosure. */}
          <dl className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="border-t border-ink pt-4">
              <dt className="text-muted">Nevada licence</dt>
              <dd className="mt-1 font-medium text-ink">Infinity Realty (NV) {business.nvLicence}</dd>
            </div>
            <div className="border-t border-ink pt-4">
              <dt className="text-muted">Main line, call or text</dt>
              <dd className="mt-1">
                <a href={business.phone.tel} className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4">
                  {business.phone.display}
                </a>
              </dd>
            </div>
            <div className="border-t border-ink pt-4">
              <dt className="text-muted">Fair housing</dt>
              <dd className="mt-1 font-medium text-ink">Equal Housing Opportunity</dd>
            </div>
          </dl>
          <ReferralCard className="mt-12" />
        </div>
      </section>

      <FinalCta />
    </Shell>
  );
}
