"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import { GoldLine } from "@/components/ui/GoldLine";

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
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-noir/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-serif text-lg tracking-[0.12em] text-ivory transition-colors hover:text-gold-light sm:text-xl"
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Ana menü"
          className="hidden items-center gap-8 md:flex"
        >
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs uppercase tracking-[0.22em] transition-colors",
                  active
                    ? "text-gold-light"
                    : "text-ivory/75 hover:text-gold-light"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-gold/40 p-2 text-ivory md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <GoldLine className="opacity-60" />

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-gold/20 bg-noir md:hidden"
        >
          <nav
            aria-label="Mobil menü"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6"
          >
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "border border-transparent px-3 py-3 text-sm uppercase tracking-[0.2em]",
                    active
                      ? "border-gold/30 text-gold-light"
                      : "text-ivory/80"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
