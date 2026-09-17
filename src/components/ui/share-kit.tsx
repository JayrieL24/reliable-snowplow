"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, Mail, MessageSquare, Share2 } from "lucide-react";
import { SHARE_EMAIL, SHARE_SOCIAL, SHARE_TEXT } from "@/lib/worker-content";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="section-cta share-copy"
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
      <span aria-live="polite">{copied ? "Copied" : label}</span>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
    </button>
  );
}

const CHANNELS = [
  {
    key: "text", icon: MessageSquare, label: "Text message", hint: "Short and easy to forward",
    copy: SHARE_TEXT,
    copyLabel: "Copy Message",
  },
  {
    key: "email", icon: Mail, label: "Email", hint: "A fuller note for friends",
    copy: `Subject: ${SHARE_EMAIL.subject}\n\n${SHARE_EMAIL.body}`,
    copyLabel: "Copy Template",
  },
  {
    key: "social", icon: Share2, label: "Social post", hint: "For Facebook and group pages",
    copy: SHARE_SOCIAL,
    copyLabel: "Copy Caption",
  },
] as const;

/* Ready-to-send messages for referrers, as a tabbed composer: the intro and channel tabs on the
   left, one large preview of the chosen message on the right with a copy button. */
export function ShareKit({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<(typeof CHANNELS)[number]["key"]>("text");
  const channel = CHANNELS.find((c) => c.key === active)!;

  const preview: Record<typeof active, ReactNode> = {
    text: (
      <div className="share-phone">
        <p className="share-phone-to">To: a friend</p>
        <p className="share-bubble">{SHARE_TEXT}</p>
      </div>
    ),
    email: (
      <div className="share-mail">
        <p className="share-mail-subject"><span>Subject</span>{SHARE_EMAIL.subject}</p>
        <pre className="share-body">{SHARE_EMAIL.body}</pre>
      </div>
    ),
    social: (
      <div className="share-social">
        <p className="share-social-head"><span className="share-social-avatar" aria-hidden="true">You</span><strong>Your post</strong></p>
        <p className="share-post">{SHARE_SOCIAL}</p>
      </div>
    ),
  };

  return (
    <div className="share-layout">
      <div className="share-intro program-copy-block">
        {children}
        <div className="share-tabs" role="tablist" aria-label="Message type">
          {CHANNELS.map(({ key, icon: Icon, label, hint }) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`share-tab-${key}`}
              aria-selected={active === key}
              aria-controls="share-panel"
              className={active === key ? "is-active" : undefined}
              onClick={() => setActive(key)}
            >
              <Icon aria-hidden="true" />
              <span><strong>{label}</strong>{hint}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="share-panel" id="share-panel" role="tabpanel" aria-labelledby={`share-tab-${channel.key}`}>
        <div className="share-panel-head">
          <span className="share-panel-icon" aria-hidden="true"><channel.icon /></span>
          <span><small>{channel.label}</small><strong>{channel.hint}</strong></span>
        </div>
        <div className="share-preview">{preview[channel.key]}</div>
        <div className="share-actions">
          <CopyButton key={channel.key} text={channel.copy} label={channel.copyLabel} />
        </div>
      </div>
    </div>
  );
}
