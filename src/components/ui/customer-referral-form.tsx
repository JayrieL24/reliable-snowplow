"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import { openReferralPreview } from "@/components/ui/coming-soon";
import { SECTORS } from "@/lib/referral-content";

/* Customer referral form (preview). The outline doesn't define customer fields, so these are
   the basics the team needs to follow up. DRAFT — confirm with the client. Submitting opens
   the "Coming soon" modal until the form has somewhere to send.

   The property type can be preselected with ?property=<slug> or by the slideshow's
   "customer-referral-property" event. */
export function CustomerReferralForm() {
  const typeRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const select = (slug: string | null) => {
      if (slug && typeRef.current && SECTORS.some((sector) => sector.slug === slug)) typeRef.current.value = slug;
    };
    select(new URLSearchParams(window.location.search).get("property"));
    const onProperty = (event: Event) => select((event as CustomEvent<string>).detail);
    window.addEventListener("customer-referral-property", onProperty);
    return () => window.removeEventListener("customer-referral-property", onProperty);
  }, []);

  return (
    <form
      className="form-shell cust-form-shell"
      onSubmit={(event) => {
        event.preventDefault();
        openReferralPreview("customer");
      }}
    >
      <div className="form-title">
        <span><Building2 aria-hidden="true" /></span>
        <div>
          <p className="eyebrow">Customer referral</p>
          <h3>Tell us about the property</h3>
        </div>
      </div>

      <fieldset>
        <legend>Your information</legend>
        <label>Your name<input name="referrerName" autoComplete="name" required /></label>
        <label>Phone<input name="referrerPhone" type="tel" autoComplete="tel" required /></label>
        <label className="full-field">Email<input name="referrerEmail" type="email" autoComplete="email" required /></label>
      </fieldset>

      <fieldset>
        <legend>The property</legend>
        <label>Business or property name<input name="propertyName" required /></label>
        <label>
          Property type
          <select ref={typeRef} name="propertyType" required defaultValue="">
            <option value="" disabled>Choose a type</option>
            {SECTORS.map((sector) => (
              <option key={sector.slug} value={sector.slug}>{sector.name}</option>
            ))}
          </select>
        </label>
        <label>City<input name="propertyCity" autoComplete="address-level2" required /></label>
        <label>
          Lot size
          <select name="lotSize" defaultValue="">
            <option value="" disabled>Choose a size</option>
            <option value="large">Walmart-size or larger</option>
            <option value="smaller">Smaller than a Walmart lot</option>
            <option value="unsure">Not sure</option>
          </select>
        </label>
        <label>Property contact name<input name="contactName" /></label>
        <label>Contact phone or email<input name="contactInfo" /></label>
        <label className="full-field">Anything else we should know?<textarea name="notes" rows={4} /></label>
      </fieldset>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I have permission to share this contact&apos;s information with Reliable.</span>
      </label>
      <button type="submit" className="submit-button">Send referral <ArrowRight aria-hidden="true" /></button>
      <p className="form-note">Forms are in preview. Submitting shows what happens next.</p>
    </form>
  );
}
