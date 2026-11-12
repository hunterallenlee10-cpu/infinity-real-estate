"use client";

import type { ReactNode } from "react";
import { usePlanner } from "./MovePlanner/PlannerProvider";
import type { Prefill } from "./MovePlanner/types";

type Props = {
  prefill?: Prefill;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
};

/** Every "Match Me With an Agent" action is a button that opens the Move Planner. */
export function MatchButton({ prefill, className = "btn btn-ink", children, ...rest }: Props) {
  const { open } = usePlanner();
  return (
    <button type="button" className={className} onClick={() => open(prefill)} aria-haspopup="dialog" {...rest}>
      {children ?? "Match Me With an Agent"}
    </button>
  );
}
