"use client";

import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function BrandStoryTeaser() {
  return (
    <section className="max-w-full overflow-x-hidden border-y border-gold/25 bg-ivory px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:mb-3 sm:text-xs">
          Hakkımızda
        </p>
        <h2 className="font-serif text-xl text-noir sm:text-2xl md:text-3xl">
          Ustalıkla işlenmiş saf altın
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-charcoal/75 sm:mt-6 sm:text-base">
          {siteConfig.name} olarak yalnızca altına odaklanıyoruz. Bilezik,
          küpe, kolye ve zincir — değerini kaybetmeyen, şık ve yatırımlık saf
          altın parçalar sunuyoruz.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8">
          <ButtonLink href="/hakkimizda" variant="outline">
            Hikayemiz
          </ButtonLink>
          <ButtonLink href="/iletisim">İletişim</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
