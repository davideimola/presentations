import type { ReactNode } from "react";

// Label-maker tape: ink tape with paper letters, never red, flat.
// One tape per block, and neighbouring tapes alternate their tilt.

const TILTS = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]"] as const;

interface TapeProps {
  children: ReactNode;
  tilt?: 0 | 1 | 2;
  className?: string;
}

export function Tape({ children, tilt = 0, className = "" }: TapeProps) {
  return (
    <span
      className={[
        "inline-block bg-tape-bg text-tape-fg font-label font-bold uppercase",
        "leading-none tracking-[0.12em] rounded-sm px-[0.67em] py-[0.27em] text-[15px]",
        TILTS[tilt],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
