"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78svh] w-full overflow-hidden bg-ivory sm:min-h-[85svh]">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/88 to-ivory/30 sm:via-ivory/75"
      />

      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-7xl flex-col justify-center px-4 py-20 sm:min-h-[85svh] sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl space-y-6"
        >
          <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
            {siteConfig.name} · Saf Altın
          </p>
          <h1 className="font-serif text-3xl leading-tight text-noir sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Değerini hiç kaybetmeyen altın koleksiyonları
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-charcoal/80 sm:text-base">
            Yatırımlık ve şık altın takılar. Ustalıkla işlenmiş saf altın —
            yalnızca altın, başka hiçbir şey.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/koleksiyonlar" size="lg">
              Altın Koleksiyonu
            </ButtonLink>
            <ButtonLink href="/iletisim" variant="outline" size="lg">
              Mağazayı Ziyaret Et
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
