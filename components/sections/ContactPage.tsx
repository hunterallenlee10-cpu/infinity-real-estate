import { Mail, MessageSquare, Phone } from "lucide-react";
import { PageHero } from "../PageHero";
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
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        display="Talk to a real person."
        headline="Contact Infinity Real Estate, real estate agents in Pennsylvania, Illinois, Nevada and Maryland."
        lead={`Call, text or message us. We match you with a local agent. Main line ${business.phone.display}.`}
      />
      <section aria-label="Ways to reach us" className="pt-10 md:pt-14">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-3">
            {TILES.map((t) => (
              <li key={t.label}>
                <a href={t.href} className="sheet group flex h-full flex-col p-6 transition-colors hover:border-ink">
                  <t.icon aria-hidden="true" size={22} strokeWidth={1.5} className="text-ink" />
                  <span className="mt-4 text-[0.9375rem] font-medium text-muted">{t.label}</span>
                  <span
                    className={`mt-1 leading-tight font-semibold text-ink ${
                      t.label === "Email"
                        ? "text-[1.0625rem] [overflow-wrap:anywhere] lg:text-[1.1875rem]"
                        : "font-display text-[1.375rem] whitespace-nowrap lg:text-[1.625rem]"
                    }`}
                  >
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
            <p className="font-display text-[length:var(--text-h2)] leading-tight font-semibold text-ink">
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
