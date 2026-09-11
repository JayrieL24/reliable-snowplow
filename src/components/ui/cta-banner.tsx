import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SaltScatter } from "@/components/ui/salt-scatter";

export function CtaBanner({ className }: { className?: string }) {
  return (
    <section className={cn("cta", className)} id="start">
      <SaltScatter className="cta-scatter" />

      <div className="cta-inner">
        <div className="cta-copy">
          <h2>
            Ready to send your <span className="cta-underline">first referral</span>?
          </h2>
          <p>
            Two minutes, no account, and a published $200 for every approved referral.
            We&apos;ll follow up within 24 hours.
          </p>

          <div className="cta-actions">
            <a className="cta-button" href="#programs">
              Start a referral
              <ArrowUpRight aria-hidden="true" />
            </a>
            <p className="cta-note">No account required.</p>
          </div>
        </div>

        <div className="cta-figure">
          <Image
            src="/images/reliable-equipment.png"
            alt="A Reliable Snow Plowing truck clearing a lot at night during snowfall"
            width={633}
            height={422}
            sizes="(max-width: 900px) 90vw, 560px"
          />
        </div>
      </div>
    </section>
  );
}
