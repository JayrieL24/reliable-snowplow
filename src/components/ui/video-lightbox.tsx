"use client";

import Image from "next/image";
import * as React from "react";
import { Play, X } from "lucide-react";

/* A video thumbnail that opens a YouTube embed in a modal styled like the
   ComingSoonModal (same scrim, close button and entrance animation). */
export function VideoLightbox({
  youtubeId,
  title,
  thumbnail,
  caption,
  note,
}: {
  youtubeId: string;
  title: string;
  thumbnail: string;
  caption: string;
  note: string;
}) {
  const [open, setOpen] = React.useState(false);
  const closeButton = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button className="intro-video-card" type="button" onClick={() => setOpen(true)} aria-label={`Play video: ${title}`}>
        <span className="intro-video-frame">
          <Image src={thumbnail} alt="" fill sizes="(max-width: 1100px) 100vw, 60vw" />
          <span className="intro-video-play" aria-hidden="true"><Play /></span>
        </span>
        <span className="intro-video-caption"><strong>{caption}</strong><span>{note}</span></span>
      </button>

      {open && (
        <div className="preview-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section className="video-modal-card" role="dialog" aria-modal="true" aria-label={title}>
            <button ref={closeButton} className="preview-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close video">
              <X aria-hidden="true" />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </section>
        </div>
      )}
    </>
  );
}
