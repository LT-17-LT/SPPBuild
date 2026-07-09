"use client";

import { useRef, useState } from "react";

/**
 * VideoTile - a poster-framed clip. The video itself uses object-fit: contain
 * so the whole frame is always visible (dark ground shows through any letter-
 * or pillar-boxing rather than cropping the subject).
 *
 * - Click anywhere on the tile: play / pause
 * - Speaker button (bottom-right): mute / unmute (starts muted so the video
 *   is allowed to autoplay when the user first hits play)
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
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={togglePlay}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      }}
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
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "contain" }}
      />

      {/* Play glyph + label overlay - fades out while playing */}
      <span
        aria-hidden
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
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

      {/* Audio toggle - bottom-right corner, visible while playing */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute"
        style={{
          right: "0.75rem",
          bottom: "0.75rem",
          width: 36,
          height: 36,
          borderRadius: 999,
          background: "rgba(9, 20, 11, 0.55)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          color: "var(--paper)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          cursor: "pointer",
          opacity: playing ? 1 : 0.65,
          transition: "opacity 0.2s ease",
          zIndex: 3,
        }}
      >
        {muted ? <SpeakerMutedIcon /> : <SpeakerIcon />}
      </button>
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
      />
      <path
        d="M16.5 8.5c1 1 1.5 2.2 1.5 3.5s-.5 2.5-1.5 3.5M19 6c1.7 1.7 2.5 3.8 2.5 6s-.8 4.3-2.5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerMutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
      />
      <path
        d="M17 9l5 6M22 9l-5 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
