"use client";

import * as React from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlowTraces } from "@/components/ui/plow-traces";

export interface ServiceLevel {
  id: string;
  name: string;
  tier: string;
  summary: string;
  /** TODO: replace with a real still from each service-level video. */
  image?: string;
  /** TODO: point at the actual video file or embed URL. */
  video?: string;
  duration?: string;
}

/** Service levels as published at reliablesnowplowing.net/service/service-levels */
const DEFAULT_LEVELS: ServiceLevel[] = [
  {
    id: "platinum",
    name: "Platinum",
    tier: "Level 1 · Bare & wet pavement",
    summary:
      "24/7 weather monitoring with equipment staged 30 minutes before conditions turn hazardous. Continuous surface treatment and thaw/freeze applications through the day.",
    duration: "2 min",
  },
  {
    id: "gold",
    name: "Gold",
    tier: "Level 2 · Strategic deicing",
    summary:
      "Deicing timed to peak traffic—before opening, at lunch, and through the end-of-day rush. Snow over 1 inch is plowed; lighter accumulation is salted.",
    duration: "2 min",
  },
  {
    id: "silver",
    name: "Silver",
    tier: "Level 3 · Morning & afternoon",
    summary:
      "Overnight weather monitoring with morning and afternoon clearing. Snow above 2 inches is plowed, with a salting before opening and up to two more when conditions turn slippery.",
    duration: "2 min",
  },
  {
    id: "custom",
    name: "Customized",
    tier: "Tailored plan",
    summary:
      "For large or multiple properties. A dedicated Account Manager builds the plan around your risk tolerance, snow placement, shift timing, and communication protocols.",
    duration: "3 min",
  },
];

export function ServiceShowcase({
  levels = DEFAULT_LEVELS,
  eyebrow,
  heading,
  intro,
  className,
}: {
  levels?: ServiceLevel[];
  eyebrow?: string;
  heading: React.ReactNode;
  intro?: string;
  className?: string;
}) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [openId, setOpenId] = React.useState<string | null>(null);

  const open = levels.find((l) => l.id === openId) ?? null;

  // Esc closes; lock the page behind the modal while it's up.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Two staggered columns, second dropped lower — the collage look of the reference.
  const colA = levels.filter((_, i) => i % 2 === 0);
  const colB = levels.filter((_, i) => i % 2 === 1);

  return (
    <section className={cn("svc", className)} id="watch">
      <PlowTraces className="svc-traces" />

      <div className="svc-inner">
        <div className="svc-copy">
          {eyebrow ? <p className="svc-eyebrow">{eyebrow}</p> : null}
          <h2>{heading}</h2>
          {intro ? <p className="svc-intro">{intro}</p> : null}
        </div>

        <div className="svc-grid">
          <div className="svc-col">
            {colA.map((level) => (
              <Tile
                key={level.id}
                level={level}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onOpen={setOpenId}
              />
            ))}
          </div>
          <div className="svc-col svc-col-offset">
            {colB.map((level) => (
              <Tile
                key={level.id}
                level={level}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onOpen={setOpenId}
              />
            ))}
          </div>
        </div>

        <div className="svc-side">
          <ul className="svc-list">
            {levels.map((level) => (
              <LevelRow
                key={level.id}
                level={level}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                onOpen={setOpenId}
              />
            ))}
          </ul>

          <div className="svc-status">
            <span className="svc-status-pulse" aria-hidden="true" />
            <span className="svc-status-text">
              <strong>Not sure which level fits?</strong>
              An Account Manager will walk your property and recommend one.
            </span>
            <a className="svc-status-cta" href="#programs">
              Talk to us
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {open ? (
        <div
          className="svc-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} service level video`}
          onClick={() => setOpenId(null)}
        >
          <div className="svc-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="svc-modal-close"
              onClick={() => setOpenId(null)}
              aria-label="Close video"
            >
              <X aria-hidden="true" />
            </button>

            <div className="svc-modal-video">
              {open.video ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video src={open.video} controls autoPlay playsInline />
              ) : (
                <div className="svc-modal-placeholder">
                  <span className="svc-play svc-play-lg" aria-hidden="true">
                    <Play />
                  </span>
                  {/* TODO: drop the real video in via the `video` prop. */}
                  <p>Video coming soon</p>
                </div>
              )}
            </div>

            <div className="svc-modal-meta">
              <p className="svc-modal-tier">{open.tier}</p>
              <h3>{open.name}</h3>
              <p className="svc-modal-summary">{open.summary}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Tile({
  level,
  hoveredId,
  onHover,
  onOpen,
}: {
  level: ServiceLevel;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  const isActive = hoveredId === level.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <button
      type="button"
      className={cn("svc-tile", isActive && "is-active", isDimmed && "is-dimmed")}
      onMouseEnter={() => onHover(level.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(level.id)}
      onBlur={() => onHover(null)}
      onClick={() => onOpen(level.id)}
      aria-label={`Play the ${level.name} service level video`}
    >
      {level.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={level.image} alt="" />
      ) : (
        <span className={cn("svc-tile-fill", `svc-tile-${level.id}`)} aria-hidden="true" />
      )}
      <span className="svc-play" aria-hidden="true">
        <Play />
      </span>
      <span className="svc-tile-name">{level.name}</span>
    </button>
  );
}

function LevelRow({
  level,
  hoveredId,
  onHover,
  onOpen,
}: {
  level: ServiceLevel;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  const isActive = hoveredId === level.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <li className={cn("svc-row", isDimmed && "is-dimmed")}>
      <button
        type="button"
        className="svc-row-btn"
        onMouseEnter={() => onHover(level.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(level.id)}
        onBlur={() => onHover(null)}
        onClick={() => onOpen(level.id)}
      >
        <span className="svc-row-head">
          <span className={cn("svc-dash", isActive && "is-active")} aria-hidden="true" />
          <span className={cn("svc-name", isActive && "is-active")}>{level.name}</span>
          <span className={cn("svc-watch", isActive && "is-active")}>
            <Play aria-hidden="true" />
            Watch
            {level.duration ? <em>{level.duration}</em> : null}
          </span>
        </span>
        <span className="svc-tier">{level.tier}</span>
        <span className="svc-summary">{level.summary}</span>
      </button>
    </li>
  );
}
