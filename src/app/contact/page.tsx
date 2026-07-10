import type { Metadata } from "next";
import { TopNav } from "@/components/sections/TopNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";

import { DEFAULT_OG_IMAGE, breadcrumbJsonLd, canonical, ldJson } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact - Pricing, Licensing & Partnerships",
  description:
    "Request Swing Path Pro pricing, license agreements, partnerships, or send us a question. Made in South Africa for the game.",
  alternates: { canonical: canonical("/contact") },
  openGraph: {
    url: canonical("/contact"),
    title: "Contact Swing Path Pro",
    description:
      "Request pricing, license agreements, partnerships, or ask us anything.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <main className="relative w-full" style={{ background: "var(--paper)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]),
          ),
        }}
      />
      <TopNav />

      <section
        className="mx-auto text-center"
        style={{
          maxWidth: "min(760px, 92vw)",
          paddingTop: "clamp(4rem, 9vw, 7rem)",
          paddingBottom: "clamp(2rem, 4vw, 3rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal>
          <span
            className="eyebrow"
            style={{ color: "var(--green)", display: "block", marginBottom: "1.25rem" }}
          >
            Contact Us
          </span>
          <h1
            className="font-display"
            style={{
              color: "var(--ink)",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              margin: 0,
            }}
          >
            Let&rsquo;s talk.
          </h1>
          <p
            style={{
              color: "var(--moss)",
              fontSize: "1.05rem",
              lineHeight: 1.65,
              fontWeight: 300,
              margin: "1.5rem auto 0",
              maxWidth: "50ch",
            }}
          >
            Request pricing, license agreements, partnerships, or ask us
            anything, and we&rsquo;ll be in touch.
          </p>
        </Reveal>
      </section>

      <section
        className="mx-auto"
        style={{
          maxWidth: "min(720px, 92vw)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
