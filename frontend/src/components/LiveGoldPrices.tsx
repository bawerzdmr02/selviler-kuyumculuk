"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import {
  HAREM_HOME_QUOTE_IDS,
  type GoldApiResponse,
  type GoldQuote,
} from "@/lib/gold";

/** Cloudflare ban riski göze alınarak minimum yenileme */
const POLL_MS = 2_000;

const FLASH_UP = "#16a34a";
const FLASH_DOWN = "#dc2626";

function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

function FlashPrice({
  value,
  baseColor,
  className,
}: {
  value: number;
  baseColor: string;
  className?: string;
}) {
  const prevRef = useRef(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === value) return;

    setFlash(value > prev ? "up" : "down");
    prevRef.current = value;

    const timer = window.setTimeout(() => setFlash(null), 900);
    return () => window.clearTimeout(timer);
  }, [value]);

  return (
    <motion.span
      className={["inline-block rounded-sm px-1", className]
        .filter(Boolean)
        .join(" ")}
      animate={{
        color:
          flash === "up"
            ? FLASH_UP
            : flash === "down"
              ? FLASH_DOWN
              : baseColor,
        backgroundColor:
          flash === "up"
            ? "rgba(22,163,74,0.16)"
            : flash === "down"
              ? "rgba(220,38,38,0.16)"
              : "rgba(0,0,0,0)",
        scale: flash ? 1.04 : 1,
      }}
      transition={{ duration: 0.4 }}
    >
      {formatTry(value)}
    </motion.span>
  );
}

function PriceSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
      aria-busy="true"
      aria-label="Fiyatlar yükleniyor"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="relative h-full border border-gold/25 bg-surface p-5 sm:p-6"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 border border-gold/10"
          />
          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="h-6 w-28 animate-pulse rounded-sm bg-gold/20" />
              <div className="h-4 w-12 animate-pulse rounded-sm bg-gold/15" />
            </div>
            <div className="space-y-3 border-t border-gold/15 pt-4">
              <div className="flex justify-between gap-2">
                <div className="h-3 w-10 animate-pulse rounded-sm bg-charcoal/10" />
                <div className="h-4 w-24 animate-pulse rounded-sm bg-charcoal/10" />
              </div>
              <div className="flex justify-between gap-2">
                <div className="h-3 w-10 animate-pulse rounded-sm bg-gold/20" />
                <div className="h-7 w-28 animate-pulse rounded-sm bg-gold/25" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LiveGoldPrices() {
  const [quotes, setQuotes] = useState<GoldQuote[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();

    const loadPrices = async () => {
      if (cancelled || inFlightRef.current) return;
      inFlightRef.current = true;

      try {
        const response = await fetch("/api/gold", {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
          signal: abortController.signal,
        });

        // 429 / diğer hatalarda tabloyu bozma — bir sonraki tick’i bekle
        if (response.status === 429 || !response.ok) return;

        const data = (await response.json()) as GoldApiResponse;
        if (cancelled) return;
        if (!Array.isArray(data.quotes) || data.quotes.length === 0) return;

        const homeIds = new Set<string>(HAREM_HOME_QUOTE_IDS);
        const homeQuotes = data.quotes.filter((q) => homeIds.has(q.id));
        if (homeQuotes.length === 0) return;

        setQuotes(homeQuotes);
        setUpdatedAt(data.updatedAt || new Date().toLocaleString("tr-TR"));
      } catch {
        // Abort / ağ / 429 sonrası sessiz bekleme — eski rakamlar korunur
      } finally {
        inFlightRef.current = false;
      }
    };

    void loadPrices();

    const intervalId = window.setInterval(() => {
      void loadPrices();
    }, POLL_MS);

    return () => {
      cancelled = true;
      abortController.abort();
      window.clearInterval(intervalId);
      inFlightRef.current = false;
    };
  }, []);

  return (
    <section className="max-w-full overflow-x-hidden border-y border-gold/20 bg-cream px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-6 text-center sm:mb-10 md:mb-12">
          <div className="mb-2 flex items-center justify-center gap-3 sm:mb-3">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:text-xs">
              Kapalıçarşı
            </p>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
                aria-hidden
              />
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-emerald-600">
                Canlı
              </span>
            </span>
          </div>
          <h2 className="font-serif text-xl text-noir sm:text-2xl md:text-3xl lg:text-4xl">
            Canlı Piyasa Fiyatları
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-charcoal/70 sm:mt-4 sm:text-sm md:text-base">
            Harem Altın Kapalıçarşı kurları — gram, çeyrek, yarım ve tam.
            Fiyatlar arka planda anlık güncellenir.
          </p>
        </Reveal>

        {!quotes ? (
          <PriceSkeleton />
        ) : (
          <RevealStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {quotes.map((quote) => {
              const up = quote.change >= 0;

              return (
                <RevealItem key={quote.id}>
                  <article className="group relative h-full border border-gold/35 bg-surface p-4 shadow-card transition-all duration-500 hover:border-gold hover:shadow-card-hover sm:p-6">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-2 border border-gold/15"
                    />
                    <div className="relative z-10 space-y-3 sm:space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-base text-noir sm:text-lg md:text-xl">
                          {quote.label}
                        </h3>
                        <span
                          className={[
                            "inline-flex items-center gap-1 text-xs font-medium tracking-wide",
                            up ? "text-gold" : "text-charcoal/60",
                          ].join(" ")}
                        >
                          {up ? (
                            <TrendingUp size={14} aria-hidden />
                          ) : (
                            <TrendingDown size={14} aria-hidden />
                          )}
                          {up ? "+" : ""}
                          {quote.change.toFixed(2)}%
                        </span>
                      </div>

                      <div className="space-y-2 border-t border-gold/20 pt-4">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                            Alış
                          </span>
                          <FlashPrice
                            value={quote.buying}
                            baseColor="#4a453f"
                            className="font-sans text-sm"
                          />
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                            Satış
                          </span>
                          <FlashPrice
                            value={quote.selling}
                            baseColor="#1a1a1a"
                            className="font-serif text-xl sm:text-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealStagger>
        )}

        {quotes && (
          <Reveal delay={0.15} className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 text-xs text-charcoal/55">
              <span className="relative flex h-1.5 w-1.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
              </span>
              Harem Altın · Kapalıçarşı
              {updatedAt ? ` · ${updatedAt}` : ""}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
