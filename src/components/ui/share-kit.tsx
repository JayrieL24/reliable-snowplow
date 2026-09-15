"use client";

import { useState } from "react";
import { Check, Copy, Mail, MessageSquare } from "lucide-react";
import { SHARE_EMAIL, SHARE_TEXT } from "@/lib/worker-content";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="share-copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/* Ready-to-send email and text for referrers to promote the program to friends. The email
   also opens straight in the visitor's mail app; the text in their messages app on phones. */
export function ShareKit() {
  const emailFull = `Subject: ${SHARE_EMAIL.subject}\n\n${SHARE_EMAIL.body}`;
  const mailto = `mailto:?subject=${encodeURIComponent(SHARE_EMAIL.subject)}&body=${encodeURIComponent(SHARE_EMAIL.body)}`;
  const sms = `sms:?&body=${encodeURIComponent(SHARE_TEXT)}`;

  return (
    <div className="share-grid">
      <article className="share-card">
        <div className="share-card-head">
          <span className="share-icon"><Mail aria-hidden="true" /></span>
          <div><p>Email to friends</p><strong>{SHARE_EMAIL.subject}</strong></div>
        </div>
        <pre className="share-body">{SHARE_EMAIL.body}</pre>
        <div className="share-actions">
          <CopyButton text={emailFull} />
          <a className="share-open" href={mailto}>Open in email</a>
        </div>
      </article>

      <article className="share-card share-card-text">
        <div className="share-card-head">
          <span className="share-icon"><MessageSquare aria-hidden="true" /></span>
          <div><p>Text message</p><strong>Short and easy to forward</strong></div>
        </div>
        <p className="share-bubble">{SHARE_TEXT}</p>
        <div className="share-actions">
          <CopyButton text={SHARE_TEXT} />
          <a className="share-open" href={sms}>Open in messages</a>
        </div>
      </article>
    </div>
  );
}
