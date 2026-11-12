// One shared clipPath for every portrait and monogram frame: a rectangle whose top is the
// pitched roofline from the logo's I (pitch 0.537). Frames are 4:5, so the peak sits at y = 0.215.
export const ROOF_PEAK = 0.215;
export const ROOF_POINTS = `0,${ROOF_PEAK} 0.5,0 1,${ROOF_PEAK} 1,1 0,1`;

export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="roofline-clip" clipPathUnits="objectBoundingBox">
          <polygon points={ROOF_POINTS} />
        </clipPath>
      </defs>
    </svg>
  );
}
