import Link from "next/link";
import { Camera, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/25 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="font-serif text-xl tracking-[0.1em] text-noir">
              {siteConfig.name}
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-charcoal/70">
              {siteConfig.description}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">
              Keşfet
            </p>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">
              İletişim
            </p>
            <ul className="space-y-3 text-sm text-charcoal/75">
              <li>{siteConfig.contact.address}</li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Phone size={14} aria-hidden className="text-gold" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Camera size={14} aria-hidden className="text-gold" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <Divider />
          <nav
            aria-label="Yasal"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {siteConfig.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs tracking-wide text-charcoal/50 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 text-center text-xs tracking-wide text-charcoal/45">
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları
            saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
