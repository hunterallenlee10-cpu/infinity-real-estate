"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { RooflineFrame } from "../RooflineFrame";
import { AgentDrawer } from "../Team/AgentDrawer";
import { MatchButton } from "../MatchButton";
import { business } from "@/lib/business";
import { TEAM_FILTER_EVENT } from "../Team/TeamLink";
import { agents, type Agent } from "@/lib/agents";
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

export function Team() {
  const [tab, setTab] = useState<Tab>("ALL");
  const [open, setOpen] = useState<Agent | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const on = (e: Event) => setTab((e as CustomEvent<StateCode>).detail);
    window.addEventListener(TEAM_FILTER_EVENT, on);
    return () => window.removeEventListener(TEAM_FILTER_EVENT, on);
  }, []);

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
  const stateName = (c: StateCode) => markets.find((m) => m.code === c)!.name;

  return (
    <section id="agents" aria-labelledby="team-title" className="section contour-bg scroll-mt-20 border-t border-rule">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="label text-muted">The team</p>
            <h2 id="team-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
              The people you will actually talk to.
            </h2>
          </div>
        </div>

        <div role="tablist" aria-label="Filter agents by state" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4">
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
              <li key={a.slug} id={`agent-${a.slug}`} className="scroll-mt-28">
                <RooflineFrame agent={a} sizes="(min-width: 1024px) 280px, (min-width: 768px) 30vw, 46vw" monogramSize="lg" />
                <h3 className="mt-4 text-[1.25rem] leading-tight md:text-[1.375rem]">{a.name}</h3>
                <p className="mt-1 text-[0.875rem] leading-snug text-muted md:text-[0.9375rem]">
                  {[a.title, a.experience !== "Not listed" ? a.experience : null].filter(Boolean).join(" · ")}
                </p>
                <p className="label mt-1.5 text-[0.75rem] text-ink">{stateName(a.state)}</p>
                <button
                  type="button"
                  onClick={() => setOpen(a)}
                  aria-haspopup="dialog"
                  className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-rule underline-offset-[5px] hover:decoration-ink"
                >
                  Read {a.first}&rsquo;s story
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
            <li className="sheet contour-bg flex flex-col justify-end p-5 md:p-6">
              <p className="font-display text-[1.375rem] leading-tight font-semibold text-ink md:text-[1.625rem]">
                Not sure who to call?
              </p>
              <p className="mt-2 text-[0.9375rem] text-muted">Tell us about the move. We will pick the right person.</p>
              <MatchButton
                className="btn btn-ink mt-5 w-full !whitespace-normal !px-3 text-[0.9375rem]"
                prefill={{ state: tab === "ALL" ? undefined : tab, source: "team" }}
              />
              <a href={business.phone.tel} className="mt-3 inline-flex min-h-11 items-center justify-center text-[0.9375rem] font-medium text-ink underline underline-offset-4">
                Or call {business.phone.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {open && <AgentDrawer agent={open} onClose={close} />}
    </section>
  );
}
