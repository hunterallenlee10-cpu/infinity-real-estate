import { ArrowUpRight } from "lucide-react";
import { idx } from "@/lib/business";

// TODO at launch: embed the iHomefinder Kestrel widget on the new domain.
const LINKS = [
  { href: idx.nevada, label: "Search Nevada homes" },
  { href: idx.illinois, label: "Search Illinois homes" },
  { href: idx.pennsylvania, label: "Search Pennsylvania and Maryland homes" },
];

export function SearchBand() {
  return (
    <section id="search" aria-labelledby="search-title" className="scroll-mt-20 border-y border-rule bg-plat py-14 md:py-16">
      <div className="wrap grid items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="search-title" className="text-[2rem] md:text-[2.5rem]">
            Search live MLS listings.
          </h2>
          <p className="mt-2 text-muted">Live search runs on Infinity&rsquo;s existing MLS feed.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
          {LINKS.map((l) => (
            <li key={l.href + l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener"
                aria-label={`${l.label}, opens the live MLS search in a new tab`}
                className="btn btn-ghost h-full w-full !justify-between !py-3 text-left !whitespace-normal"
              >
                {l.label}
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
