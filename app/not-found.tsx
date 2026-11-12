import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ROOF_D } from "@/components/InfinityMark";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Infinity Real Estate" },
  description: "This address is not on the map. Head back to Infinity Real Estate.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="contour-bg outline-none">
        <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <svg viewBox="470 40 536 180" aria-hidden="true" className="w-48 text-ink">
            <path d={ROOF_D} fill="none" stroke="currentColor" strokeWidth={37} strokeLinejoin="miter" />
          </svg>
          <p className="label mt-8 text-muted">404</p>
          <h1 className="mt-3 max-w-[16ch] text-[2.75rem] md:text-[4rem]">This address is not on the map.</h1>
          <p className="mt-4 max-w-[40ch] text-muted">The page you are looking for moved or never existed. Real estate agents in PA, IL, NV and MD are one click away.</p>
          <Link href="/" className="btn btn-ink mt-8">
            Back to Infinity Real Estate
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
