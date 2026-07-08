"use client";

import { useEffect, useRef } from "react";

/**
 * Module-scoped flag. Resets on every full page load / refresh (the module
 * re-initialises), but persists across soft client-side navigation. So the
 * intro plays on each fresh load and refresh, but doesn't re-fire when you
 * navigate to a sub-page and back within the same session.
 */
let introShownThisLoad = false;

/**
 * IntroSplash - opening logo reveal. Plays the SPP signature intro
 * full-bleed (edge to edge of the viewport) with a slim gold loading bar,
 * then dissolves away to reveal the hero beneath.
 *
 * - Full-screen cover so the video's white fills the entire screen (no
 *   seam between the clip and a separate background colour).
 * - Skipped under prefers-reduced-motion.
 * - Visibility is driven by refs + video events + a safety timeout, so it
 *   can never permanently block the site.
 */
export function IntroSplash() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    const bar = barRef.current;
    if (!overlay || !video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      document.body.style.overflow = "";
      window.setTimeout(() => {
        overlay.style.display = "none";
      }, 900);
    };

    // Already played this load (soft nav) or reduced motion: skip.
    if (reduced || introShownThisLoad) {
      overlay.style.display = "none";
      document.body.style.overflow = "";
      return;
    }

    introShownThisLoad = true;
    document.body.style.overflow = "hidden";

    const startBar = () => {
      if (!bar) return;
      const d =
        Number.isFinite(video.duration) && video.duration > 0
          ? video.duration
          : 5;
      bar.style.transition = `width ${d}s linear`;
      requestAnimationFrame(() => {
        bar.style.width = "100%";
      });
    };

    video.addEventListener("playing", startBar, { once: true });
    video.addEventListener("ended", dismiss, { once: true });
    video.addEventListener("error", dismiss, { once: true });

    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(dismiss);
    }

    // Never hold the site longer than the clip + a small buffer.
    const safety = window.setTimeout(dismiss, 9000);

    return () => {
      window.clearTimeout(safety);
      video.removeEventListener("playing", startBar);
      video.removeEventListener("ended", dismiss);
      video.removeEventListener("error", dismiss);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        opacity: 1,
        transition: "opacity 0.9s ease",
      }}
    >
      {/* Full-bleed logo video - fills the screen edge to edge */}
      <video
        ref={videoRef}
        src="/videos/logo-intro.mp4"
        poster="/videos/logo-intro-start.jpg"
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#ffffff",
        }}
      />

      {/* Loading bar - centred near the bottom, over the clip */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "10vh",
          transform: "translateX(-50%)",
          width: "min(220px, 44vw)",
        }}
      >
        <div
          style={{
            position: "relative",
            height: 2,
            background: "rgba(17, 20, 15, 0.14)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            ref={barRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "0%",
              background: "var(--gold)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
