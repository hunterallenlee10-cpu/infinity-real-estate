// Generates the contour-line texture once, as two static SVGs (slate on paper, white on ink).
// A seeded field of soft hills is traced with marching squares (d3-contour), like a survey sheet.
import { contours } from "d3-contour";
import { geoPath } from "d3-geo";
import { writeFile } from "node:fs/promises";

let seed = 1994;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const W = 180, H = 120, SCALE = 10, PAD = 10; // pad so the grid border never shows
const hills = Array.from({ length: 9 }, () => ({
  x: rand() * W, y: rand() * H, r: 14 + rand() * 26, h: (rand() > 0.25 ? 1 : -0.6) * (0.6 + rand()),
  sx: 0.7 + rand() * 0.8,
}));
const values = new Float64Array(W * H);
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
  let v = 0;
  for (const k of hills) {
    const dx = (i - k.x) / k.sx, dy = j - k.y;
    v += k.h * Math.exp(-(dx * dx + dy * dy) / (2 * k.r * k.r));
  }
  v += 0.08 * Math.sin(i / 9) * Math.cos(j / 7);
  values[j * W + i] = v;
}
const min = Math.min(...values), max = Math.max(...values);
const thresholds = Array.from({ length: 12 }, (_, k) => min + ((k + 1) * (max - min)) / 13);
const polys = contours().size([W, H]).smooth(true).thresholds(thresholds)(values);
const path = geoPath().digits(1);
const scaleD = (d) => d.replace(/-?\d+(\.\d+)?/g, (n) => (parseFloat(n) * SCALE).toFixed(0));
const d = polys.map((p) => scaleD(path(p) || "")).join("");

const svg = (stroke, opacity) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${PAD * SCALE} ${PAD * SCALE} ${(W - 2 * PAD) * SCALE} ${(H - 2 * PAD) * SCALE}" preserveAspectRatio="xMidYMid slice"><path d="${d}" fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
await writeFile("public/contours-slate.svg", svg("#9BA8AE", 0.42));
await writeFile("public/contours-ink.svg", svg("#FFFFFF", 0.12));
console.log("contours", d.length, "chars");
