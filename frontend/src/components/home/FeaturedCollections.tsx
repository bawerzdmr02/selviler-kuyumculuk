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
    <section className="max-w-full overflow-x-hidden bg-ivory px-4 py-10 sm:px-6 sm:py-20 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:mb-3 sm:text-xs">
            Öne çıkanlar
          </p>
          <h2 className="font-serif text-2xl text-noir sm:text-3xl md:text-4xl">
            Seçilmiş Koleksiyon
          </h2>
          <div className="mx-auto mt-4 max-w-xs sm:mt-6">
            <Divider />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-charcoal/70 sm:mt-6 sm:text-sm md:text-base">
            Vitrinimizin en özel parçalarından bir seçki. Fiyat ve stok bilgisi
            Faz 2&apos;de canlı hale gelecek.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
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
                className="min-w-0"
              >
                <Link
                  href="/koleksiyonlar"
                  className="group relative block overflow-hidden border border-gold/25 bg-surface shadow-sm transition-colors hover:border-gold/55"
                >
                  <div className="relative aspect-[4/5] max-h-[46vh] overflow-hidden md:max-h-none">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 p-3 sm:space-y-2 sm:p-5">
                    {category && (
                      <p className="text-[0.6rem] uppercase tracking-[0.22em] text-gold sm:text-[0.65rem]">
                        {category.name}
                      </p>
                    )}
                    <h3 className="font-serif text-base text-noir sm:text-xl">
                      {product.name}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-charcoal/65 sm:text-sm">
                      {product.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-center sm:mt-12">
          <ButtonLink href="/koleksiyonlar" variant="outline">
            Tüm Koleksiyonlar
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
