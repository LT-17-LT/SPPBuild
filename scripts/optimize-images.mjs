import sharp from "sharp";
import path from "node:path";

const SRC = "D:/24_SwingPathPro/2026/Images";
const DST = "D:/24_SwingPathPro/2026/WEBSITE BUILD/GIT/SPPBuild/public/images";

async function jpg(src, dst, maxW, q = 82) {
  const info = await sharp(src)
    .rotate()
    .resize({ width: maxW, withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(dst);
  console.log(`${path.basename(dst)}  ${info.width}x${info.height}  ${(info.size/1024).toFixed(0)}KB`);
}

const jobs = [
  // Testimonials — matched to live site (portrait, ~1000px is plenty)
  [`${SRC}/Testemonials/SPP_SilverLakes-4.png`, `${DST}/testimonials/ina-van-zyl.jpg`, 1000],
  [`${SRC}/Testemonials/SPP_SilverLakes-1.png`, `${DST}/testimonials/carla-pinheiro.jpg`, 1000],
  [`${SRC}/Testemonials/SPP_SilverLakes-3.png`, `${DST}/testimonials/bevan-du-preez.jpg`, 1000],

  // Ebotse Links — 28 Aug 2025
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/Ebotse Links Golf day 28 Aug 2025.jpg`, `${DST}/events/ebotse/group-panorama.jpg`, 2000],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/Participants at Ebotse Links 28 August 2025 .jpg`, `${DST}/events/ebotse/participants.jpg`, 1600],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/ErnieElsAutism golf day at Ebotse Links.jpg`, `${DST}/events/ebotse/charities-banner.jpg`, 1600],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/Chris our developer showing the way .jpg`, `${DST}/events/ebotse/chris-developer.jpg`, 1600],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/Nico Van Rensburg loves this apperatus.jpg`, `${DST}/events/ebotse/nico-van-rensburg.jpg`, 1600],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/Our first display event .jpg`, `${DST}/events/ebotse/first-display.jpg`, 1600],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/Testing 123.jpg`, `${DST}/events/ebotse/testing.jpg`, 1600],
  [`${SRC}/300825_ErnieElsAutismDay_EbotseLinks/The Developer & Marketer .jpg`, `${DST}/events/ebotse/developer-marketer.jpg`, 1600],
];

// Silver Lakes — 11 Oct 2025
const sl = ["063","066","068","069","121","123","124","402","407","410","412","415","420"];
sl.forEach((n, i) => {
  const idx = String(i + 1).padStart(2, "0");
  jobs.push([`${SRC}/131025_SilverLakes_Pretoria/E4ASL_${n}.jpg`, `${DST}/events/silver-lakes/silver-lakes-${idx}.jpg`, 1600]);
});

for (const [src, dst, w, q] of jobs) {
  try { await jpg(src, dst, w, q); }
  catch (e) { console.error("FAIL", src, e.message); }
}
