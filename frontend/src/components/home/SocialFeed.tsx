import Image from "next/image";
import { Camera } from "lucide-react";
import { siteConfig } from "@/lib/site";

/** Salt altın görseller — taş / inci / pırlanta yok */
const SOCIAL_IMAGES = [
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1677144198413-f8bfe1f9a1aa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=800&q=80",
];

export function SocialFeed() {
  return (
    <section className="bg-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            Sosyal
          </p>
          <h2 className="font-serif text-3xl text-noir">Instagram&apos;da Biz</h2>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-charcoal/75 transition-colors hover:text-gold"
          >
            <Camera size={16} aria-hidden className="text-gold" />
            @selvilerkuyumculuk
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {SOCIAL_IMAGES.map((src, index) => (
            <li
              key={src}
              className="relative aspect-square overflow-hidden border border-gold/20"
            >
              <Image
                src={src}
                alt={`Altın takı görseli ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
