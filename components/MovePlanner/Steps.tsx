"use client";

import { useId, type ReactNode } from "react";
import { CircleAlert, Phone } from "lucide-react";
import { RooflineFrame } from "../RooflineFrame";
import { StateOutline } from "../StateOutline";
import type { Agent } from "@/lib/agents";
import { business, referral } from "@/lib/business";
import { WEST_TO_EAST, marketByCode, type StateCode } from "@/lib/markets";
import { PLAN_OPTIONS, REACH_OPTIONS, WHEN_OPTIONS, type Plan, type Reach, type When } from "./types";

export function Choice({
  name,
  checked,
  onChange,
  children,
  className = "",
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`relative block cursor-pointer ${className}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={`flex h-full min-h-12 items-center gap-3 rounded-[6px] border px-4 py-2.5 text-[1rem] font-medium transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
          checked ? "border-ink bg-ink text-paper" : "border-rule bg-plat text-text hover:border-ink"
        }`}
      >
        {children}
      </span>
    </label>
  );
}

export function StepPlan({ value, onChange }: { value?: Plan; onChange: (p: Plan) => void }) {
  const id = useId();
  return (
    <fieldset>
      <legend className="sr-only">What are you planning?</legend>
      <div className="grid gap-2.5">
        {PLAN_OPTIONS.map((o) => (
          <Choice key={o.value} name={`${id}-plan`} checked={value === o.value} onChange={() => onChange(o.value)}>
            {o.label}
          </Choice>
        ))}
      </div>
    </fieldset>
  );
}

export function RobinCard() {
  return (
    <div className="sheet mt-4 grid grid-cols-[72px_1fr] items-center gap-4 p-4">
      <RooflineFrame
        photo={{ src: referral.photo, w: referral.photoW, h: referral.photoH, alt: referral.alt, position: "45% 20%" }}
        sizes="72px"
      />
      <div>
        <p className="font-medium text-ink">Heading to Myrtle Beach?</p>
        <p className="text-[0.9375rem] text-muted">
          Robin Keefover started with Infinity in Pennsylvania and now specializes in oceanfront condos and beach homes in
          Myrtle Beach, SC.
        </p>
        <a href={referral.tel} className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-medium text-ink underline underline-offset-4">
          <Phone aria-hidden="true" size={15} strokeWidth={1.5} /> Call Robin {referral.phoneDisplay}
        </a>
      </div>
    </div>
  );
}

export function isCoast(text?: string) {
  return /myrtle|south carolina|\bs\.?c\.?\b/i.test(text ?? "");
}

export function StepWhere({
  state,
  area,
  otherPlace,
  onState,
  onArea,
  onOther,
}: {
  state?: StateCode | "other";
  area?: string;
  otherPlace?: string;
  onState: (s: StateCode | "other") => void;
  onArea: (a?: string) => void;
  onOther: (t: string) => void;
}) {
  const id = useId();
  const market = state && state !== "other" ? marketByCode(state) : null;
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="sr-only">State</legend>
        <div className="grid grid-cols-2 gap-2.5">
          {WEST_TO_EAST.map((c) => {
            const mk = marketByCode(c);
            return (
              <Choice key={c} name={`${id}-state`} checked={state === c} onChange={() => onState(c)}>
                <StateOutline slug={mk.slug} className={`h-8 w-8 shrink-0 ${state === c ? "[&_path]:stroke-paper" : ""}`} />
                {mk.name}
              </Choice>
            );
          })}
          <Choice name={`${id}-state`} checked={state === "other"} onChange={() => onState("other")} className="col-span-2">
            Somewhere else
          </Choice>
        </div>
      </fieldset>

      {market && (
        <fieldset>
          <legend className="mb-2 text-[0.9375rem] text-muted">Area in {market.name} (optional)</legend>
          <div className="flex flex-wrap gap-2">
            <Choice name={`${id}-area`} checked={!area} onChange={() => onArea(undefined)}>
              Anywhere
            </Choice>
            {market.areas.map((a) => (
              <Choice key={a} name={`${id}-area`} checked={area === a} onChange={() => onArea(a)}>
                {a}
              </Choice>
            ))}
          </div>
        </fieldset>
      )}

      {state === "other" && (
        <div>
          <label htmlFor={`${id}-other`} className="block font-medium text-ink">
            Where are you moving?
          </label>
          <input
            id={`${id}-other`}
            type="text"
            value={otherPlace ?? ""}
            onChange={(e) => onOther(e.target.value)}
            autoComplete="off"
            placeholder="City or state"
            className="mt-2 block min-h-12 w-full rounded-[6px] border border-rule bg-plat px-4 text-[1rem] text-text placeholder:text-muted focus:border-ink"
          />
          <p className="mt-2 text-[0.9375rem] text-muted">
            We will route you through the main line, {business.phone.display}, and connect you with the right person.
          </p>
          {isCoast(otherPlace) && <RobinCard />}
        </div>
      )}
    </div>
  );
}

export function StepWhen({ value, onChange }: { value?: When; onChange: (w: When) => void }) {
  const id = useId();
  return (
    <fieldset>
      <legend className="sr-only">When?</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {WHEN_OPTIONS.map((o) => (
          <Choice key={o.value} name={`${id}-when`} checked={value === o.value} onChange={() => onChange(o.value)}>
            {o.label}
          </Choice>
        ))}
      </div>
    </fieldset>
  );
}

export function StepAgent({
  agent,
  any,
  others,
  changing,
  onChange,
  onAny,
  onToggleChange,
  routedToMainLine,
}: {
  agent: Agent | null;
  any: boolean;
  others: Agent[];
  changing: boolean;
  onChange: (slug: string) => void;
  onAny: () => void;
  onToggleChange: () => void;
  routedToMainLine: boolean;
}) {
  const id = useId();
  if (routedToMainLine) {
    return (
      <div className="sheet p-5">
        <p className="font-display text-[1.375rem] font-semibold text-ink">We will connect you through the main line.</p>
        <p className="mt-2 text-muted">
          Call or text {business.phone.display} and we will put you with the right person in our network.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {any || !agent ? (
        <div className="sheet p-5">
          <p className="font-display text-[1.375rem] font-semibold text-ink">Any agent is fine.</p>
          <p className="mt-1 text-muted">We will pass your request to the best person in your state.</p>
        </div>
      ) : (
        <div className="sheet grid grid-cols-[96px_1fr] items-center gap-5 p-4">
          <RooflineFrame agent={agent} sizes="96px" monogramSize="sm" />
          <div>
            <p className="label text-[0.75rem] text-muted">Your agent</p>
            <p className="font-display text-[1.5rem] leading-tight font-semibold text-ink">{agent.name}</p>
            <p className="mt-0.5 text-[0.9375rem] text-muted">
              {[agent.title, agent.experience !== "Not listed" ? agent.experience : null].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onToggleChange} aria-expanded={changing} className="btn btn-ghost !min-h-11">
          Change agent
        </button>
        <button type="button" onClick={onAny} className="btn btn-ghost !min-h-11" aria-pressed={any}>
          Any agent is fine
        </button>
      </div>
      {changing && (
        <fieldset>
          <legend className="mb-2 text-[0.9375rem] text-muted">Pick an agent</legend>
          <div className="grid gap-2">
            {others.map((a) => (
              <Choice key={a.slug} name={`${id}-agent`} checked={!any && agent?.slug === a.slug} onChange={() => onChange(a.slug)}>
                {a.name}
              </Choice>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-[0.875rem] text-muted">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-[0.9375rem] font-medium text-ink" role="alert">
          <CircleAlert aria-hidden="true" size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export const inputCls = (bad?: boolean) =>
  `block min-h-12 w-full rounded-[6px] border bg-plat px-4 text-[1rem] text-text placeholder:text-muted ${
    bad ? "border-2 border-ink" : "border-rule focus:border-ink"
  }`;

export function ReachChoice({ value, onChange }: { value: Reach; onChange: (r: Reach) => void }) {
  const id = useId();
  return (
    <fieldset>
      <legend className="font-medium text-ink">Best way to reach you</legend>
      <div className="mt-1.5 grid grid-cols-3 gap-2">
        {REACH_OPTIONS.map((o) => (
          <Choice key={o.value} name={`${id}-reach`} checked={value === o.value} onChange={() => onChange(o.value)} className="[&>span]:justify-center">
            {o.label}
          </Choice>
        ))}
      </div>
    </fieldset>
  );
}
