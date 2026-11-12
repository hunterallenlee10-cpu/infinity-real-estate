import type { Agent } from "./agents";
import { business } from "./business";

/** Agents without a published number (Victoria, or "any agent") route to the main line. */
export function telFor(agent?: Agent | null) {
  return agent?.cell ? `tel:${agent.cell.e164}` : business.phone.tel;
}

export function phoneDisplayFor(agent?: Agent | null) {
  return agent?.cell ? agent.cell.display : business.phone.display;
}

/** `sms:+1...?&body=` opens a prefilled text on both iOS and Android. */
export function smsFor(agent?: Agent | null, body?: string) {
  const num = agent?.cell ? agent.cell.e164 : business.phone.e164;
  return body ? `sms:${num}?&body=${encodeURIComponent(body)}` : `sms:${num}`;
}
