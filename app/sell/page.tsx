import { ServicePage, type ServiceContent } from "@/components/ServicePage";
import { sellFaq } from "@/lib/faq";
import { sellGroups } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Listing Agents in PA, IL, NV & MD | Infinity Real Estate",
  description:
    "Selling a home in Pennsylvania, Illinois, Nevada or Maryland? Meet the Infinity listing agent who fits, and sell and buy at once with one firm.",
  path: "/sell",
});

const content: ServiceContent = {
  path: "/sell",
  label: "Sell",
  plan: "selling",
  display: "Selling your home.",
  headline: "Listing agents in Pennsylvania, Illinois, Nevada and Maryland.",
  lead: "A hands-on approach to listing and selling your home, with clear communication from list price to closing.",
  schemaName: "Seller representation",
  schemaDescription: "A local agent who handles listing and selling a home, with clear communication from list price to closing.",
  askTitle: "Who to ask for.",
  askLead: "Every agent can list a home in their state. These are the things their own bios say they know best.",
  groups: sellGroups,
  stepsTitle: "How selling with Infinity works.",
  steps: [
    { t: "Tell us about the home.", d: "Where it is, and when you want to move." },
    { t: "Meet your listing agent.", d: "One local person, from list price to closing." },
    { t: "List, and stay in the loop.", d: "You always know what is happening next." },
  ],
  faq: sellFaq,
  ownWords: [
    "We can quickly wear both hats, a listing agent and a buyer’s agent.",
    "Authentic, conscientious, and thorough representation.",
    "Our communication is always clear.",
  ],
  ctaTitle: "Thinking of selling?",
  ctaText: "Tell us about the home. We will put you with the right local listing agent.",
};

export default function SellPage() {
  return <ServicePage c={content} />;
}
