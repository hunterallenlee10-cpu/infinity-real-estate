import { Phone } from "lucide-react";
import { MatchButton } from "../MatchButton";
import { ROOF_D } from "../InfinityMark";
import { business } from "@/lib/business";
import type { Prefill } from "../MovePlanner/types";


export function FinalCta({
  title = "Dedicated to helping each client.",
  text = "Tell us where you are going. We will put you with the right local agent.",
  prefill = { source: "final-cta" },
  buttonLabel,
}: {
  title?: string;
  text?: string;
  prefill?: Prefill;
  buttonLabel?: string;
}) {
  const H = "h2";
  return (
    <section aria-labelledby="final-title" className="ink-band contour-ink relative overflow-hidden text-paper">
      {/* Static roofline. Nothing draws here. */}
      <svg
        viewBox="470 40 536 180"
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 w-[900px] max-w-none -translate-x-1/2 opacity-[0.07]"
      >
        <path d={ROOF_D} fill="none" stroke="#F3F6F8" strokeWidth={37} strokeLinejoin="miter" />
      </svg>
      <div className="wrap relative py-24 text-center md:py-32">
        <H id="final-title" className="mx-auto max-w-[16ch] text-[length:var(--text-h1)] leading-[1.05] text-paper" style={{ fontVariationSettings: '"opsz" 144' }}>
          {title}
        </H>
        <p className="mx-auto mt-5 max-w-[44ch] text-[1.125rem] text-paper/85">
          {text}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MatchButton className="btn btn-paper w-full sm:w-auto" prefill={prefill}>
            {buttonLabel}
          </MatchButton>
          <a href={business.phone.tel} className="btn btn-ghost-paper w-full sm:w-auto">
            <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
            Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
