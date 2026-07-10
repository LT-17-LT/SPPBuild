import type { MetadataRoute } from "next";
import { BRAND_TAGLINE, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: BRAND_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#f3f1ec",
    theme_color: "#09140b",
    icons: [
      { src: "/seo/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/seo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/seo/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  };
}
