/**
 * Salt-spread scatter — the pattern a spreader leaves on pavement.
 *
 * Granules are denser near the spreader's arc and thin out with distance, with
 * size falling off the same way; a broadcast spreader throws bigger grains
 * further but fewer of them. Positions come from a seeded PRNG so the layout is
 * identical on server and client (no hydration mismatch) while still reading as
 * genuinely irregular rather than a tiled grid.
 *
 * Decorative for assistive tech.
 */

const W = 1400;
const H = 520;
const GRAINS = 520;

/** Mulberry32 — small, deterministic, good enough for scatter. */
function prng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Grain = { cx: number; cy: number; r: number; o: number };

function buildGrains(): Grain[] {
  const rand = prng(20260911);
  const out: Grain[] = [];

  for (let i = 0; i < GRAINS; i++) {
    // Bias toward the right, where the media sits: the spreader's throw arc.
    const bias = Math.pow(rand(), 1.7);
    const cx = W - (bias * W * 1.05 - 40);
    // Vertical spread widens as the throw carries further out.
    const spread = 0.18 + bias * 0.82;
    const cy = H * (0.5 + (rand() - 0.5) * spread * 1.9);

    // Density and size both fall off with distance from the spreader.
    const falloff = 1 - bias;
    if (rand() > 0.28 + falloff * 0.72) continue;

    out.push({
      cx: Math.round(cx * 10) / 10,
      cy: Math.round(cy * 10) / 10,
      r: Math.round((0.7 + rand() * (1.1 + falloff * 1.6)) * 10) / 10,
      o: Math.round((0.16 + falloff * 0.5 + rand() * 0.22) * 100) / 100,
    });
  }
  return out;
}

const GRAIN_LIST = buildGrains();

export function SaltScatter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Clear on the left so the copy sits on plain ground; the scatter
            gathers on the right, behind and around the media. */}
        <linearGradient id="salt-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="34%" stopColor="#fff" stopOpacity=".06" />
          <stop offset="58%" stopColor="#fff" stopOpacity=".45" />
          <stop offset="100%" stopColor="#fff" stopOpacity=".95" />
        </linearGradient>
        <mask id="salt-mask">
          <rect width={W} height={H} fill="url(#salt-fade)" />
        </mask>
      </defs>

      <g mask="url(#salt-mask)" fill="#0b2f52">
        {GRAIN_LIST.map((g, i) => (
          <circle key={i} cx={g.cx} cy={g.cy} r={g.r} fillOpacity={g.o} />
        ))}
      </g>
    </svg>
  );
}
