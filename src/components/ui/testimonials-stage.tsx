"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The referral form was straightforward, and I knew exactly what would happen next. The updates made the whole process feel organized from start to finish.",
    name: "Maya Chen",
    role: "Commercial property manager",
    program: "Customer referral",
    image: "/images/reviews/maya-chen.png",
  },
  {
    quote:
      "I sent over a customer lead between appointments. The team followed up quickly and kept me in the loop without me having to chase anyone.",
    name: "Daniel Brooks",
    role: "Local business owner",
    program: "Customer referral",
    image: "/images/reviews/daniel-brooks.png",
  },
  {
    quote:
      "The worker referral path is clear about what experience matters and what happens after submission. That made it easy to recommend someone I trust.",
    name: "Alicia Johnson",
    role: "Winter operations lead",
    program: "Worker referral",
    image: "/images/reviews/alicia-johnson.png",
  },
  {
    quote:
      "Everything—from the program rules to the referral status—was easy to find. It felt like a real process, not a form disappearing into an inbox.",
    name: "Marcus Reed",
    role: "Equipment operator",
    program: "Worker referral",
    image: "/images/reviews/marcus-reed.png",
  },
] as const;

export function TestimonialsStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % testimonials.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const select = (index: number) => setActive(index);
  const previous = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((active + 1) % testimonials.length);
  const review = testimonials[active];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-heading">
        <div>
          <p className="section-kicker">Referral stories</p>
          <h2>Good connections.<br />Real follow-through.</h2>
        </div>
        <p>
          One stage, one story at a time. See how a simple introduction can create a better outcome for customers and workers.
        </p>
      </div>

      <div
        className="testimonial-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="testimonial-stage-top">
          <span>Featured review</span>
          <span>{String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={review.name}
            className="testimonial-feature"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
          >
            <div className="testimonial-copy">
              <Quote className="testimonial-quote-icon" aria-hidden="true" />
              <div className="testimonial-stars" aria-label="Five-star review">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" />)}
              </div>
              <blockquote>“{review.quote}”</blockquote>
              <div className="testimonial-person">
                <strong>{review.name}</strong>
                <span>{review.role}</span>
                <em>{review.program}</em>
              </div>
            </div>

            <div className="testimonial-portrait">
              <Image src={review.image} alt={`${review.name}, ${review.role}`} fill sizes="(max-width: 760px) 90vw, 42vw" />
              <span>{review.program}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="testimonial-controls">
          <div className="testimonial-selectors" role="tablist" aria-label="Choose a testimonial">
            {testimonials.map((testimonial, index) => (
              <button
                type="button"
                key={testimonial.name}
                className={index === active ? "is-active" : ""}
                onClick={() => select(index)}
                aria-label={`Show review from ${testimonial.name}`}
                aria-selected={index === active}
                role="tab"
              >
                <Image src={testimonial.image} alt="" width={44} height={44} />
                <span>{testimonial.name}</span>
              </button>
            ))}
          </div>

          <div className="testimonial-arrows">
            <button type="button" onClick={previous} aria-label="Previous review"><ArrowLeft /></button>
            <button type="button" onClick={next} aria-label="Next review"><ArrowRight /></button>
          </div>
        </div>

        <div className="testimonial-progress" aria-hidden="true">
          <motion.span key={active} initial={{ scaleX: 0 }} animate={{ scaleX: paused ? 0 : 1 }} transition={{ duration: 6, ease: "linear" }} />
        </div>
      </div>
    </section>
  );
}
