"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StateOutline } from "../StateOutline";
import { FaceChip } from "../RooflineFrame";
import { ResultCard } from "./ResultCard";
import { LANGUAGE_OPTIONS, NEED_OPTIONS, rank, type Criteria } from "./match";
import { agentsInState, type Language, type Need } from "@/lib/agents";
import { markets, WEST_TO_EAST, marketByCode, type StateCode } from "@/lib/markets";

// Motion place 2 of 2: results reorder and fade with layout animation. Features load lazily.
const loadFeatures = () => import("./motionFeatures").then((r) => r.default);

function Option({
  name,
  value,
  checked,
  onChange,
  children,
  className = "",
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`relative block cursor-pointer ${className}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`flex h-full min-h-11 items-center rounded-[6px] border px-3.5 py-2 text-[0.9375rem] font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
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
    <fieldset className="border-t border-rule pt-6">
      <legend className="float-left mb-4 flex w-full items-baseline gap-3">
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

export function AgentMatch() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [state, setState] = useState<StateCode | null>(null);
  const [area, setArea] = useState<string | undefined>();
  const [need, setNeed] = useState<Need | undefined>();
  const [language, setLanguage] = useState<Language>("english");

  const criteria: Criteria | null = state ? { state, area, need, language } : null;
  const ranked = useMemo(() => (criteria ? rank(criteria) : null), [criteria?.state, area, need, language]); // eslint-disable-line react-hooks/exhaustive-deps
  const market = state ? marketByCode(state) : null;

  const pickState = (s: StateCode) => {
    setState(s);
    setArea(undefined);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <form className="space-y-8 self-start lg:sticky lg:top-28 lg:col-span-5" onSubmit={(e) => e.preventDefault()} aria-label="Agent Match">
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
                    className={`flex items-center gap-3 rounded-[6px] border p-3 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
                      on ? "border-ink bg-plat shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-rule bg-plat hover:border-ink"
                    }`}
                  >
                    <StateOutline slug={mk.slug} className="h-11 w-11 shrink-0" />
                    <span className="text-[1rem] font-medium text-ink">{mk.name}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {market && (
            <div className="mt-4" role="radiogroup" aria-label={`Area in ${market.name} (optional)`}>
              <p className="mb-2 text-[0.875rem] text-muted">{market.serviceArea}. Pick an area, or skip.</p>
              <div className="flex flex-wrap gap-2">
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
          <div className="flex flex-wrap gap-2">
            {NEED_OPTIONS.map((o) => (
              <Option
                key={o.value}
                name={`${uid}-need`}
                value={o.value}
                checked={need === o.value}
                onChange={() => setNeed(o.value)}
              >
                {o.label}
              </Option>
            ))}
          </div>
        </Step>

        <Step n={3} legend="Language" hint="Optional">
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map((o) => (
              <Option
                key={o.value}
                name={`${uid}-lang`}
                value={o.value}
                checked={language === o.value}
                onChange={() => setLanguage(o.value)}
              >
                {o.label}
              </Option>
            ))}
          </div>
        </Step>
      </form>

      <div className="lg:col-span-7" aria-live="polite">
        {!ranked || !criteria || !market ? (
          <div className="sheet contour-bg p-6 md:p-8">
            <p className="font-display text-[1.75rem] font-semibold text-ink">Start with where.</p>
            <p className="mt-1 text-muted">Pick a state and we will show you the people who work there.</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {WEST_TO_EAST.map((code) => {
                const mk = markets.find((x) => x.code === code)!;
                const faces = agentsInState(code).slice(0, 3);
                return (
                  <li key={code}>
                    <button
                      type="button"
                      onClick={() => pickState(code)}
                      className="group flex w-full flex-col items-start gap-3 rounded-[6px] border border-rule bg-plat p-4 text-left transition-colors hover:border-ink"
                    >
                      <span className="flex -space-x-3" aria-hidden="true">
                        {faces.map((a) => (
                          <FaceChip key={a.slug} agent={a} size={48} />
                        ))}
                      </span>
                      <span className="flex w-full items-center justify-between gap-2">
                        <span className="font-medium text-ink">{mk.name}</span>
                        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
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
            <p className="label mb-4 text-muted">
              {ranked.exact ? `${market.name} agents, best match first` : "Closest matches"}
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
                      <ResultCard r={r} criteria={criteria} best={i === 0 && (Boolean(need) || language !== "english" || Boolean(area)) && r.matched.length > 0} />
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
