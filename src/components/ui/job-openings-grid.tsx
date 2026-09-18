"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowRight, ChevronDown, X } from "lucide-react";

export type JobCard = { slug: string; title: string; image: string; focus: string; tag: string; line: string; perks: string[] };

const GRID: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const ITEM: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
};

/** Phones only: the compact cards open a role in a modal rather than jumping straight to the form. */
const PHONE_QUERY = "(max-width: 560px)";

/** Tells the referral form below which role was picked. */
const pickRole = (slug: string) => window.dispatchEvent(new CustomEvent("worker-referral-position", { detail: slug }));

/* Job openings photo cards. The first `shown` cards fade up in turn as the grid scrolls into
   view; "See all" opens the rest in place, and each card's Refer a worker button scrolls to the referral form with the role picked.

   On phones the cards are compact — a thumbnail beside the role name — so the section stays
   short, and tapping one opens the role in a modal with its photo, perks and the referral
   button. On every wider screen the card is the link it has always been. */
export function JobOpeningsGrid({ jobs, shown }: { jobs: JobCard[]; shown: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isPhone, setIsPhone] = React.useState(false);
  const [openJob, setOpenJob] = React.useState<JobCard | null>(null);
  const closeButton = React.useRef<HTMLButtonElement>(null);
  const visible = expanded ? jobs : jobs.slice(0, shown);

  React.useEffect(() => {
    const query = window.matchMedia(PHONE_QUERY);
    const sync = () => setIsPhone(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The modal belongs to the phone layout; if the window grows, it closes with it.
  React.useEffect(() => {
    if (!isPhone) setOpenJob(null);
  }, [isPhone]);

  React.useEffect(() => {
    if (!openJob) return;
    closeButton.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenJob(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openJob]);

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
              <a
                className="job-card"
                href="#referral-form"
                aria-haspopup={isPhone ? "dialog" : undefined}
                onClick={(event) => {
                  if (isPhone) {
                    event.preventDefault();
                    setOpenJob(job);
                    return;
                  }
                  pickRole(job.slug);
                }}
              >
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

      {openJob && (
        <div className="preview-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpenJob(null)}>
          <section className="job-modal-card" role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
            <button ref={closeButton} className="preview-modal-close" type="button" onClick={() => setOpenJob(null)} aria-label="Close">
              <X aria-hidden="true" />
            </button>

            <span className="job-modal-media">
              <Image src={openJob.image} alt="" fill sizes="100vw" style={{ objectPosition: openJob.focus }} />
            </span>

            <div className="job-modal-body">
              <p className="job-modal-tag">{openJob.tag}</p>
              <h3 id="job-modal-title">{openJob.title}</h3>
              <p className="job-modal-line">{openJob.line}</p>
              <ul className="job-modal-perks">
                {openJob.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <a
                className="section-cta"
                href="#referral-form"
                onClick={() => {
                  pickRole(openJob.slug);
                  setOpenJob(null);
                }}
              >
                Refer a worker <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
