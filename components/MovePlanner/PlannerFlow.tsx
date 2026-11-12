"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, MessageSquare, Phone } from "lucide-react";
import { agentBySlug, agentsInState, type Agent } from "@/lib/agents";
import { business } from "@/lib/business";
import { phoneDisplayFor, smsFor, telFor } from "@/lib/contact";
import { rank } from "../AgentMatch/match";
import { Field, ReachChoice, StepAgent, StepPlan, StepWhen, StepWhere, inputCls, isCoast, RobinCard } from "./Steps";
import { placePhrase, planPhrase, smsBody, validEmail, validPhone, whenPhrase, type PlannerAnswers } from "./sms";
import { PLAN_TO_NEED, type Prefill } from "./types";

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const TITLES = ["What are you planning?", "Where?", "When?", "Your agent.", "Your info."];

export function PlannerFlow({
  prefill = {},
  headingId,
  onClose,
  stickyNav = false,
}: {
  prefill?: Prefill;
  headingId: string;
  onClose?: () => void;
  /** In the modal, keep Back and Next pinned to the bottom of the scroll area */
  stickyNav?: boolean;
}) {
  const uid = useId();
  const [a, setA] = useState<PlannerAnswers>({
    plan: prefill.plan,
    need: prefill.need,
    state: prefill.state,
    area: prefill.area,
    name: "",
    phone: "",
    email: "",
    reach: "text",
    notes: "",
  });
  const [chosen, setChosen] = useState<string | undefined>(prefill.agentSlug);
  const [changing, setChanging] = useState(false);
  // Start at the first step that is not already answered by the button that opened the planner.
  const [step, setStep] = useState(() => {
    if (!prefill.plan) return 0;
    if (!prefill.state) return 1;
    return 2;
  });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const set = (patch: Partial<PlannerAnswers>) => setA((x) => ({ ...x, ...patch }));
  const inState = a.state && a.state !== "other" ? a.state : null;
  const routedToMainLine = a.state === "other";

  const agent: Agent | null = useMemo(() => {
    if (!inState || chosen === "any") return null;
    const picked = chosen ? agentBySlug(chosen) : undefined;
    if (picked && picked.state === inState) return picked;
    const need = a.need ?? (a.plan ? PLAN_TO_NEED[a.plan] : undefined);
    return rank({ state: inState, area: a.area, need }).results[0]?.agent ?? null;
  }, [inState, chosen, a.need, a.plan, a.area]);

  const canNext = [Boolean(a.plan), Boolean(a.state && (a.state !== "other" || a.otherPlace?.trim())), Boolean(a.when), true, true][step];

  const go = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => bodyRef.current?.querySelector<HTMLElement>("h2,h3")?.focus());
  };

  const submit = () => {
    const e: typeof errors = {};
    if (!a.name.trim()) e.name = "Please add your name so your agent knows who to ask for.";
    if (!a.phone.trim()) e.phone = "Please add a phone number. It is how your agent will reach you.";
    else if (!validPhone(a.phone)) e.phone = "That number looks short. Please use a 10 digit US number, like 301 555 0100.";
    if (a.email.trim() && !validEmail(a.email)) e.email = "That email address does not look right. You can also leave it blank.";
    if (a.reach === "email" && !a.email.trim()) e.email = "Add an email address, or pick Call or Text instead.";
    setErrors(e);
    if (Object.keys(e).length) {
      const first = e.name ? "name" : e.phone ? "phone" : "email";
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setDone(true);
    requestAnimationFrame(() => bodyRef.current?.querySelector<HTMLElement>("h2,h3")?.focus());
  };

  const firstName = a.name.trim().split(/\s+/)[0];
  const contactAgent = routedToMainLine ? null : agent;
  const sms = smsBody(a, contactAgent);

  if (done) {
    return (
      <div ref={bodyRef} className="planner-step">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper" aria-hidden="true">
          <Check size={28} strokeWidth={2} />
        </span>
        {/* DRAFT: confirm reply method and timing with the owner */}
        <h2 id={headingId} tabIndex={-1} className="mt-5 text-[2rem] leading-tight outline-none">
          Thanks, {firstName}. {contactAgent ? `${contactAgent.first} will be in touch.` : "We will be in touch."}
        </h2>
        <p className="mt-2 text-muted">
          For the fastest reply, send this as a text. It is already written for you.
        </p>
        <dl className="sheet mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 p-5 text-[0.9375rem]">
          <dt className="text-muted">Plan</dt>
          <dd className="text-ink">{cap(planPhrase(a.plan, a.need))}</dd>
          <dt className="text-muted">Where</dt>
          <dd className="text-ink">{placePhrase(a)}</dd>
          <dt className="text-muted">When</dt>
          <dd className="text-ink">{cap(whenPhrase(a.when))}</dd>
          <dt className="text-muted">Agent</dt>
          <dd className="text-ink">{contactAgent ? contactAgent.name : "Infinity main line"}</dd>
          <dt className="text-muted">Reach me by</dt>
          <dd className="text-ink capitalize">{a.reach}</dd>
        </dl>
        <p className="mt-5 rounded-[6px] border border-dashed border-slate bg-plat p-4 text-[0.9375rem] text-text">{sms}</p>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          <a href={smsFor(contactAgent, sms)} className="btn btn-ink min-h-14 text-[1.0625rem]">
            <MessageSquare aria-hidden="true" size={19} strokeWidth={1.5} />
            Text {contactAgent ? contactAgent.first : "Infinity"}
          </a>
          <a href={telFor(contactAgent)} className="btn btn-ghost min-h-14 text-[1.0625rem]">
            <Phone aria-hidden="true" size={19} strokeWidth={1.5} />
            Call {contactAgent ? contactAgent.first : "Infinity"}
          </a>
        </div>
        <p className="mt-3 text-center text-[0.875rem] text-muted">
          {contactAgent && !contactAgent.cell ? "Calls and texts go to the main line, " : ""}
          {phoneDisplayFor(contactAgent)}
        </p>
        {routedToMainLine && isCoast(a.otherPlace) && <RobinCard />}
        {onClose && (
          <button type="button" onClick={onClose} className="mt-4 inline-flex min-h-11 w-full items-center justify-center font-medium text-ink underline underline-offset-4">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="label text-[0.75rem] text-muted" aria-live="polite">
          Step {step + 1} of 5
        </p>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-rule" role="progressbar" aria-label="Move Planner progress" aria-valuemin={1} aria-valuemax={5} aria-valuenow={step + 1}>
        <div className="h-full bg-ink transition-[width] duration-300 ease-out" style={{ width: `${((step + 1) / 5) * 100}%` }} />
      </div>

      <div ref={bodyRef} key={step} className="planner-step mt-6">
        <h2 id={headingId} tabIndex={-1} className="text-[1.875rem] leading-tight outline-none md:text-[2.125rem]">
          {TITLES[step]}
        </h2>
        {step === 3 && !routedToMainLine && agent && (
          <p className="mt-1 text-muted">Matched from your answers. One person, start to finish.</p>
        )}
        <div className="mt-5">
          {step === 0 && <StepPlan value={a.plan} onChange={(plan) => set({ plan, need: undefined })} />}
          {step === 1 && (
            <StepWhere
              state={a.state}
              area={a.area}
              otherPlace={a.otherPlace}
              onState={(state) => {
                set({ state, area: undefined });
                setChanging(false);
              }}
              onArea={(area) => set({ area })}
              onOther={(otherPlace) => set({ otherPlace })}
            />
          )}
          {step === 2 && <StepWhen value={a.when} onChange={(when) => set({ when })} />}
          {step === 3 && (
            <StepAgent
              agent={agent}
              any={chosen === "any"}
              others={inState ? agentsInState(inState) : []}
              changing={changing}
              onToggleChange={() => setChanging((c) => !c)}
              onChange={(slug) => setChosen(slug)}
              onAny={() => {
                setChosen("any");
                setChanging(false);
              }}
              routedToMainLine={routedToMainLine}
            />
          )}
          {step === 4 && (
            <form id={`${uid}-form`} noValidate onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4">
              <Field id={`${uid}-name`} label="Your name" error={errors.name}>
                <input
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  value={a.name}
                  onChange={(e) => set({ name: e.target.value })}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                  className={inputCls(Boolean(errors.name))}
                  required
                />
              </Field>
              <Field id={`${uid}-phone`} label="Phone" error={errors.phone}>
                <input
                  id={`${uid}-phone`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={a.phone}
                  onChange={(e) => set({ phone: e.target.value })}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                  className={inputCls(Boolean(errors.phone))}
                  required
                />
              </Field>
              <Field id={`${uid}-email`} label="Email (optional)" error={errors.email}>
                <input
                  id={`${uid}-email`}
                  type="email"
                  autoComplete="email"
                  value={a.email}
                  onChange={(e) => set({ email: e.target.value })}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                  className={inputCls(Boolean(errors.email))}
                />
              </Field>
              <ReachChoice value={a.reach} onChange={(reach) => set({ reach })} />
              <Field id={`${uid}-notes`} label="Notes (optional)">
                <textarea
                  id={`${uid}-notes`}
                  rows={3}
                  value={a.notes}
                  onChange={(e) => set({ notes: e.target.value })}
                  className={`${inputCls()} py-3`}
                  placeholder="Anything about the home or the timing"
                />
              </Field>
            </form>
          )}
        </div>
      </div>

      <div
        className={`mt-8 flex items-center justify-between gap-3 border-t border-rule pt-5 ${
          stickyNav ? "sticky -bottom-5 z-10 -mx-5 bg-paper px-5 pb-5 sm:-bottom-7 sm:-mx-7 sm:px-7 sm:pb-7" : ""
        }`}
      >
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="btn btn-ghost !min-h-12">
            <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.5} />
            Back
          </button>
        ) : (
          <a href={business.phone.tel} className="inline-flex min-h-12 items-center gap-2 text-[0.9375rem] font-medium text-ink underline underline-offset-4">
            <Phone aria-hidden="true" size={16} strokeWidth={1.5} />
            Or call {business.phone.display}
          </a>
        )}
        {step < 4 ? (
          <button type="button" onClick={() => canNext && go(step + 1)} disabled={!canNext} className="btn btn-ink !min-h-12 disabled:cursor-not-allowed disabled:opacity-40">
            Next
          </button>
        ) : (
          <button type="submit" form={`${uid}-form`} className="btn btn-ink !min-h-12">
            {routedToMainLine || !agent ? "Send my request" : `Send to ${agent.first}`}
          </button>
        )}
      </div>
    </div>
  );
}
