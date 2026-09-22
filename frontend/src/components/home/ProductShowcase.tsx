"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

type ProductShowcaseProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  href?: string;
};

export function ProductShowcase({
  title,
  subtitle,
  products,
  href = "/koleksiyonlar",
}: ProductShowcaseProps) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-full overflow-x-hidden bg-cream px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end sm:gap-4 md:mb-12">
          <div>
            <p className="mb-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-muted sm:mb-2 sm:text-xs">
              Vitrin
            </p>
            <h2 className="font-serif text-xl text-noir sm:text-2xl md:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 max-w-lg text-xs text-charcoal/70 sm:mt-2 sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
          <ButtonLink href={href} variant="outline" size="sm">
            Tümünü Gör
          </ButtonLink>
        </Reveal>

        <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} index={index} />
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 text-center lg:hidden">
          <Link
            href={href}
            className="text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:text-noir"
          >
            Koleksiyonu incele →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
