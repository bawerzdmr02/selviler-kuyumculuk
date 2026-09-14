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
      className="group relative flex h-full flex-col overflow-hidden border border-transparent bg-surface shadow-card transition-all duration-500 hover:border-gold/40 hover:shadow-card-hover"
    >
      <Link href="/koleksiyonlar" className="relative block aspect-[4/5] overflow-hidden bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 bg-noir px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ivory">
            Yeni
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gold py-3 text-center text-xs uppercase tracking-[0.2em] text-noir opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          Hızlı Bakış
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 px-4 py-4 text-center sm:px-5 sm:py-5">
        {category && (
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            {category.name}
          </p>
        )}
        <h3 className="font-serif text-lg text-noir transition-colors duration-300 group-hover:text-gold sm:text-xl">
          {product.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
          {product.shortDescription}
        </p>
      </div>
    </motion.article>
  );
}
