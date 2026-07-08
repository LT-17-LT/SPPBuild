"use client";

import { useRef, useState } from "react";

/**
 * VideoTile - a poster-framed clip that plays inline on click. Muted,
 * plays inline, loops. Premium framing (rounded, gold play glyph) rather
 * than a raw video control bar until the viewer chooses to play.
 */
export function VideoTile({
  src,
  poster,
  label,
  aspect = "9 / 16",
}: {
  src: string;
  poster: string;
  label: string;
  aspect?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
      className="group relative block w-full overflow-hidden"
      style={{
        aspectRatio: aspect,
        borderRadius: 14,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        background: "var(--green-deep)",
        cursor: "pointer",
        boxShadow: "0 20px 50px -24px rgba(9, 20, 11, 0.6)",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "cover" }}
      />

      {/* Play glyph + label overlay - fades out while playing */}
      <span
        aria-hidden
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,20,11,0.1) 0%, rgba(9,20,11,0.5) 100%)",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <span
          className="flex items-center justify-center"
          style={{
            width: 58,
            height: 58,
            borderRadius: 999,
            background: "rgba(201, 168, 76, 0.92)",
            boxShadow: "0 8px 24px -6px rgba(0,0,0,0.5)",
          }}
        >
          {/* Play triangle */}
          <span
            style={{
              width: 0,
              height: 0,
              marginLeft: 4,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "16px solid var(--ink)",
            }}
          />
        </span>
        <span
          className="eyebrow"
          style={{
            marginTop: "0.9rem",
            color: "var(--paper)",
            fontSize: "0.58rem",
            padding: "0 1rem",
            textAlign: "center",
          }}
        >
          {label}
        </span>
      </span>
    </button>
  );
}
