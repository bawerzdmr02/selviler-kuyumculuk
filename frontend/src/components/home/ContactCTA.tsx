"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ButtonOrnament, buttonClasses } from "@/components/ui/buttonStyles";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ContactCTA() {
  return (
    <section className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-3xl flex-col items-center border border-border bg-surface px-6 py-12 text-center shadow-card sm:px-10"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-muted">İletişim</p>
        <h2 className="mt-3 font-serif text-2xl text-noir sm:text-3xl">
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
