export type GoldQuote = {
  id: string;
  label: string;
  buying: number;
  selling: number;
  change: number;
};

export type GoldApiResponse = {
  source: "live" | "fallback";
  updatedAt: string;
  quotes: GoldQuote[];
};

/** Harem Altın / Kapalıçarşı kodları → vitrin etiketleri */
export const HAREM_GOLD_ITEMS: Array<{
  keys: string[];
  label: string;
  id: string;
}> = [
  { keys: ["KULCEALTIN", "ALTIN"], label: "Gram Altın", id: "gram" },
  { keys: ["CEYREK_YENI", "CEYREK_ESKI"], label: "Çeyrek Altın", id: "ceyrek" },
  { keys: ["YARIM_YENI", "YARIM_ESKI"], label: "Yarım Altın", id: "yarim" },
  { keys: ["TEK_YENI", "TEK_ESKI", "TAM_YENI"], label: "Tam Altın", id: "tam" },
];

export const MOCK_GOLD_QUOTES: GoldQuote[] = [
  { id: "gram", label: "Gram Altın", buying: 6740, selling: 6755, change: 0.35 },
  {
    id: "ceyrek",
    label: "Çeyrek Altın",
    buying: 10820,
    selling: 11080,
    change: 0.12,
  },
  {
    id: "yarim",
    label: "Yarım Altın",
    buying: 21580,
    selling: 22150,
    change: -0.08,
  },
  { id: "tam", label: "Tam Altın", buying: 43300, selling: 44180, change: 0.2 },
];

type HaremRow = {
  alis?: string | number;
  satis?: string | number;
  buying?: string | number;
  selling?: string | number;
  degisim?: unknown;
  degisim_yuzde?: string | number;
  dir?: { satis_dir?: string; alis_dir?: string };
};

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.replace(/\s/g, "").replace(",", ".");
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function changeFromRow(row: HaremRow, previousSelling?: number): number {
  const pct = toNumber(row.degisim_yuzde);
  if (pct != null) return pct;

  const dir =
    (row.degisim as { satis_dir?: string } | undefined)?.satis_dir ??
    row.dir?.satis_dir;

  const selling = toNumber(row.satis ?? row.selling);
  if (
    previousSelling != null &&
    selling != null &&
    previousSelling > 0 &&
    selling !== previousSelling
  ) {
    return Number((((selling - previousSelling) / previousSelling) * 100).toFixed(2));
  }

  if (dir === "up") return 0.01;
  if (dir === "down") return -0.01;
  return 0;
}

function pickRow(
  data: Record<string, unknown>,
  keys: string[]
): HaremRow | null {
  for (const key of keys) {
    const row = data[key];
    if (row && typeof row === "object") return row as HaremRow;
  }
  return null;
}

/**
 * Harem AJAX / Socket payload → standart quote listesi.
 * Beklenen şekil: data.ALTIN.alis, data.CEYREK_YENI.alis, …
 */
export function parseHaremGoldQuotes(
  data: Record<string, unknown>,
  previousQuotes?: GoldQuote[]
): GoldQuote[] {
  const prevMap = new Map(previousQuotes?.map((q) => [q.id, q.selling]));

  return HAREM_GOLD_ITEMS.map(({ keys, label, id }) => {
    const row = pickRow(data, keys);
    if (!row) {
      throw new Error(`Eksik Harem verisi: ${keys.join("|")}`);
    }

    const buying = toNumber(row.alis ?? row.buying);
    const selling = toNumber(row.satis ?? row.selling);

    if (buying == null || selling == null) {
      throw new Error(`Geçersiz Harem fiyatı: ${keys[0]}`);
    }

    return {
      id,
      label,
      buying,
      selling,
      change: changeFromRow(row, prevMap.get(id)),
    };
  });
}

export function getMockGoldResponse(): GoldApiResponse {
  return {
    source: "fallback",
    updatedAt: new Date().toLocaleString("tr-TR"),
    quotes: MOCK_GOLD_QUOTES,
  };
}
