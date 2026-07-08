/**
 * FooterBar - slim closing strip. The site links and wordmark now live
 * in the EndMenu band at the top of the End section; this keeps only
 * the sign-off line.
 */
export function FooterBar() {
  return (
    <footer
      className="relative w-full"
      style={{
        background:
          "linear-gradient(180deg, var(--green-deep) 0%, #05100a 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      aria-label="Footer"
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: "min(1200px, 96vw)",
          padding: "clamp(1.25rem, 2vw, 1.75rem) 1.5rem",
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
    </footer>
  );
}
