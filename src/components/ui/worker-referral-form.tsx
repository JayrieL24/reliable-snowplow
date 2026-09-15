"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, HardHat } from "lucide-react";
import { openReferralPreview } from "@/components/ui/coming-soon";
import { HOW_KNOWN, POSITIONS } from "@/lib/worker-content";

/* Worker referral form (preview), with the fields from the client's "Easy Application Form"
   spec. The two update opt-ins cover "Affiliate Enrollment for Marketing" (email and text
   campaigns). Submitting opens the "Coming soon" modal until the form has somewhere to send.

   The position can be preselected with ?position=<slug> or the positions grid's
   "worker-referral-position" event. */
export function WorkerReferralForm() {
  const positionRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const select = (slug: string | null) => {
      if (slug && positionRef.current && POSITIONS.some((position) => position.slug === slug)) positionRef.current.value = slug;
    };
    select(new URLSearchParams(window.location.search).get("position"));
    const onPosition = (event: Event) => select((event as CustomEvent<string>).detail);
    window.addEventListener("worker-referral-position", onPosition);
    return () => window.removeEventListener("worker-referral-position", onPosition);
  }, []);

  return (
    <form
      className="form-shell cust-form-shell"
      onSubmit={(event) => {
        event.preventDefault();
        openReferralPreview("worker");
      }}
    >
      <div className="form-title">
        <span><HardHat aria-hidden="true" /></span>
        <div>
          <p className="eyebrow">Worker referral</p>
          <h3>Refer a snow fighter</h3>
        </div>
      </div>

      <fieldset>
        <legend>Your information</legend>
        <label className="full-field">Your name<input name="referrerName" autoComplete="name" required /></label>
        <div className="full-field choice-field" role="radiogroup" aria-labelledby="how-known-label">
          <span id="how-known-label">How did you know about Reliable?</span>
          <div className="choice-group">
            {HOW_KNOWN.map((option, i) => (
              <label key={option}>
                <input type="radio" name="howKnown" value={option} required={i === 0} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        <label>Phone<input name="referrerPhone" type="tel" autoComplete="tel" required /></label>
        <label>Email<input name="referrerEmail" type="email" autoComplete="email" required /></label>
      </fieldset>

      <fieldset>
        <legend>Potential snow fighter</legend>
        <label>Name<input name="candidateName" required /></label>
        <label>Contact info<input name="candidateContact" placeholder="Phone or email" required /></label>
        <label>Relationship to you<input name="relationship" placeholder="Friend, family, coworker…" required /></label>
        <label>Location<input name="candidateLocation" placeholder="City" required /></label>
        <label className="full-field">
          Potential fit for position
          <select ref={positionRef} name="position" required defaultValue="">
            <option value="" disabled>Choose a position</option>
            {POSITIONS.map((position) => (
              <option key={position.slug} value={position.slug}>{position.title}</option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </label>
        <label className="full-field">Relevant info<textarea name="relevantInfo" rows={4} placeholder="Experience, equipment, licenses, availability" /></label>
      </fieldset>

      <div className="optin-group">
        <p>Share more with friends</p>
        <label className="consent"><input type="checkbox" name="optinEmail" /><span>Email me program updates and messages I can forward to friends.</span></label>
        <label className="consent"><input type="checkbox" name="optinText" /><span>Text me program updates and messages I can share.</span></label>
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I have permission to share this person&apos;s contact information with Reliable.</span>
      </label>
      <button type="submit" className="submit-button">Send referral <ArrowRight aria-hidden="true" /></button>
      <p className="form-note">Forms are in preview. Submitting shows what happens next.</p>
    </form>
  );
}
