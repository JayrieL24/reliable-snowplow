"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICE_NOTES, WORK_CARDS } from "@/lib/service-content";

const pad = (value: number) => String(value).padStart(2, "0");

export function ServicesShowcase() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollCards = (direction: number) => {
    const track = trackRef.current;
    const firstCard = track?.querySelector<HTMLElement>(".work-scroll-card");
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 18;
    track.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="work-scroll-section" id="services" aria-labelledby="work-scroll-title">
      <div className="work-scroll-inner">
        <div className="work-scroll-head">
          <div>
            <p className="clean-kicker">Winter positions</p>
            <h2 id="work-scroll-title">The work we&apos;re <em>hiring for.</em></h2>
          </div>
          <div className="work-scroll-intro">
            <p>Browse the open roles, find the right fit, and refer someone directly to that position.</p>
            <div className="work-scroll-arrows" aria-label="Scroll job cards">
              <button type="button" onClick={() => scrollCards(-1)} aria-label="Scroll to previous positions"><ArrowLeft aria-hidden="true" /></button>
              <button type="button" onClick={() => scrollCards(1)} aria-label="Scroll to next positions"><ArrowRight aria-hidden="true" /></button>
            </div>
          </div>
        </div>

        <ul className="work-scroll-benefits" aria-label="Position benefits">
          {SERVICE_NOTES.map(({ icon: Icon, title }) => (
            <li key={title}><Icon aria-hidden="true" />{title}</li>
          ))}
        </ul>

        <ul className="work-scroll-track" ref={trackRef}>
          {WORK_CARDS.map((item, index) => (
            <li className="work-scroll-card" key={item.slug}>
              <div className="work-scroll-image">
                <Image src={item.image} alt={`${item.name} working with Reliable`} fill sizes="(max-width: 640px) 84vw, (max-width: 1100px) 46vw, 390px" style={{ objectPosition: item.focus }} />
                <span>{pad(index + 1)} / {pad(WORK_CARDS.length)}</span>
              </div>
              <div className="work-scroll-body">
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
                <ul>
                  {item.why.split(" · ").map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                <a href={`/refer-a-worker?position=${item.slug}#referral-form`}>
                  Refer someone for this role <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="work-scroll-hint">Scroll to see all {WORK_CARDS.length} positions</p>
      </div>
    </section>
  );
}
