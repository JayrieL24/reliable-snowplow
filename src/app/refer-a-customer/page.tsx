import type { Metadata } from "next";
import Image from "next/image";
import * as motion from "motion/react-client";
import { ArrowRight, Award, Building2, CheckCircle2, Clock3, Handshake, HardHat, MapPin, Route, ShieldCheck, Timer, Truck } from "lucide-react";
import { ComingSoonModal } from "@/components/ui/coming-soon";
import { CustomerReferralForm } from "@/components/ui/customer-referral-form";
import { FaqSection } from "@/components/ui/faq-section";
import { SceneNavbar } from "@/components/ui/scene-navbar";
import { SectorCarousel } from "@/components/ui/sector-carousel";
import { SiteFooter } from "@/components/ui/site-footer";
import { UsServiceMap } from "@/components/ui/us-service-map";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { CUSTOMER_FAQS, SERVICE_AREA } from "@/lib/referral-content";

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

/* Service limitations, from the client's outline: "Limited availability for route work; conditions
   for large sites: lots the size of Walmart or larger; dedicated equipment and workers living
   within 15 minutes of the site." The third card is the featured one, as on the home page. */
const LIMITS = [
  { icon: Building2, title: "Walmart-size lots", copy: "Lots the size of a Walmart or larger, from a single site up to an entire portfolio." },
  { icon: Truck, title: "Dedicated equipment", copy: "Equipment dedicated to the site rather than shared across a route." },
  { icon: HardHat, title: "Crews 15 minutes away", copy: "Workers who live within 15 minutes of the site, so response stays fast." },
  { icon: Route, title: "Limited route work", copy: "Limited availability for route work serving smaller sites." },
];

/* Refer a Customer page, per the client's outline: slideshow of customer types, program video,
   map of service area, selling proposition, referral fee structure, service limitations, top
   questions for customers and a customer referral form. */
export default function ReferACustomerPage() {
  return (
    <>
      <SceneNavbar />
      <main className="page-content customer-page">
        {/* Generated light dusk scene and independent loader cutout, fading into the snow below. */}
        <section className="page-hero page-hero-light" id="top" aria-labelledby="page-hero-title">
          <Image className="scene-background" src="/images/hero/customer-commercial-dusk.webp" alt="" fill priority sizes="100vw" />
          <div className="scene-shade" aria-hidden="true" />
          <div className="customer-plow-layer" aria-hidden="true">
            <Image src="/images/hero/customer-wheel-loader.webp" alt="" width={1536} height={1024} priority sizes="(max-width: 680px) 100vw, (max-width: 1180px) 680px, 48vw" />
            <span className="customer-plow-glow customer-plow-beacon" />
            <span className="customer-plow-glow customer-plow-lamp" />
          </div>

          <motion.div className="page-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="scene-kicker">Customer referral program</p>
            <h1 id="page-hero-title">Refer a commercial <em>customer.</em></h1>
            <p>Know a property that needs dependable snow and ice service? Make the introduction and earn a 5% referral fee for each entity, up to $3,000 per commercial referral.</p>
            <div className="scene-actions">
              <a className="scene-primary" href="#referral-form">Start a referral <ArrowRight aria-hidden="true" /></a>
              <a className="scene-secondary" href="#property-types">See who to refer <ArrowRight aria-hidden="true" /></a>
            </div>
            <ul className="customer-hero-proof" aria-label="Customer referral program highlights">
              <li><strong>5%</strong><span>Up to $3,000</span></li>
              <li><strong>1 business day</strong><span>Reliable follows up</span></li>
              <li><strong>50 locations</strong><span>Coverage across Ohio</span></li>
            </ul>
          </motion.div>
        </section>

        <motion.section className="customer-form-page" id="referral-form" aria-labelledby="cust-form-title" {...reveal}>
          <div className="customer-form-page-intro">
            <p className="clean-kicker">Customer referral form</p>
            <h2 id="cust-form-title">Make the introduction.</h2>
            <p>Three short steps. Reliable confirms the referral and follows up within one business day.</p>
          </div>
          <CustomerReferralForm />
        </motion.section>

        {/* Slide show of various types of customers. */}
        <motion.section className="cust-section cust-gallery-section" id="property-types" aria-labelledby="cust-gallery-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Who to refer</p>
              <h2 id="cust-gallery-title">Commercial properties <em>we protect.</em></h2>
            </div>
            <p>Swipe through the commercial property types Reliable serves, from single sites to entire portfolios.</p>
          </div>
          <SectorCarousel />
        </motion.section>

        {/* Video of me explaining the program. Copy and two actions on the left; the thumbnail on the
            right with its caption and the referral numbers underneath. */}
        <motion.section className="cvid" id="program-video" aria-labelledby="cust-video-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <div className="cvid-copy">
            <p className="clean-kicker">Program video</p>
            <h2 id="cust-video-title">Hear how the referral program <em>works.</em></h2>
            <p className="cvid-lede">A walkthrough of the program, the customers Reliable is looking for and what happens once you make an introduction.</p>
            <div className="cvid-actions">
              <a className="cvid-outline" href="#property-types">See who to refer <ArrowRight aria-hidden="true" /></a>
              <a className="section-cta cvid-solid" href="#referral-form">Refer a Customer <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="cvid-media">
            {/* TODO: swap for the client's customer-program walkthrough once it's recorded.
                This is Reliable's Next Day Pay video (the same one on the home page), standing in. */}
            <VideoLightbox
              youtubeId="oWfCgCu-XPY"
              title="Next day pay at Reliable"
              thumbnail="/images/next-day-pay-video-thumb.jpg"
              caption="Watch: Next day pay"
              note="Customer program walkthrough coming soon"
            />
            <dl className="cvid-stats">
              <div><dt>5%</dt><dd>Referral fee per entity</dd></div>
              <div><dt>$3,000</dt><dd>Max per commercial referral</dd></div>
              <div><dt>1 day</dt><dd>Business-day follow-up</dd></div>
            </dl>
          </div>
        </motion.section>

        {/* Selling proposition for customers, then fee structure and service limitations. */}
        <motion.section className="cust-section cust-terms" id="why-reliable" aria-labelledby="cust-terms-title" {...reveal}>
          <div className="cust-head">
            <div>
              <p className="clean-kicker">Selling proposition</p>
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
          </div>
        </motion.section>

        {/* Service limitations: the home page's "Why refer with Reliable?" section (same classes, same
            icons, same mobile marquee), turned dark for the page's one navy band. */}
        <motion.section className="cust-limits" id="service-limitations" aria-labelledby="cust-limits-title" {...reveal}>
          <div className="snowy-heading">
            <p className="clean-kicker">Service limitations</p>
            <h2 id="cust-limits-title">Where Reliable can <em>take the work on.</em></h2>
            <p>There is limited availability for route work. For larger sites, these are the conditions that let Reliable commit a dedicated crew.</p>
          </div>
          <div className="benefit-marquee">
            <div className="benefit-grid">
              {[...LIMITS, ...LIMITS].map(({ icon: Icon, title, copy }, index) => (
                <article
                  key={`${title}-${index}`}
                  className={`${index % LIMITS.length === 2 ? "benefit-card benefit-card-featured" : "benefit-card"}${index >= LIMITS.length ? " benefit-card-clone" : ""}`}
                  aria-hidden={index >= LIMITS.length ? "true" : undefined}
                >
                  <span><Icon aria-hidden="true" /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="proof-row" aria-label="Reliable at a glance">
            <p><MapPin aria-hidden="true" /><span><strong>All of Ohio</strong>50 satellite locations</span></p>
            <p><Clock3 aria-hidden="true" /><span><strong>Quick response</strong>Within one business day</span></p>
            <p><ShieldCheck aria-hidden="true" /><span><strong>Family owned</strong>40 years of experience</span></p>
          </div>
        </motion.section>

        {/* Map of service area: the country, with Ohio lifted out of it and every satellite
            location pinned. Floats on the section rather than sitting in a panel. */}
        <motion.section className="cust-section cust-map" id="service-area" aria-labelledby="cust-map-title" {...reveal}>
          <div className="cust-map-grid">
            <figure className="cust-map-figure">
              <UsServiceMap />
              <figcaption className="cust-map-callout">
                <span className="cust-map-callout-dot" aria-hidden="true" />
                <span className="cust-map-callout-copy">
                  <small>Statewide coverage</small>
                  <strong>50 satellite locations across Ohio</strong>
                </span>
              </figcaption>
            </figure>

            <div className="cust-map-copy">
              <p className="clean-kicker">Map of service area</p>
              <h2 id="cust-map-title"><span className="cust-map-line">All of Ohio, from</span> <em className="cust-map-line">50 satellite locations.</em></h2>
              <p className="cust-map-lede">Reliable works one state, thoroughly. Crews are never more than 15 minutes from the properties they protect.</p>

              <h3>Metro areas</h3>
              <ul className="cust-map-cities">
                {SERVICE_AREA.cities.map((city) => (
                  <li key={city}><MapPin aria-hidden="true" /> {city} area</li>
                ))}
              </ul>

              <h3>Counties served</h3>
              <ul className="cust-map-counties">
                {SERVICE_AREA.counties.map((county) => (
                  <li key={county}>{county} County</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Top questions for customers. */}
        <FaqSection
          items={CUSTOMER_FAQS}
          eyebrow="Customer FAQ"
          heading={<>Top questions <em>from customers.</em></>}
          intro="Straight answers about who Reliable serves, where, and what happens after you make an introduction."
        />

        {/* The CTA and the footer share one tree background, laid on this wrapper rather than on
            each section, so the forest runs unbroken from one into the other. */}
        <div className="cta-footer-band">
          {/* Closing CTA: type only, no imagery, running straight into the footer. The button goes to the
              referral form under the hero. */}
          <motion.section className="cust-cta" id="make-a-referral" aria-labelledby="cust-cta-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {/* Copy on the left, actions on the right, the pair centred as one block. */}
            <div className="cust-cta-inner">
              <div className="cust-cta-copy">
                <p className="clean-kicker">Ready to refer?</p>
                <h2 id="cust-cta-title">Know a commercial <em>property?</em></h2>
                <p>Make the introduction in three short steps and Reliable takes it from there.</p>
              </div>
              <div className="cust-cta-actions">
                <a className="section-cta cust-cta-button" href="#referral-form">
                  Refer a Customer <ArrowRight aria-hidden="true" />
                </a>
                <a className="scene-secondary cust-cta-secondary" href="#property-types">
                  See who to refer <ArrowRight aria-hidden="true" />
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
