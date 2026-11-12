"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { StateCode } from "@/lib/markets";

export const TEAM_FILTER_EVENT = "infinity:team-filter";

/** A real link to #agents that also filters the team grid to one state. */
export function TeamLink({ state, className, children }: { state: StateCode; className?: string; children: ReactNode }) {
  return (
    <Link
      href="/#agents"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(TEAM_FILTER_EVENT, { detail: state }))}
    >
      {children}
    </Link>
  );
}
