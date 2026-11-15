"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { StateOutline } from "../StateOutline";
import { FaceChip } from "../RooflineFrame";
import { AgentRow } from "../AgentRow";
import { LANGUAGE_OPTIONS, NEED_OPTIONS, rank, type Criteria } from "./match";
import { NEED_TO_PLAN } from "../MovePlanner/types";
import { agentsInState, type Language, type Need } from "@/lib/agents";
import { WEST_TO_EAST, marketByCode, type StateCode } from "@/lib/markets";

// Motion place 2 of 2: results reorder and fade with layout animation. Features load lazily.
const loadFeatures = () => import("./motionFeatures").then((r) => r.default);

function Option({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="relative block cursor-pointer snap-start">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`flex h-full min-h-11 items-center rounded-[6px] border px-3.5 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
          checked ? "border-ink bg-ink text-paper" : "border-rule bg-plat text-text hover:border-ink"
        }`}
      >
        {children}
      </span>
    </label>
  );
}

function Step({ n, legend, hint, children }: { n: number; legend: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 border-t border-rule pt-5">
      <legend className="float-left mb-3 flex w-full items-baseline gap-3">
        <span className="font-display text-[1rem] text-muted" aria-hidden="true">
          0{n}
        </span>
        <span className="font-display text-[1.375rem] font-semibold text-ink">{legend}</span>
        {hint && <span className="text-[0.875rem] text-muted">{hint}</span>}
      </legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

export function AgentMatch({ initialState = null }: { initialState?: StateCode | null }) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [state, setState] = useState<StateCode | null>(initialState);
  const [area, setArea] = useState<string | undefined>();
  const [need, setNeed] = useState<Need | undefined>();
  const [language, setLanguage] = useState<Language>("english");
  const resultsRef = useRef<HTMLDivElement>(null);

  const criteria: Criteria | null = state ? { state, area, need, language } : null;
  const ranked = useMemo(() => (criteria ? rank(criteria) : null), [criteria?.state, area, need, language]); // eslint-disable-line react-hooks/exhaustive-deps
  const market = state ? marketByCode(state) : null;
  const filtered = Boolean(need) || language !== "english" || Boolean(area);

  const pickState = (s: StateCode) => {
    setState(s);
    setArea(undefined);
  };
  const toResults = () =>
    resultsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <form className="min-w-0 space-y-6 self-start lg:sticky lg:top-28 lg:col-span-5" onSubmit={(e) => e.preventDefault()} aria-label="Agent Match">
        <Step n={1} legend="Where?">
          <div className="grid grid-cols-2 gap-2.5">
            {WEST_TO_EAST.map((code) => {
              const mk = marketByCode(code);
              const on = state === code;
              return (
                <label key={code} className="relative block cursor-pointer">
                  <input
                    type="radio"
                    name={`${uid}-state`}
                    value={code}
                    checked={on}
                    onChange={() => pickState(code)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex h-full items-center gap-2 rounded-[6px] border p-2.5 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink min-[380px]:gap-3 min-[380px]:p-3 ${
                      on ? "border-ink bg-plat shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-rule bg-plat hover:border-ink"
                    }`}
                  >
                    <StateOutline slug={mk.slug} className="hidden h-9 w-9 shrink-0 min-[360px]:block min-[380px]:h-11 min-[380px]:w-11" />
                    <span className="min-w-0 text-[0.9375rem] leading-tight font-medium text-ink min-[380px]:text-[1rem]">{mk.name}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {market && (
            <div className="mt-4" role="radiogroup" aria-label={`Area in ${market.name} (optional)`}>
              <p className="mb-2 text-[0.875rem] text-muted">{market.serviceArea}. Pick an area, or skip.</p>
              <div className="chip-row">
                <Option name={`${uid}-area`} value="" checked={!area} onChange={() => setArea(undefined)}>
                  Anywhere
                </Option>
                {market.areas.map((a) => (
                  <Option key={a} name={`${uid}-area`} value={a} checked={area === a} onChange={() => setArea(a)}>
                    {a}
                  </Option>
                ))}
              </div>
            </div>
          )}
        </Step>

        <Step n={2} legend="What are you doing?">
          <div className="chip-row">
            {NEED_OPTIONS.map((o) => (
              <Option key={o.value} name={`${uid}-need`} value={o.value} checked={need === o.value} onChange={() => setNeed(o.value)}>
                {o.label}
              </Option>
            ))}
          </div>
        </Step>

        <Step n={3} legend="Language" hint="Optional">
          <div className="chip-row">
            {LANGUAGE_OPTIONS.map((o) => (
              <Option key={o.value} name={`${uid}-lang`} value={o.value} checked={language === o.value} onChange={() => setLanguage(o.value)}>
                {o.label}
              </Option>
            ))}
          </div>
        </Step>

        {/* Phones only: the results sit below the three steps, so say so and offer a jump. */}
        {ranked && market && (
          <button type="button" onClick={toResults} className="btn btn-ink w-full lg:hidden">
            See {ranked.results.length === 1 ? "your" : `your ${ranked.results.length}`} {market.name} {ranked.results.length === 1 ? "agent" : "agents"}
            <ArrowDown aria-hidden="true" size={18} strokeWidth={1.5} />
          </button>
        )}
      </form>

      <div ref={resultsRef} className="min-w-0 scroll-mt-24 lg:col-span-7" aria-live="polite">
        {!ranked || !criteria || !market ? (
          <div className="sheet p-5 md:p-8">
            <p className="font-display text-[1.75rem] font-semibold text-ink">Start with where.</p>
            <p className="mt-1 text-muted">Pick a state and we will show you the people who work there.</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {WEST_TO_EAST.map((code) => {
                const mk = marketByCode(code);
                const faces = [...agentsInState(code)].sort((a, b) => Number(!!b.photo) - Number(!!a.photo)).slice(0, 3);
                return (
                  <li key={code}>
                    <button
                      type="button"
                      onClick={() => pickState(code)}
                      className="group flex h-full w-full flex-col items-start gap-3 rounded-[6px] border border-rule bg-plat p-3 text-left transition-colors hover:border-ink sm:p-4"
                    >
                      <span className="flex -space-x-3" aria-hidden="true">
                        {faces.map((a) => (
                          <FaceChip key={a.slug} agent={a} size={44} />
                        ))}
                      </span>
                      <span className="flex w-full items-center justify-between gap-2">
                        <span className="font-medium text-ink">{mk.name}</span>
                        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="sr-only">Show {mk.name} agents</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <p className="mb-4 font-medium text-ink">
              {ranked.exact ? `${market.name} agents${filtered ? ", best match first" : ""}` : "Closest matches"}
            </p>
            <LazyMotion features={loadFeatures} strict>
              <ul className="space-y-4">
                <AnimatePresence initial={false} mode="popLayout">
                  {ranked.results.map((r, i) => (
                    <m.li
                      key={r.agent.slug}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <AgentRow
                        agent={r.agent}
                        chips={r.matched}
                        chipStyle="ink"
                        flag={i === 0 && filtered && r.matched.length > 0 ? "Best match" : undefined}
                        prefill={{
                          area: criteria.area,
                          need: criteria.need,
                          plan: criteria.need ? NEED_TO_PLAN[criteria.need] : undefined,
                          source: "agent-match",
                        }}
                      />
                    </m.li>
                  ))}
                </AnimatePresence>
              </ul>
            </LazyMotion>
          </div>
        )}
        <p className="mt-5 text-[0.9375rem] text-muted">
          Matches come from each agent&rsquo;s published bio. Every Infinity agent can help with any move in their state.
        </p>
      </div>
    </div>
  );
}
