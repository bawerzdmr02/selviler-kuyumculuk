import type { HTMLAttributes, ReactNode } from "react";
import { GoldLine } from "./GoldLine";

export type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Kart üstünde serif başlık şeridi */
  title?: string;
  /** Altın çerçeve çizgilerini göster (varsayılan: true) */
  ornate?: boolean;
  as?: "article" | "div" | "section";
};

export function Card({
  children,
  title,
  ornate = true,
  as: Tag = "article",
  className = "",
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        "relative bg-charcoal text-ivory",
        "border border-gold/25",
        className,
      ].join(" ")}
      {...props}
    >
      {ornate && (
        <>
          {/* Dış ince altın çerçeve — inset hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 border border-gold/35"
          />
          {/* Köşe geometrik motifler */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l border-t border-gold"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r border-t border-gold"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b border-l border-gold"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b border-r border-gold"
          />
        </>
      )}

      <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-8">
        {title && (
          <header className="flex flex-col items-center gap-3 text-center">
            <GoldLine className="max-w-[8rem]" />
            <h3 className="font-serif text-xl tracking-wide text-ivory sm:text-2xl">
              {title}
            </h3>
            <GoldLine className="max-w-[8rem]" />
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
