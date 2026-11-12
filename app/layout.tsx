import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SvgDefs } from "@/components/SvgDefs";
import { PlannerProvider } from "@/components/MovePlanner/PlannerProvider";
import { MobileBar } from "@/components/MobileBar";
import { BackToTop } from "@/components/BackToTop";
import { IS_LIVE, SITE_URL, business } from "@/lib/business";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: business.name,
  // Demo mode stays out of search so it never competes with infinitypa.com. Live mode is indexable.
  robots: IS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F3F6F8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jost.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SvgDefs />
        <PlannerProvider>
          {children}
          <MobileBar />
          <BackToTop />
        </PlannerProvider>
        <Analytics />
      </body>
    </html>
  );
}
