import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "gold" | "outline" | "muted";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  gold: "border-gold/60 bg-gold/15 text-gold-light",
  outline: "border-gold/50 bg-transparent text-ivory",
  muted: "border-ivory/20 bg-noir/40 text-ivory/80",
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
