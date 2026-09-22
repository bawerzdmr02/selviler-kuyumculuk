import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Hakkımızda",
    description:
      "Selviler Kuyumculuk marka hikayesi, ustalık anlayışı ve güven vaadi.",
    path: "/hakkimizda",
  });
}

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
    alt: "Saf altın bilezikler",
  },
  {
    src: "https://images.unsplash.com/photo-1677144198413-f8bfe1f9a1aa?auto=format&fit=crop&w=1200&q=80",
    alt: "Altın kolye detayı",
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
    alt: "Altın takı işçiliği",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-full overflow-x-hidden bg-ivory">
      <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-16 md:py-24 lg:px-8">
        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted sm:mb-3 sm:text-xs">
          Hakkımızda
        </p>
        <h1 className="font-serif text-3xl text-noir sm:text-4xl md:text-5xl">
          Marka hikayemiz
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-charcoal/75 sm:mt-8 sm:text-base">
          Selviler Kuyumculuk olarak yalnızca saf altına odaklanıyoruz. Bilezik,
          küpe, kolye ve zincir — değerini kaybetmeyen, ustalıkla işlenmiş altın
          koleksiyonları sunuyoruz.
        </p>
      </section>

      <section className="border-y border-border bg-cream px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-serif text-xl text-noir sm:text-2xl md:text-3xl">
              Ustalık
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:mt-4 sm:text-base">
              Atölyemizde geleneksel kuyumculuk teknikleri, çağdaş tasarım dili
              ile buluşur. Her parça, seçilmiş hammaddeler ve titiz kontrol
              süreçleriyle tamamlanır.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl text-noir sm:text-2xl md:text-3xl">
              Güven
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70 sm:mt-4 sm:text-base">
              Şeffaf iletişim, doğru ayar bilgisi ve satış sonrası destek —
              Selviler deneyiminin temelidir. Müşterilerimizle kurduğumuz ilişki
              tek bir satıştan fazlasıdır.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <h2 className="mb-6 text-center font-serif text-2xl text-noir sm:mb-10 sm:text-3xl">
          Mağazamızdan kareler
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALLERY.map((item) => (
            <li
              key={item.src}
              className="relative aspect-[4/5] max-h-[42vh] overflow-hidden border border-border bg-surface shadow-card md:max-h-none"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center sm:mt-12">
          <ButtonLink href="/iletisim" variant="outline">
            Bizi ziyaret edin
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
