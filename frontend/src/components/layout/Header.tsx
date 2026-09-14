"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Camera, MapPin, Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="shrink-0 leading-none transition-opacity hover:opacity-80"
        >
          <span className="block font-serif text-2xl tracking-[0.08em] text-noir sm:text-[1.75rem]">
            SELVİLER
          </span>
          <span className="mt-0.5 block font-sans text-[0.65rem] uppercase tracking-[0.35em] text-muted">
            Kuyumculuk
          </span>
        </Link>

        <nav
          aria-label="Ürün kategorileri"
          className="ml-6 hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
        >
          {siteConfig.productNav.map((item) => {
            const active = pathname.startsWith("/koleksiyonlar");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2 py-2 font-sans text-[0.7rem] uppercase tracking-[0.1em] text-noir transition-colors duration-300 hover:text-gold xl:px-3 xl:text-[0.8rem]",
                  active && "text-gold"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className="hidden items-center gap-1.5 px-2 py-2 text-noir transition-colors hover:text-gold md:inline-flex"
            aria-label="Telefon"
          >
            <Phone size={16} strokeWidth={1.5} />
            <span className="hidden text-xs tracking-wide xl:inline">
              {siteConfig.contact.phone}
            </span>
          </a>
          <a
            href="/iletisim"
            className="inline-flex p-2 text-noir transition-colors hover:text-gold"
            aria-label="Konum"
          >
            <MapPin size={17} strokeWidth={1.5} />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex p-2 text-noir transition-colors hover:text-gold"
            aria-label="Instagram"
          >
            <Camera size={17} strokeWidth={1.5} />
          </a>

          <button
            type="button"
            className="inline-flex border border-border p-2 text-noir lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-ivory lg:hidden">
          <nav
            aria-label="Mobil menü"
            className="mx-auto flex max-w-7xl flex-col px-4 py-4"
          >
            <p className="mb-2 px-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              Kategoriler
            </p>
            {siteConfig.productNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-border/60 px-3 py-3 font-sans text-sm uppercase tracking-[0.12em] text-noir"
              >
                {item.label}
              </Link>
            ))}
            <p className="mb-2 mt-4 px-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted">
              Sayfalar
            </p>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="px-3 py-2.5 text-sm text-charcoal"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
