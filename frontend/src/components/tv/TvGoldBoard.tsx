"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import {
  HAREM_GOLD_ITEMS,
  type GoldApiResponse,
  type GoldQuote,
} from "@/lib/gold";

const POLL_MS = 2_000;
const CARD_COMMISSION = 1.05;
const SKELETON_ROWS = HAREM_GOLD_ITEMS.length;

function formatTry(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(value);
}

function FlashNum({
  value,
  className,
  format = formatTry,
}: {
  value: number;
  className: string;
  format?: (n: number) => string;
}) {
  const prevRef = useRef(value);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === value) return;
    setFlash(value > prev ? "up" : "down");
    prevRef.current = value;
    const t = window.setTimeout(() => setFlash(null), 900);
    return () => window.clearTimeout(t);
  }, [value]);

  return (
    <motion.span
      className={`inline-block rounded px-[0.2vw] font-extrabold tabular-nums ${className}`}
      animate={{
        backgroundColor:
          flash === "up"
            ? "rgba(22,163,74,0.22)"
            : flash === "down"
              ? "rgba(239,68,68,0.22)"
              : "rgba(0,0,0,0)",
        scale: flash ? 1.03 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {format(value)}
    </motion.span>
  );
}

function isLivePayload(data: GoldApiResponse): boolean {
  return (
    data.source === "live" &&
    Array.isArray(data.quotes) &&
    data.quotes.length > 0
  );
}

export function TvGoldBoard() {
  const [quotes, setQuotes] = useState<GoldQuote[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [clock, setClock] = useState<string>("");
  const inFlightRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString("tr-TR", { hour12: false }));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();

    const enterError = () => {
      setIsError(true);
      setQuotes(null);
    };

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

        if (cancelled) return;

        if (!response.ok) {
          enterError();
          return;
        }

        const data = (await response.json()) as GoldApiResponse;
        if (cancelled) return;

        // Mock / stale / boş veri → eski fiyat ASLA ekranda kalmasın
        if (!isLivePayload(data)) {
          enterError();
          return;
        }

        setQuotes(data.quotes);
        setIsError(false);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        enterError();
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

  const rows = quotes ?? [];

  if (isError) {
    return (
      <div className="tv-board fixed inset-0 z-[200] flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#E9EEF6] px-[4vw] text-slate-800">
        <div className="flex max-w-[42rem] flex-col items-center rounded-2xl bg-white px-[3vw] py-[4vh] text-center shadow-lg">
          <div className="mb-[2vh] flex size-[min(12vh,6vw)] items-center justify-center rounded-full bg-red-50">
            <WifiOff
              className="size-[min(6vh,3vw)] text-red-500"
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
          <p className="font-sans text-[clamp(1.1rem,2.2vw,2rem)] font-extrabold tracking-wide text-slate-800">
            CANLI VERİ BAĞLANTISI BEKLENİYOR...
          </p>
          <p className="mt-[1.5vh] max-w-[36rem] text-[clamp(0.85rem,1.1vw,1.15rem)] leading-relaxed text-slate-500">
            Lütfen internet bağlantınızı veya sistem durumunu kontrol ediniz.
            Bağlantı sağlandığında ekran otomatik olarak yenilenecektir.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tv-board fixed inset-0 z-[200] flex h-screen w-screen flex-col overflow-hidden bg-[#E9EEF6] text-slate-800">
      <div className="oled-float flex h-full w-full flex-col">
        {/* —— Üst Bar: tam genişlik marka —— */}
        <header className="relative w-full shrink-0 bg-gradient-to-r from-blue-950 to-blue-700 px-4 py-6 sm:py-7">
          <h1
            className="flex items-center justify-center text-center font-sans text-5xl font-extrabold tracking-[0.18em] text-white drop-shadow-lg sm:text-6xl"
            style={{ color: "#ffffff" }}
          >
            SELVİLER KUYUMCULUK
          </h1>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-sans text-sm font-semibold tabular-nums tracking-wide text-white/80 sm:text-base">
            {clock}
          </span>
        </header>

        {/* —— Tam genişlik fiyat tablosu —— */}
        <main className="flex min-h-0 w-full flex-1 px-[0.8vw] py-[0.8vh]">
          <section className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-sm bg-white shadow-sm">
            <div className="grid shrink-0 grid-cols-[1.4fr_1fr_1fr_1fr] items-center border-b border-slate-200 bg-[#dce4f0] px-[1vw] py-[1vh]">
              <span className="text-[1vw] font-bold uppercase tracking-wider text-slate-500">
                &nbsp;
              </span>
              <span className="text-center text-[1.1vw] font-extrabold uppercase tracking-wider text-slate-500">
                Alış
              </span>
              <span className="text-center text-[1.1vw] font-extrabold uppercase tracking-wider text-slate-500">
                Satış
              </span>
              <span className="text-center text-[1.1vw] font-extrabold uppercase tracking-wider text-slate-500">
                K. Kartı
              </span>
            </div>

            <div className="flex min-h-0 w-full flex-1 flex-col">
              {rows.length === 0
                ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                    <div
                      key={`sk-${i}`}
                      className={[
                        "grid min-h-0 w-full flex-1 grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-[1vw]",
                        i % 2 === 0 ? "bg-white" : "bg-[#f0f4fb]",
                      ].join(" ")}
                    >
                      <div className="h-[1.4vw] w-[70%] animate-pulse rounded bg-slate-200" />
                      <div className="mx-auto h-[1.6vw] w-[60%] animate-pulse rounded bg-red-100" />
                      <div className="mx-auto h-[1.6vw] w-[60%] animate-pulse rounded bg-emerald-100" />
                      <div className="mx-auto h-[1.6vw] w-[60%] animate-pulse rounded bg-blue-100" />
                    </div>
                  ))
                : rows.map((quote, i) => {
                    const cardPrice = quote.selling * CARD_COMMISSION;
                    return (
                      <div
                        key={quote.id}
                        className={[
                          "grid min-h-0 w-full flex-1 grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-[1vw]",
                          i % 2 === 0 ? "bg-white" : "bg-[#f0f4fb]",
                        ].join(" ")}
                      >
                        <h2 className="truncate font-sans text-[1.5vw] font-extrabold leading-tight text-blue-900">
                          {quote.label}
                        </h2>
                        <div className="text-center text-[1.8vw] text-red-500">
                          <FlashNum
                            value={quote.buying}
                            className="text-red-500"
                          />
                        </div>
                        <div className="text-center text-[1.8vw] text-emerald-600">
                          <FlashNum
                            value={quote.selling}
                            className="text-emerald-600"
                          />
                        </div>
                        <div className="text-center text-[1.8vw] text-blue-600">
                          <FlashNum
                            value={cardPrice}
                            className="text-blue-600"
                          />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
