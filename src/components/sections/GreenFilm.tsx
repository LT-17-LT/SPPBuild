"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EndMenu } from "./EndMenu";

gsap.registerPlugin(ScrollTrigger);

/**
 * GreenFilm - the scroll-scrubbed video finale.
 *
 * Replaces the old BallReappears + Putt sections: one pinned video of the
 * ball landing on the green and rolling to the hole, scrubbed by scroll
 * (Apple-style). Currently wired to the temp asset
 * /videos/ball-sinking.mp4 - swap that file for the final render when
 * it's ready; no code changes needed.
 *
 * Keeps aria-label "The Putt" so the progress rail's End dot still works.
 */
export function GreenFilm() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const taglineRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const tagline = taglineRef.current;
    const menu = menuRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Tagline and menu settle in over the last stretch of the film
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
              start: "75% bottom",
              end: "95% bottom",
              scrub: 0.5,
            },
          },
        );
      }
      if (menu) {
        gsap.fromTo(
          menu,
          { autoAlpha: 0, y: -16 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "75% bottom",
              end: "95% bottom",
              scrub: 0.5,
            },
          },
        );
      }

      if (reduced) return;

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: "280vh",
        background: "var(--green-deep)",
      }}
      aria-label="The Putt"
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
          src="/videos/ball-sinking.mp4"
          muted
          playsInline
          preload="auto"
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

        {/* End menu - sits mid-frame so it's on screen when the scroll
            lands at the bottom of the site */}
        <div
          ref={menuRef}
          className="absolute w-full"
          style={{
            top: "45%",
            left: 0,
            opacity: 0,
            visibility: "hidden",
          }}
        >
          {/* Inner wrapper keeps the -50% centring out of GSAP's transform */}
          <div style={{ transform: "translateY(-50%)" }}>
            <EndMenu />
          </div>
        </div>

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
    </section>
  );
}
