import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowRight, Award, CheckCircle2, Handshake, MapPin, Phone, PhoneCall, Route, Ruler, ShieldCheck, Timer, Truck } from "lucide-react";
import { ComingSoonModal } from "@/components/ui/coming-soon";
import { CustomerReferralForm } from "@/components/ui/customer-referral-form";
import { CustomerSectorGallery } from "@/components/ui/customer-sector-gallery";
import { OhioMap } from "@/components/ui/ohio-locations-layer";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { SiteFooter } from "@/components/ui/site-footer";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { CUSTOMER_FAQS, RELIABLE_PHONE, SERVICE_AREA } from "@/lib/referral-content";

export const metadata: Metadata = {
  title: "Refer a Customer | Snowplow Referrals",
  description: "Refer a commercial property to Reliable Snow Plowing and earn a 5% referral fee, up to $3,000 per commercial referral.",
  alternates: { canonical: "/refer-a-customer" },
};

const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } };

/* Selling proposition for customers: the client's value statements from the changelist. */
const VALUES = [
  { icon: ShieldCheck, title: "Safety first", text: "Providing safety throughout Ohio all winter." },
  { icon: Timer, title: "15 minutes away", text: "Crews are never more than 15 minutes from the site." },
  { icon: Award, title: "40-year track record", text: "A proven Autopilot system behind every storm." },
  { icon: Handshake, title: "We make it easy", text: "One family-owned partner that makes winter easy for customers." },
  { icon: MapPin, title: "50 satellite locations", text: "Coverage throughout Ohio, from single sites to portfolios." },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* Refer a Customer page, per the client's outline: slideshow of customer types, program video,
   map of service area, selling proposition, referral fee structure, service limitations, top
   questions for customers and click to call. */
export default function ReferACustomerPage() {
  return (
    <>
      <SceneNavbar />
      <main className="page-content">
        {/* Light daytime hero. Background: Pexels photo 36009297 by Peter Dyllong (free
            license), a snow-covered lot beside an industrial building after a snowfall. */}
        <section className="page-hero page-hero-light" id="top" aria-labelledby="page-hero-title">
          <Image className="scene-background" src="/images/hero/industrial-snow-day.jpg" alt="" fill priority sizes="100vw" />
          <div className="scene-shade" aria-hidden="true" />
          <Image className="page-hero-truck" src="/images/hero/reliable-plow.webp" alt="" width={1536} height={1024} priority />

          <motion.div className="page-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <nav className="page-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Refer a customer</span>
            </nav>
            <p className="scene-kicker">Customer referral program</p>
            <h1 id="page-hero-title">Refer a commercial <em>customer.</em></h1>
            <p>Know a property that needs dependable snow and ice service? Make the introduction and earn a 5% referral fee for each entity, up to $3,000 per commercial referral.</p>
            <div className="scene-actions">
              <a className="scene-primary" href="#referral-form">Start a referral <ArrowRight aria-hidden="true" /></a>
              <a className="scene-secondary" href={RELIABLE_PHONE.href}><Phone aria-hidden="true" /> Call {RELIABLE_PHONE.label}</a>
            </div>
            <dl className="page-hero-stats">
              <div><dt>5%</dt><dd>referral fee per entity</dd></div>
              <div><dt>$3,000</dt><dd>max per commercial referral</dd></div>
              <div><dt>1 day</dt><dd>business-day follow-up</dd></div>
              <div><dt>50</dt><dd>satellite locations</dd></div>
            </dl>
          </motion.div>
        </section>

        {/* Slide show of various types of customers. */}
        <motion.section className="cust-section cust-gallery-section" id="property-types" aria-labelledby="cust-gallery-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Who to refer</p>
              <h2 id="cust-gallery-title">Commercial properties <em>we protect.</em></h2>
            </div>
            <p>Reliable is looking for commercial customers, from single sites to entire portfolios. Pick a property type to see why it matters.</p>
          </div>
          <CustomerSectorGallery />
        </motion.section>

        {/* Video of me explaining the program. TODO: swap for the client's program video once
            it's recorded; the Next Day Pay video stands in until then. */}
        <motion.section className="cust-video" id="program-video" aria-labelledby="cust-video-title" {...reveal}>
          <p className="clean-kicker">Program video</p>
          <h2 id="cust-video-title">Hear how the customer referral program <em>works.</em></h2>
          <p>A personal walkthrough of the program, the customers Reliable is looking for and what happens after you refer.</p>
          <VideoLightbox youtubeId="oWfCgCu-XPY" title="Next day pay at Reliable" thumbnail="/images/next-day-pay-video-thumb.jpg" caption="Watch: Next day pay" note="Program walkthrough coming soon" />
        </motion.section>

        {/* Selling proposition, referral fee structure and service limitations. */}
        <motion.section className="cust-section cust-terms" id="why-reliable" aria-labelledby="cust-terms-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Why Reliable</p>
              <h2 id="cust-terms-title">A partner your referral <em>can count on.</em></h2>
            </div>
            <p>What the customers you refer get from Reliable, what you earn, and the sites that are the best fit.</p>
          </div>

          <ul className="cust-values">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon aria-hidden="true" />
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="cust-terms-grid">
            <article className="cust-term cust-term-fee">
              <p className="cust-term-label">Referral fee structure</p>
              <p className="cust-term-big">5%</p>
              <h3>For each entity you refer</h3>
              <p>Up to $3,000 per commercial referral.</p>
            </article>
            <article className="cust-term">
              <p className="cust-term-label">Eligibility criteria</p>
              <h3>Who qualifies</h3>
              <ul>
                <li><CheckCircle2 aria-hidden="true" /><span>A commitment to high service standards.</span></li>
                <li><CheckCircle2 aria-hidden="true" /><span>The lot must be salted when it&apos;s plowed.</span></li>
              </ul>
            </article>
            <article className="cust-term">
              <p className="cust-term-label">Service limitations</p>
              <h3>The best-fit sites</h3>
              <ul>
                <li><Ruler aria-hidden="true" /><span>Lots the size of a Walmart or larger.</span></li>
                <li><Truck aria-hidden="true" /><span>Dedicated equipment and workers living within 15 minutes of the site.</span></li>
                <li><Route aria-hidden="true" /><span>Limited availability for route work with smaller sites.</span></li>
              </ul>
            </article>
          </div>
        </motion.section>

        {/* Map of service area. */}
        <motion.section className="cust-section cust-map" id="service-area" aria-labelledby="cust-map-title" {...reveal}>
          <div className="cust-map-grid">
            <div className="cust-map-panel" aria-hidden="true"><OhioMap idPrefix="cust-ohio" /></div>
            <div>
              <p className="clean-kicker">Map of service area</p>
              <h2 id="cust-map-title">All of Ohio, from <em>50 satellite locations.</em></h2>
              <p className="cust-map-lede">Crews are never more than 15 minutes from the properties they protect. Reliable serves these areas and counties:</p>
              <ul className="cust-map-cities" aria-label="Metro areas">
                {SERVICE_AREA.cities.map((city) => (
                  <li key={city}><MapPin aria-hidden="true" /> {city} area</li>
                ))}
              </ul>
              <ul className="cust-map-counties" aria-label="Counties">
                {SERVICE_AREA.counties.map((county) => (
                  <li key={county}>{county} County</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Referral form (preview). */}
        <motion.section className="cust-section cust-form" id="referral-form" aria-labelledby="cust-form-title" {...reveal}>
          <div className="cust-form-copy">
            <p className="clean-kicker">Make the introduction</p>
            <h2 id="cust-form-title">Refer a customer in <em>a few minutes.</em></h2>
            <p>Share the basics about the property and who to contact. Here&apos;s what happens next:</p>
            <ol className="cust-form-steps">
              <li><span>1</span><div><strong>Automatic confirmation</strong>You get a reply confirming your referral arrived.</div></li>
              <li><span>2</span><div><strong>Program details</strong>A short PDF, 2 to 5 pages, explains how the program works.</div></li>
              <li><span>3</span><div><strong>Contact within one business day</strong>The team reaches out and takes it from there.</div></li>
            </ol>
          </div>
          <CustomerReferralForm />
        </motion.section>

        {/* Top questions for customers. */}
        <motion.section className="cust-section cust-faq" id="faq" aria-labelledby="cust-faq-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Customer FAQ</p>
              <h2 id="cust-faq-title">Top questions <em>from customers.</em></h2>
            </div>
            <p>Straight answers about who Reliable serves, where, and what happens after you make an introduction.</p>
          </div>
          <ol className="cust-faq-grid">
            {CUSTOMER_FAQS.map((item, i) => (
              <li key={item.id}>
                <span className="cust-faq-num" aria-hidden="true">{pad(i + 1)}</span>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Click to call. */}
        <section className="cust-call" aria-labelledby="cust-call-title">
          <div>
            <p className="cust-call-kicker">Click to call</p>
            <h2 id="cust-call-title">Rather talk it through?</h2>
          </div>
          <div className="cust-call-actions">
            <a className="cust-call-number" href={RELIABLE_PHONE.href}><PhoneCall aria-hidden="true" /> Reliable {RELIABLE_PHONE.label}</a>
            <a className="section-cta section-cta-dark" href="#referral-form">Start a referral <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <SiteFooter />
        <ComingSoonModal />
      </main>
    </>
  );
}
