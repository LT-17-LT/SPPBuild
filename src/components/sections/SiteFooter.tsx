import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Friends of SPP", href: "/friends" },
  { label: "Seen in the Field", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Patents", href: "/patents" },
  { label: "Privacy", href: "/privacy" },
];

/**
 * SiteFooter - shared footer for sub-pages. Wordmark, the full site link set,
 * and the SPP sign-off.
 */
export function SiteFooter() {
  return (
    <footer
      className="relative w-full"
      style={{
        background:
          "linear-gradient(180deg, var(--green-deep) 0%, #05100a 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
      aria-label="Footer"
    >
      <div
        className="mx-auto flex flex-wrap items-center"
        style={{
          maxWidth: "min(1200px, 96vw)",
          padding: "clamp(1.5rem, 3vw, 2.25rem) 1.5rem",
          gap: "clamp(1.25rem, 2.5vw, 2.5rem)",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          className="inline-flex items-center"
          style={{ color: "var(--paper)", textDecoration: "none" }}
          aria-label="Swing Path Pro - home"
        >
          <Wordmark height={28} variant="paper" />
        </Link>

        <nav
          className="flex flex-wrap items-center"
          style={{ gap: "clamp(1rem, 2.2vw, 2rem)" }}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="sitefooter-link"
              style={{
                color: "var(--moss-lt)",
                textDecoration: "none",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span
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

      <div
        className="mx-auto"
        style={{
          maxWidth: "min(1200px, 96vw)",
          padding: "0 1.5rem clamp(1.5rem, 2.5vw, 2rem)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 300,
            color: "var(--moss)",
            fontSize: "0.72rem",
            margin: 0,
            opacity: 0.75,
          }}
        >
          Designed in South Africa. Made for the game.
        </p>
      </div>

      <style>{`.sitefooter-link:hover { color: var(--paper); }`}</style>
    </footer>
  );
}
