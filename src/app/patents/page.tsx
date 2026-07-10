import type { Metadata } from "next";
import { TopNav } from "@/components/sections/TopNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";

import { DEFAULT_OG_IMAGE, breadcrumbJsonLd, canonical, ldJson, PATENT_NUMBER } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Patents (#${PATENT_NUMBER})`,
  description: `The Swing Path Pro training apparatus, mechanism and design are registered intellectual property under Patent #${PATENT_NUMBER}.`,
  alternates: { canonical: canonical("/patents") },
  openGraph: {
    url: canonical("/patents"),
    title: `Patents - Swing Path Pro (#${PATENT_NUMBER})`,
    description:
      "Swing Path Pro is protected intellectual property. Registered under Patent #1408632.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PatentsPage() {
  return (
    <main className="relative w-full" style={{ background: "var(--paper)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: ldJson(
            breadcrumbJsonLd([{ name: "Patents", path: "/patents" }]),
          ),
        }}
      />
      <TopNav />

      <section
        className="mx-auto"
        style={{
          maxWidth: "min(760px, 92vw)",
          paddingTop: "clamp(4rem, 9vw, 7rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal className="text-center">
          <span
            className="eyebrow"
            style={{ color: "var(--green)", display: "block", marginBottom: "1.25rem" }}
          >
            Patents
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
            Protected by design.
          </h1>
        </Reveal>

        {/* Patent number card */}
        <Reveal style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 20% 20%, var(--green2) 0%, var(--green) 45%, var(--green-deep) 100%)",
              color: "var(--paper)",
              borderRadius: 16,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              padding: "clamp(2.5rem, 5vw, 3.5rem)",
              textAlign: "center",
              boxShadow: "0 20px 60px -28px rgba(9, 20, 11, 0.4)",
            }}
          >
            <span
              className="eyebrow"
              style={{ color: "var(--gold)", display: "block", marginBottom: "1rem" }}
            >
              Patent
            </span>
            <p
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                margin: 0,
                color: "var(--paper)",
              }}
            >
              #1408632
            </p>
          </div>
        </Reveal>

        {/* Body copy */}
        <Reveal style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          <div
            style={{
              color: "var(--moss)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "60ch",
              margin: "0 auto",
            }}
          >
            <p style={{ margin: 0 }}>
              The Swing Path Pro training apparatus - its mechanism, geometry and
              the physical feedback it delivers - is registered intellectual
              property, protected under Patent #1408632.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              The design, brand and associated materials of Swing Path Pro may
              not be reproduced, manufactured or distributed without written
              permission. We take the protection of our work seriously so that
              the product you receive is the genuine article, built to the
              standard the game deserves.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              For licensing, distribution or partnership enquiries, please{" "}
              <a
                href="/contact"
                style={{ color: "var(--green)", fontWeight: 500 }}
              >
                get in touch
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
