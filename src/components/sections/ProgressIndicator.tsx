"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { label: "Hero", selector: 'section[aria-label="Swing Path Pro - Hero"]' },
  { label: "Problem", selector: 'section[aria-label="The Problem"]' },
  { label: "System", selector: 'section[aria-label="The System"]' },
  { label: "For You", selector: 'section[aria-label="Who It\'s For"]' },
  { label: "Proof", selector: 'section[aria-label="Testimonials"]' },
  { label: "End", selector: 'section[aria-label="The Putt"]' },
];

/**
 * ProgressIndicator - thin fixed vertical rail on the left with a dot per
 * section. Uses IntersectionObserver to track which section is currently
 * dominant in the viewport (ScrollTrigger-pinned sections make offsetTop
 * unreliable, so this is more robust than a scroll+math approach).
 */
export function ProgressIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets: Array<{ index: number; el: HTMLElement }> = [];
    SECTIONS.forEach((s, index) => {
      const el = document.querySelector<HTMLElement>(s.selector);
      if (el) targets.push({ index, el });
    });
    if (!targets.length) return;

    // Track visibility ratio; pick the section with the largest ratio.
    const ratios = new Map<number, number>();
    targets.forEach((t) => ratios.set(t.index, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.progIdx);
          if (Number.isFinite(idx)) {
            ratios.set(idx, entry.intersectionRatio);
          }
        });
        let bestIdx = 0;
        let best = -1;
        ratios.forEach((r, idx) => {
          if (r > best) {
            best = r;
            bestIdx = idx;
          }
        });
        setActive(bestIdx);
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    targets.forEach((t) => {
      t.el.dataset.progIdx = String(t.index);
      observer.observe(t.el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className="progress-rail fixed flex-col items-start"
      style={{
        left: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        gap: "1.15rem",
        pointerEvents: "auto",
      }}
      aria-label="Section progress"
    >
      {/* Thin vertical line behind dots */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "5px",
          top: "-8px",
          bottom: "-8px",
          width: 1,
          background: "rgba(184, 202, 166, 0.28)",
        }}
      />
      {SECTIONS.map((s, i) => {
        const isActive = i === active;
        return (
          <a
            key={s.label}
            href={`#${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector<HTMLElement>(s.selector);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="progress-dot relative inline-flex items-center"
            style={{
              gap: "0.65rem",
              textDecoration: "none",
              cursor: "pointer",
            }}
            aria-label={`Jump to ${s.label}`}
          >
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: isActive
                  ? "var(--gold)"
                  : "rgba(184, 202, 166, 0.5)",
                border: isActive
                  ? "none"
                  : "1px solid rgba(184, 202, 166, 0.35)",
                transition: "background 0.3s ease, transform 0.2s ease",
                transform: isActive ? "scale(1.15)" : "scale(1)",
                boxShadow: isActive
                  ? "0 0 0 3px rgba(201, 168, 76, 0.15)"
                  : "none",
              }}
            />
            <span
              className="progress-label"
              style={{
                color: isActive ? "var(--gold)" : "var(--moss-lt)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: isActive ? 0.9 : 0,
                transition: "opacity 0.25s ease, color 0.25s ease",
                whiteSpace: "nowrap",
              }}
            >
              {s.label}
            </span>
          </a>
        );
      })}

      <style>{`
        .progress-rail { display: flex; }
        .progress-dot:hover .progress-label { opacity: 0.9 !important; }
        @media (max-width: 767px) {
          .progress-rail { display: none; }
        }
      `}</style>
    </aside>
  );
}
