import Image from "next/image";

/** Intrinsic aspect ratio of the exported signature logo (1600 x 375). */
const ASPECT = 1600 / 375;

/**
 * Wordmark - the real Swing Path Pro signature logo. "paper" (cream) for
 * dark backgrounds, "ink" for light ones. Sized by height; width follows
 * the logo's aspect ratio.
 */
export function Wordmark({
  height = 30,
  variant = "paper",
}: {
  height?: number;
  variant?: "paper" | "ink";
}) {
  const src =
    variant === "ink"
      ? "/images/brand/spp-logo-ink.png"
      : "/images/brand/spp-logo-paper.png";
  return (
    <Image
      src={src}
      alt="Swing Path Pro"
      height={height}
      width={Math.round(height * ASPECT)}
      priority
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
