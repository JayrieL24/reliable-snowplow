import type { Metadata } from "next";
import * as motion from "motion/react-client";
import { ArrowRight, BookOpen, Phone } from "lucide-react";
import { ComingSoonModal } from "@/components/ui/coming-soon";
import { FaqSection } from "@/components/ui/faq-section";
import { GuideBook } from "@/components/ui/guide-book";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { GUIDE_CHAPTERS, GUIDE_FAQS } from "@/lib/worker-guide";
import { SFU_PHONE } from "@/lib/worker-content";

export const metadata: Metadata = {
  title: "Worker Guide | Snowplow Referrals",
  description: "The Worker Referral Program Guide: how referring a snow fighter works, earning $1 for every hour, positions, next day pay, safety and the program's rules.",
  alternates: { canonical: "/worker-guide" },
};

/* The hero is on screen already, so its parts are dealt in on load. The copy block turns into
   display:contents once it stacks, so each child carries its own animation. */
const enter = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } });
const reveal = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } };

// Module-level, so the 3D book gets the same array on every render and doesn't repaint.
const CHAPTER_TITLES = GUIDE_CHAPTERS.map((chapter) => chapter.title);

const pad = (n: number) => String(n).padStart(2, "0");

/* The Worker Referral Program Guide: a full-screen hero that is the guide itself, an interactive 3D
   book (it opens into a detail view with the download and actions),
   the chapter structure, then a call to SFU and the guide's FAQ on one continuous light band. */
export default function WorkerGuidePage() {
  return (
    <>
      <SceneNavbar />
      <main className="page-content" id="top">
        {/* Hero: the guide itself, a 3D book that opens into a detail view with the download. It keeps
            id="guide-book", which the book looks itself up by when a link to #open-guide opens it. */}
        <section className="guide-showcase guide-hero" id="guide-book" aria-labelledby="page-hero-title">
          <div className="guide-showcase-copy">
            <motion.nav className="page-crumbs" aria-label="Breadcrumb" {...enter(0)}>
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Worker guide</span>
            </motion.nav>
            <motion.p className="clean-kicker" {...enter(0.06)}>The guide</motion.p>
            <motion.h1 id="page-hero-title" {...enter(0.12)}>Know the program before you <em>refer.</em></motion.h1>
            <motion.p {...enter(0.2)}>Rules, rates and roles in one short guide, written for referrers and the snow fighters they send to Reliable.</motion.p>
            <motion.div className="scene-actions" {...enter(0.28)}>
              {/* Straight to the referral form page with the worker form selected. */}
              <a className="scene-primary" href="/refer-a-worker">Explore worker referrals <ArrowRight aria-hidden="true" /></a>
              <a className="scene-secondary" href={SFU_PHONE.href}><Phone aria-hidden="true" /> Call SFU {SFU_PHONE.label}</a>
            </motion.div>
            {/* The program's headline terms, all from the client's changelist. */}
            <motion.dl className="guide-hero-terms" {...enter(0.36)}>
              <div><dt>$1.00</dt><dd>For every hour they work</dd></div>
              <div><dt>1 day</dt><dd>From shift to payday</dd></div>
              <div><dt>All levels</dt><dd>First-timers to operators</dd></div>
            </motion.dl>
          </div>
          <GuideBook chapters={CHAPTER_TITLES} />
        </section>

        {/* The guide's structure: one compact card per chapter, and a last card back to the book.
            DRAFT until the client's PDF arrives. */}
        <motion.section className="guide-contents" id="contents" aria-labelledby="guide-contents-title" {...reveal}>
          <div className="section-intro">
            <p className="clean-kicker">What&apos;s inside</p>
            <h2 id="guide-contents-title">{GUIDE_CHAPTERS.length} chapters, <em>one clear guide.</em></h2>
            <p>Read it before you refer, and share it with the snow fighters you send to Reliable.</p>
          </div>
          <ol className="guide-chapters">
            {GUIDE_CHAPTERS.map((chapter, i) => (
              <li key={chapter.title}>
                <span className="guide-chapter-num" aria-hidden="true">{pad(i + 1)}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.summary}</p>
              </li>
            ))}
            <li className="guide-chapters-cta">
              <BookOpen aria-hidden="true" />
              <h3>Read it in full</h3>
              <a href="#open-guide">Open the guide <ArrowRight aria-hidden="true" /></a>
            </li>
          </ol>
        </motion.section>

        {/* Call to SFU and the guide's FAQ, on one light band with the snowy edges. */}
        <div className="closing-band guide-closing">
          <motion.section className="guide-help" id="guide-questions" aria-labelledby="guide-help-title" {...reveal}>
            <div className="guide-help-copy">
              <p className="clean-kicker">Still have questions?</p>
              <h2 id="guide-help-title">More questions about <em>the guide?</em></h2>
              <p>SFU can walk you through any chapter, or help you refer a snow fighter today.</p>
            </div>
            <div className="guide-help-actions">
              <a className="sfu-call" href={SFU_PHONE.href}>
                <span className="sfu-call-icon" aria-hidden="true"><Phone /></span>
                <span className="sfu-call-text"><small>Call SFU</small><strong>{SFU_PHONE.label}</strong></span>
              </a>
              <a className="section-cta" href="/refer-a-worker#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
            </div>
          </motion.section>

          <FaqSection
            items={GUIDE_FAQS}
            eyebrow="Guide FAQ"
            heading={<>Questions about the <em>worker guide.</em></>}
            intro="Straight answers about the guide: when it's available, who it's for, and where to go when it doesn't cover your question."
          />
        </div>

        <SiteFooter />
        <ComingSoonModal />
      </main>
    </>
  );
}
