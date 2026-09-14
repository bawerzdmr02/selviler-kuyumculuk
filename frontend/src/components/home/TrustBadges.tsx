"use client";

import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/motion/Reveal";

const TRUST_ITEMS = [
  {
    icon: CreditCard,
    title: "İyzico ile güvenli ödeme",
    text: "Faz 2’de İyzico altyapısı — 3D Secure ve kart güvenliği standartlarıyla.",
  },
  {
    icon: Lock,
    title: "SSL şifreli bağlantı",
    text: "Tüm alışveriş ve form verileriniz HTTPS ile korunur.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenli alışveriş",
    text: "KVKK uyumlu süreçler ve şeffaf iade / garanti politikaları.",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-surface px-4 py-12 sm:px-6 lg:px-8">
      <RevealStagger className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <RevealItem key={item.title}>
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <item.icon
                className="mb-3 text-gold"
                size={28}
                strokeWidth={1.4}
                aria-hidden
              />
              <h3 className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-noir">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                {item.text}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
