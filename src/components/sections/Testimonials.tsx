import Image from "next/image";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";

type Quote = {
  quote: string;
  author: string;
  facility: string;
  /** Portrait photo of the golfer, matched to the live site. */
  image?: string;
  /** Short muted clip, used in place of a photo (plays while in view). */
  video?: string;
  poster?: string;
};

const QUOTES: Quote[] = [
  {
    quote:
      "I recommend the Swing Path Pro to build up muscle memory and feel, for all types of golfers.",
    author: "Kalvin van Rensburg",
    facility: "Scratch Player, Amanzimtoti Golf Club",
    video: "/images/testimonials/kalvin.mp4",
    poster: "/images/testimonials/kalvin-poster.jpg",
  },
  {
    quote:
      "The apparatus resisted when I swayed on the ball and I felt the difference when instructed to stand firm in my stance.",
    author: "Ina van Zyl",
    facility: "Ernie Els Silver Lakes Autism Event",
    image: "/images/testimonials/ina-van-zyl.jpg",
  },
  {
    quote:
      "The machine allowed the club to glide on the correct path and would be good for aspiring golfers.",
    author: "Carla Pinheiro",
    facility: "Ernie Els Silver Lakes Autism Event",
    image: "/images/testimonials/carla-pinheiro.jpg",
  },
  {
    quote:
      "I am impressed how it is designed to control your swing. After playing 9 holes I felt a positive difference in my swing and it showed in my score.",
    author: "Bevan Du Preez",
    facility: "Ernie Els Silver Lakes Autism Event",
    image: "/images/testimonials/bevan-du-preez.jpg",
  },
];

/**
 * Testimonials - SOHub-style stacking cards. Each card is sticky at the same
 * top offset; as the user scrolls the next card slides up over the previous.
 * No GSAP needed - pure CSS position:sticky does the work.
 *
 * Each card pairs the golfer's photo (matched to the live site) with their
 * quote. Kalvin's card runs photo-less until his range photo is supplied.
 */
export function Testimonials() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "var(--paper)",
        paddingTop: "var(--section-py)",
      }}
      id="proof"
      aria-label="Testimonials"
    >
      {/* Section header (scrolls normally, above the stack) */}
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: "min(720px, 92vw)",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <span
          className="eyebrow"
          style={{ color: "var(--green)", marginBottom: "1.25rem" }}
        >
          Proof
        </span>
        <h2
          className="font-display"
          style={{
            color: "var(--ink)",
            fontWeight: 400,
            fontSize: "clamp(2.2rem, 4.6vw, 3.4rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          What golfers said after the first swing.
        </h2>
      </div>

      {/* Sticky stacking container. Each card sticks at the same top offset. */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "min(1080px, 92vw)",
          paddingBottom: "clamp(6rem, 12vw, 12rem)",
        }}
      >
        {QUOTES.map((q, i) => (
          <div
            key={q.author}
            className="relative"
            style={{
              paddingTop: i === 0 ? 0 : "6vh",
              paddingBottom: "0",
              marginBottom: "24vh",
            }}
          >
            <article
              className="testimonial-card mx-auto"
              style={{
                position: "sticky",
                top: "12vh",
                background:
                  "radial-gradient(ellipse 100% 100% at 20% 20%, var(--green2) 0%, var(--green) 45%, var(--green-deep) 100%)",
                color: "var(--paper)",
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                minHeight: "min(60vh, 500px)",
                width: "100%",
                boxShadow:
                  "0 20px 60px -20px rgba(9, 20, 11, 0.35), 0 4px 20px -8px rgba(9, 20, 11, 0.25)",
                display: "grid",
                gridTemplateColumns:
                  q.image || q.video
                    ? "minmax(0, 0.72fr) minmax(0, 1fr)"
                    : "1fr",
              }}
            >
              {/* Media panel - photo, or a living video portrait */}
              {(q.image || q.video) && (
                <div
                  className="testimonial-photo relative"
                  style={{ minHeight: "100%", background: "var(--green-deep)" }}
                >
                  {q.video && q.poster ? (
                    <AutoplayVideo
                      src={q.video}
                      poster={q.poster}
                      className="absolute inset-0 h-full w-full"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  ) : (
                    q.image && (
                      <Image
                        src={q.image}
                        alt={`${q.author} on the Swing Path Pro`}
                        fill
                        sizes="(max-width: 820px) 100vw, 40vw"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />
                    )
                  )}
                </div>
              )}

              {/* Text panel */}
              <div
                className="flex flex-col justify-between"
                style={{ padding: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                {/* Top row: gold hairline + index */}
                <div className="flex items-center" style={{ gap: "0.75rem" }}>
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: "3rem",
                      height: 1,
                      background: "var(--gold)",
                      opacity: 0.85,
                    }}
                  />
                  <span
                    className="eyebrow"
                    style={{ color: "var(--gold)", fontSize: "0.62rem" }}
                  >
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(QUOTES.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Quote */}
                <blockquote
                  className="font-display italic"
                  style={{
                    margin: "auto 0",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    fontWeight: 400,
                    fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.35,
                    color: "var(--paper)",
                    maxWidth: "42ch",
                  }}
                >
                  <span aria-hidden style={{ color: "var(--gold)", marginRight: "0.15em" }}>
                    &ldquo;
                  </span>
                  {q.quote}
                  <span aria-hidden style={{ color: "var(--gold)", marginLeft: "0.05em" }}>
                    &rdquo;
                  </span>
                </blockquote>

                {/* Attribution */}
                <div className="flex flex-col">
                  <span
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontWeight: 600,
                      color: "var(--paper)",
                      fontSize: "0.95rem",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {q.author}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontWeight: 300,
                      color: "var(--moss-lt)",
                      fontSize: "0.85rem",
                      marginTop: "0.15rem",
                    }}
                  >
                    {q.facility}
                  </span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .testimonial-card {
            grid-template-columns: 1fr !important;
          }
          .testimonial-photo {
            aspect-ratio: 4 / 3;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
