"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatTryPrice } from "@/lib/products";

type CategoryProductCardProps = {
  product: Product;
  categorySlug?: string;
};

export function CategoryProductCard({
  product,
}: CategoryProductCardProps) {
  const hoverSrc = product.imageHover ?? product.image;

  return (
    <article className="group flex h-full flex-col bg-white">
      <Link
        href={`/urun/${product.slug}`}
        className="relative block aspect-[3/4] max-h-[46vh] overflow-hidden bg-[#F5F5F3] md:max-h-none"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={hoverSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          aria-hidden
        />
        {product.featured && (
          <span className="absolute left-3 top-3 bg-noir/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ivory">
            Yeni
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gold/95 py-2.5 text-center text-[0.65rem] uppercase tracking-[0.2em] text-noir opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Hızlı Bakış
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 px-1 py-4 text-center sm:py-5">
        <Link href={`/urun/${product.slug}`}>
          <h3 className="font-serif text-base leading-snug text-noir transition-colors duration-300 group-hover:text-gold sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm font-bold tabular-nums tracking-wide text-noir sm:text-base">
          {formatTryPrice(product.price)}
        </p>
      </div>
    </article>
  );
}
