import Link from "next/link";
import { FaceChip } from "./RooflineFrame";
import { agentBySlug, hasPage } from "@/lib/agents";
import type { AskGroup } from "@/lib/services";

/** "Who to ask for": each need on the left, the agents whose own bios mention it on the right. */
export function AskGroups({ groups }: { groups: AskGroup[] }) {
  return (
    <ul className="border-t border-ink">
      {groups.map((g) => (
        <li key={g.label} className="reveal grid gap-4 border-b border-rule py-6 md:grid-cols-12 md:gap-8 md:py-7">
          <h3 className="text-[length:var(--text-h3)] md:col-span-4">{g.label}</h3>
          <ul className="grid gap-4 sm:grid-cols-2 md:col-span-8">
            {g.agents.map(({ slug, why }) => {
              const a = agentBySlug(slug)!;
              const inner = (
                <>
                  <FaceChip agent={a} size={52} />
                  <span className="min-w-0">
                    <span className="block font-medium text-ink underline-offset-4 group-hover:underline">
                      {a.first} {a.name.split(" ").slice(-1)[0]}, {a.state}
                    </span>
                    <span className="block text-[0.9375rem] leading-snug text-muted">{why}</span>
                  </span>
                </>
              );
              return (
                <li key={slug}>
                  {hasPage(a) ? (
                    <Link href={`/agents/${a.slug}`} className="group flex items-start gap-3">
                      {inner}
                    </Link>
                  ) : (
                    <span className="flex items-start gap-3">{inner}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
