"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Segment = {
  eyebrow: string;
  title: string;
  body: string;
  /**
   * Background gradient for this chapter - subtle green tone shift so
   * the pinned section feels like it's changing atmosphere.
   */
  bg: string;
};

const SEGMENTS: Segment[] = [
  {
    eyebrow: "For Fitting Studios",
    title: "Separate movement problems from equipment problems.",
    body: "Use before or after the fitting. The diagnostic tool your analysis is missing.",
    bg: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(53, 85, 52, 0.35) 0%, transparent 65%), linear-gradient(160deg, #050d07 0%, #0a1f10 100%)",
  },
  {
    eyebrow: "For Indoor Centres",
    title: "The station between the simulator and the lesson.",
    body: "Physical coaching hardware alongside your simulator bays. Winter training programmes with real movement feedback.",
    bg: "radial-gradient(ellipse 70% 60% at 70% 45%, rgba(23, 63, 34, 0.4) 0%, transparent 65%), linear-gradient(160deg, #08160b 0%, #0d2413 100%)",
  },
  {
    eyebrow: "For Academies",
    title: "Create premium lesson packages that justify higher fees.",
    body: "Visible coaching station that differentiates your programme from every other range lesson.",
    bg: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(201, 168, 76, 0.14) 0%, transparent 60%), linear-gradient(170deg, #0a1c0e 0%, #061109 100%)",
  },
  {
    eyebrow: "For Players",
    title: "Feel the swing. Correct the cause.",
    body: "Whether you're breaking 75 or building your first consistent follow-through - the system adapts.",
    bg: "radial-gradient(ellipse 80% 70% at 40% 50%, rgba(116, 132, 102, 0.2) 0%, transparent 70%), linear-gradient(170deg, #09140b 0%, #050d07 100%)",
  },
];

export function WhoItsFor() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const segRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      // Static: show only last segment + CTA
      segRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === SEGMENTS.length - 1 ? 1 : 0 });
      });
      bgRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === SEGMENTS.length - 1 ? 1 : 0 });
      });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Initial: first segment visible
      segRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
      });
      bgRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      // Timeline of segment swaps, then CTA reveal. Divide progress into
      // SEGMENTS.length + 1 slots (last slot is the CTA reveal).
      const slots = SEGMENTS.length + 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${window.innerHeight * slots}`,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      SEGMENTS.forEach((_, i) => {
        if (i === 0) return; // first is initial
        const start = (i - 0.5) / slots;
        const prevSeg = segRefs.current[i - 1];
        const prevBg = bgRefs.current[i - 1];
        const nextSeg = segRefs.current[i];
        const nextBg = bgRefs.current[i];
        if (prevSeg) {
          tl.to(
            prevSeg,
            { opacity: 0, y: -24, duration: 0.4 / slots, ease: "power2.in" },
            start,
          );
        }
        if (prevBg) {
          tl.to(
            prevBg,
            { opacity: 0, duration: 0.5 / slots, ease: "none" },
            start,
          );
        }
        if (nextBg) {
          tl.to(
            nextBg,
            { opacity: 1, duration: 0.5 / slots, ease: "none" },
            start + 0.05 / slots,
          );
        }
        if (nextSeg) {
          tl.to(
            nextSeg,
            { opacity: 1, y: 0, duration: 0.5 / slots, ease: "power2.out" },
            start + 0.2 / slots,
          );
        }
      });

      // CTA reveal in the final slot
      const ctaStart = (SEGMENTS.length - 0.5) / slots;
      const lastSeg = segRefs.current[SEGMENTS.length - 1];
      if (lastSeg) {
        tl.to(
          lastSeg,
          { opacity: 0, y: -24, duration: 0.4 / slots, ease: "power2.in" },
          ctaStart,
        );
      }
      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6 / slots,
            ease: "power2.out",
          },
          ctaStart + 0.2 / slots,
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        background: "var(--green-deep)",
        color: "var(--paper)",
      }}
      aria-label="Who It's For"
    >
      {/* Layered chapter backgrounds - one per segment, cross-faded */}
      {SEGMENTS.map((seg, i) => (
        <div
          key={`bg-${i}`}
          ref={(el) => {
            bgRefs.current[i] = el;
          }}
          aria-hidden
          className="absolute inset-0"
          style={{
            background: seg.bg,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Content stack - all segments occupy the same centred area */}
      <div
        className="relative h-full flex items-center justify-center"
        style={{ padding: "0 1.5rem" }}
      >
        <div
          className="relative w-full"
          style={{ maxWidth: "min(760px, 92vw)" }}
        >
          {SEGMENTS.map((seg, i) => (
            <div
              key={seg.eyebrow}
              ref={(el) => {
                segRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center"
              style={{
                willChange: "transform, opacity",
              }}
            >
              <span
                className="eyebrow"
                style={{
                  color: "var(--gold)",
                  marginBottom: "1.25rem",
                }}
              >
                {seg.eyebrow}
              </span>
              <h2
                className="font-display"
                style={{
                  color: "var(--paper)",
                  fontWeight: 400,
                  fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  margin: 0,
                  maxWidth: "22ch",
                }}
              >
                {seg.title}
              </h2>
              <p
                style={{
                  marginTop: "1.5rem",
                  color: "var(--moss-lt)",
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  maxWidth: "48ch",
                }}
              >
                {seg.body}
              </p>
            </div>
          ))}

          {/* Ending CTA sheet - replaces the last segment */}
          <div
            ref={ctaRef}
            className="absolute inset-0 flex flex-col justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <span
              className="eyebrow"
              style={{
                color: "var(--gold)",
                marginBottom: "1.25rem",
              }}
            >
              Enquire
            </span>
            <h2
              className="font-display"
              style={{
                color: "var(--paper)",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Ready to feel the difference?
            </h2>
            <p
              style={{
                marginTop: "1.25rem",
                color: "var(--moss-lt)",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: "44ch",
              }}
            >
              Book a demo, request pricing, or ask us anything.
            </p>
            <a
              href="mailto:hello@swingpathpro.com?subject=Swing%20Path%20Pro%20enquiry"
              className="inline-flex items-center justify-center"
              style={{
                marginTop: "2rem",
                alignSelf: "flex-start",
                background: "var(--gold)",
                color: "var(--ink)",
                padding: "0.9rem 1.75rem",
                borderRadius: 999,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.02em",
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
            >
              Book a demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
