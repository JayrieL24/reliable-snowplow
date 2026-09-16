"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, CheckCircle2, FileText, HardHat, PhoneCall, Send, Truck } from "lucide-react";
import { RELIABLE_PHONE } from "@/lib/referral-content";

/* What a referrer can send us, as the tiles a cursor picks from. */
const REFER_TILES = [
  { icon: Building2, label: "A commercial site" },
  { icon: Truck, label: "A trucking terminal" },
  { icon: HardHat, label: "A snow fighter" },
];
const TILE_MS = 2600;
const PAGE_MS = 3900;
const BADGE_MS = 2200;
/* Skeleton line widths (%) inside the PDF mock. */
const PDF_LINES = [64, 46, 72, 38];
const RINGS = [0, 1, 2, 3, 4, 5, 6];
const SPRING = { type: "spring", stiffness: 230, damping: 24 } as const;

/* Steps through 0..length-1 on a timer, and sits still for readers who asked for
   less motion: all three panels loop on their own, unprompted. */
function useLoop(length: number, ms: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms]);
  return index;
}

/* Home feature 4: the referral process as a bento of three panels, each with its own
   looping artwork above the copy. Light band on purpose, so it reads as its own
   section rather than a continuation of the navy company story above it. */
export function ProcessBento() {
  return (
    <motion.section
      className="bento-section"
      id="process"
      aria-labelledby="bento-title"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-intro">
        <p className="clean-kicker">How referrals work</p>
        <h2 id="bento-title">A clear, straightforward <em>process.</em></h2>
        <p>Two short forms, one guide to read, and an answer from a person. No chasing, no paperwork to fill in twice.</p>
      </div>

      <div className="bento-grid">
        <IntroPanel />
        <DetailsPanel />
        <CallPanel />
      </div>
    </motion.section>
  );
}

/* 01: the things you can refer, with a cursor moving between them. */
function IntroPanel() {
  const active = useLoop(REFER_TILES.length, TILE_MS);

  return (
    <article className="bento-panel bento-panel-wide">
      <div className="bento-art" aria-hidden="true">
        <span className="bento-grid-lines" />
        <div className="bento-tiles">
          {REFER_TILES.map(({ icon: Icon, label }, i) => (
            <span key={label} className="bento-tile-slot">
              <em className="bento-tile-label">{label}</em>
              <motion.span
                className={i === active ? "bento-tile is-active" : "bento-tile"}
                animate={{ y: i === active ? -6 : 0, scale: i === active ? 1.04 : 1 }}
                transition={SPRING}
              >
                <Icon />
              </motion.span>
              {/* One cursor, moved between slots by the shared layout id. */}
              {i === active && (
                <motion.span className="bento-cursor" layoutId="bento-cursor" transition={SPRING}>
                  <svg viewBox="0 0 26 30" aria-hidden="true">
                    <path d="M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z" strokeWidth="2.1" strokeLinejoin="round" />
                  </svg>
                  <em>You</em>
                </motion.span>
              )}
            </span>
          ))}
        </div>

        {/* Lands again on every pick: the auto-reply the copy promises. */}
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            className="bento-receipt"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <CheckCircle2 />
            <span>
              <strong>Referral received</strong>
              <em>Auto-reply sent</em>
            </span>
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="bento-copy">
        <span className="bento-step">
          <Send aria-hidden="true" /> 01
        </span>
        <h3>Make the introduction</h3>
        <p>Refer a commercial customer or a snow fighter. You&apos;ll get an automatic reply confirming it arrived.</p>
        <ul className="bento-points">
          <li><CheckCircle2 aria-hidden="true" /> Their name and how to reach them</li>
          <li><CheckCircle2 aria-hidden="true" /> The property, or the person you&apos;d vouch for</li>
          <li><CheckCircle2 aria-hidden="true" /> About two minutes, start to finish</li>
        </ul>
      </div>

      <em className="bento-ghost" aria-hidden="true">01</em>
    </article>
  );
}

/* 02: the program PDF, sliding up a page at a time. */
function DetailsPanel() {
  const page = useLoop(2, PAGE_MS);

  return (
    <article className="bento-panel bento-panel-mid">
      <div className="bento-art" aria-hidden="true">
        <span className="bento-dots" />
        <div className="bento-pdf-stage">
          {/* Two stubs behind the live page, so it reads as a short document. */}
          <span className="bento-pdf-back bento-pdf-back-two" />
          <span className="bento-pdf-back bento-pdf-back-one" />
          <AnimatePresence initial={false}>
            <motion.div
              key={page}
              className="bento-pdf"
              initial={{ y: 200, opacity: 0, rotate: -1.4 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 210, opacity: 0, rotate: 1.2 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="bento-pdf-head">
                <FileText /> Referral program guide <em>{page + 1} / 2</em>
              </p>
              <span className="bento-pdf-rule" />
              <span className="bento-pdf-fee">
                <strong>5%</strong> referral fee, up to $3,000
              </span>
              {PDF_LINES.map((width, i) => (
                <span key={i} className="bento-pdf-line" style={{ width: `${width}%` }} />
              ))}
              <p className="bento-pdf-foot">
                <CheckCircle2 /> Sent as soon as you refer
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="bento-chip">PDF &middot; 2 to 5 pages</span>
      </div>

      <div className="bento-copy">
        <span className="bento-step">
          <FileText aria-hidden="true" /> 02
        </span>
        <h3>Get the program details</h3>
        <p>We send a short PDF, 2 to 5 pages, explaining how the referral program works.</p>
        <a className="bento-cta" href="#resources">
          See the program guide <ArrowRight aria-hidden="true" />
        </a>
      </div>

      <em className="bento-ghost" aria-hidden="true">02</em>
    </article>
  );
}

/* 03: the callback badge, lighting up inside its rings. */
function CallPanel() {
  const lit = useLoop(2, BADGE_MS) === 0;

  return (
    <article className="bento-panel bento-panel-narrow">
      <div className="bento-art" aria-hidden="true">
        <div className="bento-dial">
          {RINGS.map((ring) => (
            <span key={ring} className="bento-ring" style={{ "--r": ring } as CSSProperties} />
          ))}
          <span className={lit ? "bento-badge is-lit" : "bento-badge"}>
            <PhoneCall /> Within 1 business day
          </span>
        </div>
        <span className="bento-chip bento-chip-call">
          <span className="bento-chip-dot" /> Reliable &middot; {RELIABLE_PHONE.label}
        </span>
      </div>

      <div className="bento-copy">
        <span className="bento-step">
          <PhoneCall aria-hidden="true" /> 03
        </span>
        <h3>Hear from us within one business day</h3>
        <p>The team reaches out within one business day and takes it from there.</p>
      </div>

      <em className="bento-ghost" aria-hidden="true">03</em>
    </article>
  );
}
