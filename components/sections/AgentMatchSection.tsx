import { AgentMatch } from "../AgentMatch/AgentMatch";
import { ReferralCard } from "../ReferralCard";

export function AgentMatchSection() {
  return (
    <section id="match" aria-labelledby="match-title" className="section scroll-mt-16">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 id="match-title" className="text-[length:var(--text-h2)]">
            Find your person.
          </h2>
          <p className="mt-3 text-[length:var(--text-lead)] text-muted">Three taps. Real agents, matched from their own words.</p>
        </div>
        <div className="mt-8 md:mt-12">
          <AgentMatch />
        </div>
        <ReferralCard className="mt-14 md:mt-16" />
      </div>
    </section>
  );
}
