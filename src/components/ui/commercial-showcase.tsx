"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, Building2, Gift, ShieldCheck, Zap } from "lucide-react";
import { SECTORS } from "@/lib/referral-content";

const pad = (n: number) => String(n).padStart(2, "0");
/* Cards kept visible behind the front one; anything deeper in the deck stays hidden. */
const DEPTH = 3;
/* Fanned angles by depth, so the deck looks hand-stacked rather than machine-aligned. */
const TILT = [0, 4.5, -3.5, 6.5];
const AUTOPLAY_MS = 5200;
/* Sideways travel (px) before a drag counts as a swipe. */
const SWIPE = 45;

/* Facts floated beside the deck, from the client's value statements. */
const NOTES = [
  { icon: Gift, title: "5% referral fee", text: "For each entity you refer, up to $3,000." },
  { icon: Building2, title: "Single sites to portfolios", text: "One partner across every property you send us." },
  { icon: Zap, title: "15 minutes away", text: "Crews are never farther from the sites they protect.", accent: true },
  { icon: ShieldCheck, title: "40 years of winters", text: "A proven system behind every storm, across Ohio." },
];

/* Home feature 1: commercial image showcase as a deck of photos.

   The front card carries the copy beside it; the rest fan out behind it. Forward, the
   front card flies off and the deck steps up; backward, the card that left comes back
   from the same side. The photos are shown at their own 3:4, so nothing is cropped. */
export type ShowcaseItem = { name: string; slug: string; detail: string; why: string; image: string; focus: string };
type ShowcaseNote = { icon: LucideIcon; title: string; text: string; accent?: boolean };

type ShowcaseProps = {
  id?: string;
  items?: ShowcaseItem[];
  kicker?: string;
  heading?: ReactNode;
  aside?: ReactNode;
  notes?: ShowcaseNote[];
  /** Used in the arrow labels and the carousel's accessible name. */
  noun?: string;
  cta?: (item: ShowcaseItem) => { href: string; label: ReactNode; external?: boolean };
  /** Landscape cards, for photo sets that are wider than they are tall. */
  landscape?: boolean;
  /** Heading above the second paragraph in the copy panel. */
  whyLabel?: string;
};

const DEFAULT_CTA = (item: ShowcaseItem) => {
  const sector = SECTORS.find((s) => s.slug === item.slug);
  const noun = sector?.cta ?? item.name;
  return { href: `/refer-a-customer?property=${item.slug}#property-types`, label: <>Refer {/^[aeiou]/i.test(noun) ? "an" : "a"} {noun}</> };
};

export function CommercialShowcase({
  id = "properties",
  items = SECTORS,
  kicker = "Commercial focus",
  heading = <>The properties we <em>protect.</em></>,
  aside = <>From hospitals to trucking terminals, these are the commercial customers Reliable is looking for, <em>from single sites to entire portfolios.</em></>,
  notes = NOTES,
  noun = "property type",
  cta = DEFAULT_CTA,
  landscape = false,
  whyLabel = "Why it matters",
}: ShowcaseProps = {}) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  // Auto-advance runs until the reader takes over, and then stays off.
  const [engaged, setEngaged] = useState(false);
  const activeRef = useRef(0);
  const dragRef = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      const current = activeRef.current;
      const next = (current + dir + count) % count;
      activeRef.current = next;
      setLeaving(current);
      setDirection(dir);
      setActive(next);
    },
    [count],
  );

  const step = (dir: number) => {
    setEngaged(true);
    go(dir);
  };

  useEffect(() => {
    if (engaged) return;
    // Auto-advance is motion nobody asked for, so readers who asked for less don't get it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [engaged, go]);

  const onPointerDown = (e: ReactPointerEvent<HTMLUListElement>) => {
    dragRef.current = e.clientX;
  };
  const onPointerUp = (e: ReactPointerEvent<HTMLUListElement>) => {
    const start = dragRef.current;
    dragRef.current = null;
    if (start === null) return;
    const travel = e.clientX - start;
    if (Math.abs(travel) >= SWIPE) step(travel < 0 ? 1 : -1);
  };

  const sector = items[active];

  /* Rendered twice: beside the copy on wide layouts, under the deck once it stacks.
     Only ever one of them is displayed, so neither is reachable twice. */
  const arrows = (className: string) => (
    <div className={className}>
      <button type="button" onClick={() => step(-1)} aria-label={`Previous ${noun}`}>
        <ArrowLeft aria-hidden="true" />
      </button>
      <button type="button" onClick={() => step(1)} aria-label={`Next ${noun}`}>
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <section className={landscape ? "showcase-section showcase-landscape" : "showcase-section"} id={id} aria-labelledby={`${id}-title`}>
      <div className="showcase-inner">
        <div className="showcase-head">
          <div>
            <p className="clean-kicker">{kicker}</p>
            <h2 id={`${id}-title`}>{heading}</h2>
          </div>
          <div className="showcase-aside">
            <p>{aside}</p>
          </div>
        </div>

        <div className="showcase-stage" role="group" aria-roledescription="carousel" aria-label={`${kicker}: ${noun} carousel`}>
          <div className="showcase-deck">
            <ul className="showcase-stack" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (dragRef.current = null)}>
              {items.map((item, i) => {
                const depth = (i - active + count) % count;
                const isFront = depth === 0;
                // Only a forward step throws a card out; stepping back walks it home again.
                const isLeaving = direction === 1 && i === leaving && !isFront;
                const deck = {
                  x: Math.min(depth, DEPTH) * 18,
                  y: Math.min(depth, DEPTH) * 12,
                  rotate: TILT[Math.min(depth, DEPTH)],
                  scale: 1 - Math.min(depth, DEPTH) * 0.05,
                  opacity: depth > DEPTH ? 0 : 1,
                };
                const entry =
                  direction === 1
                    ? { x: [34, 0], y: [14, 0], rotate: [TILT[1], 0], scale: [0.95, 1], opacity: 1 }
                    : { x: [-165, 0], y: [-16, 0], rotate: [-8, 0], scale: [0.88, 1], opacity: 1 };
                const exit = { x: -170, y: -18, rotate: -9, scale: 0.86, opacity: 0 };
  
                return (
                  <motion.li
                    key={item.slug}
                    className="showcase-card"
                    aria-hidden={!isFront}
                    style={{ zIndex: isLeaving ? count + 1 : count - depth }}
                    initial={false}
                    animate={isFront ? entry : isLeaving ? exit : deck}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={item.image} alt={isFront ? `${item.name}: a Reliable crew clearing snow` : ""} fill sizes="(max-width: 899px) 86vw, 530px" style={{ objectPosition: item.focus }} />
                    {isFront && (
                      <span className="showcase-num">
                        {pad(i + 1)} / {pad(count)}
                      </span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
            {arrows("showcase-arrows showcase-arrows-deck")}
          </div>

          <div className="showcase-panel">
            <p className="showcase-count" aria-hidden="true">
              {pad(active + 1)} <span>/ {pad(count)}</span>
            </p>
            {/* Keyed, so the copy remounts and fades straight in. An exit animation would
                leave the block blank while the counter and button had already changed. */}
            <motion.div key={sector.slug} className="showcase-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
              <h3>{sector.name}</h3>
              <p className="showcase-detail">{sector.detail}</p>
              <p className="showcase-label">{whyLabel}</p>
              <p className="showcase-why">{sector.why}</p>
            </motion.div>

            <div className="showcase-controls">
              {(() => {
                const { href, label, external } = cta(sector);
                return (
                  <a className="section-cta showcase-cta" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {label} <ArrowRight aria-hidden="true" />
                  </a>
                );
              })()}
              {arrows("showcase-arrows")}
            </div>
            {/* Screen readers get the change announced; the counter above is decorative. */}
            <p className="showcase-live" aria-live="polite">
              {active + 1} of {count}: {sector.name}
            </p>
          </div>

          <aside className="showcase-notes">
            <ul>
              {notes.map(({ icon: Icon, title, text, accent }, i) => (
                <motion.li
                  key={title}
                  className={accent ? "showcase-note showcase-note-accent" : "showcase-note"}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="showcase-note-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
