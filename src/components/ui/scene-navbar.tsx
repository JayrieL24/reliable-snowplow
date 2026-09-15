"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import * as React from "react";
import { ReferralTrigger } from "@/components/ui/coming-soon";

/* Page routes, handled by Next.js client-side routing. `match` is the pathname that marks a
   link as the current page. */
const links = [
  { label: "Home", href: "/", match: "/" },
  { label: "Refer a customer", href: "/refer-a-customer", match: "/refer-a-customer" },
  { label: "Refer a worker", href: "/refer-a-worker", match: "/refer-a-worker" },
  { label: "Worker guide", href: "/#resources", match: null },
] as const;

export function SceneNavbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isCurrent = (match: string | null) => match !== null && pathname === match;

  // Close the drawer after navigating to another page.
  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <header className="scene-header">
        <Link className="scene-brand" href="/" aria-label="Snowplow Referrals home">
          <Image className="site-wordmark" src="/images/snowplow-referrals-wordmark.svg" alt="Snowplow Referrals" width={390} height={64} priority />
        </Link>

        <nav className="scene-desktop-nav" aria-label="Primary navigation">
          {links.map(({ label, href, match }) => (
            <Link key={label} href={href} aria-current={isCurrent(match) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>

        <div className="scene-header-actions">
          <ReferralTrigger className="scene-nav-action" kind="referral">Make a referral <ArrowRight aria-hidden="true" /></ReferralTrigger>
        </div>

        <button
          className="scene-menu-button"
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="scene-drawer"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" />
          <span>Menu</span>
        </button>
      </header>

      <button
        className={`scene-drawer-scrim${open ? " is-open" : ""}`}
        type="button"
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
      />

      <aside id="scene-drawer" className={`scene-drawer${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="scene-drawer-top">
          <Image src="/images/snowplow-referrals-wordmark.svg" alt="Snowplow Referrals" width={390} height={64} />
          <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
            <X aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          {links.map(({ label, href, match }) => (
            <Link key={label} href={href} aria-current={isCurrent(match) ? "page" : undefined} onClick={() => setOpen(false)}>{label}<ArrowRight aria-hidden="true" /></Link>
          ))}
        </nav>

        <ReferralTrigger className="scene-drawer-cta" kind="referral">
          Make a referral <ArrowRight aria-hidden="true" />
        </ReferralTrigger>
      </aside>
    </>
  );
}
