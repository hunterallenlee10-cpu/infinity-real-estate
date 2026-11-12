// The Roofline Route: the logo's roofline draws large and faint behind the headline, then a single
// Contour Slate line runs from its peak, down the roof, and on through NV, IL, PA and MD (west to east),
// finishing under the headline. Pure SVG + CSS (stroke-dashoffset), plays once, no layout shift.
// Units are container-query units (cqi) of the headline block, so the art scales with the type.

type Variant = { lines: number; fs: number; key: "wide" | "narrow" };

const LH = 1.04;
const PEAK = { x: 30, y: 4 - 33 * 0.537 }; // same 0.537 pitch as the logo
const EAVE = { x: -3, y: 4 };
const PINS: { code: string; x: number; wave: number }[] = [
  { code: "NV", x: 12, wave: -1.4 },
  { code: "IL", x: 38, wave: 1.2 },
  { code: "PA", x: 64, wave: -1.2 },
  { code: "MD", x: 88, wave: 1 },
];

export function routeY(v: Variant) {
  return v.lines * v.fs * LH + (v.key === "wide" ? 3.8 : 5);
}

function geometry(v: Variant) {
  const y = routeY(v);
  const roof = `M${EAVE.x} ${EAVE.y} L${PEAK.x} ${PEAK.y.toFixed(2)} L${PEAK.x + 33} ${EAVE.y}`;
  // from the peak, down the left slope, round the corner, then west to east through the pins
  let route = `M${PEAK.x} ${PEAK.y.toFixed(2)} L${EAVE.x} ${EAVE.y} C${EAVE.x - 2} ${EAVE.y + 1.2} -5 ${EAVE.y + 6} -5 ${EAVE.y + 10} L-5 ${(y - 4).toFixed(2)} C-5 ${(y - 0.6).toFixed(2)} -3 ${y.toFixed(2)} 1 ${y.toFixed(2)}`;
  let px = 1;
  for (const p of PINS) {
    const mid = (px + p.x) / 2;
    route += ` Q${mid} ${(y + p.wave).toFixed(2)} ${p.x} ${y.toFixed(2)}`;
    px = p.x;
  }
  route += ` Q${(px + 100) / 2} ${(y - 1).toFixed(2)} 100 ${y.toFixed(2)}`;
  // approximate arc-length fractions for pin timing
  const slope = Math.hypot(33, PEAK.y - EAVE.y);
  const down = y - EAVE.y + 4;
  const total = slope + down + 106;
  const frac = (x: number) => (slope + down + (x + 6)) / total;
  return { y, roof, route, frac };
}

const ROOF_MS = 500;
const ROUTE_MS = 700;

export function HeroRoute({ variant }: { variant: Variant }) {
  const g = geometry(variant);
  const top = -20;
  const height = g.y + 8 - top;
  return (
    <span aria-hidden="true" className={`hero-route hero-route--${variant.key}`}>
      <svg
        viewBox={`-8 ${top} 116 ${height}`}
        style={{ left: "-8cqi", top: `${top}cqi`, width: "116cqi", height: `${height}cqi` }}
        className="pointer-events-none absolute overflow-visible"
        focusable="false"
      >
        <path
          d={g.roof}
          pathLength={1}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={0.05}
          strokeWidth={4.9}
          strokeLinejoin="miter"
          className="draw"
          style={{ ["--dur" as string]: `${ROOF_MS}ms` }}
        />
        <path
          d={g.route}
          pathLength={1}
          fill="none"
          stroke="var(--color-slate)"
          // ~1.5px at the block's typical width (non-scaling-stroke breaks pathLength dashes in Chrome)
          strokeWidth={variant.key === "wide" ? 0.28 : 0.44}
          strokeLinecap="round"
          className="draw"
          style={{ ["--dur" as string]: `${ROUTE_MS}ms`, ["--delay" as string]: `${ROOF_MS}ms` }}
        />
        {PINS.map((p) => (
          <g key={p.code} className="pin" style={{ ["--delay" as string]: `${Math.round(ROOF_MS + g.frac(p.x) * ROUTE_MS * 0.85)}ms` }}>
            <circle cx={p.x} cy={g.y} r={variant.key === "wide" ? 1.15 : 1.7} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
            <circle cx={p.x} cy={g.y} r={variant.key === "wide" ? 0.45 : 0.65} fill="var(--color-ink)" />
          </g>
        ))}
      </svg>
      {PINS.map((p) => (
        <span
          key={p.code}
          className="pin label absolute -translate-x-1/2 text-[0.75rem] leading-none text-muted"
          style={{
            left: `${p.x}cqi`,
            top: `calc(${g.y}cqi + 12px)`,
            ["--delay" as string]: `${Math.round(ROOF_MS + g.frac(p.x) * ROUTE_MS * 0.85)}ms`,
          }}
        >
          {p.code}
        </span>
      ))}
    </span>
  );
}
