// Writes public/llms.txt from the same data the site uses. Run: node --experimental-strip-types scripts/build-llms.mjs
// (Node 22.18+ strips TypeScript types natively.)
import { writeFile } from "node:fs/promises";
import { register } from "node:module";
// lib/*.ts uses extensionless relative imports (bundler style); resolve them to .ts for Node.
register(
  "data:text/javascript," +
    encodeURIComponent(
      "export async function resolve(s,c,n){try{return await n(s,c)}catch(e){if(s.startsWith('.'))return n(s+'.ts',c);throw e}}",
    ),
);
const { agents } = await import("../lib/agents.ts");
const { business, referral } = await import("../lib/business.ts");
const { markets } = await import("../lib/markets.ts");
const { faq } = await import("../lib/faq.ts");

const L = [];
L.push(`# ${business.name}`, "");
L.push(`> ${business.displayName}. A boutique real estate firm, established in 1994 in Nevada and later expanded elsewhere in the country. Real estate agents in Pennsylvania, Illinois, Nevada and Maryland.`, "");
L.push("## Contact", "");
L.push(`- Main line (call or text): ${business.phone.display} (${business.phone.e164})`);
L.push(`- Email: ${business.email}`);
L.push(`- Nevada licence: Infinity Realty (NV) ${business.nvLicence}`);
L.push(`- Current website: ${business.currentWebsite}`, "");
L.push("## Markets served", "");
for (const m of markets) L.push(`- ${m.name}: ${m.serviceArea}. Live MLS search: ${m.idx}`);
L.push("");
L.push("## How they work", "");
L.push(`- ${business.lines.bothHats}`);
L.push(`- ${business.lines.network}`);
L.push(`- Each client is treated as an individual. Our communication is always clear.`, "");
L.push("## Agents", "");
for (const m of markets) {
  L.push(`### ${m.name}`, "");
  for (const a of agents.filter((x) => x.state === m.code)) {
    const bits = [a.title, a.experience !== "Not listed" ? a.experience : null].filter(Boolean).join(", ");
    const phone = a.cell ? a.cell.display : `not published, use the main line ${business.phone.display}`;
    const langs = a.languages.filter((l) => l !== "english");
    L.push(`- ${a.name.replace(/[“”]/g, '"')}${bits ? ` (${bits})` : ""}. Cell: ${phone}.${a.email ? ` Email: ${a.email}.` : ""}${langs.length ? ` Speaks ${langs.map((l) => l[0].toUpperCase() + l.slice(1)).join(" and ")}.` : ""}${a.highlights.length ? ` Known for: ${a.highlights.join(", ")}.` : ""}`);
  }
  L.push("");
}
L.push("## Referral partner", "");
L.push(`- ${referral.name}, ${referral.title}. Oceanfront condos and beach homes in Myrtle Beach, SC. ${referral.phoneDisplay}. Started with Infinity in Pennsylvania.`, "");
L.push("## Questions", "");
for (const f of faq) L.push(`- ${f.q} ${f.a}`);
L.push("", "Note: roster, titles, years and phone numbers are as published on infinitypa.com and are being confirmed.");
await writeFile("public/llms.txt", L.join("\n") + "\n");
console.log("public/llms.txt", L.length, "lines");
