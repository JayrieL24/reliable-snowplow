"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export type JobCard = { slug: string; title: string; image: string; focus: string; tag: string; line: string };

const GRID: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const ITEM: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
};

/* Job openings photo cards. The first `shown` cards fade up in turn as the grid scrolls into
   view; "See all" opens the rest in place, and each card's Refer a worker button scrolls to the referral form with the role picked. */
export function JobOpeningsGrid({ jobs, shown }: { jobs: JobCard[]; shown: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? jobs : jobs.slice(0, shown);

  return (
    <>
      <motion.ul id="job-cards" className="jobs-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={GRID}>
        <AnimatePresence initial={false}>
          {visible.map((job, i) => (
            <motion.li
              key={job.slug}
              variants={ITEM}
              initial={i >= shown ? "hidden" : undefined}
              animate={i >= shown ? "show" : undefined}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
            >
              <a className="job-card" href="#referral-form" onClick={() => window.dispatchEvent(new CustomEvent("worker-referral-position", { detail: job.slug }))}>
                <span className="job-card-media">
                  <Image src={job.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectPosition: job.focus }} />
                  <span className="job-card-tag">{job.tag}</span>
                </span>
                <span className="job-card-body">
                  <span className="job-card-text"><strong>{job.title}</strong>{job.line}</span>
                  <span className="job-card-apply">Refer a worker <ArrowRight aria-hidden="true" /></span>
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {jobs.length > shown && (
        <div className="jobs-all">
          <button
            type="button"
            className={`cvid-outline jobs-toggle${expanded ? " is-open" : ""}`}
            aria-expanded={expanded}
            aria-controls="job-cards"
            onClick={() => setExpanded((open) => !open)}
          >
            {expanded ? "Show fewer positions" : `See all ${jobs.length} positions`} <ChevronDown aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
