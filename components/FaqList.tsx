import { Plus } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-rule">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-rule">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[length:var(--text-h3)] leading-snug font-medium text-ink">{f.q}</span>
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              <Plus size={18} strokeWidth={1.5} />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 text-text">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
