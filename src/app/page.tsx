import Image from "next/image";
import * as motion from "motion/react-client";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Gift,
  HardHat,
  Home,
  MapPin,
  Menu,
  Play,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { ComingSoonModal, ReferralTrigger } from "@/components/ui/coming-soon";

const benefits = [
  { icon: Gift, title: "Real rewards", copy: "Earn a payout when a successful referral becomes a customer or joins the winter team." },
  { icon: Users, title: "Stronger communities", copy: "Connect neighbors, businesses, and workers with dependable snow support." },
  { icon: Zap, title: "Fast follow-up", copy: "Every introduction is reviewed quickly so the right conversation can start." },
  { icon: ShieldCheck, title: "Reliable service", copy: "Refer people to an experienced team built for demanding winter conditions." },
];

export default function HomePage() {
  return (
    <main>
      <section className="scene-hero" id="top">
        <Image className="scene-background" src="/images/hero/winter-scene-v2.webp" alt="Snow-covered road through a quiet winter landscape at night" fill priority sizes="100vw" />
        <div className="scene-shade" aria-hidden="true" />
        <header className="scene-header">
          <a className="scene-brand" href="#top" aria-label="Referral program home">
            <Image className="site-wordmark" src="/images/snowplow-referrals-wordmark.svg" alt="Snowplow Referrals" width={460} height={64} priority />
          </a>
          <nav className="scene-desktop-nav" aria-label="Primary navigation">
            <a href="#why-refer">Why refer</a>
            <a href="#customer-program">Customer program</a>
            <a href="#worker-program">Worker program</a>
            <a href="#resources">Worker guide</a>
          </nav>
          <div className="scene-header-actions">
            <ReferralTrigger className="scene-nav-action" kind="referral">Make a referral <ArrowRight aria-hidden="true" /></ReferralTrigger>
          </div>
          <details className="scene-mobile-nav">
            <summary aria-label="Open navigation">
              <Menu className="menu-open-icon" aria-hidden="true" />
              <X className="menu-close-icon" aria-hidden="true" />
              <span>Menu</span>
            </summary>
            <div className="scene-mobile-panel">
              <a href="#why-refer">Why refer</a>
              <a href="#customer-program">Customer program</a>
              <a href="#worker-program">Worker program</a>
              <a href="#resources">Worker guide</a>
              <ReferralTrigger kind="referral">Make a referral <ArrowRight aria-hidden="true" /></ReferralTrigger>
            </div>
          </details>
        </header>

        <motion.div className="scene-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="scene-kicker">Snowplow referral program</p>
          <h1>Refer Customers.<br />Refer Workers.<br /><em>Get Rewarded.</em></h1>
          <p>Help grow a safer, stronger, snow-free community.<br />{" "}Two ways to make a difference. One great program.</p>
          <div className="scene-actions">
            <ReferralTrigger className="scene-primary" kind="customer">Refer a customer <ArrowRight aria-hidden="true" /></ReferralTrigger>
            <ReferralTrigger className="scene-secondary" kind="worker">Refer a worker <ArrowRight aria-hidden="true" /></ReferralTrigger>
          </div>
        </motion.div>

        <div className="house-layer" aria-hidden="true">
          <span className="window-glow window-one" />
          <span className="window-glow window-two" />
          <Image src="/images/hero/house-v2.webp" alt="" width={1280} height={1085} priority />
        </div>
        <Image className="truck-layer" src="/images/hero/reliable-plow.webp" alt="Commercial snowplow truck clearing snow" width={1536} height={1024} priority />

        <ReferralTrigger className="scene-program scene-customer" kind="customer">
          <Users aria-hidden="true" />
          <span><small>Homeowners</small><strong>Refer a Customer</strong><em>Help a neighbor get reliable snow removal.</em></span>
          <ArrowRight aria-hidden="true" />
        </ReferralTrigger>
        <ReferralTrigger className="scene-program scene-worker" kind="worker">
          <HardHat aria-hidden="true" />
          <span><small>Skilled professionals</small><strong>Refer a Worker</strong><em>Connect great people with winter work.</em></span>
          <ArrowRight aria-hidden="true" />
        </ReferralTrigger>

        <div className="scene-trust" aria-label="Program benefits">
          <p><Users aria-hidden="true" /><span>Stronger<br />communities</span></p>
          <p><ShieldCheck aria-hidden="true" /><span>Safer<br />winters</span></p>
          <p><BadgeDollarSign aria-hidden="true" /><span>Real<br />rewards</span></p>
        </div>
        <p className="scene-side-note">CUSTOMER REFERRALS<br />WORKER REFERRALS</p>
        <p className="scene-signoff"><strong>Better winters.</strong><span>Powered by people.</span></p>
      </section>

      <motion.section className="why-section" id="why-refer" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="snowy-heading">
          <h2>Why refer with <em>Reliable?</em></h2>
          <p>Help keep homes, businesses, and roads moving all winter while getting rewarded for making the connection.</p>
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
          <p><Users aria-hidden="true" /><span><strong>Community focused</strong>People helping people</span></p>
          <p><Clock3 aria-hidden="true" /><span><strong>Quick response</strong>Prompt referral follow-up</span></p>
          <p><ShieldCheck aria-hidden="true" /><span><strong>Trusted team</strong>Ready all winter long</span></p>
        </div>
      </motion.section>

      <motion.section className="referral-program customer-program" id="customer-program" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }}>
        <motion.div className="program-copy-block" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <p className="clean-kicker">Customer referral program</p>
          <h2>Refer a <em>Customer</em></h2>
          <p className="program-lede">Know a homeowner, business, or property manager who needs snow removal? Make the introduction and earn a reward.</p>
          <ul className="program-points">
            <li><Home aria-hidden="true" /><span><strong>Residential &amp; commercial</strong>Refer properties anywhere in the team&apos;s service area.</span></li>
            <li><FileText aria-hidden="true" /><span><strong>Simple introduction</strong>Share the basics in just a few minutes when forms launch.</span></li>
            <li><Zap aria-hidden="true" /><span><strong>Quick follow-up</strong>The team reaches out directly to qualify their service needs.</span></li>
            <li><Gift aria-hidden="true" /><span><strong>Earn a reward</strong>Receive the program payout after a successful conversion.</span></li>
          </ul>
          <ReferralTrigger className="section-cta section-cta-dark" kind="customer">Refer a customer <ArrowRight aria-hidden="true" /></ReferralTrigger>
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
            <li><Gift aria-hidden="true" /><span><strong>Referral payout</strong>Earn a reward when your referral is hired and meets program terms.</span></li>
            <li><Users aria-hidden="true" /><span><strong>Stronger winter crews</strong>More great people means better coverage and faster response.</span></li>
            <li><ShieldCheck aria-hidden="true" /><span><strong>Keep communities moving</strong>Play a part in safer roads and dependable winter service.</span></li>
          </ul>
          <ReferralTrigger className="section-cta" kind="worker">Refer a worker <ArrowRight aria-hidden="true" /></ReferralTrigger>
        </motion.div>
      </motion.section>

      <motion.section className="process-section" id="process" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <div className="section-intro section-intro-light">
          <h2>A clear, straightforward process.</h2>
        </div>
        <ol>
          <li><span>1</span><strong>Make the introduction</strong><p>Choose the customer or worker referral path.</p></li>
          <li><span>2</span><strong>Get confirmation</strong><p>You&apos;ll know when your referral has been received.</p></li>
          <li><span>3</span><strong>Reliable follows up</strong><p>The team handles the conversation directly from there.</p></li>
        </ol>
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

      <motion.section className="video-note" aria-label="Program video status" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
        <Play aria-hidden="true" />
        <p><strong>Program videos</strong><span>Customer and worker overview videos will be added when supplied.</span></p>
      </motion.section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-intro">
            <a className="footer-wordmark" href="#top" aria-label="Snowplow Referrals home">
              <Image src="/images/snowplow-referrals-wordmark.svg" alt="Snowplow Referrals" width={460} height={64} />
            </a>
            <span className="footer-rule" aria-hidden="true" />
            <h2>Helping keep communities moving all winter long.</h2>
            <p>Connecting customers and skilled workers with a dependable local snow removal team.</p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <p className="footer-label">Quick links</p>
            <a href="#top">Home</a>
            <a href="#why-refer">Why refer</a>
            <a href="#customer-program">Customer referral</a>
            <a href="#worker-program">Worker referral</a>
            <a href="#process">How it works</a>
          </nav>

          <div className="footer-resources">
            <p className="footer-label">Resources</p>
            <a className="footer-guide-link" href="#resources">
              <FileText aria-hidden="true" />
              <span>Worker Program Guide</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="footer-contact">
            <p className="footer-label">Get in touch</p>
            <p className="footer-location"><MapPin aria-hidden="true" /><span><strong>Serving Northeast Ohio</strong>Customer and worker referrals</span></p>
            <ReferralTrigger className="footer-referral" kind="referral">Make a referral <ArrowRight aria-hidden="true" /></ReferralTrigger>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Snowplow Referrals. Supported by Reliable Snow Plowing.</p>
          <a href="#top">Back to top <ArrowRight aria-hidden="true" /></a>
        </div>
      </footer>

      <ComingSoonModal />
    </main>
  );
}
