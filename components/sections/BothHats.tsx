import { ArrowRight } from "lucide-react";
import { MatchButton } from "../MatchButton";
import { business } from "@/lib/business";
import type { Plan } from "../MovePlanner/types";

const ROWS: { plan: Plan; title: string; text: string }[] = [
  { plan: "buying", title: "Buying", text: "We guide you through every step, with an agent who knows the street." },
  { plan: "selling", title: "Selling", text: "Clear communication from list price to closing." },
  {
    plan: "both",
    title: "Selling and buying at once",
    text: "One firm on both sides of your move, so the dates line up.",
  },
];

export function BothHats() {
  return (
    <section aria-labelledby="both-hats-title" className="ink-band contour-ink section text-paper">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="label text-paper/80">{business.lines.handsOn}</p>
          <h2
            id="both-hats-title"
            className="mt-5 text-[2.25rem] leading-[1.08] text-paper md:text-[3.25rem]"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            We can quickly wear both hats, a listing agent and a buyer&rsquo;s agent.
          </h2>
          <p className="mt-6 max-w-[44ch] text-[1.0625rem] text-paper/85">
            One local agent who handles it start to finish, with an extended network of brokers and agents in each state
            behind them.
          </p>
        </div>

        <ul className="self-center border-t border-paper/20 lg:col-span-6">
          {ROWS.map((r, i) => (
            <li key={r.plan} className="border-b border-paper/20">
              <MatchButton
                prefill={{ plan: r.plan, source: "both-hats" }}
                className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-left md:py-8"
                aria-label={`${r.title}: start the Move Planner`}
              >
                <span className="font-display text-[1rem] text-paper/70" aria-hidden="true">
                  0{i + 1}
                </span>
                <span>
                  <span className="font-display block text-[1.5rem] leading-tight font-medium text-paper md:text-[1.75rem]">
                    {r.title}
                  </span>
                  <span className="mt-1.5 block text-paper/80">{r.text}</span>
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 transition-colors group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                  <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                </span>
              </MatchButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
