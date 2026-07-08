"use client";

import { useEffect, useRef } from "react";

/**
 * AutoplayVideo - a muted, looping clip that plays only while it is in
 * view and pauses when scrolled away (keeps it light and unobtrusive).
 * Used as a "living portrait" in the testimonial media panel. Honours
 * prefers-reduced-motion by staying paused on its poster frame.
 */
export function AutoplayVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      style={style}
      aria-hidden
    />
  );
}
