"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { getCategoryById } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const category = getCategoryById(product.categoryId);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden border border-transparent bg-surface shadow-card transition-all duration-500 hover:border-gold/40 hover:shadow-card-hover"
    >
      <Link
        href={`/urun/${product.slug}`}
        className="relative block aspect-[4/5] max-h-[46vh] overflow-hidden bg-cream md:max-h-none"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-2 top-2 bg-noir px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ivory sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[0.65rem]">
            Yeni
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full bg-gold py-3 text-center text-xs uppercase tracking-[0.2em] text-noir opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
          Hızlı Bakış
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1 px-2 py-3 text-center sm:gap-1.5 sm:px-5 sm:py-5">
        {category && (
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-muted sm:text-[0.65rem]">
            {category.name}
          </p>
        )}
        <Link href={`/urun/${product.slug}`}>
          <h3 className="font-serif text-sm leading-snug text-noir transition-colors duration-300 group-hover:text-gold sm:text-lg md:text-xl">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-charcoal/70 sm:mt-1 sm:text-sm">
          {product.shortDescription}
        </p>
        <p className="mt-1.5 text-xs font-bold tabular-nums text-noir sm:mt-2 sm:text-sm">
          {new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 0,
          }).format(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
