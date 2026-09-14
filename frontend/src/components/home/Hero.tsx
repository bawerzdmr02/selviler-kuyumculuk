"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoldLine } from "@/components/ui/GoldLine";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1758995115445-c91788f5aa24?auto=format&fit=crop&w=2400&q=80";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Fotoğraf üzerinde okunabilirlik için yumuşak koyu perde — sayfa zemini aydınlık kalır */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-noir/50 via-noir/35 to-ivory"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl space-y-6"
        >
          <p className="font-serif text-3xl tracking-[0.14em] text-gold-light sm:text-4xl md:text-5xl">
            {siteConfig.name}
          </p>
          <GoldLine className="max-w-[10rem]" />
          <h1 className="font-serif text-2xl leading-snug text-ivory sm:text-3xl md:text-4xl">
            {siteConfig.tagline}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-ivory/90 sm:text-base">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/koleksiyonlar" size="lg">
              Koleksiyonu Keşfet
            </ButtonLink>
            <ButtonLink
              href="/iletisim"
              variant="outline"
              size="lg"
              className="border-ivory/70 text-ivory hover:border-gold-light hover:bg-ivory/10 hover:text-ivory"
            >
              Randevu Al
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
