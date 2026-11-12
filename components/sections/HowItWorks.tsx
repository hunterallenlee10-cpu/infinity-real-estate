import { MatchButton } from "../MatchButton";

const STEPS = [
  { t: "Tell us where.", d: "Pick your state and area, and what you are doing." },
  { t: "Meet your agent.", d: "One person, start to finish." },
  { t: "Buy, sell, or both at once.", d: "Your agent wears whichever hat the move needs." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section border-t border-rule bg-plat">
      <div className="wrap">
        <p className="label text-muted">How it works</p>
        <h2 id="how-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
          Three steps to the right agent.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative border-t border-ink pt-6 md:pr-10">
              <span className="font-display block text-[3.5rem] leading-none font-semibold text-ink" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[1.5rem]">{s.t}</h3>
              <p className="mt-2 text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <MatchButton className="btn btn-ink mt-12" prefill={{ source: "how-it-works" }} />
      </div>
    </section>
  );
}
