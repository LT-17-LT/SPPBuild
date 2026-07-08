import sharp from "sharp";
const SRC = "D:/24_SwingPathPro/2026/Images";
const OUT = "D:/24_SwingPathPro/2026/WEBSITE BUILD/GIT/SPPBuild/public/images/system";

const jobs = [
  ["WristRotation_03.png", "wrist-rotation.jpg"],
  ["Posture and Resistance.png", "posture-and-resistance.jpg"],
  ["MuscleMemory_01.png", "muscle-memory.jpg"],
  ["ZeroTech_01.png", "zero-tech.jpg"],
];

for (const [src, dst] of jobs) {
  const info = await sharp(`${SRC}/${src}`)
    .resize({ width: 1200 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${dst}`);
  console.log(`${dst}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
