"use client";

import { MessageSquare, Phone } from "lucide-react";
import { RooflineFrame } from "../RooflineFrame";
import { usePlanner } from "../MovePlanner/PlannerProvider";
import { NEED_TO_PLAN, type Prefill } from "../MovePlanner/types";
import type { Result } from "./match";
import type { Criteria } from "./match";
import { smsFor, telFor } from "@/lib/contact";
import { business } from "@/lib/business";

/** Wrap in quotes unless the line already quotes someone (Ellie's "tenacious negotiator"). */
export function quoteText(q: string) {
  return q.includes("\u201c") ? q : `\u201c${q}\u201d`;
}

export function ResultCard({ r, criteria, best }: { r: Result; criteria: Criteria; best: boolean }) {
  const { open } = usePlanner();
  const a = r.agent;
  const prefill: Prefill = {
    agentSlug: a.slug,
    state: a.state,
    area: criteria.area,
    need: criteria.need,
    plan: criteria.need ? NEED_TO_PLAN[criteria.need] : undefined,
    source: "agent-match",
  };
  const sub = [a.title, a.experience !== "Not listed" ? a.experience : null].filter(Boolean).join(" · ");
  return (
    <article className="sheet grid grid-cols-[88px_1fr] gap-4 p-4 sm:grid-cols-[112px_1fr] sm:gap-5 sm:p-5">
      <RooflineFrame agent={a} sizes="112px" monogramSize="sm" />
      <div className="min-w-0">
        {best && <p className="label mb-1 text-[0.75rem] text-muted">Best match</p>}
        <h3 className="text-[1.375rem] leading-tight md:text-[1.5rem]">{a.name}</h3>
        {sub && <p className="mt-1 text-[0.9375rem] text-muted">{sub}</p>}
        {r.matched.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Matches">
            {r.matched.map((m) => (
              <li key={m} className="chip chip-ink">
                {m}
              </li>
            ))}
          </ul>
        )}
        {a.quote && (
          <blockquote className="font-display mt-3 text-[1.0625rem] leading-snug text-ink italic">
            {quoteText(a.quote)}
          </blockquote>
        )}
        {!a.cell && (
          <p className="mt-3 text-[0.875rem] text-muted">Calls and texts go to the main line, {business.phone.display}.</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={telFor(a)} className="btn btn-ghost !min-h-11 !px-3.5 text-[0.9375rem]">
            <Phone aria-hidden="true" size={16} strokeWidth={1.5} />
            Call {a.first}
          </a>
          <a href={smsFor(a)} className="btn btn-ghost !min-h-11 !px-3.5 text-[0.9375rem]">
            <MessageSquare aria-hidden="true" size={16} strokeWidth={1.5} />
            Text {a.first}
          </a>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => open(prefill)}
            className="btn btn-ink !min-h-11 !px-3.5 text-[0.9375rem]"
          >
            Match Me With {a.first}
          </button>
        </div>
      </div>
    </article>
  );
}
