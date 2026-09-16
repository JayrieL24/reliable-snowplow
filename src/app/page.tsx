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
  Handshake,
  HardHat,
  MapPin,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { FaqSection } from "@/components/ui/faq-section";
import { ProcessBento } from "@/components/ui/process-bento";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { ServicesShowcase } from "@/components/ui/services-showcase";
import { SiteFooter } from "@/components/ui/site-footer";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { GENERAL_FAQS } from "@/lib/referral-content";

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
        <Image className="scene-background" src="/images/hero/winter-scene-v2.webp" alt="Snow-covered road through a quiet winter landscape at night" fill priority sizes="100vw" />
        <div className="scene-shade" aria-hidden="true" />
        <motion.div className="scene-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="scene-kicker">Snowplow referral program</p>
          <h1>Refer Customers.<br />Refer Workers.<br /><em>Get Rewarded.</em></h1>
          <p>Help grow a safer, stronger, snow-free community.<br />{" "}Two ways to make a difference. One great program.</p>
          <div className="scene-actions">
            <a className="scene-primary" href="/refer-a-customer#referral-form">Refer a customer <ArrowRight aria-hidden="true" /></a>
            <a className="scene-secondary" href="/refer-a-worker#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
          </div>
        </motion.div>

        {/* Generated distribution centre with native transparency. The dock-bay glows
            preserve the customer referral hover effect. */}
        <div className="house-layer office-layer" aria-hidden="true">
          <span className="window-glow window-one" />
          <span className="window-glow window-two" />
          <Image src="/images/hero/commercial-distribution-night.png" alt="" width={1280} height={1085} priority />
        </div>
        <Image className="truck-layer" src="/images/hero/reliable-plow.webp" alt="Commercial snowplow truck clearing snow" width={1536} height={1024} priority />

        <a className="scene-program scene-customer" href="/refer-a-customer#referral-form">
          <Users aria-hidden="true" />
          <span><small>Homeowners</small><strong>Refer a Customer</strong><em>Help a neighbor get reliable snow removal.</em></span>
          <ArrowRight aria-hidden="true" />
        </a>
        <a className="scene-program scene-worker" href="/refer-a-worker#referral-form">
          <HardHat aria-hidden="true" />
          <span><small>Skilled professionals</small><strong>Refer a Worker</strong><em>Connect great people with winter work.</em></span>
          <ArrowRight aria-hidden="true" />
        </a>

        <div className="scene-trust" aria-label="Program benefits">
          <p><Users aria-hidden="true" /><span>Stronger<br />communities</span></p>
          <p><ShieldCheck aria-hidden="true" /><span>Safer<br />winters</span></p>
          <p><BadgeDollarSign aria-hidden="true" /><span>Real<br />rewards</span></p>
        </div>
        <p className="scene-side-note">CUSTOMER REFERRALS<br />WORKER REFERRALS</p>
        <p className="scene-signoff"><strong>Never more than 15 minutes away.</strong><span>Reliable Snow Plowing</span></p>
      </section>

      {/* Home Page Features from the client's outline, in their order: 1. commercial image
          showcase, 2. introductory video, 3. company story, 4. referral process (below the
          customer and worker blocks), 5. link to Reliable Snowplowing. */}

      {/* 2. Introductory video. TODO: swap for the client's personal program video once it's
          recorded; the Next Day Pay video stands in until then. */}
      <motion.section className="intro-video" id="program-video" aria-labelledby="intro-video-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
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

      {/* The changelist note: "thumbnail video at the top explaining program, then the
          services underneath." Same deck as the property showcase above, showing Reliable's
          own seven services, with the client's hiring site as the call to action. */}
      <ServicesShowcase />

      {/* 3. Company story, laid out after the client's reference: heading and CTA across the top,
          a small photo with a crew proof line on the left, the team photo with two stats on the
          right. Small photo: "Top Place to Work" from winterworkerswanted.com/about-us/awesome-people.
          "800+ snow fighters" comes from the "800 snowfighters" graphic on that same page. */}
      <motion.section className="about-section" id="our-story" aria-labelledby="story-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="about-head">
          <div>
            <p className="clean-kicker">About us</p>
            <h2 id="story-title">Family owned. Built across <em>Ohio.</em></h2>
            <p className="about-lede">Founded in 1986 by Norm Detrick, Reliable has spent 40 years growing across Ohio as a family-owned company committed to unbeatable service, with crews never more than 15 minutes from the properties they protect.</p>
          </div>
          <a className="section-cta about-cta" href="https://www.reliablesnowplowing.net" target="_blank" rel="noopener noreferrer">Visit Reliable Snowplowing <ArrowUpRight aria-hidden="true" /></a>
        </div>

        <div className="about-grid">
          <div className="about-side">
            <div className="about-photo about-photo-small">
              <Image src="/images/about/snow-fighter-shoveling.png" alt="A smiling Reliable snow fighter shoveling during a night snowfall" fill sizes="(max-width: 900px) 100vw, 34vw" />
            </div>
            <div className="about-proof">
              <div className="about-avatars" aria-hidden="true">
                <Image src="/images/about/crew-1.jpg" alt="" width={160} height={160} />
                <Image src="/images/about/crew-2.jpg" alt="" width={160} height={160} />
                <Image src="/images/about/crew-3.jpg" alt="" width={160} height={160} />
              </div>
              <p><strong>800+</strong> snow fighters keep<br />Ohio moving all winter</p>
            </div>
          </div>

          <div className="about-photo about-photo-large">
            <Image src="/images/reliable-team.jpg" alt="The Reliable Snow Plowing team outside the company's headquarters" fill sizes="(max-width: 900px) 100vw, 62vw" />
            <dl className="about-stats">
              <div><dt>40+</dt><dd>Years of<br />Ohio winters</dd></div>
              <div><dt>50</dt><dd>Satellite<br />locations</dd></div>
            </dl>
          </div>
        </div>
      </motion.section>

      {/* 4. Referral process overview, per the client's outline. Light band, so it reads apart
          from the navy company story above it. */}
      <ProcessBento />

      {/* 5. Link to Reliable Snowplowing: direct customers to explore the services offered.
          Full-bleed band over Reliable's headquarters and plow fleet (aerial from the hero of
          winterworkerswanted.com/employment/careers-office), navy gradient behind the copy. */}
      <motion.section className="reliable-link" id="reliable-snowplowing" aria-labelledby="reliable-link-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <Image className="reliable-link-bg" src="/images/reliable-facility.png" alt="Aerial view of Reliable Snow Plowing's headquarters with its fleet of plow trucks" fill sizes="100vw" />
        <div className="reliable-link-copy">
          <p className="clean-kicker">Reliable Snowplowing</p>
          <h2 id="reliable-link-title">Explore Reliable&apos;s <em>snow and ice services.</em></h2>
          <p>See how Reliable protects commercial properties across Ohio, from single locations to entire portfolios.</p>
          <div className="reliable-link-actions">
            <a className="section-cta" href="https://www.reliablesnowplowing.net" target="_blank" rel="noopener noreferrer">View commercial services <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </motion.section>

      <motion.section className="why-section" id="why-refer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
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

      <motion.section className="resource-section" id="resources" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
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

      <motion.section className="referral-program customer-program" id="customer-program" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }}>
        <motion.div className="program-copy-block" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="clean-kicker">Customer referral program</p>
          <h2>Refer a <em>Customer</em></h2>
          <p className="program-lede">Know a business or property manager with a commercial site that needs dependable snow and ice service? Make the introduction and earn a reward.</p>
          <ul className="program-points">
            <li><ShieldCheck aria-hidden="true" /><span><strong>Safety first</strong>Providing safety throughout Ohio all winter.</span></li>
            <li><Clock3 aria-hidden="true" /><span><strong>Never more than 15 minutes away</strong>Crews stay close to every property they protect.</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span><strong>Proven 40-year track record</strong>A proven Autopilot system stands behind every storm.</span></li>
            <li><Handshake aria-hidden="true" /><span><strong>We make it easy</strong>One family-owned partner makes winter easier for customers.</span></li>
            <li><MapPin aria-hidden="true" /><span><strong>50 satellite locations</strong>Coverage throughout Ohio, from single sites to portfolios.</span></li>
          </ul>
          <a className="section-cta section-cta-dark" href="/refer-a-customer#referral-form">Refer a customer <ArrowRight aria-hidden="true" /></a>
        </motion.div>
        <motion.div className="program-visual customer-visual" initial={{ opacity: 0, x: 34, scale: 0.985 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <Image className="generated-program-photo generated-customer-photo" src="/images/customer-referral-commercial-v3.webp" alt="Reliable snowplow clearing a commercial Ohio property during fresh snowfall" fill sizes="(max-width: 1100px) 100vw, 62vw" />
        </motion.div>
      </motion.section>

      <motion.section className="referral-program worker-program" id="worker-program" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }}>
        <motion.div className="program-visual worker-visual" initial={{ opacity: 0, x: -34, scale: 0.985 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <Image className="generated-program-photo generated-worker-photo" src="/images/worker-referral-truck-clean-v3.webp" alt="Clean Reliable truck 504 ready to clear an Ohio commercial property" fill sizes="(max-width: 1100px) 100vw, 62vw" />
        </motion.div>
        <motion.div className="program-copy-block" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="clean-kicker">Worker referral program</p>
          <h2>Refer a <em>Worker</em></h2>
          <p className="program-lede">Know a qualified snowplow operator or snow removal worker? Help build stronger crews for a safer winter.</p>
          <ul className="program-points">
            <li><HardHat aria-hidden="true" /><span><strong>Jobs for every experience level</strong>Some roles require no experience, while others need experienced operators.</span></li>
            <li><Gift aria-hidden="true" /><span><strong>$1 an hour, indefinitely</strong>For every hour your referred snow fighter works.</span></li>
            <li><ShieldCheck aria-hidden="true" /><span><strong>Safety throughout Ohio</strong>Help keep properties, roads and communities safer all winter.</span></li>
            <li><BadgeDollarSign aria-hidden="true" /><span><strong>Seasonal income</strong>Winter work provides seasonal income with next day pay for every position.</span></li>
          </ul>
          <a className="section-cta" href="/refer-a-worker#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
        </motion.div>
      </motion.section>

      {/* Closing band: the CTA and the FAQ share one background, so the snowy side
          texture runs unbroken from one into the other. */}
      <div className="closing-band">
        {/* Referral CTA: a thin, full-bleed photo banner under the light process band. */}
        <section className="referral-cta referral-cta-light" id="make-a-referral" aria-labelledby="referral-cta-title">
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
              <a className="scene-secondary" href="/refer-a-worker#referral-form">Refer a worker <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <FaqSection
          items={GENERAL_FAQS}
          eyebrow="Referral FAQ"
          heading={<>Questions about the <em>referral</em> program.</>}
          intro="Straight answers about who you can refer, what you earn, and what happens after you make an introduction."
        />
      </div>

      <SiteFooter />

      </main>
    </>
  );
}
