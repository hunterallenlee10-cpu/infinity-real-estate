import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ContactPage } from "@/components/sections/ContactPage";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const title = "Contact Infinity Real Estate | Agents in PA, IL, NV and MD";
const description =
  "Call, text or message Infinity Real Estate. We match you with a local agent in Pennsylvania, Illinois, Nevada or Maryland. Main line (888) 213-6110.";

export const metadata: Metadata = pageMeta({ title, description, path: "/contact" });

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbSchema()} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <ContactPage />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
