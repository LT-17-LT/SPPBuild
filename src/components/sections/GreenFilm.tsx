"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_QUERY = "(max-width: 900px)";

function subscribeMobile(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * GreenFilm - the scroll-scrubbed video finale on desktop.
 *
 * Mobile browsers scrub video very unevenly (Safari and older Android
 * especially), so on mobile we skip the scrub, the video's poster attribute
 * shows a still frame, and the file is never fetched (preload="none").
 * The section also collapses to a single screen instead of the 280vh scroll
 * cushion the pinned scrub needs.
 */
export function GreenFilm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);

  // SSR renders desktop safely; after hydration the media query flips to
  // mobile if the viewport matches, without a hydration warning.
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );

  useEffect(() => {
    const section = sectionRef.current;
    const tagline = taglineRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (tagline) {
        gsap.fromTo(
          tagline,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: isMobile ? "top 50%" : "75% bottom",
              end: isMobile ? "top 20%" : "95% bottom",
              scrub: 0.5,
            },
          },
        );
      }

      if (isMobile || reduced) return;

      const video = videoRef.current;
      if (!video) return;

      let scrubTween: gsap.core.Tween | null = null;
      const buildScrub = () => {
        if (scrubTween || !video.duration) return;
        scrubTween = gsap.fromTo(
          video,
          { currentTime: 0 },
          {
            currentTime: video.duration,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      if (video.readyState >= 1) {
        buildScrub();
      } else {
        video.addEventListener("loadedmetadata", buildScrub, { once: true });
      }
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full greenfilm-section"
      style={{ background: "var(--green-deep)" }}
      aria-label="The Putt"
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Same video element on all sizes. On mobile preload="none" keeps
            the 11MB clip off the wire and the poster attribute shows a
            still frame; no scrub. */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
          src="/videos/end-scroll.mp4"
          poster="/videos/end-scroll-poster.jpg"
          muted
          playsInline
          preload={isMobile ? "none" : "auto"}
          aria-hidden
        />

        {/* Soft vignette so the tagline reads over any frame */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,20,11,0.25) 0%, transparent 30%, transparent 62%, rgba(9,20,11,0.55) 100%)",
          }}
        />

        {/* Finale caption */}
        <div
          ref={taglineRef}
          className="absolute w-full text-center"
          style={{
            bottom: "8vh",
            left: 0,
            padding: "0 1.5rem",
            opacity: 0,
          }}
        >
          <p
            className="font-display italic"
            style={{
              color: "var(--gold)",
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.005em",
            }}
          >
            Feel the swing. Correct the cause.
          </p>
        </div>
      </div>

      <style>{`
        .greenfilm-section { height: 280vh; }
        @media (max-width: 900px) {
          .greenfilm-section { height: 100vh; }
        }
      `}</style>
    </section>
  );
}
