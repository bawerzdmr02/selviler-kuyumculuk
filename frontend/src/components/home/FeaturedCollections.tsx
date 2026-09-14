"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { getCategoryById } from "@/lib/products";
import { Divider } from "@/components/ui/Divider";
import { ButtonLink } from "@/components/ui/ButtonLink";

type FeaturedCollectionsProps = {
  products: Product[];
};

export function FeaturedCollections({ products }: FeaturedCollectionsProps) {
  return (
    <section className="bg-ivory px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Öne çıkanlar
          </p>
          <h2 className="font-serif text-3xl text-noir sm:text-4xl">
            Seçilmiş Koleksiyon
          </h2>
          <div className="mx-auto mt-6 max-w-xs">
            <Divider />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-charcoal/70 sm:text-base">
            Vitrinimizin en özel parçalarından bir seçki. Fiyat ve stok bilgisi
            Faz 2&apos;de canlı hale gelecek.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const category = getCategoryById(product.categoryId);

            return (
              <motion.li
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/koleksiyonlar"
                  className="group relative block overflow-hidden border border-gold/25 bg-surface shadow-sm transition-colors hover:border-gold/55"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-5">
                    {category && (
                      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                        {category.name}
                      </p>
                    )}
                    <h3 className="font-serif text-xl text-noir">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal/65">
                      {product.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/koleksiyonlar" variant="outline">
            Tüm Koleksiyonlar
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
