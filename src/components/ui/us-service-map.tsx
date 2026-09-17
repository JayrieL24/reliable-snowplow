import type { CSSProperties } from "react";
import { OHIO_US_PATH, US_LAKES, US_OHIO_PINS, US_STATES, US_VIEWBOX } from "./us-map-data";

/** Pin height in viewBox units. Ohio stands ~474 units tall here, so this is ~4% of it. */
const PIN_H = 19;

/* Teardrop pin with its tip at (0, 0) and a round head above it — the same shape the
   hero's Ohio map uses, at this map's scale. */
const h = (n: number) => (PIN_H * n).toFixed(2);
const PIN_PATH = `M0 0C-${h(0.115)}-${h(0.3)} -${h(0.5)}-${h(0.67)} -${h(0.5)}-${PIN_H}A${h(0.5)} ${h(0.5)} 0 1 1 ${h(0.5)}-${PIN_H}C${h(0.5)}-${h(0.67)} ${h(0.115)}-${h(0.3)} 0 0Z`;

/**
 * Service-area map: the region around Ohio drawn flat — plain white states with blue
 * borders, no gradients or gloss — with Ohio picked out of it in navy and the 50 satellite
 * locations as red pins.
 *
 * The frame is tight on Ohio (see us-map-data.ts) so the pins are countable; the neighbouring
 * states, Ontario and the Great Lakes run off the edges of the viewBox, the way they should on
 * a map of one area. It floats on the section background rather than
 * sitting in a panel, so the state outlines are the section's only edge.
 */
export function UsServiceMap() {
  const { width, height } = US_VIEWBOX;

  return (
    <svg
      className="us-map"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Map of Ohio and the surrounding states, with Ohio highlighted and ${US_OHIO_PINS.length} Reliable satellite locations marked across it.`}
    >
      {/* The Great Lakes sit under the land, so the shorelines are what the states' edges draw. */}
      <g className="us-map-lakes">
        {US_LAKES.map((lake) => (
          <path key={lake.name} d={lake.d} />
        ))}
      </g>

      {/* The surrounding states and Ontario: flat white, separated by blue borders. */}
      <g className="us-map-land">
        {US_STATES.map((state) => (
          <path key={state.name} d={state.d} />
        ))}
      </g>

      <g className="us-map-ohio">
        <path className="us-map-ohio-shape" d={OHIO_US_PATH} strokeWidth={2.6} />

        <g className="us-map-pins">
          {US_OHIO_PINS.map((pin, i) => (
            <g key={pin.name} transform={`translate(${pin.x} ${pin.y})`}>
              {/* The town's position lives on the wrapper, so the inner group is free to be
                  animated with a CSS transform without moving off its town. */}
              <g className="us-map-pin" style={{ "--i": i } as CSSProperties}>
                <path className="us-map-pin-body" d={PIN_PATH} strokeWidth={1.1} />
                <circle className="us-map-pin-dot" cy={-PIN_H} r={PIN_H * 0.2} />
              </g>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
