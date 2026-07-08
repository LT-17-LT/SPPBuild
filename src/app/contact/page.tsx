import type { Metadata } from "next";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Swing Path Pro",
  description:
    "Enquire about Swing Path Pro - general enquiries and pre-orders. Made in South Africa for the game.",
};

export default function ContactPage() {
  return (
    <main className="relative w-full" style={{ background: "var(--paper)" }}>
      <SiteHeader />

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
            Book a demo, request pricing, or place a pre-order. Tell us a little
            about you and we&rsquo;ll be in touch.
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
