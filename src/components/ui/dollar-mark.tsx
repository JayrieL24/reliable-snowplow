import * as React from "react";
import type { LucideProps } from "lucide-react";

/* A dollar mark drawn on lucide's own 24x24 stroke grid, so it drops into any slot the icon set
   already fills and inherits the same colour and sizing rules.
   What makes it ours: the bar is set as two short stubs above and below the S, the way a dollar
   sign is cut in type, rather than one line ruled through the whole height as lucide draws it. The
   stroke is a shade heavier than the set's 2 to hold that shape at the 15px inline size.
   The S is one continuous curve whose ends land on x=12, exactly where the stubs meet it. Drawing
   it lucide's way - arcs joined by straight runs - leaves flat tails that overshoot the stubs, so
   the lower stub reads as a detached line rather than the foot of the glyph. */
export const DollarMark = React.forwardRef<SVGSVGElement, LucideProps>(function DollarMark(
  { size = 24, strokeWidth = 2.2, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8.2C16 6.4 14.2 5.2 12 5.2S8 6.4 8 8.2c0 4.2 8 2.4 8 6.6 0 1.9-1.8 3.1-4 3.1s-4-1.2-4-3.1" />
      <path d="M12 2.4v2.8" />
      <path d="M12 17.9v3.7" />
    </svg>
  );
});
