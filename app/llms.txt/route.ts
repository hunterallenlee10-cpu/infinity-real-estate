import { agents, hasPage } from "@/lib/agents";
import { IS_LIVE, SITE_URL, business, referral } from "@/lib/business";
import { faq } from "@/lib/faq";
import { markets } from "@/lib/markets";

// llms.txt, in Markdown with a top heading and real links. Served in live mode only; the concept
// preview returns 404. It is a courtesy file for AI assistants, not a ranking tool.
function build() {
  const L: string[] = [];
  L.push(`# ${business.name}`, "");
  L.push(
    `> ${business.displayName} is a boutique real estate firm, established in 1994 in Nevada and later expanded elsewhere in the country. Real estate agents in Pennsylvania, Illinois, Nevada and Maryland.`,
    "",
  );
  L.push("## Contact", "");
  L.push(`- Main line, call or text: ${business.phone.display}`);
  L.push(`- Email: ${business.email}`);
  L.push(`- Nevada licence: Infinity Realty (NV) ${business.nvLicence}`);
  L.push(`- [Contact page](${SITE_URL}/contact)`, "");
  L.push("## Markets", "");
  for (const m of markets) L.push(`- [${m.name}](${SITE_URL}/markets/${m.slug}): ${m.serviceArea}`);
  L.push("", "## Services", "");
  L.push(`- [Buying a home](${SITE_URL}/buy): buyer's agents in all four states`);
  L.push(`- [Selling a home](${SITE_URL}/sell): listing agents in all four states`);
  L.push(`- [Search homes](${SITE_URL}/search): live MLS search by state`, "");
  L.push("## Agents", "");
  for (const a of agents) {
    const name = a.name.replace(/[“”]/g, '"');
    const bits = [a.title, a.experience !== "Not listed" ? a.experience : null, marketName(a.state)].filter(Boolean).join(", ");
    const phone = a.cell ? a.cell.display : `main line ${business.phone.display}`;
    const head = hasPage(a) ? `[${name}](${SITE_URL}/agents/${a.slug})` : name;
    L.push(`- ${head}: ${bits}. Phone ${phone}.${a.highlights.length ? ` Known for ${a.highlights.join(", ").toLowerCase()}.` : ""}`);
  }
  L.push("", "## Referral partner", "");
  L.push(`- ${referral.name}, ${referral.title}: oceanfront condos and beach homes in Myrtle Beach, SC. ${referral.phoneDisplay}.`, "");
  L.push("## Common questions", "");
  for (const f of faq) L.push(`- ${f.q} ${f.a}`);
  return L.join("\n") + "\n";
}

const marketName = (code: string) => markets.find((m) => m.code === code)!.name;

export const dynamic = "force-static";

export function GET() {
  if (!IS_LIVE) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(build(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
