import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "gold" | "outline" | "muted";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  gold: "border-gold/70 bg-gold/10 text-noir",
  outline: "border-gold/50 bg-transparent text-charcoal",
  muted: "border-charcoal/15 bg-cream text-charcoal/80",
};

export function Badge({
  children,
  variant = "gold",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center border px-3 py-1",
        "font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em]",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
