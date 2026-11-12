// The INFINITY wordmark rebuilt as SVG. Geometry measured from 00-logo-2-logo-infinity-realty-large.png
// (1374x645): cap height 218, stem 41, roofline pitch 0.537, chimney over the second I.
// The roofline is its own <path> so it can draw on.

type Props = {
  variant?: "estate" | "realty" | "none";
  animate?: boolean;
  className?: string;
  /** Accessible name. Pass null when a visible name sits next to it. */
  title?: string | null;
};

export const ROOF_D = "M490 202 L738 69 L986 202";

export function InfinityLetters() {
  return (
    <>
      {/* grey cross stroke inside the second N, drawn first so the black diagonal sits on top */}
      <path d="M793 236H794V293L683 454V396Z" fill="var(--color-slate)" />
      <path
        fill="currentColor"
        d="M22 236h41v218H22z M117 236h41v218h-41z M270 236h40v218h-40z M117 236h43l150 218h-42z M364 236h41v218h-41z M364 236h150v37H364z M364 332h140v36H364z M546 210L587 188V454H546Z M546 69h41v100h-41z M533 31h68v24h-68z M642 236h40v218h-40z M794 236h40v218h-40z M642 236h42l150 218h-42z M889 236h41v218h-41z M960 236h178v37H960z M1028 236h41v218h-41z M1141 236H1183L1242.5 345L1302 236H1343L1263 384V454H1222V384Z"
      />
    </>
  );
}

export function InfinityMark({ variant = "estate", animate = false, className, title = "Infinity Real Estate" }: Props) {
  const height = variant === "none" ? 470 : 640;
  return (
    <svg
      viewBox={`0 20 1366 ${height - 20}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <InfinityLetters />
      <path
        d={ROOF_D}
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={37}
        strokeLinejoin="miter"
        strokeMiterlimit={4}
        className={animate ? "draw" : undefined}
      />
      {variant === "estate" && (
        <text
          x={22}
          y={618}
          textLength={1321}
          lengthAdjust="spacing"
          fill="currentColor"
          style={{ fontFamily: "var(--font-jost)", fontWeight: 400, fontSize: 168 }}
        >
          REAL ESTATE
        </text>
      )}
      {variant === "realty" && (
        <text
          x={320}
          y={618}
          textLength={725}
          lengthAdjust="spacing"
          fill="currentColor"
          style={{ fontFamily: "var(--font-jost)", fontWeight: 400, fontSize: 168 }}
        >
          REALTY
        </text>
      )}
    </svg>
  );
}
