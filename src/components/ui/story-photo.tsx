"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* Max vertical drift of the photo inside its frame, as a share of the frame height.
   The image layer is oversized by more than this (see .story-photo-layer), so no
   edge ever shows. */
const DRIFT = 0.045;

/* Company story team photo in a wide rounded frame. As the frame crosses the
   viewport the photo drifts slightly slower than the page (scroll parallax).
   Static for reduced-motion users and before hydration. */
export function StoryPhoto({ src, alt }: { src: string; alt: string }) {
  const frameRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (reduceMotion.matches) {
        frame.style.setProperty("--story-drift", "0px");
        return;
      }
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when the frame's centre is at the bottom of the screen, +1 at the top.
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2)));
      frame.style.setProperty("--story-drift", `${(progress * DRIFT * rect.height).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduceMotion.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMotion.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <figure ref={frameRef} className="story-photo">
      <span className="story-photo-layer">
        <Image src={src} alt={alt} fill sizes="(max-width: 1520px) 100vw, 1480px" />
      </span>
    </figure>
  );
}
