"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { PlannerFlow } from "./PlannerFlow";
import type { Prefill } from "./types";

/** The Move Planner modal: full-screen sheet on phones, a centred survey sheet on larger screens. */
export function MovePlanner({ prefill, onClose }: { prefill: Prefill; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/45" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="planner-title"
        className="relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-paper sm:max-h-[min(860px,calc(100dvh-48px))] sm:max-w-[620px] sm:rounded-[8px] sm:border sm:border-rule"
      >
        <div className="flex items-center justify-between border-b border-rule bg-plat px-5 py-2.5 sm:px-7">
          <p className="label text-ink">Move Planner</p>
          <button type="button" onClick={onClose} aria-label="Close the Move Planner" className="-mr-2 flex h-12 w-12 items-center justify-center text-ink">
            <X aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-7 sm:pt-6 sm:pb-7">
          <PlannerFlow prefill={prefill} headingId="planner-title" onClose={onClose} stickyNav />
        </div>
      </div>
    </div>
  );
}
