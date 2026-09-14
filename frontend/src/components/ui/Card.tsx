import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  title?: string;
  ornate?: boolean;
  as?: "article" | "div" | "section";
};

export function Card({
  children,
  title,
  ornate = false,
  as: Tag = "article",
  className = "",
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        "relative bg-surface text-charcoal shadow-card",
        "border border-border",
        className,
      ].join(" ")}
      {...props}
    >
      {ornate && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3 border border-gold/20"
        />
      )}

      <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-8">
        {title && (
          <header className="border-b border-border pb-4 text-center">
            <h3 className="font-serif text-xl tracking-wide text-noir sm:text-2xl">
              {title}
            </h3>
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
