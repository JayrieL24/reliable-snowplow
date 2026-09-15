"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { CUSTOMER_FACTS as FACTS, RELIABLE_PHONE as PHONE, SECTORS } from "@/lib/referral-content";

const pad = (n: number) => String(n).padStart(2, "0");
/* Pins on desktops and tall phones with room for the full vehicle photo.
   Tablets and shorter phones use the swipeable row so taller media cannot trap content.
   It deliberately ignores prefers-reduced-motion: the track only moves while the
   reader scrolls, and Windows reports "reduce" whenever animation effects are
   switched off, which would otherwise disable the carousel. */
const PIN_QUERY = "(min-width: 900px) and (min-height: 560px), (max-width: 480px) and (min-height: 800px)";
/* Page scroll per pixel of sideways travel. Below 1 the track moves faster than
   the page, so eight wide cards don't cost six screens of scrolling. */
const SCROLL_RATIO = 0.5;
/* Share of the remaining distance the track covers each frame while pinned, so it
   glides after every wheel notch rather than jumping. */
const EASE = 0.1;
/* Max sideways drift (px) of each photo inside its frame as its card crosses the screen. */
// Kept within the 5% zoom's slack (~13px each side on a 530px column) so no edge shows.
const PARALLAX = 12;

/* Home feature 1: commercial image showcase as a scroll-driven carousel.

   Wide screens without reduced motion: the section pins to the viewport and page
   scroll moves the card track sideways. The wrapper is made one viewport plus the
   track's overflow (scaled by SCROLL_RATIO) tall, so the last card lands as the
   pin releases. Everywhere else (phones, short windows, reduced motion, before
   hydration) it is a plain swipeable scroll-snap row. */
export function CommercialShowcase() {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const pinnedRef = useRef(false);
  const distanceRef = useRef(0);
  const [pinned, setPinned] = useState(false);
  // 0 is the overview card; 1..n are the sector cards.
  const [active, setActive] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!outer || !viewport || !track) return;

    const mq = window.matchMedia(PIN_QUERY);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    // Smoothed track position while pinned; `snap` jumps straight to the target (first paint, resize).
    let current = 0;
    let snap = true;

    const paint = (shift: number, progress: number) => {
      outer.style.setProperty("--showcase-progress", progress.toFixed(4));
      const width = viewport.clientWidth;
      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      let index = 0;
      cards.forEach((card, i) => {
        const left = card.offsetLeft - shift;
        // Active card: the last one whose left edge has passed 30% of the viewport.
        if (left <= width * 0.3) index = i;
        const rel = Math.max(-1, Math.min(1, (left + card.offsetWidth / 2 - width / 2) / width));
        card.style.setProperty("--parallax", `${reduceMotion.matches ? 0 : (-rel * PARALLAX).toFixed(1)}px`);
      });
      if (progress > 0.995) index = cards.length - 1;
      setActive(index);
    };

    const update = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (pinnedRef.current) {
        const distance = distanceRef.current;
        const scrollLength = distance * SCROLL_RATIO;
        const target = scrollLength ? Math.min(1, Math.max(0, -outer.getBoundingClientRect().top / scrollLength)) * distance : 0;
        const diff = target - current;
        if (snap || reduceMotion.matches || Math.abs(diff) < 0.5) {
          current = target;
          snap = false;
        } else {
          current += diff * EASE;
          frame = requestAnimationFrame(update);
        }
        track.style.transform = `translate3d(${-current}px, 0, 0)`;
        paint(current, distance ? current / distance : 0);
      } else {
        const max = viewport.scrollWidth - viewport.clientWidth;
        paint(viewport.scrollLeft, max > 0 ? viewport.scrollLeft / max : 0);
      }
    };

    const measure = () => {
      const pin = mq.matches;
      pinnedRef.current = pin;
      setPinned(pin);
      if (pin) {
        // Travel until the last card's right edge, plus the track's side padding, meets the viewport edge.
        const cards = track.querySelectorAll<HTMLElement>("[data-card]");
        const last = cards[cards.length - 1];
        const endPadding = parseFloat(getComputedStyle(track).paddingRight) || 0;
        const trackEnd = last ? last.offsetLeft + last.offsetWidth + endPadding : track.scrollWidth;
        distanceRef.current = Math.max(0, Math.ceil(trackEnd - viewport.clientWidth));
        outer.style.height = `${window.innerHeight + distanceRef.current * SCROLL_RATIO}px`;
      } else {
        distanceRef.current = 0;
        outer.style.height = "";
        track.style.transform = "";
      }
      snap = true;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    /* The pinned CSS (e.g. wider phone cards) only applies after React re-renders
       with data-pinned, and web fonts can shift widths too, so re-measure whenever
       the track's size actually changes. measure() only sets the wrapper height and
       the track transform, neither of which resizes the track, so this can't loop. */
    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      outer.style.height = "";
      track.style.transform = "";
    };
  }, []);

  /* Brings card `index` into place: by scrolling the page while pinned, or the
     row itself otherwise. */
  const goTo = (index: number, smooth = true) => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>("[data-card]")[index];
    if (!outer || !viewport || !track || !card) return;
    const x = card.offsetLeft - (parseFloat(getComputedStyle(track).paddingLeft) || 0);
    const behavior: ScrollBehavior =
      smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto";
    if (pinnedRef.current) {
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + Math.min(x, distanceRef.current) * SCROLL_RATIO, behavior });
    } else {
      viewport.scrollTo({ left: x, behavior });
    }
  };

  // Keyboard users tabbing into an off-screen card while pinned.
  const onCardFocus = (index: number) => {
    if (pinnedRef.current) goTo(index, false);
  };

  return (
    <section className="showcase-section" id="properties" aria-labelledby="showcase-title">
      <div ref={outerRef} className="showcase-pin" data-pinned={pinned ? "true" : undefined}>
        <div className="showcase-sticky">
          <div className="showcase-head">
            <div>
              <p className="clean-kicker">Commercial focus</p>
              <h2 id="showcase-title">
                The properties we <em>protect.</em>
              </h2>
            </div>
            <div className="showcase-aside">
              <p>From hospitals to trucking terminals, these are the commercial customers Reliable is looking for, from single sites to entire portfolios.</p>
              <p className="showcase-count" aria-hidden="true">
                {active === 0 ? (
                  "Overview"
                ) : (
                  <>
                    {pad(active)} <span>/ {pad(SECTORS.length)}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div
            ref={viewportRef}
            className="showcase-viewport"
            role="region"
            aria-roledescription="carousel"
            aria-label="Commercial properties we protect"
          >
            <ol ref={trackRef} className="showcase-track">
              <li data-card className="showcase-intro" onFocus={() => onCardFocus(0)}>
                <p className="clean-kicker">Refer a commercial customer</p>
                <p className="showcase-intro-title">Earn 5% on every commercial referral, up to $3,000.</p>
                <dl>
                  {FACTS.map((fact) => (
                    <div key={fact.term}>
                      <dt>{fact.term}</dt>
                      <dd>{fact.text}</dd>
                    </div>
                  ))}
                </dl>
                <p className="showcase-hint" aria-hidden="true">
                  Keep scrolling to explore <ArrowRight />
                </p>
              </li>

              {SECTORS.map((sector, i) => (
                <li
                  key={sector.slug}
                  data-card
                  className="showcase-card"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${SECTORS.length}: ${sector.name}`}
                  onFocus={() => onCardFocus(i + 1)}
                >
                  <div className="showcase-media">
                    <Image src={sector.image} alt="" fill sizes="(max-width: 899px) 86vw, 540px" style={{ objectPosition: sector.focus }} />
                    <span className="showcase-num">
                      {pad(i + 1)} / {pad(SECTORS.length)}
                    </span>
                  </div>

                  <div className="showcase-body">
                    <div className="showcase-title">
                      <h3>{sector.name}</h3>
                      <p className="showcase-detail">{sector.detail}</p>
                    </div>
                    <div className="showcase-why-block">
                      <p className="showcase-label">Why it matters</p>
                      <p className="showcase-why">{sector.why}</p>
                    </div>
                    <div className="showcase-services-block">
                      <p className="showcase-label">Services</p>
                      <ul className="showcase-services">
                        {sector.services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="showcase-foot">
                      <p className="showcase-fee">
                        <strong>5%</strong> referral fee, up to $3,000
                      </p>
                      <div className="showcase-actions">
                        {/* Opens the customer page with this property type preselected in the form. */}
                        <a className="section-cta showcase-cta" href={`/refer-a-customer?property=${sector.slug}#referral-form`}>
                          Refer {/^[aeiou]/i.test(sector.cta) ? "an" : "a"} {sector.cta} <ArrowRight aria-hidden="true" />
                        </a>
                        <a className="showcase-call" href={PHONE.href} aria-label={`Call Reliable ${PHONE.label}`}>
                          <Phone aria-hidden="true" /> <span>Call {PHONE.label}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="showcase-rail">
            <div className="showcase-bar" aria-hidden="true">
              <span />
            </div>
            <ol className="showcase-steps" aria-label="Jump to a property type">
              {SECTORS.map((sector, i) => (
                <li key={sector.slug}>
                  <button type="button" aria-current={active === i + 1 ? "true" : undefined} onClick={() => goTo(i + 1)}>
                    <span>{pad(i + 1)}</span>
                    {sector.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
