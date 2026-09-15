"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SECTORS, article } from "@/lib/referral-content";

const INTERVAL_MS = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

/* Refer a Customer page slideshow: a tab list of the seven property types beside a large
   crossfading photo stage with a glass detail card. Advances every 6s, pauses while hovered
   or focused, and stays put for reduced-motion users. The card's CTA preselects the sector
   in the referral form (see CustomerReferralForm). */
export function CustomerSectorGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % SECTORS.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  const sector = SECTORS[index];

  return (
    <div
      className="cust-gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="cust-gallery-tabs" role="tablist" aria-label="Property types">
        {SECTORS.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            id={`cust-tab-${item.slug}`}
            aria-selected={i === index}
            aria-controls="cust-gallery-panel"
            className={i === index ? "is-active" : undefined}
            onClick={() => setIndex(i)}
          >
            <span>{pad(i + 1)}</span>
            {item.name}
            {i === index && !reducedMotion ? (
              <i key={index} className="cust-gallery-progress" data-paused={paused ? "true" : undefined} aria-hidden="true" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="cust-gallery-stage" id="cust-gallery-panel" role="tabpanel" aria-labelledby={`cust-tab-${sector.slug}`}>
        {SECTORS.map((item, i) => (
          <Image
            key={item.slug}
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 70vw"
            className={i === index ? "is-active" : undefined}
            priority={i === 0}
          />
        ))}
        <div className="cust-gallery-card">
          <p className="cust-gallery-count">
            {pad(index + 1)} / {pad(SECTORS.length)}
          </p>
          <h3>{sector.name}</h3>
          <p>{sector.detail}</p>
          <p className="cust-gallery-why">{sector.why}</p>
          <ul>
            {sector.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
          <a
            className="scene-primary"
            href="#referral-form"
            onClick={() => window.dispatchEvent(new CustomEvent("customer-referral-property", { detail: sector.slug }))}
          >
            Refer {article(sector.cta)} {sector.cta} <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
