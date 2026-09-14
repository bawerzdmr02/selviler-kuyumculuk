import { io, type Socket } from "socket.io-client";
import {
  parseHaremGoldQuotes,
  type GoldApiResponse,
  type GoldQuote,
} from "@/lib/gold";

const HAREM_SOCKET_URL = "wss://hrmsocketonly.haremaltin.com:443";

const WANTED_KEYS = [
  "KULCEALTIN",
  "ALTIN",
  "CEYREK_YENI",
  "YARIM_YENI",
  "TEK_YENI",
  "CEYREK_ESKI",
  "YARIM_ESKI",
  "TEK_ESKI",
  "TAM_YENI",
];

type HaremSnapshot = {
  data: Record<string, unknown>;
  updatedAtMs: number;
};

let socket: Socket | null = null;
let snapshot: HaremSnapshot | null = null;
let lastQuotes: GoldQuote[] | null = null;
let connecting = false;

function mergeRows(
  incoming: Record<string, unknown>
): Record<string, unknown> {
  const base = { ...(snapshot?.data ?? {}) };
  for (const [key, value] of Object.entries(incoming)) {
    if (WANTED_KEYS.includes(key) || key.includes("ALTIN") || key.includes("CEYREK") || key.includes("YARIM") || key.includes("TEK") || key.includes("TAM")) {
      base[key] = value;
    }
  }
  return base;
}

function tryBuildQuotes(data: Record<string, unknown>): GoldQuote[] | null {
  try {
    return parseHaremGoldQuotes(data, lastQuotes ?? undefined);
  } catch {
    return null;
  }
}

function ensureSocket() {
  if (socket?.connected || connecting) return;
  connecting = true;

  socket = io(HAREM_SOCKET_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    timeout: 10000,
    extraHeaders: {
      Origin: "https://www.haremaltin.com",
      Referer: "https://www.haremaltin.com/",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  socket.on("connect", () => {
    connecting = false;
  });

  socket.on("connect_error", () => {
    connecting = false;
  });

  socket.on("price_changed", (rec: { data?: Record<string, unknown>; meta?: { time?: number } }) => {
    if (!rec?.data || typeof rec.data !== "object") return;

    const merged = mergeRows(rec.data);
    snapshot = {
      data: merged,
      updatedAtMs: Number(rec.meta?.time) || Date.now(),
    };

    const quotes = tryBuildQuotes(merged);
    if (quotes) {
      lastQuotes = quotes;
    }
  });
}

function waitForQuotes(timeoutMs: number): Promise<GoldQuote[] | null> {
  if (lastQuotes) return Promise.resolve(lastQuotes);

  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (lastQuotes) {
        clearInterval(timer);
        resolve(lastQuotes);
        return;
      }
      if (Date.now() - started >= timeoutMs) {
        clearInterval(timer);
        resolve(null);
      }
    }, 100);
  });
}

/** Harem canlı feed’den son Kapalıçarşı fiyatları */
export async function getHaremLiveQuotes(): Promise<GoldApiResponse | null> {
  ensureSocket();

  const quotes = lastQuotes ?? (await waitForQuotes(4000));
  if (!quotes) return null;

  return {
    source: "live",
    updatedAt: new Date(
      snapshot?.updatedAtMs ?? Date.now()
    ).toLocaleString("tr-TR"),
    quotes,
  };
}

export function getCachedHaremQuotes(): GoldApiResponse | null {
  if (!lastQuotes) return null;
  return {
    source: "live",
    updatedAt: new Date(
      snapshot?.updatedAtMs ?? Date.now()
    ).toLocaleString("tr-TR"),
    quotes: lastQuotes,
  };
}
