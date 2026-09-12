"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

type ReferralKind = "customer" | "worker" | "referral";

const eventName = "reliable-referral-preview";

export function ReferralTrigger({
  className,
  kind,
  children,
}: {
  className?: string;
  kind: ReferralKind;
  children: React.ReactNode;
}) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(eventName, { detail: { kind } }))}
    >
      {children}
    </button>
  );
}

export function ComingSoonModal() {
  const [kind, setKind] = React.useState<ReferralKind | null>(null);
  const closeButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    function open(event: Event) {
      setKind((event as CustomEvent<{ kind: ReferralKind }>).detail.kind);
    }

    window.addEventListener(eventName, open);
    return () => window.removeEventListener(eventName, open);
  }, []);

  React.useEffect(() => {
    if (!kind) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setKind(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [kind]);

  if (!kind) return null;

  const label = kind === "customer" ? "customer referrals" : kind === "worker" ? "worker referrals" : "online referrals";

  return (
    <div className="preview-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setKind(null)}>
      <section className="preview-modal-card" role="dialog" aria-modal="true" aria-labelledby="preview-modal-title">
        <button ref={closeButton} className="preview-modal-close" type="button" onClick={() => setKind(null)} aria-label="Close dialog">
          <X aria-hidden="true" />
        </button>
        <span className="preview-modal-icon"><CheckCircle2 aria-hidden="true" /></span>
        <p className="clean-kicker">Program preview</p>
        <h2 id="preview-modal-title">Coming soon.</h2>
        <p>The {label} form is being prepared for launch. This preview shows how the finished program will work.</p>
        <button className="preview-modal-action" type="button" onClick={() => setKind(null)}>
          Continue exploring <ArrowRight aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
