import Image from "next/image";
import * as motion from "motion/react-client";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  Building2,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Gift,
  HardHat,
  MapPin,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { ComingSoonModal } from "@/components/ui/coming-soon";
import { CommercialShowcase } from "@/components/ui/commercial-showcase";
import { FaqSection } from "@/components/ui/faq-section";
import { OhioLocationsLayer } from "@/components/ui/ohio-locations-layer";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { StoryPhoto } from "@/components/ui/story-photo";
import { SiteFooter } from "@/components/ui/site-footer";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { CUSTOMER_FAQS, RELIABLE_SERVICES } from "@/lib/referral-content";

/* Benefit copy only states what the client's changelist says. */
const benefits = [
  { icon: Gift, title: "Real rewards", copy: "Earn 5% on commercial referrals, up to $3,000, and $1 an hour for every hour a referred worker works." },
  { icon: Building2, title: "Commercial focus", copy: "Medical, distribution, retail, transportation, airports, Class A office and entire portfolios." },
  { icon: Zap, title: "Fast follow-up", copy: "Every referral gets an automatic confirmation and contact within one business day." },
  { icon: ShieldCheck, title: "Reliable service", copy: "A family-owned team with 40 years of experience, never more than 15 minutes away." },
];

export default function HomePage() {
  return (
    <>
      <SceneNavbar />
      <main className="page-content">
      <section className="scene-hero" id="top">
        {/* Flat, house-free winter road (changelist: no residential houses in the hero).
            Pexels photo 6527256 (free license), graded to night with the speed sign removed. */}
        <Image className="scene-background" src="/images/hero/winter-road-night.jpg" alt="Snow-covered two-lane road through a flat winter tree line at night" fill priority sizes="100vw" />
        <div className="scene-shade" aria-hidden="true" />
        <motion.div className="scene-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="scene-kicker">Snowplow referral program</p>
          <h1>Refer Customers.<br />Refer Workers.<br /><em>Get Rewarded.</em></h1>
          <p>Earn 5% on commercial referrals, up to $3,000,<br />{" "}and $1 an hour for every hour your referred snow fighter works.</p>
          <div className="scene-actions">
            <a className="scene-primary" href="/refer-a-customer">Refer a customer <ArrowRight aria-hidden="true" /></a>
            <a className="scene-secondary" href="/refer-a-worker">Refer a worker <ArrowRight aria-hidden="true" /></a>
          </div>
        </motion.div>

        {/* Ohio and its 50 satellite locations, in the house slot so the customer
            hover/tap effects still target it. */}
        <OhioLocationsLayer />
        <Image className="truck-layer" src="/images/hero/reliable-plow.webp" alt="Commercial snowplow truck clearing snow" width={1536} height={1024} priority />

        <a className="scene-program scene-customer" href="/refer-a-customer">
          <Users aria-hidden="true" />
          <span><small>Commercial properties</small><strong>Refer a Customer</strong><em>Distribution, retail, medical and more.</em></span>
          <ArrowRight aria-hidden="true" />
        </a>
        <a className="scene-program scene-worker" href="/refer-a-worker">
          <HardHat aria-hidden="true" />
          <span><small>Snow fighters</small><strong>Refer a Worker</strong><em>Earn $1 for every hour they work.</em></span>
          <ArrowRight aria-hidden="true" />
        </a>

        <div className="scene-trust" aria-label="Program benefits">
          <p><Users aria-hidden="true" /><span>Stronger<br />communities</span></p>
          <p><ShieldCheck aria-hidden="true" /><span>Safer<br />winters</span></p>
          <p><BadgeDollarSign aria-hidden="true" /><span>Real<br />rewards</span></p>
        </div>
        <p className="scene-side-note">ALL OF OHIO<br />50 SATELLITE LOCATIONS</p>
        <p className="scene-signoff"><strong>Never more than 15 minutes away.</strong><span>Reliable Snow Plowing</span></p>
      </section>

      {/* Home Page Features from the client's outline, in their order: 1. commercial image
          showcase, 2. introductory video, 3. company story, 4. referral process (below the
          customer and worker blocks), 5. link to Reliable Snowplowing. */}
      <CommercialShowcase />

      {/* 2. Introductory video. TODO: swap for the client's personal program video once it's
          recorded; the Next Day Pay video stands in until then. */}
      <motion.section className="intro-video" id="program-video" aria-labelledby="intro-video-title" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="intro-video-copy">
          <Image className="intro-video-badge" src="/images/next-day-pay-graphic.png" alt="Next day pay" width={482} height={53} />
          <h2 id="intro-video-title">How the referral program <em>works.</em></h2>
          <p>A personal walkthrough of the referral program and the values behind 40 years of Reliable service.</p>
          <div className="intro-video-points">
            <span><CheckCircle2 aria-hidden="true" /> Family owned</span>
            <span><CheckCircle2 aria-hidden="true" /> Unbeatable service</span>
            <span><CheckCircle2 aria-hidden="true" /> Never more than 15 minutes away</span>
          </div>
        </div>
        <VideoLightbox youtubeId="oWfCgCu-XPY" title="Next day pay at Reliable" thumbnail="/images/next-day-pay-video-thumb.jpg" caption="Watch: Next day pay" note="Program walkthrough coming soon" />
      </motion.section>

      {/* 3. Company story: the company's journey in Ohio, per the client's outline, in the
          process band's navy styling. Team photo, founder and milestones come from
          winterworkerswanted.com/about-us/who-we-are (photo: its Group-Edit.jpg, no caption). */}
      <motion.section className="process-section story-section" id="our-story" aria-labelledby="story-title" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <p className="clean-kicker">Our story</p>
        <StoryPhoto src="/images/reliable-team.jpg" alt="The Reliable Snow Plowing team outside the company's headquarters" />
        <div className="story-grid">
          <h2 id="story-title">Family owned. Built across Ohio.</h2>
          <div>
            <p className="story-lede">For 40 years, Reliable has grown across Ohio as a family-owned company committed to unbeatable service, with crews never more than 15 minutes from the properties they protect.</p>
            <p className="story-founder">Founded in 1986 by <strong>Norm Detrick</strong>, Founder &amp; CEO.</p>
          </div>
        </div>
        <dl className="story-stats">
          <div><dt>40</dt><dd>years of experience</dd></div>
          <div><dt>Family</dt><dd>owned and operated</dd></div>
          <div><dt>15 min</dt><dd>never farther away</dd></div>
          <div><dt>50</dt><dd>satellite locations in Ohio</dd></div>
        </dl>
        <ol className="story-timeline" aria-label="Company milestones">
          <li><strong>1986</strong><span>Founded as Ultra Turf 1 Inc.</span></li>
          <li><strong>1993</strong><span>Renamed Reliable Snow Plowing</span></li>
          <li><strong>1998</strong><span>Grew to 100 employees</span></li>
          <li><strong>2020</strong><span>50 satellite locations and 800 snow fighters</span></li>
        </ol>
      </motion.section>

      {/* 4. Referral process overview, per the client's outline. Continues the story's navy band. */}
      <motion.section className="process-section" id="process" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="section-intro section-intro-light">
          <p className="clean-kicker">How referrals work</p>
          <h2>A clear, straightforward process.</h2>
        </div>
        <ol className="process-steps">
          <li><span className="process-step-icon"><Send aria-hidden="true" /></span><em className="process-step-num" aria-hidden="true">01</em><strong>Make the introduction</strong><p>Refer a commercial customer or a snow fighter. You&apos;ll get an automatic reply confirming it arrived.</p></li>
          <li><span className="process-step-icon"><FileText aria-hidden="true" /></span><em className="process-step-num" aria-hidden="true">02</em><strong>Get the program details</strong><p>We send a short PDF, 2 to 5 pages, explaining how the referral program works.</p></li>
          <li><span className="process-step-icon"><PhoneCall aria-hidden="true" /></span><em className="process-step-num" aria-hidden="true">03</em><strong>Hear from us within one business day</strong><p>The team reaches out within one business day and takes it from there.</p></li>
        </ol>
      </motion.section>

      {/* Referral CTA: a thin, full-bleed photo banner straight out of the process band's navy. */}
      <motion.section className="referral-cta" id="make-a-referral" aria-labelledby="referral-cta-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <Image className="referral-cta-photo" src="/images/work/plow-subcontractor.png" alt="" fill sizes="100vw" />
        <div className="referral-cta-inner">
          <div className="referral-cta-copy">
            <p className="clean-kicker">Ready to make the connection?</p>
            <h2 id="referral-cta-title">Know a property or a <em>snow fighter?</em></h2>
          </div>
          <ul className="referral-cta-rewards">
            <li><strong>5%</strong><span>per commercial referral, up to $3,000</span></li>
            <li><strong>$1/hr</strong><span>for every hour a referred worker works</span></li>
          </ul>
          <div className="referral-cta-actions">
            <a className="scene-primary" href="/refer-a-customer#referral-form">Refer a customer <ArrowRight aria-hidden="true" /></a>
            <a className="scene-secondary" href="/refer-a-worker">Refer a worker <ArrowRight aria-hidden="true" /></a>
            <a className="referral-cta-call" href="tel:+13304677273"><Phone aria-hidden="true" /> 330-467-7273</a>
          </div>
        </div>
      </motion.section>

      <motion.section className="why-section" id="why-refer" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="snowy-heading">
          <h2>Why refer with <em>Reliable?</em></h2>
          <p>Help keep Ohio&apos;s commercial properties safe and open all winter while getting rewarded for making the connection.</p>
        </div>
        <div className="benefit-marquee">
          <div className="benefit-grid">
            {[...benefits, ...benefits].map(({ icon: Icon, title, copy }, index) => (
              <article
                key={`${title}-${index}`}
                className={`${index % benefits.length === 2 ? "benefit-card benefit-card-featured" : "benefit-card"}${index >= benefits.length ? " benefit-card-clone" : ""}`}
                aria-hidden={index >= benefits.length ? "true" : undefined}
              >
                <span><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="proof-row" aria-label="Referral program highlights">
          <p><MapPin aria-hidden="true" /><span><strong>All of Ohio</strong>50 satellite locations</span></p>
          <p><Clock3 aria-hidden="true" /><span><strong>Quick response</strong>Within one business day</span></p>
          <p><ShieldCheck aria-hidden="true" /><span><strong>Family owned</strong>40 years of experience</span></p>
        </div>
      </motion.section>

      <motion.section className="referral-program customer-program" id="customer-program" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }}>
        <motion.div className="program-copy-block" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="clean-kicker">Customer referral program</p>
          <h2>Refer a <em>Customer</em></h2>
          <p className="program-lede">Know a business or property manager with a commercial site that needs dependable snow and ice service? Make the introduction and earn a reward.</p>
          <ul className="program-points">
            <li><Building2 aria-hidden="true" /><span><strong>Commercial properties</strong>Medical, distribution, retail, transportation, airports, Class A office and portfolios.</span></li>
            <li><FileText aria-hidden="true" /><span><strong>Simple introduction</strong>Share the basics in just a few minutes when forms launch.</span></li>
            <li><Zap aria-hidden="true" /><span><strong>Contact within one business day</strong>You get an automatic confirmation, then the team reaches out.</span></li>
            <li><Gift aria-hidden="true" /><span><strong>5% referral fee</strong>Up to $3,000 per commercial referral.</span></li>
          </ul>
          <a className="section-cta section-cta-dark" href="/refer-a-customer">Refer a customer <ArrowRight aria-hidden="true" /></a>
        </motion.div>
        <motion.div className="program-visual customer-visual" initial={{ opacity: 0, x: 34, scale: 0.985 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <Image className="generated-program-photo generated-customer-photo" src="/images/customer-referral-ohio-v2.webp" alt="Snow-covered Northeast Ohio home ready for professional winter service" fill sizes="(max-width: 1100px) 100vw, 62vw" />
        </motion.div>
      </motion.section>

      <motion.section className="referral-program worker-program" id="worker-program" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }}>
        <motion.div className="program-visual worker-visual" initial={{ opacity: 0, x: -34, scale: 0.985 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <Image className="generated-program-photo generated-worker-photo" src="/images/worker-referral-truck-clean-v3.webp" alt="Clean Reliable truck 504 ready to clear a Northeast Ohio commercial property" fill sizes="(max-width: 1100px) 100vw, 62vw" />
        </motion.div>
        <motion.div className="program-copy-block" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="clean-kicker">Worker referral program</p>
          <h2>Refer a <em>Worker</em></h2>
          <p className="program-lede">Know a qualified snowplow operator or snow removal worker? Help build stronger crews for a safer winter.</p>
          <ul className="program-points">
            <li><HardHat aria-hidden="true" /><span><strong>Qualified operators</strong>Connect the team with experienced, reliable winter workers.</span></li>
            <li><Gift aria-hidden="true" /><span><strong>$1 an hour, indefinitely</strong>For every hour your referred snow fighter works.</span></li>
            <li><Users aria-hidden="true" /><span><strong>Stronger winter crews</strong>More great people means better coverage and faster response.</span></li>
            <li><ShieldCheck aria-hidden="true" /><span><strong>Keep communities moving</strong>Play a part in safer roads and dependable winter service.</span></li>
          </ul>
          <a className="section-cta" href="/refer-a-worker">Refer a worker <ArrowRight aria-hidden="true" /></a>
        </motion.div>
      </motion.section>

      {/* 5. Link to Reliable Snowplowing: direct customers to explore the services offered.
          Full-bleed band over Reliable's headquarters and plow fleet (aerial from the hero of
          winterworkerswanted.com/employment/careers-office), navy gradient behind the copy. */}
      <motion.section className="reliable-link" id="reliable-snowplowing" aria-labelledby="reliable-link-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <Image className="reliable-link-bg" src="/images/reliable-facility.png" alt="Aerial view of Reliable Snow Plowing's headquarters with its fleet of plow trucks" fill sizes="100vw" />
        <div className="reliable-link-copy">
          <p className="clean-kicker">Reliable Snowplowing</p>
          <h2 id="reliable-link-title">See everything <em>Reliable</em> does.</h2>
          <p>Explore the snow and ice services behind every referral, from single sites to entire portfolios.</p>
          <ul className="reliable-services">
            {RELIABLE_SERVICES.map((service) => <li key={service}>{service}</li>)}
          </ul>
          <div className="reliable-link-actions">
            <a className="section-cta" href="https://www.reliablesnowplowing.net" target="_blank" rel="noopener noreferrer">Visit Reliable Snowplowing <ArrowUpRight aria-hidden="true" /></a>
            <a className="reliable-call" href="tel:+13304677273"><Phone aria-hidden="true" /> Call Reliable 330-467-7273</a>
          </div>
        </div>
      </motion.section>

      <motion.section className="resource-section" id="resources" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="resource-copy">
          <p className="clean-kicker">Worker resources</p>
          <h2>Worker program <em>guide.</em></h2>
          <p>One clear overview of program rules, expectations, rates, and payout details—ready to download once the final client PDF is supplied.</p>
          <div className="guide-features">
            <span><CheckCircle2 aria-hidden="true" /> Clear expectations</span>
            <span><ShieldCheck aria-hidden="true" /> Safety guidance</span>
            <span><BadgeDollarSign aria-hidden="true" /> Program rates</span>
          </div>
          <div className="guide-card">
            <span className="guide-file-icon"><FileText aria-hidden="true" /></span>
            <div><small>Worker program guide</small><strong>Overview, rules &amp; rates</strong><p>PDF · Available at launch</p></div>
            <button type="button" disabled><Download aria-hidden="true" /> Download PDF</button>
          </div>
        </div>
        <div className="guide-scene-mobile" aria-hidden="true" />
      </motion.section>

      <FaqSection
        items={CUSTOMER_FAQS}
        eyebrow="Customer FAQ"
        heading={<>Questions about <em>referring</em> a customer.</>}
        intro="Straight answers about who Reliable serves, where, and what happens after you make an introduction."
      />

      <SiteFooter />

      <ComingSoonModal />
      </main>
    </>
  );
}
