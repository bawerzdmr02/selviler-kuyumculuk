import type { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { Divider } from "@/components/ui/Divider";
import { getCategories, getProductsByCategory } from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Koleksiyonlar",
    description:
      "Selviler Kuyumculuk statik koleksiyon galerisi — yüzük, kolye, küpe ve bilezik.",
    path: "/koleksiyonlar",
  });
}

export default function CollectionsPage() {
  const categories = getCategories();

  return (
    <div className="bg-ivory px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Galeri
          </p>
          <h1 className="font-serif text-4xl text-noir sm:text-5xl">
            Koleksiyonlar
          </h1>
          <div className="mx-auto mt-6 max-w-xs">
            <Divider />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-charcoal/70 sm:text-base">
            Şimdilik görsel bir vitrin sunuyoruz. Ürün detayı, fiyat ve stok
            bilgisi Faz 2&apos;de e-ticaret altyapısıyla birlikte gelecek.
          </p>
        </header>

        <div className="space-y-20">
          {categories.map((category) => {
            const products = getProductsByCategory(category.id);

            return (
              <section key={category.id} id={category.slug}>
                <div className="mb-8 max-w-xl">
                  <h2 className="font-serif text-2xl text-noir sm:text-3xl">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-charcoal/65">
                    {category.description}
                  </p>
                </div>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
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
