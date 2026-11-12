import type { Agent, Need } from "@/lib/agents";
import { marketByCode, type StateCode } from "@/lib/markets";
import { WHEN_OPTIONS, type Plan, type When } from "./types";

export type PlannerAnswers = {
  plan?: Plan;
  need?: Need;
  state?: StateCode | "other";
  area?: string;
  otherPlace?: string;
  when?: When;
  name: string;
  phone: string;
  email: string;
  reach: "call" | "text" | "email";
  notes: string;
};

const PLAN_PHRASE: Record<Plan, string> = {
  buying: "buying",
  selling: "selling",
  both: "selling and buying",
  investment: "looking at investment or rental property",
  commercial: "looking at commercial property or leasing",
};

export function planPhrase(plan?: Plan, need?: Need) {
  if (plan === "buying" && need === "first-home") return "buying my first home";
  if (plan === "buying" && need === "luxury") return "buying a luxury home";
  if (plan === "buying" && need === "new-construction") return "looking at new construction";
  return plan ? PLAN_PHRASE[plan] : "planning a move";
}

export function placePhrase(a: Pick<PlannerAnswers, "state" | "area" | "otherPlace">) {
  if (!a.state) return "";
  if (a.state === "other") return a.otherPlace?.trim() || "another area";
  return a.area ? `${a.area}, ${a.state}` : marketByCode(a.state).name;
}

export function whenPhrase(when?: When) {
  return WHEN_OPTIONS.find((w) => w.value === when)?.phrase ?? "";
}

/** e.g. "Hi Peg, I found Infinity online. I'm selling and buying in Frederick County, MD within 3 months. My name is Dana, 301-555-0100." */
export function smsBody(a: PlannerAnswers, agent: Agent | null) {
  const hi = agent ? `Hi ${agent.first},` : "Hi Infinity,";
  const place = placePhrase(a);
  const when = whenPhrase(a.when);
  const first = a.name.trim();
  let line = `I'm ${planPhrase(a.plan, a.need)}${place ? ` in ${place}` : ""}`;
  if (when) line += a.when === "looking" ? `, ${when}` : ` ${when}`;
  const reach = a.reach === "email" && a.email ? ` Email is best: ${a.email}.` : a.reach === "call" ? " A call is best." : "";
  return `${hi} I found Infinity online. ${line}. My name is ${first}, ${a.phone.trim()}.${reach}`;
}

/** US phone check: 10 digits, or 11 starting with 1. */
export function validPhone(v: string) {
  const d = v.replace(/\D/g, "");
  return d.length === 10 || (d.length === 11 && d.startsWith("1"));
}

export function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
