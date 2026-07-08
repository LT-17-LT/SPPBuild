"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["LET'S", "GET", "THAT", "PERFECT", "SWING", "TOGETHER"] as const;

/**
 * Word cue times (in seconds of hero-swing.mp4) - each pair is
 * [visibleFrom, visibleUntil]. The pinned scroll covers video 0-8s
 * (SCRUB_END); TOGETHER stays visible through the tail.
 *
 * The two "perpendicular" moments in the swing land at t=2 and t=4,
 * which is where THAT and PERFECT sit through their holds.
 */
const WORD_TIMES: Array<[number, number]> = [
  [0.0, 1.0], // LET'S
  [1.0, 2.0], // GET
  [2.0, 4.0], // THAT
  [4.0, 5.8], // PERFECT
  [5.8, 6.5], // SWING
  [6.5, 999], // TOGETHER (persists past pin end)
];

/** Seconds of video mapped to the pinned scroll (0 -> SCRUB_END). Tail 8-9s
 * plays at normal speed as the section unpins. */
const SCRUB_END = 8;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

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

      const buildTimeline = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            invalidateOnRefresh: true,
            onLeave: () => {
              // Play the 8s -> 9s tail at natural speed as the user
              // continues into the Problem section.
              video.play().catch(() => {});
            },
            onEnterBack: () => {
              video.pause();
            },
          },
        });

        // Scrub video: 0 -> SCRUB_END across the pinned section
        tl.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: SCRUB_END, ease: "none", duration: 1 },
          0,
        );

        // Word cues - convert video timestamps to timeline progress (0-1)
        const fade = 0.045;
        WORDS.forEach((_, i) => {
          const el = wordRefs.current[i];
          if (!el) return;
          const [tIn, tOut] = WORD_TIMES[i];
          const pIn = tIn / SCRUB_END;
          const pOut = Math.min(tOut, SCRUB_END) / SCRUB_END;

          tl.to(
            el,
            { opacity: 1, y: 0, duration: fade, ease: "power2.out" },
            pIn,
          );
          if (tOut <= SCRUB_END) {
            tl.to(
              el,
              { opacity: 0, y: -10, duration: fade, ease: "power2.in" },
              Math.max(pIn + fade, pOut - fade),
            );
          }
        });

        // Subtitle: fades in during the last stretch, alongside TOGETHER
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
      };

      if (video.readyState >= 1) {
        buildTimeline();
      } else {
        video.addEventListener("loadedmetadata", buildTimeline, { once: true });
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
        {/* Fallback background if the video is slow to appear */}
        <div className="absolute inset-0 hero-bg" aria-hidden />

        {/* Scroll-scrubbed hero swing */}
        <video
          ref={videoRef}
          src="/videos/hero-swing.mp4"
          poster="/videos/hero-swing-poster.jpg"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
          aria-hidden
        />

        {/* Word sequence - bottom-left, replaced in place over the swing */}
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
