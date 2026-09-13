import type { Metadata } from "next";
import Image from "next/image";
import { Divider } from "@/components/ui/Divider";
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
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    alt: "Mağaza vitrini",
  },
  {
    src: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
    alt: "Mücevher detayı",
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
    alt: "Atölye işçiliği",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-noir">
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
          Hakkımızda
        </p>
        <h1 className="font-serif text-4xl text-ivory sm:text-5xl">
          Marka hikayemiz
        </h1>
        <div className="mx-auto mt-6 max-w-xs">
          <Divider />
        </div>
        <p className="mt-8 text-sm leading-relaxed text-ivory/75 sm:text-base">
          Selviler Kuyumculuk, zamansız zarafeti günlük hayatın özel anlarına
          taşımak için kuruldu. Her tasarımda dengeyi, saflığı ve uzun ömürlü
          işçiliği ön planda tutuyoruz.
        </p>
      </section>

      <section className="border-y border-gold/15 bg-charcoal px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-serif text-2xl text-ivory sm:text-3xl">
              Ustalık
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70 sm:text-base">
              Atölyemizde geleneksel kuyumculuk teknikleri, çağdaş tasarım dili
              ile buluşur. Her parça, seçilmiş hammaddeler ve titiz kontrol
              süreçleriyle tamamlanır.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ivory sm:text-3xl">Güven</h2>
            <p className="mt-4 text-sm leading-relaxed text-ivory/70 sm:text-base">
              Şeffaf iletişim, doğru ayar bilgisi ve satış sonrası destek —
              Selviler deneyiminin temelidir. Müşterilerimizle kurduğumuz ilişki
              tek bir satıştan fazlasıdır.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-serif text-3xl text-ivory">
          Mağazamızdan kareler
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {GALLERY.map((item) => (
            <li
              key={item.src}
              className="relative aspect-[4/5] overflow-hidden border border-gold/20"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/iletisim" variant="outline">
            Bizi ziyaret edin
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
