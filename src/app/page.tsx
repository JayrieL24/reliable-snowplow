import Image from "next/image";
import { ArrowDown, Check, FileText, Snowflake } from "lucide-react";
import { SiteNavbar } from "@/components/ui/site-navbar";
import { ServiceShowcase } from "@/components/ui/service-showcase";
import { PlowTraces } from "@/components/ui/plow-traces";
import { TestimonialsStage } from "@/components/ui/testimonials-stage";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { FaqSection } from "@/components/ui/faq-section";
import { CtaBanner } from "@/components/ui/cta-banner";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function HomePage() {
  return (
    <main>
      <SiteNavbar />

      <div className="snow-field">
      <section className="hero-shell" id="home">
        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> One introduction can go a long way</p>
            <h1>Refer good people.<br />Get rewarded.</h1>
            <p className="hero-intro">
              Know a customer who needs reliable service or a worker who is ready to help? Send an introduction in minutes and we&apos;ll take it from there.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#programs">Start a referral <Arrow /></a>
              <a className="text-link" href="#how-it-works">How the program works <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note"><span aria-hidden="true">✓</span> No account needed. Takes about two minutes.</p>
          </div>

          <div className="platform-stage">
            <Image
              className="platform-dashboard"
              src="/images/referral-dashboard-flat.png"
              alt="Snow Referrals dashboard showing referrals, contacts, qualification status, rewards, and referral progress"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 900px) 94vw, 1120px"
            />
          </div>

        </div>
      </section>

      <section className="trust-strip" aria-label="Program facts">
        <div className="trust-intro">
          <div className="float-card float-card-top" aria-hidden="true">
            <span className="float-card-icon float-card-icon-blue">
              <Snowflake />
            </span>
            <span className="float-card-text">
              <strong>Reward approved</strong>
              Jamie R. · $200
            </span>
          </div>

          <p className="trust-kicker">Quick facts</p>
          <h2>Built on clear terms and reliable follow-through.</h2>
          <p className="trust-copy">
            Every number here comes from how the program is written—not from marketing. No fine print, no moving targets.
          </p>

          <div className="float-card float-card-bottom" aria-hidden="true">
            <span className="float-card-icon float-card-icon-green">
              <Check />
            </span>
            <span className="float-card-text">
              <strong>Follow-up sent</strong>
              Within 24 hours
            </span>
          </div>
        </div>

        <dl className="trust-stats">
          <div>
            <dt>$200</dt>
            <dd>Per approved referral</dd>
          </div>
          <div>
            <dt>24 hrs</dt>
            <dd>Follow-up commitment</dd>
          </div>
          <div>
            <dt>$0</dt>
            <dd>Cost to refer someone</dd>
          </div>
          <div>
            <dt>2 min</dt>
            <dd>Average submission time</dd>
          </div>
          <div>
            <dt>2</dt>
            <dd>Ways to refer</dd>
          </div>
          <div>
            <dt>100%</dt>
            <dd>Published reward rates</dd>
          </div>
        </dl>
      </section>

      <section className="intro-section" id="how-it-works">
        <div>
          <p className="section-kicker">How it works</p>
          <h2>A better way to keep good work moving.</h2>
        </div>
        <p className="section-copy">
          Whether you know a property owner who needs help or a dependable operator looking for winter work, your introduction should be easy, transparent, and worth it.
        </p>
      </section>
      </div>

      <section className="programs" id="programs">
        <article className="program-card customer-card">
          <div className="program-number">01</div>
          <p className="section-kicker">Customer referrals</p>
          <h3>Know someone who needs a clear driveway?</h3>
          <p>Send their details and our team will handle the rest with a prompt, professional follow-up.</p>
          <a href="#customer-form">Refer a customer <Arrow /></a>
        </article>
        <article className="program-card worker-card">
          <div className="program-number">02</div>
          <p className="section-kicker">Worker referrals</p>
          <h3>Know a reliable person ready to move snow?</h3>
          <p>Introduce an experienced operator or dependable winter worker to our growing network.</p>
          <a href="#worker-form">Refer a worker <Arrow /></a>
        </article>
      </section>

      <ServiceShowcase
        eyebrow="Service levels"
        heading={<>Four ways to<br />keep a property clear.</>}
        intro="Each level sets its own trigger depth, timing, and treatment. Play one to hear it explained."
      />

      <section className="resources" id="resources">
        <p className="section-kicker">Program resources</p>
        <h2>Everything up front.<br />No surprises later.</h2>
        <p className="resources-copy">
          The full worker program—rules, rates, and how payouts work—in one document. Read it before you refer anyone.
        </p>

        <div className="doc-banner">
          <div className="doc-banner-id">
            <span className="doc-banner-mark" aria-hidden="true">
              <FileText />
              <span>PDF</span>
            </span>
            <span className="doc-banner-name">
              <strong>Worker Program Overview</strong>
              Rules, rates &amp; payouts · Free · No sign-up
            </span>
          </div>

          <ul className="doc-banner-points">
            <li><Check aria-hidden="true" /> Reward rates in full</li>
            <li><Check aria-hidden="true" /> Qualification rules</li>
            <li><Check aria-hidden="true" /> Payout timing</li>
            <li><Check aria-hidden="true" /> Who can refer</li>
          </ul>

          <button type="button" className="doc-download">
            Download
            <ArrowDown aria-hidden="true" />
          </button>
        </div>
      </section>

      <TestimonialsStage />

      <CtaBanner />

      <FaqSection />

      <footer>
        <PlowTraces className="footer-traces" />

        <div className="footer-inner">
          <div className="footer-identity">
            <a className="footer-brand" href="#home" aria-label="Snow Plow Referrals home">
              <Snowflake className="gnav-mark" aria-hidden="true" />
              <span className="gnav-wordmark">
                Snow Plow
                <br />
                Referrals
              </span>
            </a>

            <p className="footer-tagline">
              Built to connect good people with reliable snow service.
            </p>

            {/* TODO: replace "#" with the real profile URLs. */}
            <ul className="footer-socials" aria-label="Social media">
              <li>
                <a href="#" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Instagram">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href="#" aria-label="YouTube">
                  <YoutubeIcon />
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="Services">
            <h3>Services</h3>
            <ul>
              <li><a href="#watch">Service levels</a></li>
              <li><a href="#programs">Service area</a></li>
              <li><a href="#watch">Weather monitoring</a></li>
              <li><a href="#resources">ECO&sup2; salt</a></li>
              <li><a href="#programs">Plow equipment</a></li>
            </ul>
          </nav>

          <div className="footer-col footer-contact">
            <h3>24/7 dispatch</h3>
            <ul>
              <li>
                <a href="tel:+18779375691">
                  <span>Toll free</span>
                  <strong>1.877.937.5691</strong>
                </a>
              </li>
              <li>
                <a href="tel:+13304677273">
                  <span>Akron</span>
                  <strong>330.467.7273</strong>
                </a>
              </li>
              <li>
                <a href="tel:+12165705243">
                  <span>Cleveland</span>
                  <strong>216.570.5243</strong>
                </a>
              </li>
              <li>
                <a href="tel:+13802911130">
                  <span>Columbus</span>
                  <strong>380.291.1130</strong>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <ul className="footer-assoc" aria-label="Memberships">
            <li>SIMA North</li>
            <li>American Snow</li>
            <li>BOMA</li>
          </ul>
          <p className="footer-area">Northern &amp; Central Ohio · 25+ counties</p>
          <a className="footer-email" href="mailto:hello@snowplowreferrals.com">
            hello@snowplowreferrals.com
          </a>
        </div>
      </footer>
    </main>
  );
}
