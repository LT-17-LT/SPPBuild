import type { Metadata } from "next";
import { TopNav } from "@/components/sections/TopNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";

import { DEFAULT_OG_IMAGE, breadcrumbJsonLd, canonical, ldJson } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Swing Path Pro collects, uses and protects your personal information, in line with the Protection of Personal Information Act (POPIA) in South Africa.",
  alternates: { canonical: canonical("/privacy") },
  robots: { index: true, follow: true },
  openGraph: {
    url: canonical("/privacy"),
    title: "Privacy Policy - Swing Path Pro",
    description:
      "How Swing Path Pro collects, uses and protects your personal information.",
    images: [DEFAULT_OG_IMAGE],
  },
};

type Section = { heading: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    heading: "Who we are",
    body: "Swing Path Pro (“we”, “us”) is a golf training product designed and made in South Africa. This policy explains how we handle the personal information you share with us, in line with the Protection of Personal Information Act (POPIA).",
  },
  {
    heading: "What we collect",
    body: "When you complete our contact form we collect the details you provide - your name, email address, phone number, and any company, VAT, or address details you choose to include, along with your enquiry. We only collect what you give us; we do not buy personal information from third parties.",
  },
  {
    heading: "How we use it",
    body: "We use your information solely to respond to your enquiry, provide pricing or a demo, process a pre-order, and keep you updated about that request. We do not sell your information, and we do not share it except where it is necessary to fulfil your enquiry (for example, arranging a delivery).",
  },
  {
    heading: "Cookies",
    body: "This site uses only the minimal storage needed to function - for example, remembering that you have already seen the opening animation during your visit. We do not run advertising trackers.",
  },
  {
    heading: "Keeping it safe",
    body: "We take reasonable steps to protect the information you share and retain it only for as long as needed to deal with your enquiry or to meet our legal obligations.",
  },
  {
    heading: "Your rights",
    body: "You may ask us what personal information we hold about you, request that we correct it, or ask us to delete it. To make any such request, contact us and we will respond as required under POPIA.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative w-full" style={{ background: "var(--paper)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            breadcrumbJsonLd([{ name: "Privacy", path: "/privacy" }]),
          ),
        }}
      />
      <TopNav />

      <section
        className="mx-auto"
        style={{
          maxWidth: "min(720px, 92vw)",
          paddingTop: "clamp(4rem, 9vw, 7rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal>
          <span
            className="eyebrow"
            style={{ color: "var(--green)", display: "block", marginBottom: "1.25rem" }}
          >
            Privacy
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
            Privacy policy.
          </h1>
          <p
            style={{
              color: "var(--moss)",
              fontSize: "0.85rem",
              fontWeight: 300,
              marginTop: "1rem",
            }}
          >
            Last updated: July 2026
          </p>
        </Reveal>

        <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          {SECTIONS.map((s) => (
            <Reveal key={s.heading} style={{ marginBottom: "clamp(2rem, 4vw, 2.75rem)" }}>
              <h2
                className="font-display"
                style={{
                  color: "var(--ink)",
                  fontWeight: 400,
                  fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {s.heading}
              </h2>
              <p
                style={{
                  color: "var(--moss)",
                  fontSize: "1.02rem",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginTop: "0.75rem",
                }}
              >
                {s.body}
              </p>
            </Reveal>
          ))}

          <Reveal>
            <h2
              className="font-display"
              style={{
                color: "var(--ink)",
                fontWeight: 400,
                fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Contact
            </h2>
            <p
              style={{
                color: "var(--moss)",
                fontSize: "1.02rem",
                lineHeight: 1.75,
                fontWeight: 300,
                marginTop: "0.75rem",
              }}
            >
              Questions about your privacy or this policy? Reach us through our{" "}
              <a href="/contact" style={{ color: "var(--green)", fontWeight: 500 }}>
                contact page
              </a>{" "}
              or at{" "}
              <a
                href="mailto:hello@swingpathpro.com"
                style={{ color: "var(--green)", fontWeight: 500 }}
              >
                hello@swingpathpro.com
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
