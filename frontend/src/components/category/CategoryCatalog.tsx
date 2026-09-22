"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Filter, X } from "lucide-react";
import { CategoryProductCard } from "@/components/category/CategoryProductCard";
import type {
  Category,
  GoldColor,
  GoldKarat,
  Product,
} from "@/types/product";
import { GOLD_COLOR_LABELS, GOLD_KARAT_OPTIONS } from "@/types/product";

type SortKey = "newest" | "price-asc" | "price-desc";

type CategoryCatalogProps = {
  category: Category;
  categories: Category[];
  products: Product[];
};

const COLOR_OPTIONS: GoldColor[] = ["sari", "beyaz", "rose"];

function FilterSidebar({
  category,
  categories,
  priceBounds,
  minPrice,
  maxPrice,
  colors,
  karats,
  onMinPrice,
  onMaxPrice,
  onToggleColor,
  onToggleKarat,
  onReset,
}: {
  category: Category;
  categories: Category[];
  priceBounds: { min: number; max: number };
  minPrice: string;
  maxPrice: string;
  colors: GoldColor[];
  karats: GoldKarat[];
  onMinPrice: (v: string) => void;
  onMaxPrice: (v: string) => void;
  onToggleColor: (c: GoldColor) => void;
  onToggleKarat: (k: GoldKarat) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-4 border-b border-gold/30 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-noir">
          Kategoriler
        </p>
        <ul className="space-y-2">
          {categories.map((item) => (
            <li key={item.id}>
              <Link
                href={`/kategori/${item.slug}`}
                className={[
                  "block text-sm transition-colors",
                  item.id === category.id
                    ? "font-semibold text-gold"
                    : "text-charcoal/75 hover:text-gold",
                ].join(" ")}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-4 border-b border-gold/30 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-noir">
          Fiyat Aralığı
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={priceBounds.min}
            max={priceBounds.max}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPrice(e.target.value)}
            className="w-full border border-border bg-white px-3 py-2 text-sm text-noir outline-none focus:border-gold"
            aria-label="Minimum fiyat"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            inputMode="numeric"
            min={priceBounds.min}
            max={priceBounds.max}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPrice(e.target.value)}
            className="w-full border border-border bg-white px-3 py-2 text-sm text-noir outline-none focus:border-gold"
            aria-label="Maksimum fiyat"
          />
        </div>
        <p className="mt-2 text-[0.7rem] text-muted">
          {priceBounds.min.toLocaleString("tr-TR")} –{" "}
          {priceBounds.max.toLocaleString("tr-TR")} ₺
        </p>
      </div>

      <div>
        <p className="mb-4 border-b border-gold/30 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-noir">
          Renk
        </p>
        <ul className="space-y-2.5">
          {COLOR_OPTIONS.map((color) => (
            <li key={color}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal/80">
                <input
                  type="checkbox"
                  checked={colors.includes(color)}
                  onChange={() => onToggleColor(color)}
                  className="size-4 accent-[#C9A24B]"
                />
                {GOLD_COLOR_LABELS[color]}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-4 border-b border-gold/30 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-noir">
          Ayar
        </p>
        <ul className="space-y-2.5">
          {GOLD_KARAT_OPTIONS.map((karat) => (
            <li key={karat}>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal/80">
                <input
                  type="checkbox"
                  checked={karats.includes(karat)}
                  onChange={() => onToggleKarat(karat)}
                  className="size-4 accent-[#C9A24B]"
                />
                {karat} Ayar
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-xs uppercase tracking-[0.18em] text-muted underline-offset-4 transition-colors hover:text-gold hover:underline"
      >
        Filtreleri temizle
      </button>
    </div>
  );
}

export function CategoryCatalog({
  category,
  categories,
  products,
}: CategoryCatalogProps) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [colors, setColors] = useState<GoldColor[]>([]);
  const [karats, setKarats] = useState<GoldKarat[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    if (min != null && Number.isFinite(min)) {
      list = list.filter((p) => p.price >= min);
    }
    if (max != null && Number.isFinite(max)) {
      list = list.filter((p) => p.price <= max);
    }
    if (colors.length > 0) {
      list = list.filter((p) => colors.includes(p.color));
    }
    if (karats.length > 0) {
      list = list.filter((p) => karats.includes(p.karat));
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return list;
  }, [products, minPrice, maxPrice, colors, karats, sort]);

  function toggleColor(color: GoldColor) {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }

  function toggleKarat(karat: GoldKarat) {
    setKarats((prev) =>
      prev.includes(karat) ? prev.filter((k) => k !== karat) : [...prev, karat]
    );
  }

  function resetFilters() {
    setMinPrice("");
    setMaxPrice("");
    setColors([]);
    setKarats([]);
    setSort("newest");
  }

  const filterProps = {
    category,
    categories,
    priceBounds,
    minPrice,
    maxPrice,
    colors,
    karats,
    onMinPrice: setMinPrice,
    onMaxPrice: setMaxPrice,
    onToggleColor: toggleColor,
    onToggleKarat: toggleKarat,
    onReset: resetFilters,
  };

  return (
    <div className="max-w-full overflow-x-hidden bg-[#FAFAFA] px-4 py-8 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 border-b border-gold/25 pb-5 sm:mb-10 sm:pb-6">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:text-xs">
            Koleksiyon
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <h1 className="font-serif text-2xl text-noir sm:text-3xl md:text-4xl">
                {category.name}
              </h1>
              <p className="mt-1.5 max-w-xl text-xs text-charcoal/65 sm:mt-2 sm:text-sm">
                {category.description}
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {filtered.length} ürün
            </p>
          </div>
        </header>

        <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-noir"
          >
            <Filter size={14} />
            Filtrele
          </button>
          <label className="flex items-center gap-2 text-xs text-muted">
            <span className="hidden sm:inline">Sırala</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-border bg-white px-3 py-2.5 text-xs text-noir outline-none focus:border-gold"
            >
              <option value="newest">En Yeniler</option>
              <option value="price-asc">Fiyat: Artan</option>
              <option value="price-desc">Fiyat: Azalan</option>
            </select>
          </label>
        </div>

        <div className="flex gap-8 lg:gap-10">
          {/* Desktop sidebar ~25% */}
          <aside className="hidden w-1/4 shrink-0 lg:block">
            <div className="sticky top-24 border border-border/80 bg-white p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)]">
              <FilterSidebar {...filterProps} />
            </div>
          </aside>

          {/* Product grid ~75% */}
          <section className="min-w-0 flex-1 lg:w-3/4">
            <div className="mb-6 hidden items-center justify-end lg:flex">
              <label className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted">
                Sıralama
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="min-w-[12rem] border border-border bg-white px-3 py-2.5 text-xs normal-case tracking-normal text-noir outline-none focus:border-gold"
                >
                  <option value="newest">En Yeniler</option>
                  <option value="price-asc">Fiyata Göre Artan</option>
                  <option value="price-desc">Fiyata Göre Azalan</option>
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="border border-dashed border-border bg-white px-6 py-16 text-center">
                <p className="font-serif text-xl text-noir">Ürün bulunamadı</p>
                <p className="mt-2 text-sm text-muted">
                  Filtreleri gevşeterek tekrar deneyin.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 text-xs uppercase tracking-[0.18em] text-gold"
                >
                  Filtreleri temizle
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
                {filtered.map((product) => (
                  <li key={product.id} className="min-w-0">
                    <CategoryProductCard
                      product={product}
                      categorySlug={category.slug}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-noir/40"
            aria-label="Filtreyi kapat"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(88vw,22rem)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-noir">
                Filtrele
              </p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1 text-noir"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <FilterSidebar {...filterProps} />
            </div>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-noir py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ivory"
              >
                Sonuçları göster ({filtered.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
