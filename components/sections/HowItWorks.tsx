import { MatchButton } from "../MatchButton";
import type { Prefill } from "../MovePlanner/types";

const DEFAULT_STEPS = [
  { t: "Tell us where.", d: "Pick your state and area, and what you are doing." },
  { t: "Meet your agent.", d: "One person, start to finish." },
  { t: "Buy, sell, or both at once.", d: "Your agent wears whichever hat the move needs." },
];

export function HowItWorks({
  title = "Three steps to the right agent.",
  steps = DEFAULT_STEPS,
  prefill = { source: "how-it-works" },
}: {
  title?: string;
  steps?: { t: string; d: string }[];
  prefill?: Prefill;
}) {
  return (
    <section aria-labelledby="how-title" className="section border-t border-rule bg-plat">
      <div className="wrap">
        <h2 id="how-title" className="reveal max-w-[20ch] text-[length:var(--text-h2)]">
          {title}
        </h2>
        <ol className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-0">
          {steps.map((s, i) => (
            <li key={s.t} className="reveal relative border-t border-ink pt-5 md:pr-10">
              <span className="font-display block text-[3rem] leading-none font-semibold text-ink md:text-[3.5rem]" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-3 text-[length:var(--text-h3)]">{s.t}</h3>
              <p className="mt-2 text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <MatchButton className="btn btn-ink mt-10 w-full sm:w-auto" prefill={prefill} />
      </div>
    </section>
  );
}
