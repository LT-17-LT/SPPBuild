"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import type { PointerState } from "@/components/three/BallPit";

const BallPit = dynamic(
  () => import("@/components/three/BallPit").then((m) => m.BallPit),
  { ssr: false },
);

/**
 * Problem (Section 2) - an interactive 3D golf-ball field.
 *
 * Every ball is an instance of GolfBall.glb rendered in a full-section
 * R3F canvas. The hero ball chases the cursor and knocks the field balls
 * around with real physics; displaced balls slowly roll back home.
 * Pointer position is tracked on the section element (not the canvas)
 * so the text overlay never blocks the interaction.
 */
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function Problem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, inside: false });
  const [active, setActive] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only run physics + render loop while the section is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenVisible(true);
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    observer.observe(section);

    const onPointerMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
        inside: true,
      };
    };
    const onPointerLeave = () => {
      pointerRef.current = { ...pointerRef.current, inside: false };
    };

    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--paper)",
        minHeight: "100vh",
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
      aria-label="The Problem"
    >
      {/* Interactive 3D ball field - fills the section behind the text.
          Deferred until scroll-into-view so the Three.js/Rapier bundle
          doesn't load (and block the main thread) on initial page load. */}
      <div className="absolute inset-0" aria-hidden>
        {hasBeenVisible && (
          <BallPit pointerRef={pointerRef} active={active} reduced={reduced} />
        )}
      </div>

      {/* Text overlay - centred above the ball field */}
      <div
        className="relative mx-auto flex flex-col items-center text-center pointer-events-none"
        style={{
          maxWidth: "min(720px, 92vw)",
          paddingTop: "clamp(2rem, 6vw, 5rem)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          zIndex: 10,
        }}
      >
        <span
          className="eyebrow"
          style={{
            color: "var(--green)",
            marginBottom: "1.25rem",
          }}
        >
          The Problem
        </span>
        <h2
          className="font-display"
          style={{
            color: "var(--ink)",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Golf coaching is data-rich but physically feel-poor.
        </h2>
        <p
          style={{
            color: "var(--moss)",
            fontSize: "1rem",
            lineHeight: 1.6,
            fontWeight: 300,
            marginTop: "1.5rem",
            maxWidth: "52ch",
          }}
        >
          Launch monitors tell the coach the number. Swing Path Pro gives the
          coach the tool to change the movement that creates the number.
        </p>
      </div>
    </section>
  );
}
