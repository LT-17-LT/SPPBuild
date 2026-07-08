import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

const LINKS = [
  { label: "Friends of SPP", href: "/friends" },
  { label: "Seen in the Field", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Patents", href: "/patents" },
  { label: "Privacy", href: "/privacy" },
];

/**
 * EndMenu - the secondary navigation band that sits at the top of the
 * End section (above the green finale). Styled with the same weight and
 * feel as the top-of-page nav - these destinations matter more than a
 * footer, so they get menu treatment: wordmark left, full-size links,
 * patent line right.
 */
export function EndMenu() {
  return (
    <nav
      className="relative w-full"
      style={{
        background: "rgba(9, 20, 11, 0.98)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        zIndex: 20,
      }}
      aria-label="Site menu"
    >
      <div
        className="mx-auto flex flex-wrap items-center"
        style={{
          maxWidth: "min(1280px, 96vw)",
          padding: "clamp(1.1rem, 2vw, 1.6rem) 1.5rem",
          gap: "clamp(1.25rem, 2.5vw, 2.5rem)",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="inline-flex items-center"
          style={{ color: "var(--paper)", textDecoration: "none" }}
          aria-label="Swing Path Pro - home"
        >
          <Wordmark height={26} variant="paper" />
        </Link>

        {/* Menu links - nav weight, not footer weight */}
        <div
          className="flex flex-wrap items-center"
          style={{ gap: "clamp(1.25rem, 2.2vw, 2.25rem)" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="endmenu-link"
              style={{
                color: "var(--moss-lt)",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.02em",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright / Patent line */}
        <span
          className="endmenu-legal"
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--moss)",
          }}
        >
          © 2025-2026 SPP · Patent #1408632
        </span>
      </div>

      <style>{`
        .endmenu-link:hover { color: var(--paper); }
        @media (max-width: 767px) {
          .endmenu-legal { display: none; }
        }
      `}</style>
    </nav>
  );
}
