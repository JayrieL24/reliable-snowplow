"use client";

import { CommercialShowcase } from "@/components/ui/commercial-showcase";
import { APPLY_URL, SERVICE_NOTES, WORK_CARDS } from "@/lib/service-content";

/* The changelist note: "thumbnail video at the top explaining program, then the services
   underneath." Same deck as the commercial property showcase, showing Reliable's own seven
   services with the client's hiring site as the call to action.

   This wrapper exists because the deck takes a CTA builder and note icons, and functions
   cannot be handed from a server component to a client one — so they are bound here. */
export function ServicesShowcase() {
  return (
    <CommercialShowcase
      id="services"
      items={WORK_CARDS}
      kicker="Winter positions"
      heading={<>The work we&apos;re <em>hiring for.</em></>}
      aside={<>Every position Reliable is filling this winter, from sidewalk crews to loader operators &mdash; <em>some need no experience at all.</em></>}
      notes={SERVICE_NOTES}
      noun="position"
      whyLabel="What's included"
      landscape
      cta={() => ({ href: APPLY_URL, label: "Apply now!", external: true })}
    />
  );
}
