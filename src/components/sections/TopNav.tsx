"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

const LINKS = [
  { label: "System", selector: 'section[aria-label="The System"]' },
  { label: "For You", selector: 'section[aria-label="Who It\'s For"]' },
  { label: "Proof", selector: 'section[aria-label="Testimonials"]' },
];

function scrollToSection(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * TopNav - fixed top navigation. Transparent while at the top of the page,
 * opaque with a subtle blur after ~80px of scroll. Logo left, minimal
 * links right, gold "Enquire" button. Links smooth-scroll to sections;
 * Enquire opens the contact page.
 */
export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full"
      style={{
        zIndex: 100,
        transition:
          "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease, color 0.35s ease",
        background: scrolled ? "rgba(9, 20, 11, 0.86)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 12px 40px -20px rgba(0,0,0,0.55)" : "none",
      }}
    >
      <div
        className="mx-auto flex items-center"
        style={{
          maxWidth: "min(1280px, 96vw)",
          padding: "clamp(0.9rem, 1.6vw, 1.25rem) 1.5rem",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center"
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Swing Path Pro - back to top"
        >
          <Wordmark height={26} variant="paper" />
        </button>

        {/* Desktop links */}
        <nav
          className="topnav-desktop items-center"
          style={{ gap: "clamp(1.25rem, 2vw, 2rem)" }}
        >
          {LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => scrollToSection(link.selector)}
              className="topnav-link"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--moss-lt)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.02em",
                transition: "color 0.2s ease",
                padding: 0,
              }}
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center"
            style={{
              background: "var(--gold)",
              color: "var(--ink)",
              padding: "0.55rem 1.1rem",
              borderRadius: 999,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontSize: "0.82rem",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
          >
            Enquire
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="topnav-mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "var(--paper)",
            padding: "0.4rem 0.6rem",
            borderRadius: 6,
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {menuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="topnav-mobile-drawer"
          style={{
            background: "rgba(9, 20, 11, 0.95)",
            backdropFilter: "blur(14px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            className="mx-auto flex flex-col"
            style={{
              maxWidth: "min(1280px, 96vw)",
              padding: "1.25rem 1.5rem 1.5rem",
              gap: "0.9rem",
            }}
          >
            {LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(link.selector);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--paper)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                background: "var(--gold)",
                color: "var(--ink)",
                padding: "0.7rem 1rem",
                borderRadius: 999,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              Enquire
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .topnav-link:hover { color: var(--paper); }
        .topnav-desktop { display: flex; }
        .topnav-mobile-toggle,
        .topnav-mobile-drawer { display: none; }
        @media (max-width: 767px) {
          .topnav-desktop { display: none; }
          .topnav-mobile-toggle { display: inline-flex; }
          .topnav-mobile-drawer { display: block; }
        }
      `}</style>
    </header>
  );
}
