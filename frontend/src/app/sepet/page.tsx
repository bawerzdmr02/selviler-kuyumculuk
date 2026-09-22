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
    <div className="max-w-full overflow-x-hidden bg-ivory px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 max-w-2xl sm:mb-12">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:mb-3 sm:text-xs">
            Alışveriş
          </p>
          <h1 className="font-serif text-2xl text-noir sm:text-3xl md:text-4xl">
            Sepetim
          </h1>
          <p className="mt-2 text-sm text-charcoal/65 sm:mt-3 sm:text-base">
            Seçtiğiniz parçaları gözden geçirin; ödeme Faz 2&apos;de
            etkinleşecektir.
          </p>
        </header>

        <CartView />
      </div>
    </div>
  );
}
