/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS so the preinstalled global Playwright resolves */
// Renders public/og-image.png (1200x630) with Playwright: Survey Paper, contour lines, the InfinityMark,
// the headline and three roofline-framed faces (01 Ellie, 02 Jenny, 09 Joe). Run: node scripts/build-og.cjs
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const b64 = (p, type) => `data:${type};base64,${fs.readFileSync(path.join(__dirname, "..", p)).toString("base64")}`;
const mark = fs.readFileSync(path.join(__dirname, "..", "components/InfinityMark.tsx"), "utf8");
const letters = mark.match(/d="(M22 236[^"]+)"/)[1];
const slash = mark.match(/d="(M793 236[^"]+)"/)[1];
const roof = mark.match(/ROOF_D = "([^"]+)"/)[1];
const contours = b64("public/contours-slate.svg", "image/svg+xml");
const face = (f) => b64(`public/images/${f}`, "image/webp");

const ROOF = "polygon(0 21.5%, 50% 0, 100% 21.5%, 100% 100%, 0 100%)";
const frame = (src, w, pos, x, y, rot, z) => `
  <div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);z-index:${z};
    background:#F3F6F8;padding:8px 8px 0;clip-path:polygon(0 ${w * 0.26875}px, 50% 0, 100% ${w * 0.26875}px, 100% 100%, 0 100%)">
    <div style="clip-path:${ROOF};aspect-ratio:4/5;background:url(${src}) ${pos}/cover no-repeat"></div>
    <div style="height:10px"></div>
  </div>`;

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Jost:wght@400;500&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#F3F6F8 url(${contours}) center/cover;font-family:Jost;position:relative;overflow:hidden}
  h1{font-family:Fraunces;font-weight:600;font-variation-settings:"opsz" 144;font-size:74px;line-height:1.02;letter-spacing:-0.025em;color:#0E0F10}
  .cap{font-weight:500;font-size:22px;letter-spacing:0.16em;text-transform:uppercase;color:#16191B}
</style></head><body>
  <div style="position:absolute;left:72px;top:64px;width:540px">
    <svg viewBox="0 20 1366 620" width="260" style="display:block;color:#0E0F10">
      <path d="${slash}" fill="#9BA8AE"/><path d="${letters}" fill="currentColor"/>
      <path d="${roof}" fill="none" stroke="currentColor" stroke-width="37" stroke-linejoin="miter"/>
      <text x="22" y="618" textLength="1321" lengthAdjust="spacing" fill="currentColor" style="font-family:Jost;font-size:168px">REAL ESTATE</text>
    </svg>
    <h1 style="margin-top:64px">Making realty<br>dreams come true.</h1>
    <div style="margin-top:28px;width:84px;height:2px;background:#0E0F10"></div>
    <p class="cap" style="margin-top:24px">PA &middot; IL &middot; NV &middot; MD &middot; Since 1994</p>
  </div>
  ${frame(face("02-agent-NV-jenny-lynn-johnston.webp"), 190, "55% 25%", 700, 250, -2, 2)}
  ${frame(face("01-agent-NV-ellen-plante-BEST.webp"), 270, "50% 22%", 820, 70, 0, 1)}
  ${frame(face("09-agent-PA-joe-geeting.webp"), 175, "50% 30%", 990, 300, 2, 3)}
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(__dirname, "..", "public/og-image.png") });
  await browser.close();
  console.log("public/og-image.png written");
})();
