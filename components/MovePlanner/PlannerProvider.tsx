"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import type { Prefill } from "./types";

// The modal is only downloaded when someone opens it.
const MovePlanner = dynamic(() => import("./MovePlanner").then((m) => m.MovePlanner), { ssr: false });

type Ctx = { open: (prefill?: Prefill) => void };
const PlannerContext = createContext<Ctx>({ open: () => {} });

export function usePlanner() {
  return useContext(PlannerContext);
}

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: Prefill; key: number }>({
    open: false,
    prefill: {},
    key: 0,
  });

  const open = useCallback((prefill: Prefill = {}) => {
    setState((s) => ({ open: true, prefill, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <PlannerContext.Provider value={{ open }}>
      {children}
      {state.open && <MovePlanner key={state.key} prefill={state.prefill} onClose={close} />}
    </PlannerContext.Provider>
  );
}
