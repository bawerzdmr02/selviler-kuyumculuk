import { NextResponse } from "next/server";
import {
  getMockGoldResponse,
  parseHaremGoldQuotes,
  type GoldApiResponse,
} from "@/lib/gold";
import { getCachedHaremQuotes, getHaremLiveQuotes } from "@/lib/haremFeed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

/** Klasik Harem AJAX (çoğu ortamda WAF/404; Socket yedek) */
const HAREM_AJAX_URLS = [
  "https://www.haremaltin.com/ajax/doviz",
  "https://www.haremaltin.com/dashboard/ajax/doviz",
  "https://www.haremaltin.com/ajax/all_prices",
] as const;

/** Son başarılı HTTP/Socket yanıtı — hata olsa bile 200 döner */
let lastSuccessful: GoldApiResponse | null = null;

const HAREM_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json, text/javascript, */*; q=0.01",
  Referer: "https://www.haremaltin.com/",
  Origin: "https://www.haremaltin.com",
  "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
} as const;

function jsonOk(body: GoldApiResponse) {
  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
    },
  });
}

function extractDataBag(
  payload: unknown
): Record<string, unknown> | null {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;
  if (root.data && typeof root.data === "object") {
    return root.data as Record<string, unknown>;
  }
  if ("ALTIN" in root || "CEYREK_YENI" in root || "KULCEALTIN" in root) {
    return root;
  }
  return null;
}

async function fetchHaremAjax(): Promise<GoldApiResponse | null> {
  for (const url of HAREM_AJAX_URLS) {
    try {
      const controller = new AbortController();
      const kill = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...HAREM_HEADERS,
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: "dil_kodu=tr",
        cache: "no-store",
        next: { revalidate: 0 },
        signal: controller.signal,
      });

      clearTimeout(kill);

      if (!response.ok) continue;

      const text = await response.text();
      if (!text || text.trim().length < 2) continue;

      const payload = JSON.parse(text) as unknown;
      const data = extractDataBag(payload);
      if (!data) continue;

      const quotes = parseHaremGoldQuotes(data, lastSuccessful?.quotes);
      return {
        source: "live",
        updatedAt: new Date().toLocaleString("tr-TR"),
        quotes,
      };
    } catch {
      // Sonraki URL / Socket
    }
  }
  return null;
}

export async function GET() {
  try {
    // Önce canlı Socket.IO snapshot (Harem’in gerçek Kapalıçarşı yayını)
    const fromSocket =
      getCachedHaremQuotes() ?? (await getHaremLiveQuotes());

    if (fromSocket) {
      lastSuccessful = fromSocket;
      // AJAX’i arka planda dene (header seti korunur; yanıt gelirse cache güncellenir)
      void fetchHaremAjax().then((ajax) => {
        if (ajax) lastSuccessful = ajax;
      });
      return jsonOk(fromSocket);
    }

    // Soğuk başlangıç: AJAX dene
    const fromAjax = await fetchHaremAjax();
    if (fromAjax) {
      lastSuccessful = fromAjax;
      return jsonOk(fromAjax);
    }

    throw new Error("Harem kaynağına ulaşılamadı");
  } catch {
    const fallback: GoldApiResponse = lastSuccessful
      ? { ...lastSuccessful, source: "live" }
      : getCachedHaremQuotes() ?? {
          ...getMockGoldResponse(),
          source: "live",
        };

    return jsonOk(fallback);
  }
}
