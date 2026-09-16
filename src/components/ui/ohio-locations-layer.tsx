import type { CSSProperties } from "react";
import { OHIO_GLOWS, OHIO_LOCATIONS, OHIO_NEIGHBORS, OHIO_PATH, OHIO_VIEWBOX, type GlowBox } from "./ohio-map-data";

/* Teardrop pin with its tip at (0, 0) and a round head above it. */
const PIN_HEAD_Y = 11.3;
const PIN_PATH = `M0 0C-1.3-3.4-5.6-7.6-5.6-${PIN_HEAD_Y}A5.6 5.6 0 1 1 5.6-${PIN_HEAD_Y}C5.6-7.6 1.3-3.4 0 0Z`;

const boxStyle = ({ left, top, width, height }: GlowBox): CSSProperties => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
});

/**
 * Hero artwork in the house slot: Ohio as an extruded navy cut-out with its 50
 * satellite locations as lit orange pins. It keeps the `house-layer` class and
 * the two `window-glow` spans, so the existing customer hover/tap effects
 * (brighten, lift, glows up) still apply; the pins add a staggered lift on the
 * same triggers (see globals.css).
 */
export function OhioLocationsLayer() {
  return (
    <div className="house-layer ohio-layer" aria-hidden="true">
      <span className="window-glow window-one" style={boxStyle(OHIO_GLOWS.northeast)} />
      <span className="window-glow window-two" style={boxStyle(OHIO_GLOWS.central)} />

      {/* Always visible over pin-free southwest Ohio; lifts on the same hover/tap triggers. */}
      <span className="ohio-callout">
        <span className="ohio-callout-dot" />
        <span className="ohio-callout-copy">
          <small>Statewide coverage</small>
          <strong>50 locations across Ohio</strong>
        </span>
      </span>

      <OhioMap neighbors />
    </div>
  );
}

/**
 * The extruded Ohio outline and its 50 pins on their own, so other sections
 * (the company story) can show the same map. `idPrefix` keeps the gradient ids
 * unique when more than one map is on the page.
 */
export function OhioMap({ idPrefix = "ohio", neighbors = false }: { idPrefix?: string; neighbors?: boolean }) {
  const { width, height } = OHIO_VIEWBOX;

  return (
    <svg className="ohio-map" viewBox={`0 0 ${width} ${height}`} focusable="false">
      <defs>
        {/* Neighbours run far past the viewBox, so dissolve them with distance from Ohio
            rather than cutting them at a hard edge. */}
        {neighbors && (
          <>
            <radialGradient id={`${idPrefix}-context-fade`} gradientUnits="userSpaceOnUse" cx="300" cy="305" r="640">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="52%" stopColor="#ffffff" />
              <stop offset="80%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            {/* Borders fade out well before the land does, so a state's far edges (Indiana's
                western line, Michigan's north) never survive as strays with nothing attached. */}
            <radialGradient id={`${idPrefix}-border-fade`} gradientUnits="userSpaceOnUse" cx="300" cy="305" r="470">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="62%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <mask id={`${idPrefix}-border-mask`} maskUnits="userSpaceOnUse" x="-400" y="-400" width="1800" height="1800">
              <rect x="-400" y="-400" width="1800" height="1800" fill={`url(#${idPrefix}-border-fade)`} />
              <path d={OHIO_PATH} fill="#000000" />
              <path d={OHIO_PATH} transform="translate(0 7)" fill="#000000" />
              <path d={OHIO_PATH} transform="translate(0 14)" fill="#000000" />
            </mask>
            <mask id={`${idPrefix}-context-mask`} maskUnits="userSpaceOnUse" x="-400" y="-400" width="1800" height="1800">
              <rect x="-400" y="-400" width="1800" height="1800" fill={`url(#${idPrefix}-context-fade)`} />
              {/* Knock Ohio and its extruded edge out of the neighbours, so their shared
                  borders never double up against the state's own outline. */}
              <path d={OHIO_PATH} fill="#000000" />
              <path d={OHIO_PATH} transform="translate(0 7)" fill="#000000" />
              <path d={OHIO_PATH} transform="translate(0 14)" fill="#000000" />
            </mask>
          </>
        )}
        <linearGradient id={`${idPrefix}-surface`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#2b5184" />
          <stop offset="55%" stopColor="#173a66" />
          <stop offset="100%" stopColor="#0d2748" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Surrounding geography, under Ohio, so the state reads as a place rather than a
          free-floating shape. Decorative only. */}
      {neighbors && (
        <g className="ohio-context" aria-hidden="true">
          <g mask={`url(#${idPrefix}-context-mask)`}>
            {OHIO_NEIGHBORS.map((state) => (
              <path className="ohio-neighbor" key={state.name} d={state.d} />
            ))}
          </g>
          <g mask={`url(#${idPrefix}-border-mask)`}>
            {OHIO_NEIGHBORS.map((state) => (
              <path className="ohio-border" key={state.name} d={state.d} />
            ))}
          </g>
        </g>
      )}

      {/* The state and its pins move together on hover; the context behind stays put. */}
      <g className="ohio-state">
        {/* Extruded edge: two stepped copies below the face give the state thickness. */}
        <path d={OHIO_PATH} transform="translate(0 14)" fill="#030c19" fillOpacity="0.7" />
        <path d={OHIO_PATH} transform="translate(0 7)" fill="#0a1f3a" />
        <path d={OHIO_PATH} fill={`url(#${idPrefix}-surface)`} />
        <path d={OHIO_PATH} fill={`url(#${idPrefix}-sheen)`} />
        <path d={OHIO_PATH} fill="none" stroke="#c7dcf5" strokeOpacity="0.55" strokeWidth="1.6" strokeLinejoin="round" />

        <g className="ohio-pins">
          {OHIO_LOCATIONS.map((location, i) => (
            <g key={location.name} transform={`translate(${location.x} ${location.y})`}>
              <g className="ohio-pin" style={{ "--i": i } as CSSProperties}>
                <ellipse className="ohio-pin-glow" cy="-1" rx="9" ry="4" />
                <path className="ohio-pin-body" d={PIN_PATH} />
                <circle className="ohio-pin-dot" cy={-PIN_HEAD_Y} r="2.1" />
              </g>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
