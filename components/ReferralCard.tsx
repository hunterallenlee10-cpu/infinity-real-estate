import { Phone } from "lucide-react";
import { RooflineFrame } from "./RooflineFrame";
import { referral } from "@/lib/business";

// DRAFT: confirm Robin is happy to be featured as a referral partner.
export function ReferralCard({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-labelledby="coast-title"
      className={`sheet grid grid-cols-[84px_1fr] items-center gap-4 p-5 md:grid-cols-[120px_1fr] md:gap-8 md:p-7 lg:grid-cols-[120px_1fr_auto] ${className}`}
    >
      <RooflineFrame
        photo={{ src: referral.photo, w: referral.photoW, h: referral.photoH, alt: referral.alt, position: "45% 20%" }}
        sizes="120px"
      />
      <div className="min-w-0">
        <h3 id="coast-title" className="text-[1.5rem] md:text-[1.75rem]">
          Moving to the coast?
        </h3>
        <p className="mt-2 max-w-[60ch] text-text">
          Heading to Myrtle Beach? Robin Keefover, who started with Infinity in Pennsylvania, now specializes in oceanfront
          condos and beach homes in Myrtle Beach, SC.
        </p>
      </div>
      <a href={referral.tel} className="btn btn-ghost col-span-2 !whitespace-normal md:col-span-1 md:col-start-2 md:justify-self-start lg:col-start-auto">
        <Phone aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0" />
        Call Robin {referral.phoneDisplay}
      </a>
    </aside>
  );
}
