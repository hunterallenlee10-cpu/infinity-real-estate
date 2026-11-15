import { Shell } from "@/components/Shell";
import { homeSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { faq } from "@/lib/faq";
import { Hero } from "@/components/sections/Hero";
import { BothHats } from "@/components/sections/BothHats";
import { AgentMatchSection } from "@/components/sections/AgentMatchSection";
import { Markets } from "@/components/sections/Markets";
import { FeaturedAgents } from "@/components/sections/FeaturedAgents";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Proof } from "@/components/sections/Proof";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = pageMeta({
  title: "Real Estate Agents in PA, IL, NV & MD | Infinity Real Estate",
  description:
    "Infinity Real Estate is a boutique firm serving Pennsylvania, Illinois, Nevada and Maryland since 1994. Meet your local agent, then call or text today.",
  path: "/",
});

export default function Home() {
  return (
    <Shell schema={homeSchema()} animateMark>
      <Hero />
      <AgentMatchSection />
      <BothHats />
      <Markets />
      <FeaturedAgents />
      <HowItWorks />
      <Proof />
      <FaqSection items={faq} />
      <FinalCta />
    </Shell>
  );
}
