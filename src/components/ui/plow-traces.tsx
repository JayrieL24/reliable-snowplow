/**
 * Blade-pass traces — the record a plow leaves on a lot, used as the section's
 * background.
 *
 * Not a repeating tile: each pass is a paired track (two blade edges) that runs
 * a lane, turns at the end, and comes back overlapping the previous pass. Where
 * passes meet imperfectly a thin uncleared wedge is left, which is what makes
 * a real lot read as plowed rather than ruled. Laid out as a route, so the
 * geometry is irregular by construction.
 *
 * Decorative for assistive tech.
 */

const W = 1400;
const H = 700;

/** Blade width: the gap between the two edges of one pass. */
const BLADE = 15;

type Pass = {
  /** Lane centre-line y at the start and end of the run. */
  y: number;
  /** Run direction; alternating, as a plow shuttles up and down the lot. */
  dir: 1 | -1;
  /** How far along the lot the pass actually runs (0–1). */
  from: number;
  to: number;
  /** Slight drift across the run — no operator holds a perfect line. */
  drift: number;
};

/** A route down the lot: lanes overlap unevenly, and a couple stop short. */
const PASSES: Pass[] = [
  { y: 96, dir: 1, from: 0.0, to: 0.97, drift: -5 },
  { y: 131, dir: -1, from: 0.04, to: 1.0, drift: 4 },
  { y: 163, dir: 1, from: 0.0, to: 0.82, drift: -3 },
  { y: 201, dir: -1, from: 0.12, to: 1.0, drift: 6 },
  { y: 232, dir: 1, from: 0.0, to: 0.93, drift: -4 },
  { y: 271, dir: -1, from: 0.0, to: 1.0, drift: 3 },
  { y: 300, dir: 1, from: 0.22, to: 0.88, drift: -6 },
  { y: 341, dir: -1, from: 0.0, to: 1.0, drift: 5 },
  { y: 372, dir: 1, from: 0.0, to: 0.76, drift: -3 },
  { y: 412, dir: -1, from: 0.08, to: 1.0, drift: 4 },
  { y: 447, dir: 1, from: 0.0, to: 0.95, drift: -5 },
  { y: 484, dir: -1, from: 0.0, to: 1.0, drift: 3 },
  { y: 512, dir: 1, from: 0.3, to: 0.84, drift: -4 },
  { y: 553, dir: -1, from: 0.0, to: 1.0, drift: 6 },
  { y: 588, dir: 1, from: 0.0, to: 0.9, drift: -3 },
  { y: 626, dir: -1, from: 0.05, to: 1.0, drift: 4 },
];

/** One edge of the blade, drifting slightly across the run. */
function edge(p: Pass, offset: number): string {
  const x0 = p.from * W;
  const x1 = p.to * W;
  const y0 = p.y + offset;
  const y1 = p.y + offset + p.drift;
  const mx = (x0 + x1) / 2;
  // Gentle S so the lane wanders rather than ruling straight.
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${(x0 + (mx - x0) * 0.5).toFixed(1)} ${(y0 - p.drift * 0.4).toFixed(1)}, ${(mx + (x1 - mx) * 0.5).toFixed(1)} ${(y1 + p.drift * 0.4).toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

/** The hook at the end of a run where the blade turns for the next lane. */
function turn(p: Pass, next: Pass): string | null {
  if (p.to < 0.99 || next.from > 0.01) return null;
  const x = p.dir === 1 ? W : 0;
  const y0 = p.y + p.drift;
  const y1 = next.y;
  const sweep = p.dir === 1 ? 34 : -34;
  return `M ${x} ${y0} C ${x + sweep} ${y0 + 6}, ${x + sweep} ${y1 - 6}, ${x} ${y1}`;
}

export function PlowTraces({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Cleared lanes read slightly brighter than the untouched ground. */}
        <linearGradient id="pt-lane" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8ecbf5" stopOpacity="0" />
          <stop offset="22%" stopColor="#8ecbf5" stopOpacity=".05" />
          <stop offset="78%" stopColor="#8ecbf5" stopOpacity=".05" />
          <stop offset="100%" stopColor="#8ecbf5" stopOpacity="0" />
        </linearGradient>
        {/* Keeps the traces to the margins so they never cross the copy. */}
        <radialGradient id="pt-vignette" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="52%" stopColor="#fff" stopOpacity="0" />
          <stop offset="78%" stopColor="#fff" stopOpacity=".55" />
          <stop offset="100%" stopColor="#fff" stopOpacity=".9" />
        </radialGradient>
        <mask id="pt-mask">
          <rect width={W} height={H} fill="url(#pt-vignette)" />
        </mask>
      </defs>

      <g mask="url(#pt-mask)">
        {/* Swept lane fills, laid first so the edges sit on top. */}
        {PASSES.map((p, i) => (
          <rect
            key={`lane-${i}`}
            x={p.from * W}
            y={p.y - BLADE / 2}
            width={(p.to - p.from) * W}
            height={BLADE + Math.abs(p.drift)}
            fill="url(#pt-lane)"
          />
        ))}

        {/* Paired blade edges. */}
        {PASSES.map((p, i) => (
          <g key={`pass-${i}`} stroke="#9fd4f5" fill="none" strokeLinecap="round">
            <path d={edge(p, -BLADE / 2)} strokeOpacity=".2" strokeWidth="1" />
            <path d={edge(p, BLADE / 2)} strokeOpacity=".11" strokeWidth="1" />
          </g>
        ))}

        {/* Turn hooks at the lot edges. */}
        {PASSES.map((p, i) => {
          const next = PASSES[i + 1];
          if (!next) return null;
          const d = turn(p, next);
          if (!d) return null;
          return (
            <path
              key={`turn-${i}`}
              d={d}
              stroke="#9fd4f5"
              strokeOpacity=".14"
              strokeWidth="1.1"
              fill="none"
            />
          );
        })}

        {/* Uncleared wedges: where a pass stopped short of the one before it. */}
        {PASSES.map((p, i) => {
          if (p.to > 0.94) return null;
          const x = p.to * W;
          const y = p.y + p.drift;
          return (
            <path
              key={`wedge-${i}`}
              d={`M ${x} ${y - BLADE / 2} L ${x + 46} ${y - 2} L ${x} ${y + BLADE / 2} Z`}
              fill="#9fd4f5"
              fillOpacity=".05"
            />
          );
        })}
      </g>
    </svg>
  );
}
