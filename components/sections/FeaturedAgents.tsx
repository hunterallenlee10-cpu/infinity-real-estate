import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgentCard } from "../AgentCard";
import { AGENT_COUNT, agentBySlug } from "@/lib/agents";

// Eight faces across all four states. The full roster lives on /agents.
const FEATURED = [
  "ellie-plante",
  "joe-geeting",
  "dina-valencia",
  "peg-steich",
  "jenny-lynn-johnston",
  "breanna-freeburg-smith",
  "shannon-davis",
  "sylwia-baker",
];

export function FeaturedAgents() {
  return (
    <section aria-labelledby="team-title" className="section contour-bg border-t border-rule">
      <div className="wrap">
        <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 id="team-title" className="max-w-[16ch] text-[length:var(--text-h2)]">
            The people you will actually talk to.
          </h2>
          {/* DRAFT: recount once the roster is confirmed */}
          <Link href="/agents" className="btn btn-ghost bg-plat self-start md:self-auto">
            Meet all {AGENT_COUNT} agents
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 md:mt-12 md:grid-cols-4 lg:gap-x-6">
          {FEATURED.map((slug) => (
            <li key={slug}>
              <AgentCard agent={agentBySlug(slug)!} sizes="(min-width: 1024px) 280px, (min-width: 768px) 23vw, 46vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
