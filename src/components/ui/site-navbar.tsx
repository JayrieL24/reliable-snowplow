"use client";

import * as React from "react";
import { ArrowUpRight, Menu, Phone, Snowflake, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Programs", href: "#programs" },
  { name: "Refer a customer", href: "#programs" },
  { name: "Refer a worker", href: "#programs" },
  { name: "Resources", href: "#resources" },
];

// TODO: replace with the real emergency line.
const PHONE_LABEL = "(555) 123-4567";
const PHONE_HREF = "tel:+15551234567";

const Wordmark = ({ className }: { className?: string }) => (
  <>
    <Snowflake className={cn("gnav-mark", className)} aria-hidden="true" />
    <span className="gnav-wordmark">
      Snow Plow
      <br />
      Referrals
    </span>
  </>
);

export function SiteNavbar() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  // Lock body scroll and allow Esc to close while the drawer is open.
  React.useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="gnav-header">
        <div className="gnav-shell">
          <a className="gnav-brand" href="#home" aria-label="Snow Plow Referrals home">
            <Wordmark />
          </a>

          <nav className="gnav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="gnav-actions">
            <a className="gnav-phone" href={PHONE_HREF}>
              <span className="gnav-phone-tile" aria-hidden="true">
                <Phone />
              </span>
              <span className="gnav-phone-stack">
                <span className="gnav-phone-label">24/7 emergency</span>
                <span className="gnav-phone-number">{PHONE_LABEL}</span>
              </span>
            </a>

            <a className="gnav-cta" href="#programs">
              Send a referral
              <ArrowUpRight aria-hidden="true" />
            </a>

            <button
              type="button"
              className="gnav-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="gnav-drawer"
            >
              <Menu aria-hidden="true" />
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn("gnav-scrim", isMenuOpen && "is-open")}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="gnav-drawer"
        className={cn("gnav-drawer", isMenuOpen && "is-open")}
        aria-label="Site menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <div className="gnav-drawer-top">
          <span className="gnav-brand gnav-brand-navy">
            <Wordmark />
          </span>
          <button
            type="button"
            className="gnav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <p className="gnav-drawer-kicker">Menu</p>

        <nav className="gnav-drawer-links" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.name}
            </a>
          ))}
        </nav>

        <div className="gnav-drawer-actions">
          <a className="gnav-drawer-phone" href={PHONE_HREF}>
            <Phone aria-hidden="true" />
            <span>
              <span className="gnav-phone-label">24/7 emergency</span>
              <span className="gnav-phone-number">{PHONE_LABEL}</span>
            </span>
          </a>
          <a className="gnav-cta" href="#programs" onClick={() => setMenuOpen(false)}>
            Send a referral
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </aside>

      <a
        className={cn("gnav-call-fab", isMenuOpen && "is-hidden")}
        href={PHONE_HREF}
        aria-label={`Call our 24/7 emergency line at ${PHONE_LABEL}`}
      >
        <Phone aria-hidden="true" />
      </a>
    </>
  );
}
