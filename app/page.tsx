import { Nav } from "@/components/Nav";
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

export default function Home() {
  return (
    <>
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
