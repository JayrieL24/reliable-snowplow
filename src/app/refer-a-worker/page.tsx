import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowDown, ArrowRight, Clock3, ArrowUpRight, BadgeDollarSign, CalendarCheck, Check, CheckCircle2, GraduationCap, HardHat, Infinity as InfinityIcon, Mail, MapPin, MessageSquareText, Phone, UserPlus, Users } from "lucide-react";
import { ComingSoonModal } from "@/components/ui/coming-soon";
import { WorkerReferralForm } from "@/components/ui/worker-referral-form";
import { FaqSection } from "@/components/ui/faq-section";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { ShareKit } from "@/components/ui/share-kit";
import { SiteFooter } from "@/components/ui/site-footer";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { JOB_CARDS, JOB_CARDS_SHOWN, POSITIONS, SFU_PHONE, WINTER_WORKERS_WANTED, WORKER_FAQS } from "@/lib/worker-content";
import { JobOpeningsGrid } from "@/components/ui/job-openings-grid";
import { PayComparisonSlider } from "@/components/ui/pay-comparison-slider";

export const metadata: Metadata = {
  title: "Refer a Worker | Snowplow Referrals",
  description: "Refer a snow fighter to Reliable Snow Plowing and earn $1.00 for every hour they work, indefinitely.",
  alternates: { canonical: "/refer-a-worker" },
};

const reveal = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } };
/* The first section after the hero fades and rises into place, as on Refer a Customer. */
const revealRise = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } };

/* The next day pay video. The client's own program walkthrough isn't recorded yet, so this
   video stands in for it. TODO: swap in the walkthrough once it exists. */
const NDP_VIDEO = { youtubeId: "oWfCgCu-XPY", title: "Next day pay at Reliable", thumbnail: "/images/next-day-pay-video-thumb.jpg" };

/* Beside the program video: links down to the sections that cover each topic in full, so the
   rail works as a short menu instead of repeating their copy. */
const VIDEO_LINKS = [
  { icon: BadgeDollarSign, title: "Compensation", stat: "$1.00", unit: "per hour", href: "#compensation",
    text: "Earned on every hour your referral works, for as long as they stay." },
  { icon: HardHat, title: "Open positions", stat: String(POSITIONS.length), unit: "winter roles", href: "#job-openings",
    text: "Shovelers, operators, drivers and more. Some need no experience." },
  { icon: CalendarCheck, title: "Next day pay", stat: "1 day", unit: "to payday", href: "#next-day-pay",
    text: "Every position is paid the day after the shift, not every two weeks." },
];

/* Compensation: how a referral turns into $1.00 an hour. */
const PAY_STEPS = [
  { icon: UserPlus, title: "You refer a snow fighter", text: "Send their details through the referral form below." },
  { icon: HardHat, title: "They join Reliable", text: "The team reaches out and places them in a role." },
  { icon: BadgeDollarSign, title: "You earn every hour", text: "$1.00 for each hour they work, with no end date." },
];

/* Square edits of the work photos keep the job grid's framing and lighting consistent. */
const jobCards = JOB_CARDS.map(({ slug, tag, line }) => {
  const { title, perks } = POSITIONS.find((p) => p.slug === slug)!;
  return { slug, title, image: `/images/work/jobs/${slug}.webp`, focus: "50% 50%", tag, line, perks };
});

/* Referring Workers page, one section per item in the client's outline (see
   "Snowplow referral site changelist.md"): program video, compensation,
   job openings, 40 year logo, next day pay, info sharing, affiliate enrollment, top questions
   for workers, and click to call SFU. The easy application form. */
export default function ReferAWorkerPage() {
  return (
    <>
      <SceneNavbar />
      <main className="page-content">
        <section className="page-hero page-hero-full page-hero-worker" id="top" aria-labelledby="page-hero-title">
          <Image className="scene-background" src="/images/hero/winter-scene-v2.webp" alt="" fill priority sizes="100vw" />
          <div className="scene-shade" aria-hidden="true" />
          <Image className="page-hero-truck" src="/images/hero/reliable-plow.webp" alt="" width={1536} height={1024} priority />

          <div className="page-hero-copy">
            <p className="scene-kicker">Worker referral program</p>
            <h1 id="page-hero-title">Refer a snow fighter. <em>Earn $1/hr.</em></h1>
            <p>Know someone ready for winter work? Earn $1.00 for every hour they work, indefinitely, while they get next day pay close to home.</p>
            <div className="scene-actions">
              <a className="scene-primary" href="#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
              <a className="scene-secondary" href="#job-openings"><span className="wk-cta-full">See open positions</span><span className="wk-cta-short">Open positions</span> <ArrowRight aria-hidden="true" /></a>
            </div>
            <dl className="page-hero-stats">
              <div><dt>$1/hr</dt><dd>for every hour they work</dd></div>
              <div><dt>{POSITIONS.length}</dt><dd>open positions</dd></div>
              <div><dt>1 day</dt><dd>to payday</dd></div>
              <div><dt>50</dt><dd>satellite locations</dd></div>
            </dl>
          </div>
        </section>

        {/* 1. Video of me explaining the program: heading on top, then the video with a rail of
            links to the sections below and the call button beside it. */}
        <motion.section className="wvid" id="program-video" aria-labelledby="work-video-title" {...revealRise}>
          <div className="wvid-head">
            <p className="clean-kicker">Program video</p>
            <h2 id="work-video-title">Hear how worker referrals <em>work.</em></h2>
          </div>
          <div className="wvid-body">
            <div className="wvid-media">
              <VideoLightbox {...NDP_VIDEO} caption="Watch: Next day pay" note="Worker program walkthrough coming soon" />
            </div>
            <div className="wvid-rail">
              <p className="wvid-rail-label">On this page</p>
              <ol className="wvid-points">
                {VIDEO_LINKS.map(({ icon: Icon, ...link }, i) => (
                  <li key={link.href}>
                    <a href={link.href}>
                      <span className="wvid-icon" aria-hidden="true"><Icon /></span>
                      <span className="wvid-link-text">
                        <span className="wvid-link-meta">{String(i + 1).padStart(2, "0")} · {link.title}</span>
                        <span className="wvid-link-desc">{link.text}</span>
                        <span className="wvid-link-jump">Jump to section <ArrowDown aria-hidden="true" /></span>
                      </span>
                      <span className="wvid-link-stat"><strong>{link.stat}</strong>{link.unit}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="wvid-actions">
                <a className="section-cta" href="#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Compensation structure: $1.00 per hour worked, indefinitely, as a bento in the style of
            the home page's program blocks (kicker, large heading, lede, round icon points, orange
            section button). */}
        <motion.section className="cust-section wrk-pay" id="compensation" aria-labelledby="work-pay-title" {...reveal}>
          <div className="pay-bento">
            <article className="pay-main program-copy-block">
              <p className="clean-kicker">Compensation structure</p>
              <h2 id="work-pay-title">$1.00 per hour worked, <em>indefinitely.</em></h2>
              <p className="program-lede">For every hour your referred snow fighter works, for as long as they keep working with Reliable.</p>
              <ul className="program-points">
                {PAY_STEPS.map(({ icon: Icon, title, text }) => (
                  <li key={title}><Icon aria-hidden="true" /><span><strong>{title}</strong>{text}</span></li>
                ))}
              </ul>
              <a className="section-cta" href="#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
            </article>

            <article className="pay-fact pay-fact-featured">
              <BadgeDollarSign aria-hidden="true" />
              <p className="pay-fact-figure">$1.00</p>
              <strong>Per hour they work</strong>
              <span>Paid to you for every hour your referred snow fighter works for Reliable.</span>
              <ul className="pay-fact-ticks">
                <li><CheckCircle2 aria-hidden="true" /> Every hour counts</li>
                <li><CheckCircle2 aria-hidden="true" /> Credited as an affiliate</li>
              </ul>
            </article>

            <article className="pay-fact">
              <InfinityIcon aria-hidden="true" />
              <p className="pay-fact-figure">No end date</p>
              <strong>Season after season</strong>
              <span>Keep earning for as long as they keep working with Reliable.</span>
              <ul className="pay-fact-ticks">
                <li><CheckCircle2 aria-hidden="true" /> Not capped at one season</li>
                <li><CheckCircle2 aria-hidden="true" /> Adds up every winter</li>
              </ul>
            </article>

            <a className="pay-next" href="#job-openings">
              <span className="pay-next-copy">
                <HardHat aria-hidden="true" />
                <span><strong>Find the right role for them</strong>{POSITIONS.length} winter positions, for first-timers and seasoned operators.</span>
              </span>
              <span className="section-cta pay-next-cta">See open positions <ArrowDown aria-hidden="true" /></span>
            </a>
          </div>
        </motion.section>

        {/* 3. Job openings: centered heading and call button, six photo cards that fade up in turn,
            each with a Refer a worker button, then a link to every position. */}
        <motion.section className="cust-section wrk-jobs" id="job-openings" aria-labelledby="work-jobs-title" {...reveal}>
          <div className="jobs-head">
            <p className="clean-kicker">Job openings</p>
            <h2 id="work-jobs-title">Snow fighters <em>wanted.</em></h2>
            <p>{POSITIONS.length} positions this winter, for first-timers and seasoned operators. Pick the one that fits the person you&apos;re referring.</p>
            <a className="section-cta" href="#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
          </div>

          <JobOpeningsGrid jobs={jobCards} shown={JOB_CARDS_SHOWN} />
        </motion.section>

        {/* 40 year logo, as a trust strip with the reasons snow fighters choose Reliable. */}
        <motion.section className="wrk-legacy" id="forty-years" aria-labelledby="work-legacy-title" {...reveal}>
          <div className="wrk-legacy-inner">
            <Image className="wrk-legacy-logo" src="/images/reliable-40-year-logo.png" alt="Reliable Snow Plowing, 40+ years since 1986" width={3000} height={720} sizes="260px" />
            <div className="wrk-legacy-copy">
              <p className="clean-kicker">Family owned for 40 winters</p>
              <h2 id="work-legacy-title">Plowing Ohio <em>since 1986.</em></h2>
              <p>Family owned and operated for four decades. The snow fighters you refer join a team with a proven track record, not a seasonal startup.</p>
              <ul className="wrk-legacy-ticks">
                <li><CheckCircle2 aria-hidden="true" /> Proven Autopilot system</li>
                <li><CheckCircle2 aria-hidden="true" /> Never more than 15 min away</li>
                <li><CheckCircle2 aria-hidden="true" /> Safety first</li>
              </ul>
            </div>
            <dl className="wrk-legacy-stats">
              <div><dt>40+</dt><dd>Winters<span>Since 1986</span></dd></div>
              <div><dt>50</dt><dd>Locations<span>Across Ohio</span></dd></div>
              <div><dt>{POSITIONS.length}</dt><dd>Roles<span>Open this winter</span></dd></div>
            </dl>
          </div>
        </motion.section>

        {/* 4. Next day pay: a before/after slider of the same photo, dull for a typical pay cycle and
            bright for Reliable, with the pay strips on each side. */}
        <motion.section className="cust-section wrk-ndp" id="next-day-pay" aria-labelledby="work-ndp-title" {...reveal}>
          <div className="ndp-head">
            <Image className="wrk-ndp-graphic" src="/images/next-day-pay-graphic.png" alt="Next day pay" width={482} height={53} />
            <h2 id="work-ndp-title">Paid the day after <em>you work.</em></h2>
            <p>Most winter jobs make you wait for a weekly or biweekly check. At Reliable, every position is paid the next day, so a long storm pays off right away.</p>
          </div>
          <PayComparisonSlider image="/images/about/snow-fighter-shoveling.png" alt="A smiling Reliable snow fighter shoveling during a night snowfall" />
          <ul className="ndp-ticks">
            <li><CheckCircle2 aria-hidden="true" /> Paid the day after every shift</li>
            <li><CheckCircle2 aria-hidden="true" /> Storm hours show up right away</li>
            <li><CheckCircle2 aria-hidden="true" /> Every position, from shovelers to operators</li>
          </ul>
        </motion.section>

        {/* 5. Affiliate marketing: effective info sharing, as a tabbed composer for a text, an email
            and a social post. */}
        <motion.section className="cust-section work-share" id="share" aria-labelledby="work-share-title" {...reveal}>
          <ShareKit>
            <p className="clean-kicker">Effective info sharing</p>
            <h2 id="work-share-title">Share Reliable with <em>your friends.</em></h2>
            <p className="program-lede">Pick a ready-made message, add your name, and send it to anyone who might want winter work.</p>
          </ShareKit>
        </motion.section>

        {/* Easy application form (retcondev's). Every referral CTA on the page points here. */}
        <motion.section className="cust-section cust-form" id="referral-form" aria-labelledby="work-form-title" {...reveal}>
          <div className="cust-form-copy">
            <p className="clean-kicker">Easy application form</p>
            <h2 id="work-form-title">Refer a snow fighter in <em>a few minutes.</em></h2>
            <p>Tell us who you are, who you&apos;re referring and the role they&apos;d fit. Here&apos;s what happens next:</p>
            <ol className="cust-form-steps">
              <li><span>1</span><div><strong>Automatic confirmation</strong>You get a reply confirming your referral arrived.</div></li>
              <li><span>2</span><div><strong>Program details</strong>A short PDF, 2 to 5 pages, explains how the program works.</div></li>
              <li><span>3</span><div><strong>Contact within one business day</strong>The team reaches out and takes it from there.</div></li>
            </ol>
            <p className="work-form-earn"><Clock3 aria-hidden="true" /> Earn $1.00 for every hour they work, indefinitely.</p>
          </div>
          <WorkerReferralForm />
        </motion.section>

        {/* Affiliates and the FAQ share one tree background, laid on this wrapper so it runs
            unbroken from one section into the next. */}
        <div className="wrk-tree-band">
          {/* 6. Affiliate marketing: adding affiliates and enrollment for marketing, as a short
              public "what happens next". The internal system (Zoho) is not named on the page. */}
          <motion.section className="cust-section wrk-affiliate" id="affiliates" aria-labelledby="work-affiliate-title" {...reveal}>
            <div className="cust-head">
              <div>
                <p className="clean-kicker">After you refer</p>
                <h2 id="work-affiliate-title">You become a Reliable <em>affiliate.</em></h2>
              </div>
              <p>Every referrer is added to Reliable&apos;s affiliate list, so your referrals are tracked and you can choose how you hear from us.</p>
            </div>
            <ol className="wrk-affiliate-grid">
              <li><span className="wrk-affiliate-icon"><Users aria-hidden="true" /></span><strong>Added to the affiliate list</strong><p>Your details and the people you refer are recorded, so every hour they work is credited to you.</p></li>
              <li><span className="wrk-affiliate-icon"><Mail aria-hidden="true" /></span><strong>Email updates</strong><p>Opt in when you refer to get program news and open positions by email.</p></li>
              <li><span className="wrk-affiliate-icon"><MessageSquareText aria-hidden="true" /></span><strong>Text message campaigns</strong><p>Opt in to text alerts when Reliable is hiring before a storm.</p></li>
            </ol>
          </motion.section>

          {/* 7. Top questions for workers. */}
          <FaqSection
            className="wrk-faq"
            items={WORKER_FAQS}
            eyebrow="Worker FAQ"
            heading={<>Top questions <em>from workers.</em></>}
            intro="Answers to what snow fighters ask most about experience, pay, shifts and where Reliable works."
          />
        </div>

        {/* 8. Elements: click to call SFU and the Winter Workers Wanted link, running into the
            footer on one shared tree background. */}
        <div className="cta-footer-band">
          <motion.section className="cust-cta" id="call-sfu" aria-labelledby="work-cta-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <div className="cust-cta-inner">
              <div className="cust-cta-copy">
                <p className="clean-kicker">Click to call SFU</p>
                <h2 id="work-cta-title">Questions about a <em>role?</em></h2>
                <p>Send a referral through the form, call SFU at {SFU_PHONE.label}, or see every open position on Winter Workers Wanted.</p>
              </div>
              <div className="cust-cta-actions">
                <a className="section-cta cust-cta-button" href="#referral-form">
                  Refer a worker <ArrowRight aria-hidden="true" />
                </a>
                <a className="scene-secondary cust-cta-secondary" href={SFU_PHONE.href}>
                  Call SFU {SFU_PHONE.label} <Phone aria-hidden="true" />
                </a>
                <a className="scene-secondary cust-cta-secondary" href={WINTER_WORKERS_WANTED} target="_blank" rel="noopener noreferrer">
                  WinterWorkersWanted.com <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.section>

          <SiteFooter />
        </div>
        <ComingSoonModal />
      </main>
    </>
  );
}
