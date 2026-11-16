import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/lib/business";

const VALUES = [
  "Authentic, conscientious, and thorough representation.",
  "Our communication is always clear.",
  "Each client is treated as an individual.",
];

// DRAFT: no reviews are shown until the firm supplies real ones (plain text, month and year, linked to the source).
export function Proof() {
  return (
    <section aria-labelledby="proof-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-5">
            <h2 id="proof-title" className="text-[length:var(--text-h2)]">
              Since 1994.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[length:var(--text-lead)] text-text">
              {business.foundedLine} {business.expandedLine} Offering personalized real estate services to each client
              since 1994.
            </p>
            <p className="mt-4 text-[0.9375rem] text-muted">
              {business.displayName}. {business.nvLicence}.
            </p>
            <Link href="/about" className="btn btn-ghost mt-7">
              About Infinity
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {VALUES.map((v) => (
              <li key={v} className="reveal border-t border-rule py-6 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-6">
                <p className="font-display text-[length:var(--text-h3)] leading-snug text-ink md:text-[1.75rem]">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
