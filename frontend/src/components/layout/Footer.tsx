import Link from "next/link";
import { Camera, Mail, MessageCircle, Phone, ShieldCheck, Lock, CreditCard } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="font-serif text-xl tracking-[0.08em] text-noir">
              SELVİLER
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
              Kuyumculuk
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-charcoal/70">
              {siteConfig.description}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Kategoriler
            </p>
            <ul className="space-y-2">
              {siteConfig.productNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Kurumsal
            </p>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              İletişim
            </p>
            <ul className="space-y-3 text-sm text-charcoal/80">
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
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <Mail size={14} aria-hidden className="text-gold" />
                  {siteConfig.contact.email}
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
              <li>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-gold"
                >
                  <MessageCircle size={14} aria-hidden className="text-gold" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* İyzico / SSL / güvenli alışveriş vurgusu */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="mb-4 text-center text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            Güvenli ödeme ve alışveriş
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <li className="inline-flex items-center gap-2 border border-border bg-ivory px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-noir">
              <CreditCard size={16} className="text-gold" aria-hidden />
              İyzico
            </li>
            <li className="inline-flex items-center gap-2 border border-border bg-ivory px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-noir">
              <Lock size={16} className="text-gold" aria-hidden />
              SSL Secure
            </li>
            <li className="inline-flex items-center gap-2 border border-border bg-ivory px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-noir">
              <ShieldCheck size={16} className="text-gold" aria-hidden />
              3D Secure
            </li>
            <li className="inline-flex items-center gap-2 border border-border bg-ivory px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-noir">
              <ShieldCheck size={16} className="text-gold" aria-hidden />
              Güvenli Alışveriş
            </li>
          </ul>
          <p className="mt-3 text-center text-xs text-charcoal/50">
            Ödeme altyapısı Faz 2&apos;de İyzico ile entegre edilecektir.
          </p>
        </div>

        <p className="mt-8 text-center text-xs tracking-wide text-charcoal/45">
          © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
