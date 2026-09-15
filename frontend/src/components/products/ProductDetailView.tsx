"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Minus, Plus } from "lucide-react";
import type { Category, GoldColor, Product } from "@/types/product";
import {
  GOLD_COLOR_LABELS,
  GOLD_COLOR_SWATCH,
} from "@/types/product";
import {
  formatTryPrice,
  getProductDetails,
  getProductGallery,
} from "@/lib/products";
import { siteConfig } from "@/lib/site";

type ProductDetailViewProps = {
  product: Product;
  category: Category;
  related: Product[];
};

/** ESA renk seçenekleri — yalnızca yuvarlak swatch */
const AVAILABLE_COLORS: { id: GoldColor; aria: string }[] = [
  { id: "sari", aria: "Sarı" },
  { id: "rose", aria: "Pembe" },
  { id: "beyaz", aria: "Beyaz Altın" },
];

export function ProductDetailView({
  product,
  category,
  related,
}: ProductDetailViewProps) {
  const gallery = useMemo(() => getProductGallery(product), [product]);
  const details = useMemo(() => getProductDetails(product), [product]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<GoldColor>(product.color);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState<"return" | "shipping" | null>(
    null
  );

  const productUrl = `${siteConfig.url}/urun/${product.slug}`;

  const orderWhatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      `Merhaba, "${product.name}" ürünü için sipariş vermek istiyorum.\nRenk: ${GOLD_COLOR_LABELS[selectedColor]}\nAdet: ${qty}\nFiyat: ${formatTryPrice(product.price, 2)}`
    );
    return `${siteConfig.contact.whatsapp}?text=${text}`;
  }, [product, selectedColor, qty]);

  const shareWhatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${product.name} — ${productUrl}`
  )}`;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <nav
          aria-label="Sayfa yolu"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-charcoal/70 sm:mb-8"
        >
          <Link href="/" className="transition-colors hover:text-noir">
            Ana Sayfa
          </Link>
          <span className="text-muted/60">/</span>
          <span className="text-muted">{product.name}</span>
        </nav>

        {/* ESA: sol galeri+özellikler · sağ satın alma
            Mobil sıra: galeri → satın alma → maddeler */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-x-12 lg:gap-y-10">
          {/* Galeri */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-white sm:aspect-[3/4]">
              <Image
                src={gallery[activeImage] ?? product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={[
                      "relative h-14 w-14 shrink-0 overflow-hidden border bg-white transition-colors sm:h-16 sm:w-16",
                      i === activeImage
                        ? "border-noir"
                        : "border-transparent hover:border-border",
                    ].join(" ")}
                    aria-label={`Görsel ${i + 1}`}
                    aria-pressed={i === activeImage}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ satın alma — mobilde galerinin hemen altı */}
          <div className="flex flex-col lg:sticky lg:top-28 lg:row-span-2">
            <h1 className="font-serif text-[1.375rem] font-normal leading-snug tracking-tight text-noir sm:text-2xl">
              {product.name}
            </h1>

            <p className="mt-4 font-sans text-xl font-normal tabular-nums tracking-wide text-noir">
              {formatTryPrice(product.price, 2)}
            </p>

            {/* Renk — yalnızca swatch */}
            <div className="mt-7">
              <p className="mb-3 text-sm text-noir">
                Renk <span className="text-noir">*</span>
              </p>
              <div
                className="flex flex-wrap items-center gap-3"
                role="radiogroup"
                aria-label="Renk"
              >
                {AVAILABLE_COLORS.map(({ id, aria }) => {
                  const selected = selectedColor === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={aria}
                      onClick={() => setSelectedColor(id)}
                      className={[
                        "size-7 rounded-full border transition-shadow",
                        selected
                          ? "border-noir ring-1 ring-noir ring-offset-2 ring-offset-background"
                          : "border-black/15 hover:border-noir/40",
                      ].join(" ")}
                      style={{ backgroundColor: GOLD_COLOR_SWATCH[id] }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Adet */}
            <div className="mt-6">
              <p className="mb-3 text-sm text-noir">
                Adet <span className="text-noir">*</span>
              </p>
              <div className="inline-flex h-10 items-stretch border border-noir/80">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="flex w-10 items-center justify-center text-noir transition-colors hover:bg-white/60 disabled:opacity-30"
                  aria-label="Azalt"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-12 border-x border-noir/80 bg-transparent text-center text-sm tabular-nums text-noir outline-none"
                  aria-label="Adet"
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex w-10 items-center justify-center text-noir transition-colors hover:bg-white/60"
                  aria-label="Artır"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* ESA: muted taupe Sepete Ekle → WhatsApp (Faz 1) */}
            <a
              href={orderWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-[39px] w-full max-w-[355px] items-center justify-center bg-muted px-4 text-[15px] text-ivory transition-colors hover:bg-charcoal"
            >
              Sepete Ekle
            </a>

            <div className="mt-6 max-w-[355px] border-t border-border/80">
              <AccordionItem
                title="İade ve Geri Ödeme Koşulları"
                open={openSection === "return"}
                onToggle={() =>
                  setOpenSection((s) => (s === "return" ? null : "return"))
                }
              >
                <p>
                  Siparişlerinizi size ulaştıktan 7 gün içerisinde değiştirebilir
                  ya da iade edebilirsiniz. Ancak yüzük ölçüsü, bileklik ölçüsü,
                  renk seçimi veya özel üretim gerektiren ürünler iade
                  alınamaz. İade ve değişimde kargo ücreti alıcıya aittir.
                </p>
                <p className="mt-3">
                  <strong className="font-semibold text-noir">Önemli:</strong>{" "}
                  Alyanslar ve kişiye özel üretilen ürünler siparişe özel
                  hazırlandığından iade/iptal edilmez.
                </p>
              </AccordionItem>
              <AccordionItem
                title="Gönderim Bilgisi"
                open={openSection === "shipping"}
                onToggle={() =>
                  setOpenSection((s) => (s === "shipping" ? null : "shipping"))
                }
              >
                <p>
                  Siparişiniz kargoya verildiğinde bilgilendirme yapılır. Tüm
                  ürünler kargo sürecinde sigortalanır. Gönderimler iş günleri
                  içinde hazırlanır.
                </p>
              </AccordionItem>
            </div>

            <div className="mt-6 flex max-w-[355px] flex-wrap gap-x-5 gap-y-2 text-[13px] text-charcoal/70">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-noir"
              >
                Facebook&apos;ta Paylaş
              </a>
              <a
                href={shareWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-noir"
              >
                WhatsApp&apos;ta Paylaş
              </a>
            </div>

            <p className="mt-4 max-w-[355px] text-[11px] leading-relaxed text-muted">
              Sipariş WhatsApp üzerinden alınır — stok ve gramaj teyidi için
              ekibimiz size döner.
            </p>

            <Link
              href={`/kategori/${category.slug}`}
              className="mt-5 text-[12px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-gold"
            >
              ← {category.name}
            </Link>
          </div>

          {/* Özellik maddeleri — masaüstünde galerinin altında */}
          <ul className="space-y-2.5 lg:col-start-1">
            {details.map((line) => (
              <li
                key={line}
                className="flex gap-2.5 text-[13px] leading-relaxed text-charcoal/85 sm:text-sm"
              >
                <span
                  className="mt-[0.55em] size-1 shrink-0 rounded-full bg-noir/50"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12 sm:mt-20">
            <h2 className="mb-8 text-center font-serif text-2xl font-normal text-noir sm:text-[1.75rem]">
              Benzer Ürünler
            </h2>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {related.map((item) => (
                <li key={item.id}>
                  <Link href={`/urun/${item.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-center font-serif text-sm font-normal text-noir group-hover:text-gold sm:text-base">
                      {item.name}
                    </p>
                    <p className="mt-1 text-center text-sm font-normal tabular-nums text-noir">
                      {formatTryPrice(item.price, 2)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function AccordionItem({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/80">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-left text-[12px] font-medium uppercase tracking-[0.12em] text-noir"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={15}
          strokeWidth={1.5}
          className={[
            "shrink-0 text-muted transition-transform duration-300",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>
      {open && (
        <div className="pb-4 text-[13px] leading-relaxed text-charcoal/75">
          {children}
        </div>
      )}
    </div>
  );
}
