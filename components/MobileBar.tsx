"use client";

import { MessageSquare, Phone, Search } from "lucide-react";
import { business } from "@/lib/business";
import { usePlanner } from "./MovePlanner/PlannerProvider";

/** Mobile only: always-visible Call, Text and Find My Agent. */
export function MobileBar() {
  const { open } = usePlanner();
  const item = "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-medium";
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="flex">
        <a href={business.phone.tel} className={`${item} text-ink`} aria-label={`Call ${business.phone.display}`}>
          <Phone aria-hidden="true" size={19} strokeWidth={1.5} />
          Call
        </a>
        <a
          href={business.phone.sms}
          className={`${item} border-x border-rule text-ink`}
          aria-label={`Text ${business.phone.display}`}
        >
          <MessageSquare aria-hidden="true" size={19} strokeWidth={1.5} />
          Text
        </a>
        <button type="button" onClick={() => open({ source: "mobile-bar" })} className={`${item} bg-ink text-paper`} aria-haspopup="dialog">
          <Search aria-hidden="true" size={19} strokeWidth={1.5} />
          Find My Agent
        </button>
      </div>
    </div>
  );
}
