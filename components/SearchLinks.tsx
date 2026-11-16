import { ArrowUpRight } from "lucide-react";
import { idx } from "@/lib/business";

// TODO at launch: embed the iHomefinder Kestrel widget on the new domain.
const LINKS = [
  { href: idx.nevada, label: "Search Nevada homes" },
  { href: idx.illinois, label: "Search Illinois homes" },
  { href: idx.pennsylvania, label: "Search Pennsylvania and Maryland homes" },
];

export function SearchLinks() {
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {LINKS.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener"
            aria-label={`${l.label}, opens the live MLS search in a new tab`}
            className="btn btn-ghost h-full w-full !justify-between bg-plat !py-3 text-left !whitespace-normal"
          >
            {l.label}
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0" />
          </a>
        </li>
      ))}
    </ul>
  );
}
