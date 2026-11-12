import { Phone } from "lucide-react";
import { MatchButton } from "../MatchButton";
import { ROOF_D } from "../InfinityMark";
import { business } from "@/lib/business";

export function FinalCta({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
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
        <H id="final-title" className="mx-auto max-w-[16ch] text-[2.75rem] leading-[1.05] text-paper md:text-[4.5rem]" style={{ fontVariationSettings: '"opsz" 144' }}>
          Dedicated to helping each client.
        </H>
        <p className="mx-auto mt-5 max-w-[44ch] text-[1.125rem] text-paper/85">
          Tell us where you are going. We will put you with the right local agent.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MatchButton className="btn btn-paper w-full sm:w-auto" prefill={{ source: "final-cta" }} />
          <a href={business.phone.tel} className="btn btn-ghost-paper w-full sm:w-auto">
            <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
            Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
