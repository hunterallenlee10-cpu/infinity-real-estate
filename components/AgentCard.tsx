import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { RooflineFrame } from "./RooflineFrame";
import { agentMeta, hasPage, type Agent } from "@/lib/agents";
import { marketByCode } from "@/lib/markets";
import { telFor } from "@/lib/contact";

/** Grid card. With a published bio the whole card is one link (the name) to the agent's page.
    Agents without a bio get a call link instead: no page is built on guesses. */
export function AgentCard({ agent: a, sizes, headingLevel = 3 }: { agent: Agent; sizes: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const page = hasPage(a);
  return (
    <div id={`agent-${a.slug}`} className="group relative scroll-mt-28">
      <div className={page ? "transition-opacity group-hover:opacity-90" : undefined}>
        <RooflineFrame agent={a} sizes={sizes} monogramSize="lg" />
      </div>
      <H className="mt-4 text-[1.25rem] leading-tight md:text-[1.375rem]">
        {page ? (
          <Link href={`/agents/${a.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {a.name}
          </Link>
        ) : (
          a.name
        )}
      </H>
      <p className="mt-1 text-[0.875rem] leading-snug text-muted md:text-[0.9375rem]">{agentMeta(a)}</p>
      <p className="mt-1 text-[0.875rem] font-medium text-ink">{marketByCode(a.state).name}</p>
      {page ? (
        <p
          aria-hidden="true"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-rule underline-offset-[5px] group-hover:decoration-clay"
        >
          Read {a.first}&rsquo;s story
          <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
        </p>
      ) : (
        <a
          href={telFor(a)}
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-rule underline-offset-[5px] hover:decoration-clay"
        >
          <Phone aria-hidden="true" size={15} strokeWidth={1.5} />
          Call {a.first}
        </a>
      )}
    </div>
  );
}
