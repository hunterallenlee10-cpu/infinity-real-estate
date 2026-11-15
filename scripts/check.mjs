// npm run check: tests what a script can test, on the built HTML in .next/server/app.
// Run after `next build`. Exits non-zero on any failure.
import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = ".next/server/app";
const LIVE = process.env.NEXT_PUBLIC_SITE_MODE === "live";
const fails = [];
const fail = (page, msg) => fails.push(`${page}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith(".html") && !e.name.includes("[") && !e.name.startsWith("_global")) out.push(p);
  }
  return out;
}

// Facts file: every phone number and email allowed on the site.
const facts = (await readFile("lib/agents.ts", "utf8")) + (await readFile("lib/business.ts", "utf8"));
const allowedPhones = new Set([...facts.matchAll(/\+1\d{10}/g)].map((m) => m[0]));
const allowedEmails = new Set([...facts.matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)].map((m) => m[0].toLowerCase()));

const files = await walk(ROOT);
const route = (f) => {
  const r = f.slice(ROOT.length).replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
};
const routes = new Set(files.map(route));
const html = Object.fromEntries(await Promise.all(files.map(async (f) => [route(f), await readFile(f, "utf8")])));
const exists = async (p) => access(p).then(() => true, () => false);

const titles = new Map();
const descs = new Map();
for (const [page, raw] of Object.entries(html)) {
  if (page === "/_not-found") continue;
  const body = raw.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  const text = body.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");

  // one h1
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(page, `expected one h1, found ${h1}`);

  // title, description, canonical
  const title = (raw.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = (raw.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) fail(page, "missing title");
  if (!desc) fail(page, "missing meta description");
  if (title && titles.has(title)) fail(page, `title duplicates ${titles.get(title)}`);
  if (desc && descs.has(desc)) fail(page, `description duplicates ${descs.get(desc)}`);
  titles.set(title, page);
  descs.set(desc, page);
  if (desc && desc.length > 165) fail(page, `meta description is ${desc.length} characters`);
  if (!/<link rel="canonical"/.test(raw)) fail(page, "missing canonical");

  // robots meta matches the mode
  const robots = (raw.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
  if (LIVE && /noindex/.test(robots)) fail(page, "live mode but page is noindex");
  if (!LIVE && !/noindex/.test(robots)) fail(page, "demo mode but page is indexable");

  // copy rules
  if (/[—–]/.test(text)) fail(page, "em or en dash in copy");
  if (/\w--\w|\s--\s/.test(text)) fail(page, "double hyphen in copy");
  for (const bad of ["lorem ipsum", "undefined", "[object Object]", "NaN", "{{", "TODO", "TBD"]) {
    if (text.includes(bad)) fail(page, `leftover text "${bad}"`);
  }
  if (LIVE && /DRAFT|data-placeholder=|Sample review|go here/.test(body)) fail(page, "draft or placeholder content in live mode");
  if (LIVE && /Concept preview/.test(text)) fail(page, "concept footer line in live mode");
  if (!LIVE && !/Concept preview by Lee Enterprises Unlimited/.test(text)) fail(page, "concept footer line missing in demo mode");

  // images: alt on every img, and dimensions (or next/image fill)
  for (const img of body.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) fail(page, `img without alt: ${img.slice(0, 80)}`);
    if (!/data-nimg="fill"/.test(img) && !(/\swidth="/.test(img) && /\sheight="/.test(img))) fail(page, `img without dimensions: ${img.slice(0, 80)}`);
  }

  // links
  for (const m of body.matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    const label = (m[0].match(/aria-label="([^"]*)"/) || [])[1] || m[2].replace(/<[^>]+>/g, " ").trim();
    if (!label) fail(page, `link without text: ${href}`);
    if (/^(learn more|click here|read more|here|more)$/i.test(label)) fail(page, `vague link text "${label}"`);
    if (href.startsWith("tel:") || href.startsWith("sms:")) {
      const num = href.replace(/^(tel|sms):/, "").split("?")[0];
      if (!allowedPhones.has(num)) fail(page, `phone ${num} is not in the facts file`);
    } else if (href.startsWith("mailto:")) {
      const mail = decodeURIComponent(href.slice(7).split("?")[0]).toLowerCase();
      if (!allowedEmails.has(mail)) fail(page, `email ${mail} is not in the facts file`);
    } else if (href.startsWith("/")) {
      const [p, hash] = href.split("#");
      const target = p === "" ? page : p.replace(/\/$/, "") || "/";
      if (!routes.has(target) && !(await exists(path.join("public", target)))) fail(page, `broken internal link ${href}`);
      else if (hash && html[target] && !new RegExp(`id="${hash}"`).test(html[target])) fail(page, `link to missing anchor ${href}`);
    } else if (href.startsWith("#")) {
      if (href.length > 1 && !new RegExp(`id="${href.slice(1)}"`).test(body)) fail(page, `link to missing anchor ${href}`);
    } else if (!/^https:\/\//.test(href)) {
      fail(page, `unexpected link ${href}`);
    }
  }

  // every phone number and email written on the page is in the facts file
  for (const m of text.matchAll(/\((\d{3})\)\s?(\d{3})-(\d{4})/g)) {
    if (!allowedPhones.has(`+1${m[1]}${m[2]}${m[3]}`)) fail(page, `phone ${m[0]} on the page is not in the facts file`);
  }
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi)) {
    if (!allowedEmails.has(m[0].toLowerCase())) fail(page, `email ${m[0]} on the page is not in the facts file`);
  }

  // JSON-LD parses and never claims ratings or reviews
  for (const m of raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.stringify(JSON.parse(m[1]));
      if (/aggregateRating|"review"/.test(data)) fail(page, "rating or review markup found");
    } catch {
      fail(page, "JSON-LD does not parse");
    }
  }
}

// every page in the nav and sitemap list exists
for (const must of ["/", "/agents", "/markets", "/buy", "/sell", "/search", "/about", "/contact"]) {
  if (!routes.has(must)) fail(must, "page was not built");
}

const pages = Object.keys(html).length;
if (fails.length) {
  console.log(`npm run check: ${fails.length} failure(s) across ${pages} pages (${LIVE ? "live" : "demo"} mode)\n`);
  for (const f of fails) console.log("  FAIL " + f);
  process.exit(1);
}
console.log(`npm run check: 0 failures across ${pages} pages (${LIVE ? "live" : "demo"} mode)`);
