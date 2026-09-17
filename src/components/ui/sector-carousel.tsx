"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";
import { SECTORS, article } from "@/lib/referral-content";

const INTERVAL_MS = 6000;
const COUNT = SECTORS.length;
/** Where the middle copy of the list starts (see ITEMS). */
const START = COUNT;

const pad = (n: number) => String(n).padStart(2, "0");
const wrap = (n: number) => ((n % COUNT) + COUNT) % COUNT;

/* Three copies of the property list, with the deck parked in the middle one. The carousel
   draws a plain rail, so without the copies the first and last property would have empty
   space beside them — very visible now the deck floats on the section with no panel behind
   it. Because the copies are identical, stepping back to the middle one is invisible. */
const ITEMS = Array.from({ length: COUNT * 3 }, (_, i) => {
  const sector = SECTORS[wrap(i)];
  return { src: sector.card, title: sector.name, alt: `${sector.name}: ${sector.detail}` };
});

/**
 * Slides are sized off the deck's width, so a sensible number are in frame at any size.
 *
 * Once the layout stacks, the deck and the copy underneath it have to share one screen, so
 * the card is capped against the viewport height as well — the deck's own height follows the
 * card (see .cust-carousel-deck), and a card sized purely by width would push the copy off
 * the bottom on a phone.
 */
function useSlideWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = React.useState(240);

  React.useEffect(() => {
    const deck = ref.current;
    if (!deck) return;

    const measure = () => {
      const deckWidth = deck.getBoundingClientRect().width;
      if (!deckWidth) return;

      const stacked = deckWidth < 760;
      // Peek layout: the active card takes most of the deck, neighbours are cut off at its edges.
      const byWidth = deckWidth * (stacked ? 0.74 : 0.58);
      // Cards are 3:4, so a card allowed 34% of the screen's height is .75 of that wide.
      const byHeight = stacked ? window.innerHeight * 0.34 * 0.75 : Infinity;

      setWidth(Math.round(Math.max(160, Math.min(byWidth, byHeight, 460))));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(deck);
    // A ResizeObserver on the deck never sees the viewport get shorter on its own.
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return width;
}

/**
 * Refer a Customer slideshow: the client's seven property types as a perspective carousel
 * floating on the section, with the active one written out underneath.
 *
 * Advances every 6s, pauses while hovered or focused, and holds still for reduced-motion
 * users. A `?property=<slug>` query (the home page's commercial showcase links in that way)
 * opens the deck on that property.
 */
export function SectorCarousel() {
  /** Index into ITEMS. `slide` walks freely; `index` is the property it lands on. */
  const [slide, setSlide] = React.useState(START);
  const [snap, setSnap] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const deck = React.useRef<HTMLDivElement>(null);
  const slideWidth = useSlideWidth(deck);
  const index = wrap(slide);

  React.useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const slug = new URLSearchParams(window.location.search).get("property");
    const requested = SECTORS.findIndex((sector) => sector.slug === slug);
    if (requested >= 0) {
      setSlide(START + requested);
      setPaused(true);
    }
  }, []);

  /* Once the deck has walked out of the middle copy, step back to the matching slide in it.
     The jump is made with the animation switched off, and every copy is identical, so
     nothing moves on screen. */
  React.useEffect(() => {
    if (slide >= START && slide < START + COUNT) return;
    const timer = window.setTimeout(() => {
      setSnap(true);
      setSlide(START + wrap(slide));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [slide]);

  React.useEffect(() => {
    if (!snap) return;
    const frame = window.requestAnimationFrame(() => setSnap(false));
    return () => window.cancelAnimationFrame(frame);
  }, [snap]);

  React.useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => setSlide((s) => s + 1), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [slide, paused, reducedMotion]);

  /** Moves to a property by the shorter way round, rather than back through the list. */
  const goTo = (target: number) => {
    let delta = target - index;
    if (delta > COUNT / 2) delta -= COUNT;
    if (delta < -COUNT / 2) delta += COUNT;
    setSlide((s) => s + delta);
  };

  const sector = SECTORS[index];

  return (
    <div
      className="cust-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="cust-carousel-main">
      {/* The deck floats on the section: no panel behind it, its edges dissolved by a mask
          rather than cut by a box (see .cust-carousel-deck). */}
      <div className="cust-carousel-deck" ref={deck} style={{ "--pcar-slide": `${slideWidth}px` } as React.CSSProperties}>
        <PerspectiveCarousel
          items={ITEMS}
          activeIndex={slide}
          onActiveIndexChange={setSlide}
          slideWidth={slideWidth}
          rotationStep={0}
          inactiveScale={1}
          showControls={false}
          transition={snap || reducedMotion ? { duration: 0 } : undefined}
          aria-label="Commercial property types"
        />
      </div>

      {/* The carousel's own controls page through all 21 slides; these page through the
          seven properties, which is what the dots need to count. */}
      <div className="cust-carousel-controls">
        <button
          type="button"
          className="cust-carousel-arrow"
          aria-label="Show previous property"
          onClick={() => setSlide((s) => s - 1)}
        >
          <ChevronLeft aria-hidden="true" />
        </button>

        <div className="cust-carousel-dots">
          {SECTORS.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              className={i === index ? "cust-carousel-dot is-active" : "cust-carousel-dot"}
              aria-label={`Show ${item.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="cust-carousel-arrow"
          aria-label="Show next property"
          onClick={() => setSlide((s) => s + 1)}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
      </div>

      <div className="cust-carousel-detail" aria-live="polite">
        <p className="cust-carousel-count">
          {pad(index + 1)} <span aria-hidden="true">/</span> {pad(COUNT)}
        </p>
        <h3>{sector.name}</h3>
        <p className="cust-carousel-lede">{sector.detail}</p>
        <p className="cust-carousel-why">{sector.why}</p>
        <ul>
          {sector.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <a className="scene-primary" href="#referral-form">
          Refer {article(sector.cta)} {sector.cta} <ArrowRight aria-hidden="true" />
        </a>
        <p className="cust-carousel-note">Use the form below and Reliable takes it from there.</p>
      </div>
    </div>
  );
}
