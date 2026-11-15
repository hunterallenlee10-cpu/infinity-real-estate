import type { NextConfig } from "next";

const isLive = process.env.NEXT_PUBLIC_SITE_MODE === "live";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Demo mode: every response (pages, images, files) tells search engines to stay away.
  // Live mode removes the header.
  async headers() {
    if (isLive) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  // Page-by-page redirects from the old WordPress addresses on infinitypa.com.
  async redirects() {
    const map: [string, string][] = [
      ["/nevada", "/markets/nevada"],
      ["/illinois", "/markets/illinois"],
      ["/pennsylvania", "/markets/pennsylvania"],
      ["/maryland", "/markets/maryland"],
      ["/about-us", "/about"],
      ["/contact-us", "/contact"],
      ["/service-locations", "/markets"],
      ["/real-estate-search", "/search"],
      // TODO at launch: point these at the embedded iHomefinder search for each state.
      ["/nevada-real-estate-search", "/search"],
      ["/illinois-real-estate-search", "/search"],
      ["/pennsylvania-real-estate-search", "/search"],
    ];
    return map.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
