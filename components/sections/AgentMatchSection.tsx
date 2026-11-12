import { Phone } from "lucide-react";
import { AgentMatch } from "../AgentMatch/AgentMatch";
import { RooflineFrame } from "../RooflineFrame";
import { referral } from "@/lib/business";

export function AgentMatchSection() {
  return (
    <section id="match" aria-labelledby="match-title" className="section">
      <div className="wrap">
        <div className="max-w-2xl">
          <p className="label text-muted">Agent Match</p>
          <h2 id="match-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
            Find your person.
          </h2>
          <p className="mt-3 text-[1.125rem] text-muted">Three taps. Real agents, matched from their own words.</p>
        </div>
        <div className="mt-12">
          <AgentMatch />
        </div>

        {/* DRAFT: confirm Robin is happy to be featured as a referral partner */}
        <aside
          aria-labelledby="coast-title"
          className="sheet mt-16 grid grid-cols-[96px_1fr] items-center gap-5 p-5 md:grid-cols-[120px_1fr_auto] md:gap-8 md:p-7"
        >
          <RooflineFrame
            photo={{ src: referral.photo, w: referral.photoW, h: referral.photoH, alt: referral.alt, position: "45% 20%" }}
            sizes="120px"
          />
          <div>
            <p className="label text-muted">Referral partner</p>
            <h3 id="coast-title" className="mt-1 text-[1.5rem] md:text-[1.75rem]">
              Moving to the coast?
            </h3>
            <p className="mt-2 max-w-[60ch] text-text">
              Heading to Myrtle Beach? Robin Keefover, who started with Infinity in Pennsylvania, now specializes in
              oceanfront condos and beach homes in Myrtle Beach, SC.
            </p>
          </div>
          <a href={referral.tel} className="btn btn-ghost col-span-2 md:col-span-1">
            <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
            Call Robin {referral.phoneDisplay}
          </a>
        </aside>
      </div>
    </section>
  );
}
