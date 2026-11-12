import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InfinityMark } from "../InfinityMark";
import { IS_LIVE, business, nav } from "@/lib/business";
import { markets } from "@/lib/markets";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-plat pb-24 md:pb-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Link href="/" aria-label="Infinity Real Estate, home" className="inline-block text-ink">
            <InfinityMark title={null} className="h-16 w-auto" />
          </Link>
          <p className="font-display mt-6 text-[1.375rem] leading-snug text-ink">{business.lines.headline}</p>
          <p className="mt-2 text-muted">{business.displayName}. Since 1994.</p>
        </div>

        <div className="md:col-span-4">
          <p className="label text-muted">Call or text the main line</p>
          <a
            href={business.phone.tel}
            className="font-display mt-2 block text-[2.25rem] leading-tight font-semibold text-ink hover:underline md:text-[2.5rem]"
          >
            {business.phone.display}
          </a>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <a href={business.phone.sms} className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4">
              Text {business.phone.display}
            </a>
            <a href={`mailto:${business.email}`} className="inline-flex min-h-11 items-center break-all font-medium text-ink underline underline-offset-4">
              {business.email}
            </a>
          </p>
          <p className="label mt-8 text-muted">Where we work</p>
          <ul className="mt-3 space-y-1.5 text-[0.9375rem]">
            {markets.map((m) => (
              <li key={m.code}>
                <span className="font-medium text-ink">{m.name}:</span> {m.serviceArea}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="label text-muted">Quick links</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center text-ink hover:underline">
                  {n.label === "Contact" ? "Contact Infinity" : n.label === "About" ? "About Infinity" : n.label}
                </Link>
              </li>
            ))}
            {markets.map((m) => (
              <li key={m.code}>
                <a
                  href={m.idx}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-1 text-ink hover:underline"
                  aria-label={`Search ${m.name} homes on the live MLS search, opens in a new tab`}
                >
                  {m.code} homes <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="wrap flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/00-logo-3-badge-realtor-mls-equal-housing.webp"
              alt="REALTOR, Multiple Listing Service and Equal Housing Opportunity marks"
              width={480}
              height={150}
              loading="lazy"
              className="h-12 w-auto"
            />
            <p className="label text-ink">Equal Housing Opportunity</p>
          </div>
          {/* DRAFT: add each state's required brokerage name, office address and licence disclosure (PA, IL, MD not published). */}
          <div className="text-[0.875rem] text-muted md:text-right">
            <p>Infinity Realty (NV) {business.nvLicence}</p>
            <p>&copy; 2026 {business.copyrightName}. All Rights Reserved.</p>
            {!IS_LIVE && <p className="mt-1">Concept preview by Lee Enterprises Unlimited.</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
