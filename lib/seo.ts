import type { Metadata } from "next";
import { business } from "./business";
import { OG_IMAGE } from "./schema";

const ogImage = {
  url: OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "Infinity Real Estate. Making realty dreams come true. PA, IL, NV, MD. Since 1994.",
};

/** Per-page metadata with a self-referencing canonical and the shared link preview. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: business.name,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
