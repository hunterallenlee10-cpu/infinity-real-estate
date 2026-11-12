"use client";
import type { Prefill } from "./types";
// Placeholder, replaced in Phase 5.
export function MovePlanner({ onClose }: { prefill: Prefill; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Move Planner" className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <button className="btn btn-ink" onClick={onClose}>Close</button>
    </div>
  );
}
