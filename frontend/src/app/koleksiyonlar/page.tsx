import type { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategories, getProductsByCategory } from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Koleksiyonlar",
    description:
      "Selviler Kuyumculuk saf altın koleksiyonu — bilezik, küpe, kolye, zincir ve yüzük.",
    path: "/koleksiyonlar",
  });
}

export default function CollectionsPage() {
  const categories = getCategories();

  return (
    <div className="max-w-full overflow-x-hidden bg-ivory px-4 py-10 sm:px-6 sm:py-16 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:mb-3 sm:text-xs">
            Saf altın
          </p>
          <h1 className="font-serif text-3xl text-noir sm:text-4xl md:text-5xl">
            Altın Koleksiyonları
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70 sm:mt-6 sm:text-base">
            Mağazamızda yalnızca altın satılır: bilezik, küpe, kolye, zincir ve
            yüzük. İnci, pırlanta veya değerli taş bulunmaz.
          </p>
        </header>

        <div className="space-y-12 sm:space-y-20">
          {categories.map((category) => {
            const products = getProductsByCategory(category.id);

            return (
              <section key={category.id} id={category.slug}>
                <div className="mb-5 max-w-xl border-l-2 border-gold pl-3 sm:mb-8 sm:pl-4">
                  <h2 className="font-serif text-xl text-noir sm:text-2xl md:text-3xl">
                    {category.name}
                  </h2>
                  <p className="mt-1.5 text-xs text-charcoal/65 sm:mt-2 sm:text-sm">
                    {category.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                  {products.map((product, index) => (
                    <li key={product.id} className="min-w-0">
                      <ProductCard product={product} index={index} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
