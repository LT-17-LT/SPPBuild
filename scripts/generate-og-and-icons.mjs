import sharp from "sharp";

const HERO = "public/images/hero-landing.jpg";
const LOGO_INK = "public/images/brand/spp-logo-ink.png";
const OUT_SEO = "public/seo";

// 1) Open Graph card - 1200 x 630. Wide crop of hero landing.
const ogInfo = await sharp(HERO)
  .resize({ width: 2400, height: 1260, fit: "cover", position: "center" })
  .resize({ width: 1200, height: 630 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(`${OUT_SEO}/og-image.jpg`);
console.log("og-image.jpg", `${ogInfo.width}x${ogInfo.height}`, `${(ogInfo.size/1024).toFixed(0)}KB`);

// 2) PWA + Apple touch icons - always square, generated from the ink logo on
//    the paper background so favicons are visible in tabs.
const ICON_BG = "#f3f1ec"; // --paper
async function makeIcon(size, name) {
  const logoSize = Math.round(size * 0.7);
  const logoBuf = await sharp(LOGO_INK)
    .resize({ width: logoSize, fit: "inside" })
    .toBuffer();
  const info = await sharp({
    create: { width: size, height: size, channels: 3, background: ICON_BG },
  })
    .composite([{ input: logoBuf, gravity: "center" }])
    .png()
    .toFile(`${OUT_SEO}/${name}`);
  console.log(name, `${info.width}x${info.height}`, `${(info.size/1024).toFixed(0)}KB`);
}
await makeIcon(180, "apple-touch-icon.png");
await makeIcon(192, "icon-192.png");
await makeIcon(512, "icon-512.png");

// Overwrite the root favicon.ico slot with a PNG at 32 (browsers accept PNG here)
await makeIcon(32, "favicon-32.png");
console.log("all icons written");
