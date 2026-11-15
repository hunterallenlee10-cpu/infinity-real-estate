import Image from "next/image";
import Link from "next/link";
import { InfinityMark } from "../InfinityMark";
import { IS_LIVE, business, navWithContact } from "@/lib/business";
import { markets } from "@/lib/markets";

const link = "inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-plat pb-20 md:pb-0">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="Infinity Real Estate, home" className="inline-block text-ink">
            <InfinityMark title={null} className="h-16 w-auto" />
          </Link>
          <p className="font-display mt-6 text-[1.375rem] leading-snug text-ink">{business.lines.headline}</p>
          <p className="mt-2 text-muted">{business.displayName}. Since 1994.</p>
          <p className="mt-6 text-[0.9375rem] font-medium text-ink">Call or text the main line</p>
          <a
            href={business.phone.tel}
            className="font-display mt-1 block text-[2.25rem] leading-tight font-semibold whitespace-nowrap text-ink hover:underline"
          >
            {business.phone.display}
          </a>
          <p className="mt-1 flex flex-wrap gap-x-5">
            <a href={business.phone.sms} className={`${link} font-medium underline`}>
              Text {business.phone.display}
            </a>
            <a href={`mailto:${business.email}`} className={`${link} font-medium underline [overflow-wrap:anywhere]`}>
              {business.email}
            </a>
          </p>
        </div>

        <nav aria-label="Markets" className="lg:col-span-4 lg:col-start-6">
          <p className="text-[0.9375rem] font-medium text-muted">Where we work</p>
          <ul className="mt-2">
            {markets.map((m) => (
              <li key={m.code} className="border-b border-rule py-2 last:border-b-0">
                <Link href={`/markets/${m.slug}`} className="group block py-1.5">
                  <span className="font-medium text-ink underline-offset-4 group-hover:underline">{m.name}</span>
                  <span className="block text-[0.9375rem] text-muted">{m.serviceArea}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-11">
          <p className="text-[0.9375rem] font-medium text-muted">Infinity</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {navWithContact.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="wrap flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/00-logo-3-badge-realtor-mls-equal-housing.webp"
              alt="REALTOR, Multiple Listing Service and Equal Housing Opportunity marks"
              width={480}
              height={150}
              loading="lazy"
              className="h-11 w-auto"
            />
            <p className="text-[0.9375rem] font-medium text-ink">Equal Housing Opportunity</p>
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
