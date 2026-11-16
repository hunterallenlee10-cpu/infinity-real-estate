// The roofline frame shared by every portrait and monogram: a rectangle whose top is the pitched
// roofline from the logo's I (pitch 0.537). Frames are 4:5, so the eaves sit at y = 0.215.
// The clip itself is a CSS polygon (.roof-clip in globals.css); these points draw the outline.
export const ROOF_PEAK = 0.215;
export const ROOF_POINTS = `0,${ROOF_PEAK} 0.5,0 1,${ROOF_PEAK} 1,1 0,1`;
