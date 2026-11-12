import Image from "next/image";
import type { Agent } from "@/lib/agents";
import { ROOF_POINTS } from "./SvgDefs";

type Photo = { src: string; w: number; h: number; alt: string; position: string };

type Props = {
  /** Either an agent (photo or monogram) or a bare photo */
  agent?: Pick<Agent, "name" | "initials" | "photo" | "state">;
  photo?: Photo;
  /** next/image sizes attribute */
  sizes: string;
  /** Paper mat around the print, for overlapping frames */
  mat?: boolean;
  preload?: boolean;
  className?: string;
  caption?: string;
  captionClassName?: string;
  /** Dark variant for monograms on the ink band */
  monogramSize?: "sm" | "md" | "lg";
};

const MAT_CLIP = "polygon(0 26.875cqw, 50% 0, 100% 26.875cqw, 100% 100%, 0 100%)";

const STATE_NAMES = { PA: "Pennsylvania", IL: "Illinois", NV: "Nevada", MD: "Maryland" } as const;

function Outline() {
  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <polygon
        points={ROOF_POINTS}
        fill="none"
        stroke="var(--color-slate)"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Monogram({
  initials,
  label,
  size = "md",
}: {
  initials: string;
  label: string;
  size?: "sm" | "md" | "lg";
}) {
  const text = size === "lg" ? "text-[5.5rem]" : size === "sm" ? "text-[2.25rem]" : "text-[3.5rem]";
  return (
    <div role="img" aria-label={label} className="contour-bg absolute inset-0 flex items-center justify-center bg-plat">
      <span
        aria-hidden="true"
        className={`font-display ${text} mt-[18%] font-semibold leading-none tracking-[-0.03em] text-ink`}
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        {initials}
      </span>
    </div>
  );
}

export function RooflineFrame({
  agent,
  photo,
  sizes,
  mat = false,
  preload = false,
  className = "",
  caption,
  captionClassName = "",
  monogramSize = "md",
}: Props) {
  const p = photo ?? agent?.photo ?? null;
  const inner = (
    <div className="roof-clip relative aspect-[4/5] w-full overflow-hidden bg-plat">
      {p ? (
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : undefined}
          className="object-cover"
          style={{ objectPosition: p.position }}
        />
      ) : agent ? (
        // TODO: real headshot from the agent. Monogram until then.
        <Monogram
          initials={agent.initials}
          size={monogramSize}
          label={`${agent.name}, ${STATE_NAMES[agent.state]} agent. Monogram until a headshot is supplied.`}
        />
      ) : null}
      <Outline />
    </div>
  );
  const cap = caption && (
    <figcaption className={`label text-center text-[0.75rem] leading-snug tracking-[0.06em] text-balance text-muted ${mat ? "pt-2 pb-1.5" : "mt-2"} ${captionClassName}`}>
      {caption}
    </figcaption>
  );
  // With a mat, the caption is printed on the mat strip under the photo, like a print laid on a desk.
  return mat ? (
    <figure className={`@container relative m-0 ${className}`}>
      {/* The mat follows the same 0.5375 pitch; it is taller than 4:5 (caption strip), so it is clipped in width units. */}
      <div className="bg-paper px-[7px] pt-[7px]" style={{ clipPath: MAT_CLIP }}>
        {inner}
        {cap}
      </div>
    </figure>
  ) : (
    <figure className={`relative m-0 ${className}`}>
      {inner}
      {cap}
    </figure>
  );
}
