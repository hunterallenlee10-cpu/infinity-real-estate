"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Appears only after scrolling 1.5 screens. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.querySelector<HTMLElement>("#main")?.focus({ preventScroll: true });
      }}
      className="fixed right-4 bottom-[76px] z-30 flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-white text-ink shadow-sm transition-colors hover:bg-paper md:right-6 md:bottom-6"
    >
      <ArrowUp aria-hidden="true" size={20} strokeWidth={1.5} />
    </button>
  );
}
