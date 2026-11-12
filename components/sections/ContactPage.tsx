import { Mail, MessageSquare, Phone } from "lucide-react";
import { PlannerFlow } from "../MovePlanner/PlannerFlow";
import { agentsInState } from "@/lib/agents";
import { business } from "@/lib/business";
import { markets, WEST_TO_EAST, marketByCode } from "@/lib/markets";

const TILES = [
  { icon: Phone, label: "Call", value: business.phone.display, href: business.phone.tel, note: "Talk to a real person." },
  { icon: MessageSquare, label: "Text", value: business.phone.display, href: business.phone.sms, note: "Same number. Text any time." },
  { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}`, note: "For documents and longer notes." },
];

export function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="contour-bg border-b border-rule">
        <div className="wrap pt-12 pb-14 md:pt-20 md:pb-20">
          <h1 id="contact-title">
            <span className="label block max-w-[52ch] font-sans text-[0.75rem] font-medium tracking-[0.16em] text-muted md:text-[0.8125rem]">
              Contact Infinity Real Estate, real estate agents in Pennsylvania, Illinois, Nevada and Maryland
            </span>{" "}
            <span className="mt-5 block text-[3rem] leading-[1.02] md:text-[5rem]" style={{ fontVariationSettings: '"opsz" 144' }}>
              Talk to a real person.
            </span>
          </h1>
          <p className="mt-5 max-w-[50ch] text-[1.125rem] text-text">
            Call, text or message Infinity Real Estate. We match you with a local agent in Pennsylvania, Illinois, Nevada or
            Maryland. Main line {business.phone.display}.
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {TILES.map((t) => (
              <li key={t.label}>
                <a href={t.href} className="sheet group flex h-full flex-col p-6 transition-colors hover:border-ink">
                  <t.icon aria-hidden="true" size={22} strokeWidth={1.5} className="text-ink" />
                  <span className="label mt-4 text-muted">{t.label}</span>
                  <span className="font-display mt-1 text-[1.5rem] leading-tight font-semibold break-all text-ink md:text-[1.625rem]">
                    {t.value}
                  </span>
                  <span className="mt-2 text-[0.9375rem] text-muted">{t.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Move Planner" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label text-muted">Move Planner</p>
            <p className="font-display mt-3 text-[2rem] leading-tight font-semibold text-ink md:text-[2.5rem]">
              Five quick questions. One local agent.
            </p>
            <p className="mt-3 text-muted">
              Tell us what you are planning and where. We will match you with the agent who fits, and write the text for
              you.
            </p>
          </div>
          <div className="sheet p-5 md:p-8 lg:col-span-7">
            <PlannerFlow headingId="contact-planner-title" />
          </div>
        </div>
      </section>

      <section aria-labelledby="direct-title" className="section border-t border-rule bg-plat">
        <div className="wrap">
          <h2 id="direct-title" className="text-[2.25rem] md:text-[3rem]">
            Call your agent directly.
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {WEST_TO_EAST.map((code) => {
              const m = marketByCode(code);
              return (
                <div key={code}>
                  <h3 className="text-[1.5rem]">{m.name}</h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{m.serviceArea}</p>
                  <ul className="mt-4 border-t border-rule">
                    {agentsInState(code).map((a) => (
                      <li key={a.slug} className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-rule py-3">
                        <span className="text-ink">{a.name}</span>
                        <a
                          href={a.cell ? `tel:${a.cell.e164}` : business.phone.tel}
                          className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4"
                          aria-label={`Call ${a.name} at ${a.cell ? a.cell.display : `the main line, ${business.phone.display}`}`}
                        >
                          {a.cell ? a.cell.display : `${business.phone.display} (main line)`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mt-12 max-w-[70ch] text-muted">
            {business.displayName} serves {markets.map((m) => `${m.name} (${m.serviceArea})`).join(", ").replace(/, ([^,]*)$/, " and $1")}.
          </p>
        </div>
      </section>
    </>
  );
}
