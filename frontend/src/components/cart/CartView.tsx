"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatTryPrice } from "@/lib/products";

type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  qty: number;
};

const MOCK_CART: CartItem[] = [
  {
    id: "cart-1",
    slug: "22-ayar-adana-burma-bilezik",
    name: "22 Ayar Adana Burma Bilezik",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
    variant: "22 Ayar, Sarı Altın",
    price: 48500,
    qty: 1,
  },
  {
    id: "cart-2",
    slug: "14-ayar-ince-altin-yuzuk",
    name: "14 Ayar İnce Altın Yüzük",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    variant: "14 Ayar, Beyaz Altın, 12 Numara",
    price: 18750,
    qty: 1,
  },
  {
    id: "cart-3",
    slug: "14-ayar-italyan-zincir-kolye",
    name: "14 Ayar İtalyan Zincir Kolye",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    variant: "14 Ayar, Sarı Altın, 45 cm",
    price: 32400,
    qty: 2,
  },
];

export function CartView() {
  const [items, setItems] = useState<CartItem[]>(MOCK_CART);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  function setQty(id: string, next: number) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, next) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-sm">
        <p className="font-serif text-2xl text-noir">Sepetiniz boş</p>
        <p className="mt-3 text-sm text-charcoal/65">
          Koleksiyonlarımızdan bir parça seçerek başlayabilirsiniz.
        </p>
        <Link
          href="/koleksiyonlar"
          className="mt-8 inline-flex bg-noir px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-charcoal"
        >
          Koleksiyonlara Git
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] lg:gap-10 xl:gap-12">
      {/* Sol — sepet listesi */}
      <section aria-labelledby="cart-items-heading">
        <h2
          id="cart-items-heading"
          className="mb-6 border-b border-gold/25 pb-3 font-serif text-2xl text-noir"
        >
          Sepetteki Ürünler
          <span className="ml-2 font-sans text-sm font-normal text-muted">
            ({items.length})
          </span>
        </h2>

        <ul className="divide-y divide-border/80 border-y border-border/80 bg-white">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-5"
            >
              <Link
                href={`/urun/${item.slug}`}
                className="relative mx-auto aspect-square w-28 shrink-0 overflow-hidden bg-[#F5F5F3] sm:mx-0 sm:w-24"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="112px"
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1 text-center sm:text-left">
                <Link
                  href={`/urun/${item.slug}`}
                  className="font-serif text-lg text-noir transition-colors hover:text-gold"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-xs tracking-wide text-muted">
                  {item.variant}
                </p>
                <p className="mt-2 text-sm font-semibold tabular-nums text-noir sm:hidden">
                  {formatTryPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 sm:justify-end">
                <div className="inline-flex h-10 items-stretch border border-noir/80">
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="flex w-10 items-center justify-center text-noir transition-colors hover:bg-cream disabled:opacity-30"
                    aria-label={`${item.name} adet azalt`}
                    disabled={item.qty <= 1}
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="flex w-11 items-center justify-center border-x border-noir/80 text-sm tabular-nums text-noir">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="flex w-10 items-center justify-center text-noir transition-colors hover:bg-cream"
                    aria-label={`${item.name} adet artır`}
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>

                <p className="hidden min-w-[6.5rem] text-right text-sm font-semibold tabular-nums text-noir sm:block">
                  {formatTryPrice(item.price * item.qty)}
                </p>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="inline-flex p-2 text-muted transition-colors hover:text-red-600"
                  aria-label={`${item.name} ürününü sil`}
                >
                  <Trash2 size={17} strokeWidth={1.5} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Sağ — sipariş özeti */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-7">
          <h2 className="border-b border-border pb-4 font-serif text-xl text-noir">
            Sipariş Özeti
          </h2>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-charcoal/70">Ara Toplam</dt>
              <dd className="font-medium tabular-nums text-noir">
                {formatTryPrice(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-charcoal/70">Kargo</dt>
              <dd className="font-medium text-emerald-700">Ücretsiz</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
              <dt className="text-base font-semibold text-noir">Genel Toplam</dt>
              <dd className="text-lg font-semibold tabular-nums text-noir">
                {formatTryPrice(subtotal)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            className="mt-7 flex w-full items-center justify-center bg-noir px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-[#1a2744]"
          >
            Alışverişi Tamamla
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted">
            Ödeme altyapısı Faz 2&apos;de İyzico ile bağlanacaktır. Bu ekran
            tasarım önizlemesidir.
          </p>
        </div>
      </aside>
    </div>
  );
}
