import sharp from "sharp";
const src = "D:/24_SwingPathPro/2026/Images/PerfectSwingArc_02.png";
const out = "D:/24_SwingPathPro/2026/WEBSITE BUILD/GIT/SPPBuild/public/images/system/perfect-swing-arc.jpg";
const info = await sharp(src)
  .resize({ width: 1200 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(out);
console.log(`${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
