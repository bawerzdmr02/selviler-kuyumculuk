import type { Metadata } from "next";
import { Phone, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Divider } from "@/components/ui/Divider";
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
    <div className="bg-ivory px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
            İletişim
          </p>
          <h1 className="font-serif text-4xl text-noir sm:text-5xl">
            Bize ulaşın
          </h1>
          <div className="mx-auto mt-6 max-w-xs">
            <Divider />
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <Card title="Mağaza bilgileri">
              <ul className="space-y-4 text-sm text-charcoal/80">
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    Adres
                  </p>
                  <p className="mt-1 text-noir">{contact.address}</p>
                </li>
                <li>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
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
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
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
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
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

            <div className="overflow-hidden border border-gold/30 bg-surface shadow-sm">
              <iframe
                title="Selviler Kuyumculuk konum haritası"
                src={contact.mapEmbedUrl}
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="border-t border-gold/20 bg-cream px-4 py-2 text-xs text-charcoal/50">
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
