"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const CATEGORY_TILES = [
  {
    label: "Bilezikler",
    href: "/kategori/bilezikler",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Küpeler",
    href: "/kategori/kupeler",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Kolyeler",
    href: "/kategori/kolyeler",
    image:
      "https://images.unsplash.com/photo-1677144198413-f8bfe1f9a1aa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Zincirler",
    href: "/kategori/zincirler",
    image:
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Yüzükler",
    href: "/kategori/yuzukler",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CategoryShop() {
  return (
    <section className="max-w-full overflow-x-hidden bg-ivory px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6 text-center sm:mb-10 md:mb-12">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:mb-3 sm:text-xs">
            Saf altın
          </p>
          <h2 className="font-serif text-xl uppercase tracking-[0.08em] text-noir sm:text-2xl md:text-3xl">
            Kategorilere göre alışverişe başla
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {CATEGORY_TILES.map((tile) => (
            <RevealItem key={tile.href}>
              <Link
                href={tile.href}
                className="group relative block aspect-[3/4] max-h-[42vh] overflow-hidden border border-transparent bg-cream transition-colors duration-300 hover:border-gold/50 md:max-h-none"
              >
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 text-center font-sans text-[0.65rem] uppercase tracking-[0.18em] text-gold-light sm:p-5 sm:text-xs md:text-sm">
                  {tile.label}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
