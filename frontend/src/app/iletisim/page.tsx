import type { Metadata } from "next";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "İletişim",
    description:
      "Selviler Kuyumculuk iletişim bilgileri, harita, çalışma saatleri ve iletişim formu.",
    path: "/iletisim",
  });
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <div className="max-w-full overflow-x-hidden bg-ivory px-4 py-10 sm:px-6 sm:py-16 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted sm:mb-3 sm:text-xs">
            İletişim
          </p>
          <h1 className="font-serif text-3xl text-noir sm:text-4xl md:text-5xl">
            Bize ulaşın
          </h1>
        </header>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <Card title="Mağaza bilgileri">
              <ul className="space-y-4 text-sm text-charcoal/80">
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    Adres
                  </p>
                  <p className="mt-1 text-noir">{contact.address}</p>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    Telefon
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 inline-flex items-center gap-2 text-noir transition-colors hover:text-gold"
                  >
                    <Phone size={14} aria-hidden className="text-gold" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    E-posta
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 inline-flex items-center gap-2 text-noir transition-colors hover:text-gold"
                  >
                    <Mail size={14} aria-hidden className="text-gold" />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    WhatsApp
                  </p>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-noir transition-colors hover:text-gold"
                  >
                    <MessageCircle size={14} aria-hidden className="text-gold" />
                    WhatsApp Business
                  </a>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">
                    Çalışma saatleri
                  </p>
                  <ul className="mt-2 space-y-1">
                    {contact.hours.map((row) => (
                      <li key={row.days} className="flex justify-between gap-4">
                        <span>{row.days}</span>
                        <span className="text-charcoal/55">{row.time}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </Card>

            <div className="overflow-hidden border border-border bg-surface shadow-card">
              <iframe
                title="Selviler Kuyumculuk konum haritası"
                src={contact.mapEmbedUrl}
                className="h-56 w-full max-w-full sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="border-t border-border bg-ivory px-4 py-2 text-xs text-charcoal/50">
                Uğur Mumcu Mah. · Sultangazi / İstanbul
              </p>
            </div>
          </div>

          <Card title="Mesaj gönderin">
            <ContactForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
