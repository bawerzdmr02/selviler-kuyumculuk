import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Sepet",
    description:
      "Selviler Kuyumculuk alışveriş sepetiniz — seçtiğiniz altın parçaları ve sipariş özeti.",
    path: "/sepet",
    noIndex: true,
  });
}

export default function CartPage() {
  return (
    <div className="bg-ivory px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Alışveriş
          </p>
          <h1 className="font-serif text-3xl text-noir sm:text-4xl">Sepetim</h1>
          <p className="mt-3 text-sm text-charcoal/65 sm:text-base">
            Seçtiğiniz parçaları gözden geçirin; ödeme Faz 2&apos;de
            etkinleşecektir.
          </p>
        </header>

        <CartView />
      </div>
    </div>
  );
}
