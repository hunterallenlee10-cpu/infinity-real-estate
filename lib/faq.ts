import { agents, shortName } from "./agents";
import type { Market } from "./markets";
// FAQ copy. Answers use only the published facts. The FAQPage JSON-LD is built from this same list,
// so the structured data matches the visible text word for word.
export const faq: { q: string; a: string }[] = [
  {
    q: "Which areas do you serve?",
    a: "Pennsylvania: Central Pennsylvania and the Philadelphia area. Illinois: Chicagoland and surrounding areas. Nevada: Las Vegas, Henderson, Boulder City, Pahrump, and surrounding areas. Maryland: Washington and Frederick counties.",
  },
  {
    q: "Can one agent help me sell and buy at the same time?",
    a: "Yes. We can quickly wear both hats, a listing agent and a buyer’s agent. One firm on both sides of your move, so the dates line up.",
  },
  {
    q: "How do I find the right agent for me?",
    a: "Use Agent Match on the home page. Pick your state, what you are doing and, if you like, a language. Or call or text the main line at (888) 213-6110 and we will connect you.",
  },
  {
    q: "Do you work with investors and rental properties?",
    a: "Yes. In Maryland, Peg Steich owns several rental properties. In Pennsylvania, Joe Geeting has experience in residential and commercial sales and leasing. In Illinois, Breanna Freeburg-Smith works with rentals and Sylwia Baker with distressed property. In Nevada, Ellie Plante loves to work with investors and Jenny Lynn Johnston has sold investment properties.",
  },
  {
    q: "Do any agents speak languages other than English?",
    a: "Yes. Dina Valencia in Illinois is fluent in Greek. Sylwia Baker in Illinois is fluent in Polish. Her name is pronounced Sylvia.",
  },
  {
    q: "Do you work with veterans?",
    a: "Yes. Jenny Lynn Johnston in Nevada is a certified Veterans Association Representative and loves working with veterans, active-duty members and their families.",
  },
  {
    q: "Can I search listings here?",
    a: "Yes. Live MLS search is available for Nevada, for Illinois, and for Pennsylvania and Maryland. The Search homes buttons open Infinity’s current MLS search in a new tab.",
  },
];


const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** Questions for a market page, built only from that market's published facts. */
export function marketFaq(m: Market): { q: string; a: string }[] {
  const team = agents.filter((a) => a.state === m.code);
  const names = list(team.map(shortName));
  const out = [
    { q: `Which parts of ${m.name} do you cover?`, a: `${m.serviceArea}.` },
    {
      q: `Who are your ${m.name} agents?`,
      a: `${names}. Call or text any of them directly, or use the Move Planner and we will match you.`,
    },
    {
      q: `Can I search ${m.name} listings?`,
      a:
        m.code === "MD"
          ? "Yes. Maryland listings are on the same live MLS search as Pennsylvania. The search opens in a new tab."
          : `Yes. The ${m.name} search runs on a live MLS feed and opens in a new tab.`,
    },
  ];
  if (m.code === "IL")
    out.push({
      q: "Do any Illinois brokers speak Greek or Polish?",
      a: "Yes. Dina Valencia is fluent in Greek. Sylwia Baker is fluent in Polish. Her name is pronounced Sylvia.",
    });
  if (m.code === "NV")
    out.push({
      q: "Do you work with veterans in Nevada?",
      a: "Yes. Jenny Lynn Johnston is a certified Veterans Association Representative and loves working with veterans, active-duty members and their families.",
    });
  return out;
}

// DRAFT: fees are not published. Confirm the wording of the cost answers with the owner.
export const buyFaq = [
  {
    q: "What does it cost to work with a buyer\u2019s agent?",
    a: "Infinity has not published its fees. Your agent will explain how they are paid on your first call, before you sign anything.",
  },
  {
    q: "Do you work with first-time buyers?",
    a: "Yes. In Nevada, Teresa Gallegos finds joy in handing over the keys for the first time. In Illinois, Sylwia Baker helps first-time buyers find their way.",
  },
  {
    q: "Can one agent help me sell my home and buy the next one?",
    a: "Yes. We can quickly wear both hats, a listing agent and a buyer\u2019s agent. In Nevada, Teresa Gallegos\u2019s specialty is the move-up buyer.",
  },
  {
    q: "Do you work with veterans?",
    a: "Yes. Jenny Lynn Johnston in Nevada is a certified Veterans Association Representative.",
  },
];

export const sellFaq = [
  {
    q: "What does it cost to sell with Infinity?",
    a: "Infinity has not published its fees. Your agent will explain the commission and what it covers on your first call, before you sign anything.",
  },
  {
    q: "Can you spot problems before I list?",
    a: "In Pennsylvania, Fred Shibler spent 30 years in the home remodeling and repairs business. If there are problems with the home you are trying to sell, he can spot it right away.",
  },
  {
    q: "Can I sell and buy at the same time?",
    a: "Yes. We can quickly wear both hats, a listing agent and a buyer\u2019s agent. One firm on both sides of your move, so the dates line up.",
  },
  {
    q: "Do you handle short sales and distressed property?",
    a: "Yes. In Illinois, Breanna Freeburg-Smith has worked in foreclosures and short sales, and Sylwia Baker works with distressed property.",
  },
];
