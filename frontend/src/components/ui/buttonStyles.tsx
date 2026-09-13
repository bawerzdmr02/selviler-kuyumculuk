type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-noir hover:bg-gold-light border border-gold-light/60",
  outline:
    "bg-transparent text-ivory border border-gold/70 hover:border-gold-light hover:text-gold-light",
  ghost:
    "bg-transparent text-ivory border border-transparent hover:border-gold/40 hover:text-gold-light",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-[0.18em]",
  md: "px-6 py-3 text-sm tracking-[0.2em]",
  lg: "px-8 py-3.5 text-sm tracking-[0.22em]",
};

export const buttonBaseClasses = [
  "group relative inline-flex items-center justify-center overflow-hidden",
  "font-sans font-medium uppercase transition-colors duration-300",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir",
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
        className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-light to-transparent opacity-70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-gold-light/80"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-gold-light/80"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b border-l border-gold-light/80"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b border-r border-gold-light/80"
      />
    </>
  );
}
