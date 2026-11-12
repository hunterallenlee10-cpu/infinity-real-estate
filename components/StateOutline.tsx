import { STATE_OUTLINES, STATE_VIEWBOX, type StateSlug } from "@/lib/states";

// Single-stroke state outline in Ink. Optional faint contour fill, clipped to the state.
// Boundary data: us-atlas (U.S. Census Bureau, public domain). See lib/states.ts.
export function StateOutline({
  slug,
  className,
  contour = false,
  strokeWidth = 1.5,
}: {
  slug: StateSlug;
  className?: string;
  contour?: boolean;
  strokeWidth?: number;
}) {
  const { d } = STATE_OUTLINES[slug];
  const id = `state-clip-${slug}`;
  return (
    <svg viewBox={STATE_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      {contour && (
        <>
          <defs>
            <clipPath id={id}>
              <path d={d} />
            </clipPath>
          </defs>
          <image href="/contours-slate.svg" x={-120} y={-60} width={480} height={300} clipPath={`url(#${id})`} preserveAspectRatio="xMidYMid slice" />
        </>
      )}
      <path
        d={d}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
