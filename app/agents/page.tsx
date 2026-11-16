import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { AgentGrid } from "@/components/AgentGrid";
import { AgentMatch } from "@/components/AgentMatch/AgentMatch";
import { FinalCta } from "@/components/sections/FinalCta";
import { MatchButton } from "@/components/MatchButton";
import { AGENT_COUNT } from "@/lib/agents";
import { agentsSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Real Estate Agents in PA, IL, NV & MD | Infinity",
  description:
    "Meet the Infinity Real Estate agents and brokers in Pennsylvania, Illinois, Nevada and Maryland. Read their stories, then call or text them directly.",
  path: "/agents",
});

export default function AgentsPage() {
  return (
    <Shell schema={agentsSchema()}>
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Agents" }]}
        display="The people you will actually talk to."
        headline="Infinity Real Estate agents and brokers in Pennsylvania, Illinois, Nevada and Maryland."
        // DRAFT: recount once the roster is confirmed
        lead={`${AGENT_COUNT} local agents. Pick a state, read their story, then call or text them directly.`}
      >
        <MatchButton prefill={{ source: "agents" }} />
      </PageHero>
      {/* The filterable roster: by state, by need and by language. */}
      <section aria-labelledby="filter-title" className="section">
        <div className="wrap">
          <div className="max-w-2xl">
            <h2 id="filter-title" className="text-[length:var(--text-h2)]">
              Find your person.
            </h2>
            <p className="mt-3 text-[length:var(--text-lead)] text-muted">
              Filter by state, by what you are doing and by language. Matches come from each agent&rsquo;s own bio.
            </p>
          </div>
          <div className="mt-8 md:mt-12">
            <AgentMatch />
          </div>
        </div>
      </section>
      <section aria-labelledby="everyone-title" className="section contour-bg border-t border-rule">
        <div className="wrap">
          <h2 id="everyone-title" className="mb-8 text-[length:var(--text-h2)]">
            Everyone.
          </h2>
          <AgentGrid />
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}
