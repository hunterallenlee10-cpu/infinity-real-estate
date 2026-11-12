"use client";

import { useRef } from "react";
import { MessageSquare, Phone, X } from "lucide-react";
import { RooflineFrame } from "../RooflineFrame";
import { usePlanner } from "../MovePlanner/PlannerProvider";
import { useDialog } from "@/hooks/useDialog";
import type { Agent } from "@/lib/agents";
import { business } from "@/lib/business";
import { marketByCode } from "@/lib/markets";
import { smsFor, telFor } from "@/lib/contact";
import { quoteText } from "../AgentMatch/ResultCard";

export function AgentDrawer({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { open } = usePlanner();
  useDialog(ref, onClose);
  const mk = marketByCode(agent.state);
  const titleId = `drawer-${agent.slug}`;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-hidden bg-paper shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-rule bg-plat px-5 py-3">
          <p className="label text-muted">{mk.name}</p>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 flex h-12 w-12 items-center justify-center text-ink"
            aria-label="Close"
            data-autofocus
          >
            <X aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 md:px-8">
          <div className="grid grid-cols-[120px_1fr] items-end gap-5">
            <RooflineFrame agent={agent} sizes="120px" monogramSize="sm" />
            <div>
              <h2 id={titleId} className="text-[1.875rem] leading-tight">
                {agent.name}
              </h2>
              {agent.slug === "sylwia-baker" && <p className="text-muted">Pronounced Sylvia</p>}
              <p className="mt-1 text-muted">{[agent.title, agent.experience].filter(Boolean).join(" · ")}</p>
            </div>
          </div>

          {agent.highlights.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {agent.highlights.map((h) => (
                <li key={h} className="chip">
                  {h}
                </li>
              ))}
            </ul>
          )}

          {agent.quote && (
            <blockquote className="font-display mt-6 border-l-2 border-ink pl-4 text-[1.25rem] leading-snug text-ink italic">
              {quoteText(agent.quote)}
            </blockquote>
          )}

          <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-text">
            {agent.bio.map((p, i) => (
              <p key={i}>{p.replace(/\s{2,}/g, " ")}</p>
            ))}
            {agent.note && <p className="text-muted">{agent.note}</p>}
            {agent.bioList && (
              <div>
                {agent.bioList.heading && <p className="font-medium text-ink">{agent.bioList.heading}</p>}
                <ul className="mt-2 space-y-1.5">
                  {agent.bioList.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-slate" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <dl className="mt-8 grid gap-3 border-t border-rule pt-6 text-[0.9375rem]">
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-muted">Cell</dt>
              <dd>
                {agent.cell ? (
                  <a href={telFor(agent)} className="font-medium text-ink underline underline-offset-4">
                    {agent.cell.display}
                  </a>
                ) : (
                  <span>
                    Not published. Main line{" "}
                    <a href={business.phone.tel} className="font-medium text-ink underline underline-offset-4">
                      {business.phone.display}
                    </a>
                  </span>
                )}
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-muted">Email</dt>
              <dd className="break-all">
                {agent.email ? (
                  <a href={`mailto:${agent.email}`} className="font-medium text-ink underline underline-offset-4">
                    {agent.email}
                  </a>
                ) : (
                  <a href={`mailto:${business.email}`} className="font-medium text-ink underline underline-offset-4">
                    {business.email}
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-rule bg-plat p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a href={telFor(agent)} className="btn btn-ghost">
            <Phone aria-hidden="true" size={17} strokeWidth={1.5} />
            Call {agent.first}
          </a>
          <a href={smsFor(agent)} className="btn btn-ghost">
            <MessageSquare aria-hidden="true" size={17} strokeWidth={1.5} />
            Text {agent.first}
          </a>
          <button
            type="button"
            className="btn btn-ink col-span-2"
            aria-haspopup="dialog"
            onClick={() => {
              onClose();
              open({ agentSlug: agent.slug, state: agent.state, source: "drawer" });
            }}
          >
            Match Me With {agent.first}
          </button>
        </div>
      </div>
    </div>
  );
}
