"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICE_NOTES, WORK_CARDS } from "@/lib/service-content";

const pad = (value: number) => String(value).padStart(2, "0");

/* Heading, then the benefits, then the cards dealing out from the left. */
const RISE = (amount: number) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } });
const ROW: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const CELL: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

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
        <motion.div className="work-scroll-head" {...RISE(0.4)}>
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
        </motion.div>

        <motion.ul className="work-scroll-benefits" aria-label="Position benefits" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={ROW}>
          {SERVICE_NOTES.map(({ icon: Icon, title }) => (
            <motion.li key={title} variants={CELL}><Icon aria-hidden="true" />{title}</motion.li>
          ))}
        </motion.ul>

        <motion.ul className="work-scroll-track" ref={trackRef} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={ROW}>
          {WORK_CARDS.map((item, index) => (
            <motion.li className="work-scroll-card" key={item.slug} variants={CELL}>
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
            </motion.li>
          ))}
        </motion.ul>
        <motion.p className="work-scroll-hint" {...RISE(0.8)}>Scroll to see all {WORK_CARDS.length} positions</motion.p>
      </div>
    </section>
  );
}
