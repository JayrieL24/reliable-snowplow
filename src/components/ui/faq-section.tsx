"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/* The heading arrives first, then the questions follow it down the list. */
const HEAD = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.4 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } };
const LIST: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const ITEM: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export type FaqItem = { id: string; q: string; a: React.ReactNode };

/** Answers are drawn from the figures already published on this page
 *  ($200 / 24 hrs / $0 / 2 min) so nothing here contradicts the rest of it. */
const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "how",
    q: "How do I refer someone?",
    a: "Send their name and the best way to reach them. That's it—no account, no forms to chase. It takes about two minutes, and it costs you nothing to refer.",
  },
  {
    id: "who",
    q: "Who can I refer?",
    a: "Two kinds of people: a property owner or manager who needs dependable snow removal, or an experienced operator looking for winter work. Both count, and both pay the same.",
  },
  {
    id: "approved",
    q: "What counts as an approved referral?",
    a: "A referral is approved once we've made contact, confirmed the work is a fit, and the job is signed. Referring someone we're already in conversation with doesn't qualify—the full rules are in the program overview.",
  },
  {
    id: "paid",
    q: "When do I get paid, and how much?",
    a: "$200 per approved referral, paid after the job completes. Rates are published rather than negotiated, so what you see here is what you get.",
  },
  {
    id: "followup",
    q: "What happens after I send one?",
    a: "Our team follows up within 24 hours. You'll get an update when we make contact, when the referral qualifies, and when the reward is approved—so you're never left guessing.",
  },
  {
    id: "limit",
    q: "Is there a limit on how many I can send?",
    a: "No cap. Each referral is assessed on its own, and each approved one pays out at the same published rate.",
  },
];

export function FaqSection({
  items = DEFAULT_FAQS,
  eyebrow = "Questions",
  heading,
  intro,
  className,
}: {
  items?: FaqItem[];
  eyebrow?: string;
  heading?: React.ReactNode;
  intro?: string;
  className?: string;
}) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);

  return (
    <section className={cn("faq", className)} id="faq">

      <div className="faq-inner">
        <motion.div className="faq-copy" {...HEAD}>
          <p className="faq-eyebrow">{eyebrow}</p>
          <h2>{heading ?? <>Answers before<br />you send one.</>}</h2>
          {intro ? <p className="faq-intro">{intro}</p> : null}
        </motion.div>

        <motion.ul className="faq-list" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={LIST}>
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.li key={item.id} className={cn("faq-item", isOpen && "is-open")} variants={ITEM}>
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <Plus />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${item.id}`}
                  className="faq-a"
                  role="region"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
