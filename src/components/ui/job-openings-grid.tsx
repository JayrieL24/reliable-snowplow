"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowRight, ChevronDown, X } from "lucide-react";

export type JobCard = { slug: string; title: string; image: string; focus: string; tag: string; line: string; perks: string[] };

const GRID: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const ITEM: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
};

/* Wherever the card is the full-bleed photograph - everything up to 1191px, see globals.css - it
   carries no button of its own, so tapping it opens the role in a modal with its perks and the
   referral button. Above that the card has its own body and button and links straight to the form.
   Kept in step with that breakpoint. */
const COMPACT_QUERY = "(max-width: 1191px)";

/* Small screens carry only the tag that opens a role up to anyone; the rest would crowd a
   half-width card without telling a referrer much. Matched on the wording rather than the slug so a
   reworded "No experience required" still qualifies. */
const opensToAnyone = (tag: string) => /^no experience/i.test(tag);

/** Tells the referral form below which role was picked. */
const pickRole = (slug: string) => window.dispatchEvent(new CustomEvent("worker-referral-position", { detail: slug }));

/* Job openings photo cards. The first `shown` cards fade up in turn as the grid scrolls into
   view; "See all" opens the rest in place, and each card's Refer a worker button scrolls to the referral form with the role picked.

   Up to 1191px each card is the photograph itself, two to a row, with the role name over its foot;
   tapping one opens the role in a modal with its perks and the referral button. Above that the card
   is the link it has always been, with its own body and button. */
export function JobOpeningsGrid({ jobs, shown }: { jobs: JobCard[]; shown: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isCompact, setIsCompact] = React.useState(false);
  const [openJob, setOpenJob] = React.useState<JobCard | null>(null);
  const closeButton = React.useRef<HTMLButtonElement>(null);
  const visible = expanded ? jobs : jobs.slice(0, shown);

  React.useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY);
    const sync = () => setIsCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The modal belongs to the full-bleed layout; if the window grows past it, it closes with it.
  React.useEffect(() => {
    if (!isCompact) setOpenJob(null);
  }, [isCompact]);

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
                aria-haspopup={isCompact ? "dialog" : undefined}
                onClick={(event) => {
                  if (isCompact) {
                    event.preventDefault();
                    setOpenJob(job);
                    return;
                  }
                  pickRole(job.slug);
                }}
              >
                <span className="job-card-media">
                  <Image src={job.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw" style={{ objectPosition: job.focus }} />
                  {/* The open-to-anyone tag is two elements so the red can frame a white face: the
                      outer is the red plate, the inner the white one sitting inside it. */}
                  {opensToAnyone(job.tag) ? (
                    <span className="job-card-tag job-card-tag-open"><span>{job.tag}</span></span>
                  ) : (
                    <span className="job-card-tag">{job.tag}</span>
                  )}
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

      {/* At the document root: a position:fixed scrim is only fixed to the viewport when no ancestor
          carries a transform, filter or contain, and this grid is inside sections motion animates. */}
      {openJob && createPortal(
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
        </div>,
        document.body,
      )}
    </>
  );
}
