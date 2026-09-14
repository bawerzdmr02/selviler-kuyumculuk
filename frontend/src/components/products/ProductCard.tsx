import Image from "next/image";
import type { Product } from "@/types/product";
import { getCategoryById } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const category = getCategoryById(product.categoryId);

  return (
    <article className="group relative overflow-hidden border border-gold/25 bg-surface shadow-sm transition-colors hover:border-gold/55">
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
        <h3 className="font-serif text-xl text-noir">{product.name}</h3>
        <p className="text-sm leading-relaxed text-charcoal/65">
          {product.shortDescription}
        </p>
      </div>
    </article>
  );
}
