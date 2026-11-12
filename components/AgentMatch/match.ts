// Agent Match ranking. Matches only on place, transaction type, property type and language of service.
// Never on race, colour, religion, sex, disability, familial status, national origin, age or any other protected class.
import { agents, type Agent, type Language, type Need } from "@/lib/agents";
import type { StateCode } from "@/lib/markets";

export const NEED_OPTIONS: { value: Need; label: string }[] = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "both", label: "Both" },
  { value: "first-home", label: "First home" },
  { value: "investment", label: "Investment or rental" },
  { value: "luxury", label: "Luxury" },
  { value: "commercial", label: "Commercial or leasing" },
  { value: "new-construction", label: "New construction" },
  { value: "veteran", label: "Veteran or VA buyer" },
];

export const NEED_LABEL = Object.fromEntries(NEED_OPTIONS.map((n) => [n.value, n.label])) as Record<Need, string>;

/** Chip text shown on a result when that tag matched */
export const NEED_CHIP: Record<Need, string> = {
  buying: "Buying",
  selling: "Selling",
  both: "Selling and buying",
  "first-home": "First home",
  investment: "Investment or rental",
  luxury: "Luxury",
  commercial: "Commercial or leasing",
  "new-construction": "New construction",
  veteran: "Veterans",
};

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "english", label: "English" },
  { value: "greek", label: "Greek" },
  { value: "polish", label: "Polish" },
];

export type Criteria = { state: StateCode; area?: string; need?: Need; language?: Language };

export type Result = { agent: Agent; score: number; matched: string[]; full: boolean };

export function rank(c: Criteria): { results: Result[]; exact: boolean } {
  const pool = agents.filter((a) => a.state === c.state);
  const wantLang = c.language && c.language !== "english" ? c.language : undefined;
  const results = pool.map((agent, i) => {
    const matched: string[] = [];
    let score = 0;
    let full = true;
    if (c.need) {
      if (agent.needs.includes(c.need)) {
        score += 3;
        matched.push(NEED_CHIP[c.need]);
      } else {
        full = false;
        // Selling and buying at once: anyone who does both still helps
        if (c.need === "both" && agent.needs.includes("buying") && agent.needs.includes("selling")) score += 1;
      }
    }
    if (wantLang) {
      if (agent.languages.includes(wantLang)) {
        score += 3;
        matched.push(wantLang === "greek" ? "Speaks Greek" : "Speaks Polish");
      } else full = false;
    }
    if (c.area) {
      if (agent.areas.includes(c.area)) {
        score += 1;
        matched.push(c.area);
      }
      // area is a preference, not a requirement: every agent covers their whole market
    }
    // tie-breakers: a real photo, then roster order
    const tie = (agent.photo ? 0.1 : 0) - i * 0.001;
    return { agent, score: score + tie, matched, full };
  });
  results.sort((a, b) => b.score - a.score);
  const anyCriteria = Boolean(c.need || wantLang);
  const exact = !anyCriteria || results.some((r) => r.full);
  return { results, exact };
}
