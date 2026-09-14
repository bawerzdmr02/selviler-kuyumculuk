"use client";

import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function BrandStoryTeaser() {
  return (
    <section className="border-y border-gold/25 bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
          Hakkımızda
        </p>
        <h2 className="font-serif text-2xl text-noir sm:text-3xl">
          Ustalıkla işlenmiş saf altın
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-charcoal/75 sm:text-base">
          {siteConfig.name} olarak yalnızca altına odaklanıyoruz. Bilezik,
          küpe, kolye ve zincir — değerini kaybetmeyen, şık ve yatırımlık saf
          altın parçalar sunuyoruz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/hakkimizda" variant="outline">
            Hikayemiz
          </ButtonLink>
          <ButtonLink href="/iletisim">İletişim</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
