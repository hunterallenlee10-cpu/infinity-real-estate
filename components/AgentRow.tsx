"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { RooflineFrame } from "./RooflineFrame";
import { usePlanner } from "./MovePlanner/PlannerProvider";
import type { Prefill } from "./MovePlanner/types";
import { agentMeta, hasPage, quoteText, type Agent } from "@/lib/agents";
import { smsFor, telFor } from "@/lib/contact";
import { business } from "@/lib/business";

/** One agent as a row: face, their own words, what they are known for, and the three ways to reach them. */
export function AgentRow({
  agent: a,
  chips = [],
  chipStyle = "plain",
  flag,
  prefill,
  headingLevel = 3,
}: {
  agent: Agent;
  chips?: string[];
  chipStyle?: "plain" | "ink";
  flag?: string;
  prefill?: Prefill;
  headingLevel?: 2 | 3;
}) {
  const { open } = usePlanner();
  const H = headingLevel === 2 ? "h2" : "h3";
  const sub = agentMeta(a);
  return (
    <article className="sheet grid grid-cols-[84px_1fr] gap-x-4 gap-y-3 p-4 sm:grid-cols-[112px_1fr] sm:gap-x-5 sm:p-5">
      <RooflineFrame agent={a} sizes="112px" monogramSize="sm" />
      <div className="min-w-0">
        {flag && (
          <p className="mb-1 flex items-center gap-2 text-[0.8125rem] font-medium text-clay">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-clay" />
            {flag}
          </p>
        )}
        <H className="text-[1.375rem] leading-tight md:text-[1.5rem]">
          {hasPage(a) ? (
            <Link href={`/agents/${a.slug}`} className="underline-offset-4 hover:underline">
              {a.name}
            </Link>
          ) : (
            a.name
          )}
        </H>
        {sub && <p className="mt-1 text-[0.9375rem] text-muted">{sub}</p>}
        {chips.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((m) => (
              <li key={m} className={`chip ${chipStyle === "ink" ? "chip-ink" : ""}`}>
                {m}
              </li>
            ))}
          </ul>
        )}
        {a.quote && (
          <blockquote className="font-display mt-3 text-[1.0625rem] leading-snug text-ink italic">{quoteText(a.quote)}</blockquote>
        )}
        {!a.cell && (
          <p className="mt-3 text-[0.875rem] text-muted">Calls and texts go to the main line, {business.phone.display}.</p>
        )}
      </div>
      <div className="col-span-2 sm:col-span-1 sm:col-start-2">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
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
            onClick={() => open({ agentSlug: a.slug, state: a.state, source: "agent-row", ...prefill })}
            className="btn btn-ink col-span-2 !min-h-11 !px-3.5 text-[0.9375rem]"
          >
            Match Me With {a.first}
          </button>
        </div>
        {hasPage(a) && (
          <Link
            href={`/agents/${a.slug}`}
            className="group mt-1 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-rule underline-offset-[5px] hover:decoration-clay"
          >
            Read {a.first}&rsquo;s story
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
