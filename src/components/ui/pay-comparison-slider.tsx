"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"];

/* A two-week strip: the day worked, the days waiting, and payday. */
function PayStrip({ payday, label }: { payday: number; label: string }) {
  return (
    <ol className="ndp-days" aria-label={label}>
      {WEEK.map((d, i) => (
        <li key={i} className={i === 0 ? "is-work" : i === payday ? "is-pay" : i < payday ? "is-wait" : undefined}>{d}</li>
      ))}
    </ol>
  );
}

/* Before/after slider for Next day pay. One photo in two treatments: the bright Reliable photo
   clipped to the left of the handle, over a dull, grey "typical job" layer. Each side carries its
   label, payday and a two-week pay strip. Drag, click anywhere, or use the arrow keys. */
export function PayComparisonSlider({ image, alt }: { image: string; alt: string }) {
  const [position, setPosition] = React.useState(50);
  const [dragging, setDragging] = React.useState(false);
  const frame = React.useRef<HTMLDivElement>(null);

  const moveTo = React.useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => moveTo(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, moveTo]);

  return (
    <div
      ref={frame}
      className={`ndp-compare${dragging ? " is-dragging" : ""}`}
      onPointerDown={(e) => { e.preventDefault(); setDragging(true); moveTo(e.clientX); }}
    >
      {/* Typical job: the same photo drained of colour, underneath. */}
      <div className="ndp-layer ndp-layer-typical">
        <Image src={image} alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" draggable={false} />
        <div className="ndp-side ndp-side-right" aria-hidden={position > 70}>
          <p className="ndp-side-label">Typical job</p>
          <p className="ndp-side-pay">Paid in up to 2 weeks</p>
          <PayStrip payday={13} label="Typical job: work on day 1, paid on day 14" />
        </div>
      </div>

      {/* Reliable: full colour, clipped to the left of the handle, so dragging right reveals more of it. */}
      <div className="ndp-layer ndp-layer-reliable" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={image} alt={alt} fill sizes="(max-width: 1100px) 100vw, 1100px" draggable={false} />
        <div className="ndp-side ndp-side-left">
          <p className="ndp-side-label">Reliable</p>
          <p className="ndp-side-pay">Paid the next day</p>
          <PayStrip payday={1} label="Reliable: work on day 1, paid on day 2" />
        </div>
      </div>

      <div
        className="ndp-handle"
        style={{ left: `${position}%` }}
        role="slider"
        tabIndex={0}
        aria-label="Compare a typical pay cycle with Reliable next day pay"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
        }}
      >
        <span className="ndp-handle-knob"><ChevronLeft aria-hidden="true" /><ChevronRight aria-hidden="true" /></span>
      </div>
      <p className="ndp-hint" aria-hidden="true">Drag to see the Reliable difference</p>
    </div>
  );
}
