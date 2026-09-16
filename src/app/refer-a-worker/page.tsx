import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowRight, ArrowUpRight, BadgeDollarSign, Building2, CalendarCheck, Clock3, MapPin, Megaphone, PhoneCall, ShieldCheck, UserPlus } from "lucide-react";
import { ComingSoonModal } from "@/components/ui/coming-soon";
import { FaqSection } from "@/components/ui/faq-section";
import { PositionReferButton } from "@/components/ui/position-refer-button";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { ShareKit } from "@/components/ui/share-kit";
import { SiteFooter } from "@/components/ui/site-footer";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { WorkerReferralForm } from "@/components/ui/worker-referral-form";
import { POSITIONS, SFU_PHONE, WINTER_WORKERS_WANTED, WORKER_FAQS } from "@/lib/worker-content";

export const metadata: Metadata = {
  title: "Refer a Worker | Snowplow Referrals",
  description: "Refer a snow fighter to Reliable Snow Plowing and earn $1.00 for every hour they work, indefinitely.",
  alternates: { canonical: "/refer-a-worker" },
};

const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } };
const pad = (n: number) => String(n).padStart(2, "0");

/* Referring Workers page, per the client's outline: program video, selling proposition
   (commercial imagery, $1/hr compensation, job openings, 40-year logo, next day pay), easy
   application form, link to Winter Workers Wanted, next day pay video, click to call the
   hiring line, affiliate sharing and top questions for workers. */
export default function ReferAWorkerPage() {
  return (
    <>
      <SceneNavbar />
      <main className="page-content">
        <section className="page-hero" id="top" aria-labelledby="page-hero-title">
          <Image className="scene-background" src="/images/hero/winter-road-night.jpg" alt="" fill priority sizes="100vw" />
          <div className="scene-shade" aria-hidden="true" />
          <Image className="page-hero-truck" src="/images/hero/reliable-plow.webp" alt="" width={1536} height={1024} priority />
          <div className="work-hero-badge">
            <Image src="/images/reliable-40-year-logo.png" alt="Reliable Snow Plowing, 40+ years since 1986" width={3000} height={720} />
          </div>

          <motion.div className="page-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="scene-kicker">Worker referral program</p>
            <h1 id="page-hero-title">Refer a snow fighter. <em>Earn $1/hr.</em></h1>
            <p>Know someone ready for winter work? Earn $1.00 for every hour they work, indefinitely, while they get next day pay close to home.</p>
            <div className="scene-actions">
              <a className="scene-primary" href="#referral-form">Start a referral <ArrowRight aria-hidden="true" /></a>
              <a className="scene-secondary" href="#job-openings">See open positions <ArrowRight aria-hidden="true" /></a>
            </div>
            <dl className="page-hero-stats">
              <div><dt>$1/hr</dt><dd>for every hour worked</dd></div>
              <div><dt>Next day</dt><dd>pay for all positions</dd></div>
              <div><dt>15 min</dt><dd>from home</dd></div>
              <div><dt>50</dt><dd>satellite locations</dd></div>
            </dl>
          </motion.div>
        </section>

        {/* Video of me explaining the program. TODO: swap for the client's program video once
            it's recorded; the next day pay video (also listed under Elements) stands in. */}
        <motion.section className="cust-video" id="program-video" aria-labelledby="work-video-title" {...reveal}>
          <p className="clean-kicker">Program video</p>
          <h2 id="work-video-title">Hear how the worker referral program <em>works.</em></h2>
          <p>A personal walkthrough of referring snow fighters, and why next day pay makes Reliable an easy yes.</p>
          <VideoLightbox youtubeId="oWfCgCu-XPY" title="Next day pay at Reliable" thumbnail="/images/next-day-pay-video-thumb.jpg" caption="Watch: Next day pay" note="Program walkthrough coming soon" />
        </motion.section>

        {/* Selling proposition for workers. */}
        <motion.section className="cust-section work-why" id="why-reliable" aria-labelledby="work-why-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Why snow fighters choose Reliable</p>
              <h2 id="work-why-title">An easy yes for the <em>people you refer.</em></h2>
            </div>
            <p>What you earn for the referral, and what the snow fighters you refer get from working with Reliable.</p>
          </div>

          <div className="work-bento">
            <article className="work-tile work-tile-pay">
              <p className="cust-term-label">Compensation structure</p>
              <p className="work-tile-big">$1.00</p>
              <h3>Per hour worked, indefinitely</h3>
              <p>For every hour your referred snow fighter works, for as long as they work with Reliable.</p>
              <BadgeDollarSign className="work-tile-mark" aria-hidden="true" />
            </article>

            <article className="work-tile work-tile-photo">
              <Image src="/images/work/salt-truck.png" alt="Reliable salt truck clearing a commercial lot" fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectPosition: "15% 60%" }} />
              <div className="work-tile-caption"><Building2 aria-hidden="true" /><span><strong>Commercial work</strong>Hospitals, retail, distribution and more.</span></div>
            </article>

            <article className="work-tile work-tile-ndp">
              <Image className="work-ndp-graphic" src="/images/next-day-pay-graphic.png" alt="Next day pay" width={482} height={53} />
              <h3>Paid the day after you work</h3>
              <p>Next day pay for all positions, from shovelers to operators.</p>
              <span className="work-tile-icon"><CalendarCheck aria-hidden="true" /></span>
            </article>

            <article className="work-tile work-tile-logo">
              <Image src="/images/reliable-40-year-logo.png" alt="40+ years since 1986" width={3000} height={720} />
              <h3>A 40-year track record</h3>
              <p>Family owned and plowing Ohio since 1986, with a proven Autopilot system.</p>
            </article>

            <article className="work-tile work-tile-value">
              <span className="work-tile-icon"><ShieldCheck aria-hidden="true" /></span>
              <h3>Safety throughout Ohio</h3>
              <p>Help keep commercial properties, roads and communities safer all winter.</p>
            </article>

            <article className="work-tile work-tile-value">
              <span className="work-tile-icon"><BadgeDollarSign aria-hidden="true" /></span>
              <h3>Seasonal income</h3>
              <p>Winter work provides seasonal income, with next day pay for every position.</p>
            </article>

            <article className="work-tile work-tile-near">
              <span className="work-tile-icon"><MapPin aria-hidden="true" /></span>
              <h3>Work close to home</h3>
              <p>50 satellite locations across Ohio, so snow fighters work within 15 minutes of home.</p>
            </article>
          </div>
        </motion.section>

        {/* Job openings: "Snow Fighters Wanted" positions and the winter worker list. */}
        <motion.section className="cust-section work-positions" id="job-openings" aria-labelledby="work-positions-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Job openings</p>
              <h2 id="work-positions-title">Snow fighters <em>wanted.</em></h2>
            </div>
            <div className="work-positions-aside">
              <p>Some roles need no experience and some need plenty. Find the right fit for the person you&apos;re referring.</p>
              <div className="work-positions-links">
                <a className="section-cta section-cta-dark" href="#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
                {/* "Access the winter worker list" from the client's outline. */}
                <a className="section-cta" href={WINTER_WORKERS_WANTED} target="_blank" rel="noopener noreferrer">View the winter worker list <ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>

          <ul className="work-position-grid">
            {POSITIONS.map((position, i) => (
              <li key={position.slug} className="work-position">
                <div className="work-position-media">
                  <Image src={position.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectPosition: position.focus }} />
                  <span className="showcase-num">{pad(i + 1)} / {pad(POSITIONS.length)}</span>
                </div>
                <div className="work-position-body">
                  <h3>{position.title}</h3>
                  <ul>
                    {position.perks.map((perk) => <li key={perk}>{perk}</li>)}
                  </ul>
                  <PositionReferButton slug={position.slug} />
                </div>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Easy application form (preview). */}
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

        {/* Affiliate sharing: ready-made email and text (changelist discussion points). */}
        <motion.section className="cust-section work-share" id="share" aria-labelledby="work-share-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Spread the word</p>
              <h2 id="work-share-title">Share Reliable with <em>your friends.</em></h2>
            </div>
            <p>Copy a ready-made email or text, add your name, and send it to anyone who might want winter work.</p>
          </div>
          <ShareKit />

          {/* Affiliate marketing information from the client's outline: adding affiliates to
              Zoho, and enrolling for extra marketing. DRAFT — needs client review; neither the
              changelist nor winterworkerswanted.com spells the actual steps out. */}
          <div className="affiliate-steps">
            <h3>Becoming a Reliable affiliate</h3>
            <ul>
              <li>
                <span className="affiliate-icon"><UserPlus aria-hidden="true" /></span>
                <strong>Added to the affiliate system</strong>
                <p>Send your first referral and Reliable adds you as an affiliate in Zoho, so every referral is tracked to your name and the hours behind your payouts stay in one place.</p>
              </li>
              <li>
                <span className="affiliate-icon"><Megaphone aria-hidden="true" /></span>
                <strong>Enroll for extra marketing</strong>
                <p>Tick the email and text boxes on the referral form above and Reliable can send you ready-made material to pass on, through Constant Contact email and text message campaigns, so you always have something current to share.</p>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Top questions for workers. */}
        <FaqSection
          items={WORKER_FAQS}
          eyebrow="Worker FAQ"
          heading={<>Top questions <em>from workers.</em></>}
          intro="Answers to what snow fighters ask most about experience, pay, shifts and where Reliable works."
        />

        {/* Final referral action. */}
        <section className="cust-call" aria-labelledby="work-call-title">
          <div>
            <p className="cust-call-kicker">Ready to make the introduction?</p>
            <h2 id="work-call-title">Refer a snow fighter online.</h2>
          </div>
          <div className="cust-call-actions">
            {/* The client's outline calls this the SFU line; labelled plainly here. */}
            <a className="cust-call-number" href={SFU_PHONE.href} aria-label={`Call the Reliable hiring line at ${SFU_PHONE.label}`}>
              <PhoneCall aria-hidden="true" /> {SFU_PHONE.label}
            </a>
            <a className="section-cta section-cta-dark" href="#referral-form">Go to the referral form <ArrowRight aria-hidden="true" /></a>
            <a className="section-cta section-cta-dark" href="#job-openings">Review open roles <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <SiteFooter />
        <ComingSoonModal />
      </main>
    </>
  );
}
