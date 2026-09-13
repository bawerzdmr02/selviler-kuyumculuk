"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

/**
 * Faz 1: Backend yok.
 * Geçici çözüm: mailto — Faz 2'de Express API / kendi form endpoint'imize taşınacak.
 * Alternatif: Web3Forms / Formspree access key eklenebilir.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Selviler Kuyumculuk — ${name}`);
    const body = encodeURIComponent(
      `Ad Soyad: ${name}\nE-posta: ${email}\nTelefon: ${phone}\n\nMesaj:\n${message}`
    );

    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
    form.reset();
  }

  const fieldClass =
    "w-full border border-gold/30 bg-noir px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold-light focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="text-xs leading-relaxed text-ivory/50">
        Form geçici olarak e-posta istemcinizi açar (mailto). Faz 2&apos;de kendi
        backend&apos;imize taşınacaktır.
      </p>

      <div>
        <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
          Ad Soyad
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClass}
          placeholder="Adınız"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="ornek@mail.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="+90 ..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="Nasıl yardımcı olabiliriz?"
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Gönder
      </Button>

      {status === "sent" && (
        <p className="text-sm text-gold-light" role="status">
          E-posta uygulamanız açıldıysa mesajınızı gönderebilirsiniz.
        </p>
      )}
    </form>
  );
}
