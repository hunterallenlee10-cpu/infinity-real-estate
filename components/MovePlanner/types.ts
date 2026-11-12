import type { Need } from "@/lib/agents";
import type { StateCode } from "@/lib/markets";

export type Plan = "buying" | "selling" | "both" | "investment" | "commercial";
export type When = "looking" | "3m" | "3-6m" | "6m+";
export type Reach = "call" | "text" | "email";

export type Prefill = {
  plan?: Plan;
  state?: StateCode | "other";
  area?: string;
  agentSlug?: string | "any";
  /** The finer need picked in Agent Match (first home, luxury...) */
  need?: Need;
  source?: string;
};

export const PLAN_OPTIONS: { value: Plan; label: string }[] = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "both", label: "Selling and buying" },
  { value: "investment", label: "Investment or rental" },
  { value: "commercial", label: "Commercial or leasing" },
];

export const WHEN_OPTIONS: { value: When; label: string; phrase: string }[] = [
  { value: "looking", label: "Just looking", phrase: "just looking for now" },
  { value: "3m", label: "Within 3 months", phrase: "within 3 months" },
  { value: "3-6m", label: "3 to 6 months", phrase: "in 3 to 6 months" },
  { value: "6m+", label: "6 months or more", phrase: "in 6 months or more" },
];

export const REACH_OPTIONS: { value: Reach; label: string }[] = [
  { value: "call", label: "Call" },
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
];

/** Agent Match needs map onto the planner's five plans */
export const NEED_TO_PLAN: Record<Need, Plan> = {
  buying: "buying",
  selling: "selling",
  both: "both",
  "first-home": "buying",
  investment: "investment",
  luxury: "buying",
  commercial: "commercial",
  "new-construction": "buying",
  veteran: "buying",
};

export const PLAN_TO_NEED: Record<Plan, Need> = {
  buying: "buying",
  selling: "selling",
  both: "both",
  investment: "investment",
  commercial: "commercial",
};
