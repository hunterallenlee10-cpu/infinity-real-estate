import type { Metadata } from "next";
import { Shell } from "@/components/Shell";
import { ContactPage } from "@/components/sections/ContactPage";
import { FinalCta } from "@/components/sections/FinalCta";
import { simplePageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Infinity Real Estate | Agents in PA, IL, NV and MD",
  description:
    "Call, text or message Infinity Real Estate. We match you with a local agent in Pennsylvania, Illinois, Nevada or Maryland. Main line (888) 213-6110.",
  path: "/contact",
});

export default function Contact() {
  return (
    <Shell schema={simplePageSchema("Contact", "/contact")}>
      <ContactPage />
      <FinalCta />
    </Shell>
  );
}
