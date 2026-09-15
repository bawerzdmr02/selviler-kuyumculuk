"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Package, UserRound } from "lucide-react";
import { formatTryPrice } from "@/lib/products";
import { cn } from "@/lib/cn";

type AccountTab = "profile" | "orders" | "addresses";

const NAV_ITEMS: {
  id: AccountTab;
  label: string;
  icon: typeof UserRound;
}[] = [
  { id: "profile", label: "Profil Bilgilerim", icon: UserRound },
  { id: "orders", label: "Siparişlerim", icon: Package },
  { id: "addresses", label: "Adreslerim", icon: MapPin },
];

const MOCK_ORDERS = [
  {
    id: "SK-10428",
    date: "12 Mart 2026",
    total: 67250,
    status: "Teslim Edildi" as const,
  },
  {
    id: "SK-10391",
    date: "28 Şubat 2026",
    total: 48500,
    status: "Kargoda" as const,
  },
  {
    id: "SK-10355",
    date: "14 Şubat 2026",
    total: 32400,
    status: "Hazırlanıyor" as const,
  },
];

const MOCK_ADDRESSES = [
  {
    id: "addr-1",
    title: "Ev",
    line: "Uğur Mumcu Mah. Muhsin Yazıcıoğlu Cad. No:11/A",
    city: "Sultangazi / İstanbul",
    phone: "0538 064 37 71",
    primary: true,
  },
  {
    id: "addr-2",
    title: "İş",
    line: "Rumeli Cad. No: 12 Kat: 3",
    city: "Şişli / İstanbul",
    phone: "0532 000 00 00",
    primary: false,
  },
];

function statusClass(status: (typeof MOCK_ORDERS)[number]["status"]) {
  switch (status) {
    case "Teslim Edildi":
      return "bg-emerald-50 text-emerald-800";
    case "Kargoda":
      return "bg-sky-50 text-sky-800";
    case "Hazırlanıyor":
      return "bg-amber-50 text-amber-900";
  }
}

export function AccountPanel() {
  const [tab, setTab] = useState<AccountTab>("profile");
  const [profile, setProfile] = useState({
    firstName: "Ayşe",
    lastName: "Yılmaz",
    email: "ayse.yilmaz@email.com",
    phone: "0532 555 44 33",
  });
  const [saved, setSaved] = useState(false);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {/* Sol menü */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <nav
          aria-label="Hesap menüsü"
          className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-white p-2 shadow-sm lg:flex-col lg:overflow-visible lg:p-3"
        >
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-3 text-left text-sm transition-colors",
                  active
                    ? "bg-noir text-ivory"
                    : "text-charcoal/80 hover:bg-cream hover:text-noir"
                )}
              >
                <Icon size={16} strokeWidth={1.5} />
                {label}
              </button>
            );
          })}
          <button
            type="button"
            className="mt-0 inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50 lg:mt-2 lg:border-t lg:border-border lg:pt-4"
          >
            Çıkış Yap
          </button>
        </nav>
      </aside>

      {/* Sağ içerik */}
      <div className="min-w-0">
        {tab === "profile" && (
          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-8 border-b border-border pb-5">
              <h2 className="font-serif text-2xl text-noir">Profil Bilgilerim</h2>
              <p className="mt-2 text-sm text-charcoal/65">
                İletişim bilgilerinizi güncelleyin. Kayıtlar Faz 2&apos;de
                hesabınıza bağlanacaktır.
              </p>
            </header>

            <form onSubmit={handleSave} className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
                  Ad
                </span>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, firstName: e.target.value }))
                  }
                  className="w-full border border-border bg-ivory/50 px-4 py-3 text-sm text-noir outline-none transition-colors focus:border-gold"
                  autoComplete="given-name"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
                  Soyad
                </span>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, lastName: e.target.value }))
                  }
                  className="w-full border border-border bg-ivory/50 px-4 py-3 text-sm text-noir outline-none transition-colors focus:border-gold"
                  autoComplete="family-name"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
                  E-posta
                </span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full border border-border bg-ivory/50 px-4 py-3 text-sm text-noir outline-none transition-colors focus:border-gold"
                  autoComplete="email"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
                  Telefon
                </span>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full border border-border bg-ivory/50 px-4 py-3 text-sm text-noir outline-none transition-colors focus:border-gold"
                  autoComplete="tel"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex bg-noir px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-[#1a2744]"
                >
                  Kaydet
                </button>
                {saved && (
                  <p className="text-sm text-emerald-700" role="status">
                    Bilgileriniz kaydedildi (önizleme).
                  </p>
                )}
              </div>
            </form>
          </section>
        )}

        {tab === "orders" && (
          <section>
            <header className="mb-6">
              <h2 className="font-serif text-2xl text-noir">Siparişlerim</h2>
              <p className="mt-2 text-sm text-charcoal/65">
                Geçmiş siparişlerinizin özeti — örnek veriler.
              </p>
            </header>

            <ul className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <li
                  key={order.id}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">
                        Sipariş No
                      </p>
                      <p className="mt-1 font-serif text-lg text-noir">
                        {order.id}
                      </p>
                      <p className="mt-1 text-sm text-charcoal/65">
                        {order.date}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-[0.7rem] font-medium tracking-wide",
                          statusClass(order.status)
                        )}
                      >
                        {order.status}
                      </span>
                      <p className="text-base font-semibold tabular-nums text-noir">
                        {formatTryPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "addresses" && (
          <section>
            <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl text-noir">Adreslerim</h2>
                <p className="mt-2 text-sm text-charcoal/65">
                  Kayıtlı teslimat adresleriniz.
                </p>
              </div>
              <button
                type="button"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-noir"
              >
                + Yeni Adres
              </button>
            </header>

            <ul className="grid gap-4 sm:grid-cols-2">
              {MOCK_ADDRESSES.map((addr) => (
                <li
                  key={addr.id}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="font-serif text-lg text-noir">{addr.title}</p>
                    {addr.primary && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-noir">
                        Varsayılan
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-charcoal/75">
                    {addr.line}
                  </p>
                  <p className="mt-1 text-sm text-charcoal/75">{addr.city}</p>
                  <p className="mt-3 text-sm text-muted">{addr.phone}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
