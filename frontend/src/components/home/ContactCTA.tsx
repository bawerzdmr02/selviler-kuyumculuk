"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ButtonOrnament, buttonClasses } from "@/components/ui/buttonStyles";
import { GoldLine } from "@/components/ui/GoldLine";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.12),transparent_65%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <GoldLine className="mb-8 max-w-[8rem]" />
        <h2 className="font-serif text-3xl text-ivory sm:text-4xl">
          Mağazamızı ziyaret edin
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-ivory/70 sm:text-base">
          Koleksiyonlarımızı yakından görmek veya özel bir parça için danışmak
          isterseniz sizi ağırlamaktan mutluluk duyarız.
        </p>
        <p className="mt-4 text-sm text-gold-light">
          {siteConfig.contact.address}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/iletisim">İletişime Geç</ButtonLink>
          <a
            href={siteConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("outline")}
          >
            <ButtonOrnament />
            <span className="relative z-10">WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
