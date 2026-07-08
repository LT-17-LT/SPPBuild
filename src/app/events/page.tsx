import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryMasonry, type GalleryItem } from "@/components/ui/GalleryMasonry";

export const metadata: Metadata = {
  title: "Seen in the Field - Swing Path Pro",
  description:
    "Places the Swing Path Pro has been seen - Els for Autism Foundation golf days at Ebotse Links and Silver Lakes.",
};

const EBOTSE_GALLERY: GalleryItem[] = [
  { src: "/images/events/ebotse/participants.jpg", width: 1600, height: 1067, alt: "Participants at the Ebotse Links golf day" },
  { src: "/images/events/ebotse/charities-banner.jpg", width: 1600, height: 2400, alt: "Ernie Els Charities SA banner at Ebotse Links" },
  { src: "/images/events/ebotse/chris-developer.jpg", width: 1600, height: 2400, alt: "Chris, our developer, showing the way on the Swing Path Pro" },
  { src: "/images/events/ebotse/nico-van-rensburg.jpg", width: 1600, height: 2400, alt: "Nico van Rensburg on the Swing Path Pro apparatus" },
  { src: "/images/events/ebotse/first-display.jpg", width: 1600, height: 2400, alt: "Swing Path Pro's first display event" },
  { src: "/images/events/ebotse/testing.jpg", width: 1600, height: 1067, alt: "Testing the Swing Path Pro at Ebotse Links" },
  { src: "/images/events/ebotse/developer-marketer.jpg", width: 1600, height: 2400, alt: "The developer and marketer behind Swing Path Pro" },
];

const SILVER_LAKES_GALLERY: GalleryItem[] = Array.from({ length: 13 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  // Known intrinsic sizes from the optimized set (portrait unless noted).
  const landscape = new Set(["04", "11"]);
  const tall = new Set(["08", "09", "10", "12"]);
  const height = landscape.has(n) ? 1067 : tall.has(n) ? 2133 : 2400;
  return {
    src: `/images/events/silver-lakes/silver-lakes-${n}.jpg`,
    width: 1600,
    height,
    alt: `Swing Path Pro at the Els for Autism Silver Lakes golf day (${n})`,
  };
});

function EventHeader({
  foundation,
  venue,
  date,
}: {
  foundation: string;
  venue: string;
  date: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <span
        className="eyebrow"
        style={{ color: "var(--gold)", display: "block", marginBottom: "0.9rem" }}
      >
        {foundation}
      </span>
      <h2
        className="font-display"
        style={{
          color: "var(--ink)",
          fontWeight: 400,
          fontSize: "clamp(1.7rem, 3.4vw, 2.6rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {venue}
      </h2>
      <p
        className="eyebrow"
        style={{
          color: "var(--moss)",
          marginTop: "0.75rem",
          fontSize: "0.62rem",
        }}
      >
        {date}
      </p>
    </div>
  );
}

function ImageCredit() {
  return (
    <p
      style={{
        textAlign: "center",
        color: "var(--moss)",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "0.72rem",
        fontWeight: 300,
        marginTop: "clamp(1.5rem, 3vw, 2.25rem)",
        opacity: 0.75,
      }}
    >
      Image credits &amp; copyright · Digimag International
    </p>
  );
}

export default function EventsPage() {
  return (
    <main className="relative w-full" style={{ background: "var(--paper)" }}>
      <SiteHeader />

      {/* Page heading */}
      <section
        className="mx-auto text-center"
        style={{
          maxWidth: "min(820px, 92vw)",
          paddingTop: "clamp(4rem, 9vw, 7rem)",
          paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal>
          <span
            className="eyebrow"
            style={{ color: "var(--green)", display: "block", marginBottom: "1.25rem" }}
          >
            Seen in the Field
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
            Places the Swing Path Pro has been seen.
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
            Real days, real players, real greens. A growing record of where the
            system has been put to work.
          </p>
        </Reveal>
      </section>

      {/* ── Event 1: Ebotse Links ─────────────────────────────────────── */}
      <section
        className="mx-auto"
        style={{
          maxWidth: "min(1120px, 92vw)",
          paddingBottom: "clamp(4rem, 8vw, 6rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <EventHeader
            foundation="Els for Autism Foundation"
            venue="Ebotse Links Golf Day"
            date="28 August 2025"
          />
          <p
            style={{
              color: "var(--moss)",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontWeight: 300,
              margin: "1.75rem auto 0",
              maxWidth: "60ch",
              textAlign: "center",
            }}
          >
            We thank Nico van Rensburg - professional golfer, coach and
            Commercial Manager for Ernie Els South Africa - for inviting us to
            attend the Els for Autism events. Our first display event, and a
            fitting place to start.
          </p>
          <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <a
              href="https://www.elsforautismsouthafrica.org"
              target="_blank"
              rel="noopener noreferrer"
              className="events-link"
              style={{
                color: "var(--green)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
              }}
            >
              elsforautismsouthafrica.org →
            </a>
          </div>
        </Reveal>

        {/* Hero group panorama */}
        <Reveal style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          <Image
            src="/images/events/ebotse/group-panorama.jpg"
            width={2000}
            height={1333}
            alt="The full field gathered at the Els for Autism Ebotse Links golf day, 28 August 2025"
            sizes="(max-width: 1120px) 92vw, 1120px"
            priority
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 16,
              border: "1px solid var(--line)",
            }}
          />
        </Reveal>

        <GalleryMasonry items={EBOTSE_GALLERY} />
        <ImageCredit />
      </section>

      {/* ── Event 2: Silver Lakes ─────────────────────────────────────── */}
      <section
        className="mx-auto"
        style={{
          maxWidth: "min(1120px, 92vw)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "clamp(3rem, 6vw, 5rem)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <EventHeader
            foundation="Els for Autism Foundation"
            venue="Silver Lakes Golf Day"
            date="11 October 2025"
          />
        </Reveal>

        <GalleryMasonry items={SILVER_LAKES_GALLERY} />
        <ImageCredit />
      </section>

      <SiteFooter />

      <style>{`.events-link:hover { color: var(--gold-muted); }`}</style>
    </main>
  );
}
