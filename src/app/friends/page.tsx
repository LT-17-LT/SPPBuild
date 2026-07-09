import type { Metadata } from "next";
import Image from "next/image";
import { TopNav } from "@/components/sections/TopNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/ui/Reveal";
import { VideoTile } from "@/components/ui/VideoTile";

export const metadata: Metadata = {
  title: "Friends of Swing Path Pro",
  description:
    "The people and partners behind Swing Path Pro - Ernie Els Charities South Africa and the coaches who put the system to work.",
};

export default function FriendsPage() {
  return (
    <main className="relative w-full" style={{ background: "var(--paper)" }}>
      <TopNav />

      {/* Page heading */}
      <section
        className="mx-auto text-center"
        style={{
          maxWidth: "min(760px, 92vw)",
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
            Friends of SPP
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
            The company we keep.
          </h1>
          <p
            style={{
              color: "var(--moss)",
              fontSize: "1.05rem",
              lineHeight: 1.65,
              fontWeight: 300,
              margin: "1.5rem auto 0",
              maxWidth: "48ch",
            }}
          >
            A short list, honestly kept. These are the partners and people who
            have stood beside Swing Path Pro on the range and at the events.
            There&rsquo;s still room in the cart, and we&rsquo;d love you to
            ride along with us.
          </p>
        </Reveal>
      </section>

      {/* Ernie Els Charities SA */}
      <section
        className="mx-auto"
        style={{
          maxWidth: "min(1000px, 92vw)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal
          className="grid items-center"
          style={{
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: "clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          <div className="friends-partner-grid">
            {/* Logo tile - navy logo needs a paper/white ground, never loose on green */}
            <div
              className="relative flex items-center justify-center"
              style={{
                background: "var(--white)",
                borderRadius: 16,
                border: "1px solid var(--line)",
                padding: "clamp(2rem, 5vw, 3.5rem)",
                aspectRatio: "4 / 3",
                boxShadow: "0 20px 60px -32px rgba(9, 20, 11, 0.35)",
              }}
            >
              <Image
                src="/images/friends/els-charities-logo.png"
                alt="Ernie Els Charities South Africa"
                width={360}
                height={360}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "78%",
                  maxHeight: "80%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <span
                className="eyebrow"
                style={{ color: "var(--gold)", marginBottom: "1rem" }}
              >
                Partner
              </span>
              <h2
                className="font-display"
                style={{
                  color: "var(--ink)",
                  fontWeight: 400,
                  fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Ernie Els Charities South Africa
              </h2>
              <p
                style={{
                  color: "var(--moss)",
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  marginTop: "1.25rem",
                  maxWidth: "46ch",
                }}
              >
                Swing Path Pro has been welcomed at the Els for Autism
                Foundation golf days - Ebotse Links and Silver Lakes - bringing
                real, physical swing feedback to players in support of the
                foundation&rsquo;s work.
              </p>
              <a
                href="https://www.elsforautismsouthafrica.org"
                target="_blank"
                rel="noopener noreferrer"
                className="friends-link"
                style={{
                  marginTop: "1.5rem",
                  color: "var(--green)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                }}
              >
                elsforautismsouthafrica.org →
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Nico van Rensburg */}
      <section
        className="mx-auto"
        style={{
          maxWidth: "min(1000px, 92vw)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Reveal
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
            <span
              className="eyebrow"
              style={{ color: "var(--gold)", display: "block", marginBottom: "1rem" }}
            >
              Pro Golfer &amp; Coach
            </span>
            <h2
              className="font-display"
              style={{
                color: "var(--ink)",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Nico van Rensburg
            </h2>
            <p
              style={{
                color: "var(--moss)",
                fontSize: "1rem",
                lineHeight: 1.65,
                fontWeight: 300,
                margin: "1.25rem auto 0",
                maxWidth: "52ch",
              }}
            >
              Professional golfer, coach, and Commercial Manager for Ernie Els
              South Africa - who first put Swing Path Pro in front of players
              at the Els for Autism events.
            </p>
            <a
              href="mailto:Nico.Vanrensburg@ernieels.com"
              className="friends-link"
              style={{
                display: "inline-block",
                marginTop: "1.25rem",
                color: "var(--green)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Nico.Vanrensburg@ernieels.com
            </a>
          </div>

          <div
            className="mx-auto"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "clamp(1rem, 3vw, 2rem)",
              maxWidth: "620px",
            }}
          >
            <VideoTile
              src="/images/friends/coach-in-motion.mp4"
              poster="/images/friends/coach-in-motion-poster.jpg"
              label="Coach in motion"
            />
            <VideoTile
              src="/images/friends/coach-on-apparatus.mp4"
              poster="/images/friends/coach-on-apparatus-poster.jpg"
              label="On the apparatus"
            />
          </div>
        </Reveal>
      </section>

      <SiteFooter />

      <style>{`
        .friends-partner-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: center;
        }
        .friends-link:hover { color: var(--gold-muted); }
        @media (max-width: 720px) {
          .friends-partner-grid { grid-template-columns: minmax(0, 1fr); }
        }
      `}</style>
    </main>
  );
}
