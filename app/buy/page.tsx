import { ServicePage, type ServiceContent } from "@/components/ServicePage";
import { buyFaq } from "@/lib/faq";
import { buyGroups } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Buyer's Agents in PA, IL, NV & MD | Infinity Real Estate",
  description:
    "Buying a home in Pennsylvania, Illinois, Nevada or Maryland? See which Infinity agent fits your move, from first homes to veterans, luxury and investment.",
  path: "/buy",
});

const content: ServiceContent = {
  path: "/buy",
  label: "Buy",
  plan: "buying",
  display: "Buying a home.",
  headline: "Buyer's agents in Pennsylvania, Illinois, Nevada and Maryland.",
  lead: "We guide you through every step of the process, with one local agent who handles it start to finish.",
  schemaName: "Buyer representation",
  schemaDescription: "A local agent who guides buyers through every step of finding and buying a home.",
  askTitle: "Who to ask for.",
  askLead: "Every agent can help with any purchase in their state. These are the things their own bios say they know best.",
  groups: buyGroups,
  stepsTitle: "How buying with Infinity works.",
  steps: [
    { t: "Tell us where.", d: "Your state, your area and what you are looking for." },
    { t: "Meet your agent.", d: "One local person who guides you through every step." },
    { t: "Search, then go and see.", d: "Search live MLS listings, and see the ones you like with your agent." },
  ],
  faq: buyFaq,
  ownWords: [
    "We guide them through every step of the process.",
    "Each client is treated as an individual.",
    "Our communication is always clear.",
  ],
  showSearch: true,
  ctaTitle: "Ready to look?",
  ctaText: "Tell us where you are buying. We will put you with the right local agent.",
};

export default function BuyPage() {
  return <ServicePage c={content} />;
}
