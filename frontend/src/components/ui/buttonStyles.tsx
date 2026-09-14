type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-noir hover:bg-gold-light border border-gold-light shadow-gold",
  outline:
    "bg-transparent text-noir border border-gold/60 hover:border-gold hover:bg-gold/10 hover:text-noir",
  ghost:
    "bg-transparent text-charcoal border border-transparent hover:text-gold hover:border-gold/30",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[0.7rem] tracking-[0.18em]",
  md: "px-6 py-3 text-xs tracking-[0.2em]",
  lg: "px-8 py-3.5 text-xs tracking-[0.22em]",
};

export const buttonBaseClasses = [
  "group relative inline-flex items-center justify-center overflow-hidden",
  "font-sans font-medium uppercase transition-all duration-300",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = ""
): string {
  return [
    buttonBaseClasses,
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function ButtonOrnament() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px origin-left scale-x-0 bg-gold-light transition-transform duration-500 group-hover:scale-x-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-right scale-x-0 bg-gold-light transition-transform duration-500 group-hover:scale-x-100"
      />
    </>
  );
}
