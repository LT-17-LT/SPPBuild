import sharp from "sharp";
const SRC = "D:/24_SwingPathPro/2026/250819_SPP_Logo.png";
const OUT = "D:/24_SwingPathPro/2026/WEBSITE BUILD/GIT/SPPBuild/public/images/brand";

// Trim the white margin, scale to a crisp-but-light width.
const trimmed = await sharp(SRC)
  .flatten({ background: "#ffffff" })
  .trim({ threshold: 20 })
  .resize({ width: 1600 })
  .toBuffer();

const { width, height } = await sharp(trimmed).metadata();

// Alpha mask: black strokes -> opaque, white bg -> transparent (soft AA edges kept).
const alpha = await sharp(trimmed)
  .removeAlpha()
  .grayscale()
  .negate()
  .toColourspace("b-w")
  .toBuffer();

async function tint(hex, name) {
  await sharp({ create: { width, height, channels: 3, background: hex } })
    .joinChannel(alpha)
    .png()
    .toFile(`${OUT}/${name}`);
  const info = await sharp(`${OUT}/${name}`).metadata();
  console.log(`${name}  ${info.width}x${info.height}`);
}

await tint("#f3f1ec", "spp-logo-paper.png"); // for dark backgrounds
await tint("#11140f", "spp-logo-ink.png"); // for light backgrounds
console.log("aspect", (width / height).toFixed(3));
