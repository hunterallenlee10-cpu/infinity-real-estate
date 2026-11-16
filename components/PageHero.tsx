import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Calm inner-page header: breadcrumb, one h1 (display line plus a what-and-where line), lead, actions, optional art. */
export function PageHero({
  crumbs,
  display,
  headline,
  lead,
  children,
  art,
}: {
  crumbs: Crumb[];
  /** The large line */
  display: string;
  /** Sentence-case what-plus-where line, also inside the h1 */
  headline?: string;
  lead?: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <section className="relative border-b border-rule">
      <div aria-hidden="true" className="contour-bg pointer-events-none absolute inset-0 hidden opacity-70 md:block" />
      <div className="wrap relative pt-2 pb-12 md:pt-6 md:pb-16">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-4 grid items-end gap-8 md:mt-8 ${art ? "lg:grid-cols-[1fr_auto] lg:gap-14" : ""}`}>
          <div className="min-w-0">
            <h1>
              <span className="block text-[length:var(--text-h1)] leading-[1.02]" style={{ fontVariationSettings: '"opsz" 144' }}>
                {display}
              </span>
              {headline && (
                <span className="mt-3 block max-w-[40ch] font-sans text-[length:var(--text-lead)] leading-snug font-medium tracking-normal text-text">
                  {headline}
                </span>
              )}
            </h1>
            {lead && <p className="mt-4 max-w-[58ch] text-[length:var(--text-lead)] leading-relaxed text-muted">{lead}</p>}
            {children && <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>}
          </div>
          {art}
        </div>
      </div>
    </section>
  );
}
