import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Friends", href: "/friends" },
  { label: "Seen in the Field", href: "/events" },
];

/**
 * SiteHeader - solid header for sub-pages (/friends, /events). Unlike the
 * homepage TopNav (which fades from transparent over the hero), this is a
 * fixed green-deep bar so sub-pages read as part of the same site and
 * always offer a way back home.
 */
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 w-full"
      style={{
        zIndex: 100,
        background: "rgba(9, 20, 11, 0.92)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div
        className="mx-auto flex flex-wrap items-center"
        style={{
          maxWidth: "min(1280px, 96vw)",
          padding: "clamp(0.85rem, 1.5vw, 1.15rem) 1.5rem",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          className="inline-flex items-center"
          style={{ color: "var(--paper)", textDecoration: "none" }}
          aria-label="Swing Path Pro - home"
        >
          <Wordmark height={26} variant="paper" />
        </Link>

        <nav
          className="flex flex-wrap items-center"
          style={{ gap: "clamp(1rem, 2vw, 2rem)" }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="siteheader-link"
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
            </Link>
          ))}
          <a
            href="mailto:hello@swingpathpro.com?subject=Swing%20Path%20Pro%20enquiry"
            className="inline-flex items-center"
            style={{
              background: "var(--gold)",
              color: "var(--ink)",
              padding: "0.5rem 1.05rem",
              borderRadius: 999,
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontSize: "0.82rem",
              textDecoration: "none",
            }}
          >
            Enquire
          </a>
        </nav>
      </div>

      <style>{`.siteheader-link:hover { color: var(--paper); }`}</style>
    </header>
  );
}
