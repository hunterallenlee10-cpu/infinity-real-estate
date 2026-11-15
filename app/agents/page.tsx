import { Shell } from "@/components/Shell";
import { PageHero } from "@/components/PageHero";
import { AgentGrid } from "@/components/AgentGrid";
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
        lead={`${AGENT_COUNT} local agents. Every one has a direct number. Pick a state, read their story in their own words, then call or text.`}
      >
        <MatchButton prefill={{ source: "agents" }} />
      </PageHero>
      <section aria-label="Agent directory" className="section">
        <div className="wrap">
          <AgentGrid />
        </div>
      </section>
      <FinalCta />
    </Shell>
  );
}
