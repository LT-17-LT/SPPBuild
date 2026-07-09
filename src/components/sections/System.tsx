"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  n: string;
  title: string;
  body: string;
  /** Optional real render for the image slot; falls back to the CSS placeholder. */
  image?: string;
  imageAlt?: string;
};

const CARDS: Card[] = [
  {
    n: "01",
    title: "Swing Path Correction",
    body: "Physical resistance guides the club through the correct arc. Incorrect paths meet immediate mechanical feedback.",
    image: "/images/system/perfect-swing-arc.jpg",
    imageAlt: "A neon-green arc traces the correct swing path on a dark green ground.",
  },
  {
    n: "02",
    title: "Wrist Rotation",
    body: "Feel the correct wrist rotation at every point of the swing. Building muscle memory that transfers to the course.",
    image: "/images/system/wrist-rotation.jpg",
    imageAlt: "A neon-green line study of the wrist rotation through the swing.",
  },
  {
    n: "03",
    title: "Posture & Resistance",
    body: "The system introduces physical resistance when posture drifts. Correct alignment feels free. Incorrect feels wrong.",
    image: "/images/system/posture-and-resistance.jpg",
    imageAlt: "A neon-green figure showing correct posture against the resistance of the apparatus.",
  },
  {
    n: "04",
    title: "Muscle Memory",
    body: "Repetition builds unconscious competence. Every swing on the system encodes the correct movement pattern.",
    image: "/images/system/muscle-memory.jpg",
    imageAlt: "Layered neon-green swing traces suggesting the repeated grooving of muscle memory.",
  },
  {
    n: "05",
    title: "Zero Tech, Pure Feel",
    body: "No batteries. No screens. No subscriptions. No software updates. Just engineered mechanical precision.",
    image: "/images/system/zero-tech.jpg",
    imageAlt: "A neon-green rendering of the Swing Path Pro apparatus - pure mechanical form, no electronics.",
  },
];

/**
 * System (Section 3) - stacked cards.
 *
 * The section pins and each card rises from below the fold, settling on
 * top of the previous one with a neat diagonal offset - stacked like a
 * dealt hand, but flat and front-facing.
 */
export function System() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!section || cards.length < 2) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Reduced motion: cards simply sit pre-stacked (their static offsets),
    // no pin, no flight.
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.6,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight * 0.85}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Card 0 is already seated. Cards 1..n fly up into the stack.
      cards.slice(1).forEach((card, idx) => {
        tl.from(
          card,
          {
            y: () => window.innerHeight * 1.25,
            rotation: 2.2,
            duration: 1,
            ease: "power2.out",
          },
          idx,
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--paper)",
        height: "100vh",
      }}
      id="system"
      aria-label="The System"
    >
      {/* Header - fixed left column while the stack builds */}
      <div
        className="system-header absolute flex flex-col justify-center"
        style={{
          left: "6vw",
          top: 0,
          bottom: 0,
          width: "min(28vw, 420px)",
          zIndex: 40,
        }}
      >
        <span
          className="eyebrow"
          style={{
            color: "var(--green)",
            marginBottom: "1.25rem",
          }}
        >
          The System
        </span>
        <h2
          className="font-display"
          style={{
            color: "var(--ink)",
            fontWeight: 400,
            fontSize: "clamp(1.9rem, 3.4vw, 3rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Built around feel, not screen time.
        </h2>
        <p
          style={{
            color: "var(--moss)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            fontWeight: 300,
            marginTop: "1.5rem",
            maxWidth: "36ch",
          }}
        >
          No batteries. No screens. No software. Pure mechanical feedback
          that changes your game.
        </p>
      </div>

      {/* Card stack area - right of the header */}
      <div
        className="system-stack absolute"
        style={{
          left: "clamp(0px, 32vw, 34vw)",
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {CARDS.map((card, i) => {
          const mid = (CARDS.length - 1) / 2;
          return (
            <article
              key={card.n}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="system-card overflow-hidden"
              style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: "min(54vw, 780px)",
                height: "min(58vh, 500px)",
                // Static stack offset - kept out of `transform` so GSAP's
                // flight animation composes cleanly on top of it.
                translate: `calc(${i - mid} * clamp(14px, 1.8vw, 30px)) calc(${i - mid} * clamp(10px, 1.4vw, 22px))`,
                zIndex: 10 + i,
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                background:
                  "radial-gradient(ellipse 100% 100% at 30% 30%, var(--green2) 0%, var(--green) 45%, var(--green-deep) 100%)",
                boxShadow:
                  "0 24px 60px -24px rgba(9, 20, 11, 0.45), 0 4px 16px -8px rgba(9, 20, 11, 0.25)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                gap: "clamp(1rem, 3vw, 2.5rem)",
                color: "var(--paper)",
                willChange: "transform",
              }}
            >
              {/* Large faded numeral in background */}
              <span
                aria-hidden
                className="font-display absolute pointer-events-none"
                style={{
                  bottom: "-4vh",
                  right: "-2vw",
                  fontSize: "clamp(11rem, 20vw, 19rem)",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.04)",
                  lineHeight: 0.85,
                  letterSpacing: "-0.05em",
                  zIndex: 0,
                  userSelect: "none",
                }}
              >
                {card.n}
              </span>

              {/* Image slot - real render if provided, CSS placeholder otherwise */}
              <div
                className="relative system-card-image"
                style={{
                  borderRadius: 12,
                  background: card.image
                    ? "transparent"
                    : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: card.image
                    ? "none"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  minHeight: "100%",
                  zIndex: 1,
                  overflow: "hidden",
                }}
                aria-hidden={!card.image}
              >
                {card.image ? (
                  <Image
                    src={card.image}
                    alt={card.imageAlt ?? card.title}
                    fill
                    sizes="(max-width: 900px) 88vw, min(27vw, 390px)"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <>
                    {/* Faint machine silhouette hint */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 55%, rgba(201, 168, 76, 0.12) 0%, transparent 60%)",
                      }}
                    />
                    <span
                      className="eyebrow absolute"
                      style={{
                        top: "1.25rem",
                        left: "1.25rem",
                        color: "var(--moss-lt)",
                        opacity: 0.6,
                        fontSize: "0.55rem",
                      }}
                    >
                      Placeholder Render
                    </span>
                  </>
                )}
              </div>

              {/* Text panel */}
              <div
                className="relative flex flex-col justify-end"
                style={{
                  zIndex: 1,
                  paddingBottom: "0.5rem",
                }}
              >
                <span
                  className="eyebrow"
                  style={{
                    color: "var(--gold)",
                    opacity: 0.85,
                    marginBottom: "1rem",
                  }}
                >
                  {card.n} / {String(CARDS.length).padStart(2, "0")}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    margin: 0,
                    color: "var(--paper)",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    marginTop: "1.25rem",
                    fontSize: "0.95rem",
                    lineHeight: 1.65,
                    fontWeight: 300,
                    color: "var(--moss-lt)",
                    maxWidth: "38ch",
                  }}
                >
                  {card.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .system-header {
            left: 5vw !important;
            right: 5vw !important;
            width: auto !important;
            bottom: auto !important;
            top: 7vh !important;
            justify-content: flex-start !important;
            z-index: 40;
          }
          .system-stack {
            left: 0 !important;
            top: 22vh !important;
          }
          .system-card {
            width: 88vw !important;
            /* Height flows with content so image + text each get room */
            height: auto !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 1.25rem !important;
          }
          /* Portrait aspect on mobile - matches the source renders (1200x1490)
             so the image shows fully instead of a landscape-cropped strip. */
          .system-card-image {
            aspect-ratio: 4 / 5 !important;
            min-height: 0 !important;
          }
          /* The header body paragraph collides with the stacked cards on a
             narrow screen. Hide it on mobile - the eyebrow + title carry
             the intro on their own. */
          .system-header p {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
