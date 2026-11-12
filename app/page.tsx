import { Nav } from "@/components/Nav";
import { JsonLd } from "@/components/JsonLd";
import { homeSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { BothHats } from "@/components/sections/BothHats";
import { AgentMatchSection } from "@/components/sections/AgentMatchSection";
import { Markets } from "@/components/sections/Markets";
import { Team } from "@/components/sections/Team";
import { SearchBand } from "@/components/sections/SearchBand";
import { Since1994 } from "@/components/sections/Since1994";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export const metadata = pageMeta({
  title: "Real Estate Agents in PA, IL, NV & MD | Infinity Real Estate",
  description:
    "Infinity Real Estate is a boutique firm serving Pennsylvania, Illinois, Nevada and Maryland since 1994. Meet your local agent, then call or text today.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <Nav animateMark />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <BothHats />
        <AgentMatchSection />
        <Markets />
        <Team />
        <SearchBand />
        <Since1994 />
        <HowItWorks />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
