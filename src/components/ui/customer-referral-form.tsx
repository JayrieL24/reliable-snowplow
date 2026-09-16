"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check } from "lucide-react";
import { openReferralPreview } from "@/components/ui/coming-soon";
import { SECTORS } from "@/lib/referral-content";

const STEPS = ["Your details", "The property", "Contact & review"] as const;

export function CustomerReferralForm() {
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
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

  const continueToNextStep = () => {
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-form-step="${step}"]`);
    const controls = Array.from(panel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea") ?? []);
    const invalid = controls.find((control) => !control.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  return (
    <form
      ref={formRef}
      className="customer-step-form"
      onSubmit={(event) => {
        event.preventDefault();
        openReferralPreview("customer");
      }}
    >
      <ol className="customer-stepper" aria-label="Referral form progress">
        {STEPS.map((label, index) => (
          <li key={label} className={index === step ? "is-current" : index < step ? "is-complete" : ""} aria-current={index === step ? "step" : undefined}>
            <span>{index < step ? <Check aria-hidden="true" /> : index + 1}</span>
            <strong>{label}</strong>
          </li>
        ))}
      </ol>

      <div className="customer-step-panel" data-form-step="0" hidden={step !== 0}>
        <div className="customer-step-heading">
          <p>Step 1 of 3</p>
          <h3>First, tell us about you.</h3>
          <span>We&apos;ll use this information to confirm and track your referral.</span>
        </div>
        <fieldset>
          <legend>Your information</legend>
          <label className="full-field">Your name<input name="referrerName" autoComplete="name" required /></label>
          <label>Phone<input name="referrerPhone" type="tel" autoComplete="tel" required /></label>
          <label>Email<input name="referrerEmail" type="email" autoComplete="email" required /></label>
        </fieldset>
      </div>

      <div className="customer-step-panel" data-form-step="1" hidden={step !== 1}>
        <div className="customer-step-heading">
          <p>Step 2 of 3</p>
          <h3>Which property are you referring?</h3>
          <span>Basic property details help Reliable determine the right next step.</span>
        </div>
        <fieldset>
          <legend>Property information</legend>
          <label className="full-field">Business or property name<input name="propertyName" required /></label>
          <label>
            Property type
            <select ref={typeRef} name="propertyType" required defaultValue="">
              <option value="" disabled>Choose a type</option>
              {SECTORS.map((sector) => <option key={sector.slug} value={sector.slug}>{sector.name}</option>)}
            </select>
          </label>
          <label>City<input name="propertyCity" autoComplete="address-level2" required /></label>
          <label className="full-field">
            Approximate lot size
            <select name="lotSize" required defaultValue="">
              <option value="" disabled>Choose a size</option>
              <option value="large">Walmart-size or larger</option>
              <option value="smaller">Smaller than a Walmart lot</option>
              <option value="unsure">Not sure</option>
            </select>
          </label>
        </fieldset>
      </div>

      <div className="customer-step-panel" data-form-step="2" hidden={step !== 2}>
        <div className="customer-step-heading">
          <p>Step 3 of 3</p>
          <h3>Who should Reliable contact?</h3>
          <span>Add the best contact at the property and any context that would help.</span>
        </div>
        <fieldset>
          <legend>Property contact</legend>
          <label>Contact name<input name="contactName" required /></label>
          <label>Phone or email<input name="contactInfo" required /></label>
          <label className="full-field">Anything else we should know?<textarea name="notes" rows={4} placeholder="Optional details about the property or introduction" /></label>
        </fieldset>
        <label className="consent customer-step-consent">
          <input type="checkbox" name="consent" required />
          <span>I have permission to share this contact&apos;s information with Reliable.</span>
        </label>
      </div>

      <div className="customer-step-actions">
        {step > 0 ? (
          <button className="customer-step-back" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" />Back</button>
        ) : <span />}
        <p>{step + 1} of {STEPS.length}</p>
        {step < STEPS.length - 1 ? (
          <button className="customer-step-next" type="button" onClick={continueToNextStep}>Continue<ArrowRight aria-hidden="true" /></button>
        ) : (
          <button className="customer-step-next" type="submit">Send referral<ArrowRight aria-hidden="true" /></button>
        )}
      </div>
    </form>
  );
}
