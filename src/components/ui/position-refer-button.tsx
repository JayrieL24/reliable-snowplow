"use client";

import { ArrowRight } from "lucide-react";

/* "Refer for this role": scrolls to the referral form and preselects the position. */
export function PositionReferButton({ slug }: { slug: string }) {
  return (
    <a
      className="work-position-cta"
      href="#referral-form"
      onClick={() => window.dispatchEvent(new CustomEvent("worker-referral-position", { detail: slug }))}
    >
      Refer for this role <ArrowRight aria-hidden="true" />
    </a>
  );
}
