import type { Metadata } from "next";
import { TopNav } from "@/components/sections/TopNav";
import { ProgressIndicator } from "@/components/sections/ProgressIndicator";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { System } from "@/components/sections/System";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Testimonials } from "@/components/sections/Testimonials";
import { GreenFilm } from "@/components/sections/GreenFilm";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { DEFAULT_OG_IMAGE, canonical, ldJson, productJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  // Root layout's title.default already sets "Swing Path Pro - Feel the swing.
  // Correct the cause.", which is what we want on the homepage - so no title
  // override here (avoids double-branding via title.template).
  description:
    "Swing Path Pro is a physical golf training station that lets players feel and correct the swing itself, not just read the number afterwards. Made in South Africa. Patent-protected.",
  alternates: { canonical: canonical("/") },
  openGraph: {
    url: canonical("/"),
    title: "Swing Path Pro - Feel the swing. Correct the cause.",
    description:
      "The physical golf training station that lets players feel and correct the swing itself. Made in South Africa.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Structured data: product on the homepage - Google can associate the
          product with the brand's Organization node from the root layout. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(productJsonLd()) }}
      />

      {/* Visually-hidden H1 gives crawlers a proper page heading (the hero's
          animated words sit inside <span>s and aren't a real heading). */}
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Swing Path Pro - Physical golf swing training and feedback apparatus
      </h1>

      <TopNav />
      <ProgressIndicator />
      <Hero />
      <Problem />
      <System />
      <WhoItsFor />
      <Testimonials />
      <GreenFilm />
      <SiteFooter />
    </main>
  );
}
