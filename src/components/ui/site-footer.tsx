import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { ReferralTrigger } from "@/components/ui/coming-soon";

/* Site footer shared by every page. Links are root-relative so they work from inner pages;
   "Back to top" targets the #top id each page's hero carries. */
/* The four columns come up one after another as the footer is reached. */
const COLUMNS = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const COLUMN = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } };

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <motion.div className="footer-main" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={COLUMNS}>
        <motion.div className="footer-intro" variants={COLUMN}>
          <a className="footer-wordmark" href="/" aria-label="Snowplow Referrals home">
            <Image src="/images/snowplow-referrals-wordmark.svg" alt="Snowplow Referrals" width={460} height={64} />
          </a>
          <span className="footer-rule" aria-hidden="true" />
          <h2>Helping keep communities moving all winter long.</h2>
          <p>Connecting customers and skilled workers with a dependable local snow removal team.</p>
        </motion.div>

        <motion.nav className="footer-links" aria-label="Footer navigation" variants={COLUMN}>
          <p className="footer-label">Quick links</p>
          <a href="/">Home</a>
          <a href="/#why-refer">Why refer</a>
          <a href="/refer-a-customer#referral-form">Refer a customer</a>
          <a href="/refer-a-worker#referral-form">Refer a worker</a>
          <a href="/#process">How it works</a>
          <a href="/#faq">FAQ</a>
        </motion.nav>

        <motion.div className="footer-resources" variants={COLUMN}>
          <p className="footer-label">Resources</p>
          <a className="footer-guide-link" href="/#resources">
            <FileText aria-hidden="true" />
            <span>Worker Program Guide</span>
            <ArrowRight aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div className="footer-contact" variants={COLUMN}>
          <p className="footer-label">Get in touch</p>
          <p className="footer-location"><MapPin aria-hidden="true" /><span><strong>Serving all of Ohio</strong>Customer and worker referrals</span></p>
          <ReferralTrigger className="footer-referral" kind="referral">Make a referral <ArrowRight aria-hidden="true" /></ReferralTrigger>
        </motion.div>
      </motion.div>

      <div className="footer-bottom">
        <p>© 2026 Snowplow Referrals. Supported by Reliable Snow Plowing.</p>
        <a href="#top">Back to top <ArrowRight aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
