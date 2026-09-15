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
    <div className="bg-ivory px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Saf altın
          </p>
          <h1 className="font-serif text-4xl text-noir sm:text-5xl">
            Altın Koleksiyonları
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-charcoal/70 sm:text-base">
            Mağazamızda yalnızca altın satılır: bilezik, küpe, kolye, zincir ve
            yüzük. İnci, pırlanta veya değerli taş bulunmaz.
          </p>
        </header>

        <div className="space-y-20">
          {categories.map((category) => {
            const products = getProductsByCategory(category.id);

            return (
              <section key={category.id} id={category.slug}>
                <div className="mb-8 max-w-xl border-l-2 border-gold pl-4">
                  <h2 className="font-serif text-2xl text-noir sm:text-3xl">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/65">
                    {category.description}
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                  {products.map((product, index) => (
                    <li key={product.id}>
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
