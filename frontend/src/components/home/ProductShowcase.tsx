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
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.28em] text-muted">
              Vitrin
            </p>
            <h2 className="font-serif text-2xl text-noir sm:text-3xl">{title}</h2>
            {subtitle && (
              <p className="mt-2 max-w-lg text-sm text-charcoal/70">{subtitle}</p>
            )}
          </div>
          <ButtonLink href={href} variant="outline" size="sm">
            Tümünü Gör
          </ButtonLink>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {products.map((product, index) => (
            <li key={product.id}>
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
