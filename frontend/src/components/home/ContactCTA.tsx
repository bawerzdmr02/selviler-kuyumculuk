"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ButtonOrnament, buttonClasses } from "@/components/ui/buttonStyles";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ContactCTA() {
  return (
    <section className="max-w-full overflow-x-hidden bg-ivory px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-3xl flex-col items-center border border-border bg-surface px-4 py-8 text-center shadow-card sm:px-10 sm:py-12"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted sm:text-xs">
          İletişim
        </p>
        <h2 className="mt-2 font-serif text-xl text-noir sm:mt-3 sm:text-2xl md:text-3xl">
          Mağazamızı ziyaret edin
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-charcoal/70">
          Koleksiyonları yakından görmek veya özel bir parça için danışmak
          isterseniz sizi ağırlamaktan mutluluk duyarız.
        </p>
        <p className="mt-4 text-sm text-noir">{siteConfig.contact.address}</p>
        <a
          href={siteConfig.contact.phoneHref}
          className="mt-2 text-sm text-gold transition-colors hover:text-noir"
        >
          {siteConfig.contact.phone}
        </a>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="mt-1 text-sm text-gold transition-colors hover:text-noir"
        >
          {siteConfig.contact.email}
        </a>
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
