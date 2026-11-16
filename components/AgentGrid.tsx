"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AgentCard } from "./AgentCard";
import { MatchButton } from "./MatchButton";
import { agents } from "@/lib/agents";
import { business } from "@/lib/business";
import { markets, type StateCode } from "@/lib/markets";

type Tab = "ALL" | StateCode;
// "All" view: faces and monograms interleaved so the grid never opens on a row of initials.
const ALL_ORDER = [
  "ellie-plante", "joe-geeting", "dina-valencia", "peg-steich",
  "jenny-lynn-johnston", "breanna-freeburg-smith", "fred-shibler", "sylwia-baker",
  "shannon-davis", "johnathan-luckenbaugh", "teresa-gallegos", "brittany-gruver",
  "victoria-ledon-knapik",
];
const ALL = ALL_ORDER.map((s) => agents.find((a) => a.slug === s)!).concat(agents.filter((a) => !ALL_ORDER.includes(a.slug)));
const TABS: { id: Tab; label: string }[] = [
  { id: "ALL", label: "All" },
  ...(["PA", "IL", "NV", "MD"] as StateCode[]).map((c) => ({ id: c as Tab, label: markets.find((m) => m.code === c)!.name })),
];

export function AgentGrid() {
  const [tab, setTab] = useState<Tab>("ALL");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = TABS.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const list = tab === "ALL" ? ALL : agents.filter((a) => a.state === tab);

  return (
    <div>
      <div role="tablist" aria-label="Filter agents by state" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:px-0">
        {TABS.map((t, i) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`team-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="team-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-[0.9375rem] font-medium transition-colors ${
                on ? "border-ink bg-ink text-paper" : "border-rule bg-plat text-text hover:border-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="team-panel" role="tabpanel" aria-labelledby={`team-tab-${tab}`} tabIndex={0} className="mt-8 outline-none">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {list.map((a) => (
            <li key={a.slug}>
              <AgentCard agent={a} sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 46vw" />
            </li>
          ))}
          <li className="sheet col-span-2 flex flex-col self-start p-5 md:col-span-1 md:p-6">
            <p className="font-display text-[1.375rem] leading-tight font-semibold text-ink md:text-[1.625rem]">Not sure who to call?</p>
            <p className="mt-2 text-[0.9375rem] text-muted">Tell us about the move. We will pick the right person.</p>
            <MatchButton
              className="btn btn-ink mt-5 w-full !whitespace-normal !px-3 text-[0.9375rem]"
              prefill={{ state: tab === "ALL" ? undefined : tab, source: "team" }}
            />
            <a
              href={business.phone.tel}
              className="mt-3 inline-flex min-h-11 items-center justify-center text-[0.9375rem] font-medium text-ink underline underline-offset-4"
            >
              Or call {business.phone.display}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
