"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";

type NavItem =
  | { label: "Home"; kind: "top" }
  | { label: string; kind: "section"; sectionId: string }
  | { label: string; kind: "page"; href: string };

const NAV: NavItem[] = [
  { label: "Home", kind: "top" },
  { label: "System", kind: "section", sectionId: "system" },
  { label: "For You", kind: "section", sectionId: "for-you" },
  { label: "Proof", kind: "section", sectionId: "proof" },
  { label: "Friends of SPP", kind: "page", href: "/friends" },
  { label: "Seen in the Field", kind: "page", href: "/events" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * TopNav - fixed top navigation. Transparent while at the top of the page
 * on the homepage; solid green-deep everywhere else and after ~80px of
 * scroll. Section links smooth-scroll when on the homepage, and route to
 * `/#id` when clicked from any sub-page (with a hash-scroll handler on the
 * homepage that catches those on arrival).
 */
export function TopNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
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

  // Homepage: if the URL loaded with a hash (from a sub-page nav click),
  // scroll to that section once the DOM is settled.
  useEffect(() => {
    if (!onHome) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    // Wait a beat for hero + pinned sections to lay out.
    const t = window.setTimeout(() => scrollToId(hash), 200);
    return () => window.clearTimeout(t);
  }, [onHome]);

  // Force the solid background on sub-pages regardless of scroll position -
  // there's no hero to fade over.
  const solid = !onHome || scrolled;

  const handleNav = (item: NavItem, e: React.MouseEvent) => {
    if (item.kind === "top") {
      if (onHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // else: let Next Link route to "/"
      return;
    }
    if (item.kind === "section" && onHome) {
      e.preventDefault();
      scrollToId(item.sectionId);
    }
    // section from sub-page: let Link route to "/#id" (browser + our hash effect handle scroll)
    // page: let Link route
  };

  const hrefFor = (item: NavItem): string => {
    if (item.kind === "top") return "/";
    if (item.kind === "section") return `/#${item.sectionId}`;
    return item.href;
  };

  return (
    <header
      className="fixed top-0 left-0 w-full"
      style={{
        zIndex: 100,
        transition:
          "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease, color 0.35s ease",
        background: solid ? "rgba(9, 20, 11, 0.86)" : "transparent",
        backdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: solid ? "blur(14px) saturate(140%)" : "none",
        borderBottom: solid
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid transparent",
        boxShadow: solid ? "0 12px 40px -20px rgba(0,0,0,0.55)" : "none",
      }}
    >
      <div
        className="mx-auto flex items-center"
        style={{
          maxWidth: "min(1280px, 96vw)",
          padding: "clamp(0.9rem, 1.6vw, 1.25rem) 1.5rem",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Link
          href="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="inline-flex items-center"
          style={{ color: "var(--paper)", textDecoration: "none" }}
          aria-label="Swing Path Pro - home"
        >
          <Wordmark height={26} variant="paper" />
        </Link>

        {/* Desktop links */}
        <nav
          className="topnav-desktop items-center"
          style={{ gap: "clamp(1rem, 1.5vw, 1.75rem)" }}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={hrefFor(item)}
              onClick={(e) => handleNav(item, e)}
              className="topnav-link"
              style={{
                color: "var(--moss-lt)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "0.82rem",
                letterSpacing: "0.02em",
                textDecoration: "none",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Link>
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
              whiteSpace: "nowrap",
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
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={hrefFor(item)}
                onClick={(e) => {
                  handleNav(item, e);
                  setMenuOpen(false);
                }}
                style={{
                  color: "var(--paper)",
                  textDecoration: "none",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                {item.label}
              </Link>
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
        @media (max-width: 1023px) {
          .topnav-desktop { display: none; }
          .topnav-mobile-toggle { display: inline-flex; }
          .topnav-mobile-drawer { display: block; }
        }
      `}</style>
    </header>
  );
}
