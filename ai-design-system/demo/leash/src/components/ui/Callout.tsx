import type { ReactNode } from "react";
import { Tape } from "./Tape";

// Aside block for blog posts: a note with a tape label stuck on its top-left edge.
// Deliberate brand exception, approved by the owner: green palette colours and a
// kanji (注, "note") in the label.

interface CalloutProps {
  label: ReactNode;
  children: ReactNode;
}

export function Callout({ label, children }: CalloutProps) {
  return (
    <aside className="relative mt-4 rounded-sm border border-green-600 bg-green-50 px-5 pb-4 pt-6 text-green-900">
      <Tape className="absolute -top-3 left-4">
        <span aria-hidden="true">注 </span>
        {label}
      </Tape>
      {children}
    </aside>
  );
}
