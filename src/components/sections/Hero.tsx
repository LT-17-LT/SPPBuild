"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["LET'S", "GET", "THAT", "PERFECT", "SWING", "TOGETHER"] as const;

/**
 * Word cue positions along the pinned scroll (progress 0 -> 1). These were
 * originally tuned against the scrubbed hero swing video; they read well as
 * a distribution even without the video, so they'll drop back into the same
 * timeline when the video returns.
 */
const WORD_PROGRESS: Array<[number, number]> = [
  [0.0, 0.125], // LET'S
  [0.125, 0.25], // GET
  [0.25, 0.5], // THAT
  [0.5, 0.725], // PERFECT
  [0.725, 0.8125], // SWING
  [0.8125, 999], // TOGETHER
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          opacity: i === WORDS.length - 1 ? 1 : 0,
          y: 0,
        });
      });
      if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
      if (scrollHintRef.current) gsap.set(scrollHintRef.current, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      wordRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 10 });
      });
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 8 });
      }

      // Parallax zoom: 1 -> 1.10 across the whole pinned scroll
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1 },
          {
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
            },
          },
        );
      }

      // Word cues + subtitle - single scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      const fade = 0.045;
      WORDS.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const [pIn, pOut] = WORD_PROGRESS[i];
        tl.to(
          el,
          { opacity: 1, y: 0, duration: fade, ease: "power2.out" },
          pIn,
        );
        if (pOut <= 1) {
          tl.to(
            el,
            { opacity: 0, y: -10, duration: fade, ease: "power2.in" },
            Math.max(pIn + fade, pOut - fade),
          );
        }
      });

      if (subtitleRef.current) {
        tl.to(
          subtitleRef.current,
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.82,
        );
      }

      // Scroll hint fades out almost immediately
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "5% top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh", background: "var(--green-deep)" }}
      aria-label="Swing Path Pro - Hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fallback background if the image is slow to appear */}
        <div className="absolute inset-0 hero-bg" aria-hidden />

        {/* Landing image - full bleed, zooms 1 -> 1.10 through the scroll */}
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
          aria-hidden
        >
          <Image
            src="/images/hero-landing.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Word sequence - bottom-left */}
        <div
          className="absolute"
          style={{
            left: "8%",
            bottom: "15%",
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          <div className="relative">
            {WORDS.map((word, i) => (
              <span
                key={word}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="absolute left-0 bottom-0 block"
                style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(3.5rem, 10vw, 8rem)",
                  letterSpacing: "-0.04em",
                  color:
                    word === "TOGETHER" ? "var(--gold)" : "var(--white)",
                  whiteSpace: "nowrap",
                  willChange: "transform, opacity",
                }}
              >
                {word}
              </span>
            ))}
            {/* Phantom sizer so the box reserves space for the widest word */}
            <span
              aria-hidden
              className="block opacity-0"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                letterSpacing: "-0.04em",
                whiteSpace: "nowrap",
              }}
            >
              TOGETHER
            </span>
          </div>

          <div
            ref={subtitleRef}
            className="font-display italic"
            style={{
              marginTop: "1.25rem",
              color: "var(--gold)",
              fontSize: "1.1rem",
              maxWidth: "34ch",
              willChange: "transform, opacity",
            }}
          >
            Launch monitors show what happened. We help you feel and correct
            why.
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute flex flex-col items-center"
          style={{
            left: "50%",
            bottom: "2.5rem",
            transform: "translateX(-50%)",
            color: "var(--moss-lt)",
            willChange: "opacity",
            zIndex: 2,
          }}
        >
          <span
            className="eyebrow"
            style={{ fontSize: "0.6rem", opacity: 0.7, marginBottom: "0.75rem" }}
          >
            Scroll
          </span>
          <span className="scroll-hint-line" aria-hidden />
        </div>
      </div>
    </section>
  );
}
