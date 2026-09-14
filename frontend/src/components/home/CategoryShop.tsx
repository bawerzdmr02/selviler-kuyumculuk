"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const CATEGORY_TILES = [
  {
    label: "Bilezikler",
    href: "/koleksiyonlar#bilezikler",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Küpeler",
    href: "/koleksiyonlar#kupeler",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Kolyeler",
    href: "/koleksiyonlar#kolyeler",
    image:
      "https://images.unsplash.com/photo-1677144198413-f8bfe1f9a1aa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Zincirler",
    href: "/koleksiyonlar#zincirler",
    image:
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CategoryShop() {
  return (
    <section className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Saf altın
          </p>
          <h2 className="font-serif text-2xl uppercase tracking-[0.08em] text-noir sm:text-3xl">
            Kategorilere göre alışverişe başla
          </h2>
        </Reveal>

        <RevealStagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {CATEGORY_TILES.map((tile) => (
            <RevealItem key={tile.href}>
              <Link
                href={tile.href}
                className="group relative block aspect-[3/4] overflow-hidden border border-transparent bg-cream transition-colors duration-300 hover:border-gold/50"
              >
                <Image
                  src={tile.image}
                  alt={tile.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
                />
                <span className="absolute inset-x-0 bottom-0 p-5 text-center font-sans text-xs uppercase tracking-[0.18em] text-gold-light sm:text-sm">
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
