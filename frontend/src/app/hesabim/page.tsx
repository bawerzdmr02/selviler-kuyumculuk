import type { Metadata } from "next";
import { AccountPanel } from "@/components/account/AccountPanel";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Hesabım",
    description:
      "Selviler Kuyumculuk hesap paneli — profil, siparişler ve adresler.",
    path: "/hesabim",
    noIndex: true,
  });
}

export default function AccountPage() {
  return (
    <div className="bg-ivory px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Üyelik
          </p>
          <h1 className="font-serif text-3xl text-noir sm:text-4xl">
            Hesabım
          </h1>
          <p className="mt-3 text-sm text-charcoal/65 sm:text-base">
            Profil ve sipariş görünümü — giriş sistemi Faz 2&apos;de
            eklenecektir.
          </p>
        </header>

        <AccountPanel />
      </div>
    </div>
  );
}
