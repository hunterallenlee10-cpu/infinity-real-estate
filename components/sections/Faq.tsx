import { Plus } from "lucide-react";
import { faq } from "@/lib/faq";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section border-t border-rule">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-muted">Questions</p>
          <h2 id="faq-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
            Good questions.
          </h2>
        </div>
        <div className="border-t border-rule lg:col-span-8">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.25rem] leading-snug font-medium text-ink md:text-[1.375rem]">{f.q}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule transition-transform group-open:rotate-45" aria-hidden="true">
                  <Plus size={18} strokeWidth={1.5} />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-text">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
