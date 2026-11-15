import { FaqList } from "../FaqList";

export function FaqSection({ items, title = "Good questions." }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="section border-t border-rule">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="text-[length:var(--text-h2)]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}
