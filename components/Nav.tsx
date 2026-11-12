"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { InfinityMark } from "./InfinityMark";
import { MatchButton } from "./MatchButton";
import { business, nav } from "@/lib/business";

export function Nav({ animateMark = false }: { animateMark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile sheet: lock scroll, close on Escape, trap focus, return focus to the burger.
  useEffect(() => {
    if (!menu) return;
    const burger = burgerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
      if (e.key === "Tab" && sheetRef.current) {
        const els = sheetRef.current.querySelectorAll<HTMLElement>("a,button");
        const a = els[0];
        const b = els[els.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          b.focus();
        } else if (!e.shiftKey && document.activeElement === b) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [menu]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled ? "border-b border-rule bg-white/92 backdrop-blur-md" : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-4 md:h-[76px]">
        <Link href="/" aria-label="Infinity Real Estate, home" className="flex shrink-0 items-center py-2 text-ink">
          <InfinityMark animate={animateMark} title={null} className="h-[46px] w-auto md:h-[52px]" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-[0.9375rem] font-medium text-text underline-offset-[6px] hover:underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={business.phone.tel}
            className="flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-ink"
            aria-label={`Call Infinity Real Estate at ${business.phone.display}`}
          >
            <Phone aria-hidden="true" size={17} strokeWidth={1.5} />
            {business.phone.display}
          </a>
          <MatchButton className="btn btn-ink !min-h-11 !px-4 text-[0.9375rem]" />
        </div>

        <button
          ref={burgerRef}
          type="button"
          className="-mr-2 flex h-12 w-12 items-center justify-center text-ink lg:hidden"
          aria-label="Open menu"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu(true)}
        >
          <Menu aria-hidden="true" size={26} strokeWidth={1.5} />
        </button>
      </div>

      {menu && (
        <div
          id="mobile-menu"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="contour-bg fixed inset-0 z-50 flex flex-col bg-paper"
        >
          <div className="wrap flex h-[68px] items-center justify-between">
            <InfinityMark title={null} className="h-[46px] w-auto text-ink" />
            <button
              type="button"
              className="-mr-2 flex h-12 w-12 items-center justify-center text-ink"
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <X aria-hidden="true" size={26} strokeWidth={1.5} />
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap mt-6 flex-1">
            <ul className="border-t border-rule">
              {nav.map((n) => (
                <li key={n.href} className="border-b border-rule">
                  <Link
                    href={n.href}
                    onClick={() => setMenu(false)}
                    className="font-display flex min-h-16 items-center text-[1.75rem] font-medium text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap grid gap-3 pb-8">
            <a href={business.phone.tel} className="btn btn-ghost w-full">
              <Phone aria-hidden="true" size={18} strokeWidth={1.5} />
              Call {business.phone.display}
            </a>
            <div onClick={() => setMenu(false)}>
              <MatchButton className="btn btn-ink w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
