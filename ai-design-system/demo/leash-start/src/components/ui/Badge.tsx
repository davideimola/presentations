import type { ReactNode } from "react";

// Small status pill: Coming soon, Conference, a role. Never a section label.

type BadgeVariant = "default" | "coming-soon";

const variantClasses: Record<BadgeVariant, string> = {
  default: "text-fg-subtle bg-surface-inline",
  "coming-soon": "text-fg bg-surface border border-[rgba(201,31,55,0.2)]",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 font-mono text-[13px] ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
