// Converts the raw Drive assets in public/images/raw to .webp in public/images.
// Never upscales: every output is at or below the source's native size.
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";
const MAX_WIDTH = 1200; // only 01 (1792px) is larger than this

// Robin's crop carries part of a printed banner ("...over", "...altor") on its left edge.
// Trim it off so only her portrait remains. This is a crop, not a resize.
const CROPS = {
  "10-agent-PA-SC-robin-keefover-crop.jpg": { left: 104, top: 0, width: 397, height: 692 },
};

await mkdir(OUT, { recursive: true });
const files = (await readdir(RAW)).filter((f) => /\.(jpe?g|png)$/i.test(f));
const report = [];
for (const file of files) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  let img = sharp(path.join(RAW, file));
  if (CROPS[file]) img = img.extract(CROPS[file]);
  img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const isLogo = file.startsWith("00-");
  const info = await img
    .clone()
    .webp({ quality: isLogo ? 90 : 82, alphaQuality: 100, effort: 6 })
    .toFile(path.join(OUT, `${base}.webp`));
  report.push(`${base}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}kB`);
  if (isLogo) {
    const png = await img.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, `${base}.png`));
    report.push(`${base}.png ${png.width}x${png.height}`);
  }
}
console.log(report.join("\n"));
