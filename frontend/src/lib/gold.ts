export type GoldQuote = {
  id: string;
  label: string;
  buying: number;
  selling: number;
  change: number;
};

export type FxQuote = {
  id: "ons" | "usd" | "eur";
  code: "ONS" | "USD" | "EUR";
  buying: number;
  selling: number;
};

export type GoldApiResponse = {
  source: "live" | "fallback";
  updatedAt: string;
  quotes: GoldQuote[];
  /** TV header: Ons / USD / EUR */
  fx?: FxQuote[];
};

export type HaremGoldItem = {
  keys: string[];
  label: string;
  id: string;
  /** false ise veride yoksa atlanır (ör. Gremse) */
  required?: boolean;
};

/**
 * Harem Altın / Kapalıçarşı — TV panosu sırası (16 kalem).
 *
 * Ticari kullanım notu: `required: false` olan kalemler Harem yayınında
 * yoksa satır hiç gösterilmez. Bir kaleme yaklaşık/benzer bir Harem kodu
 * eşlenmez — yanlış fiyat göstermek, göstermemekten daha risklidir.
 */
export const HAREM_GOLD_ITEMS: HaremGoldItem[] = [
  { keys: ["ALTIN"], label: "Has Altın", id: "has", required: true },
  { keys: ["AYAR22"], label: "22 Ayar", id: "ayar22", required: true },
  {
    // Harem'de ayrı bir "gram altın" kodu yok; gram bazlı 24 ayar ikinci
    // kalem KULCEALTIN'dır (ALTIN = Has Altın satırı).
    keys: ["KULCEALTIN"],
    label: "Gram Altın",
    id: "gram",
    required: true,
  },
  {
    keys: ["CEYREK_YENI"],
    label: "Yeni Çeyrek",
    id: "ceyrek_yeni",
    required: true,
  },
  {
    keys: ["CEYREK_ESKI"],
    label: "Eski Çeyrek",
    id: "ceyrek_eski",
    required: true,
  },
  {
    keys: ["YARIM_YENI"],
    label: "Yeni Yarım",
    id: "yarim_yeni",
    required: true,
  },
  {
    keys: ["YARIM_ESKI"],
    label: "Eski Yarım",
    id: "yarim_eski",
    required: true,
  },
  {
    keys: ["TEK_YENI", "TAM_YENI"],
    label: "Yeni Tam",
    id: "tam_yeni",
    required: true,
  },
  {
    keys: ["TEK_ESKI", "TAM_ESKI"],
    label: "Eski Tam",
    id: "tam_eski",
    required: true,
  },
  {
    keys: ["ATA_YENI"],
    label: "Yeni Ata",
    id: "ata_yeni",
    required: true,
  },
  {
    keys: ["ATA_ESKI"],
    label: "Eski Ata",
    id: "ata_eski",
    required: true,
  },
  {
    keys: ["ATA5_YENI"],
    label: "Yeni Ata5",
    id: "ata5_yeni",
    required: true,
  },
  {
    keys: ["ATA5_ESKI"],
    label: "Eski Ata5",
    id: "ata5_eski",
    required: true,
  },
  {
    keys: ["GREMESE_YENI"],
    label: "Yeni Gremse",
    id: "gremse_yeni",
    required: true,
  },
  {
    keys: ["GREMESE_ESKI"],
    label: "Eski Gremse",
    id: "gremse_eski",
    required: true,
  },
  {
    keys: ["AYAR14"],
    label: "14 Ayar",
    id: "ayar14",
    required: true,
  },
];

/** Header döviz / ons — Harem kod eşlemesi */
export const HAREM_FX_ITEMS: Array<{
  keys: string[];
  id: FxQuote["id"];
  code: FxQuote["code"];
}> = [
  { keys: ["ONS", "XAUUSD", "USDONS"], id: "ons", code: "ONS" },
  { keys: ["USDTRY", "USD"], id: "usd", code: "USD" },
  { keys: ["EURTRY", "EUR"], id: "eur", code: "EUR" },
];

/** Ana sayfa vitrini — 4 kart */
export const HAREM_HOME_QUOTE_IDS = [
  "has",
  "ceyrek_yeni",
  "yarim_yeni",
  "tam_yeni",
] as const;

export const MOCK_GOLD_QUOTES: GoldQuote[] = [
  {
    id: "has",
    label: "Has Altın",
    buying: 6710,
    selling: 6740,
    change: 0.2,
  },
  {
    id: "ayar22",
    label: "22 Ayar",
    buying: 6120,
    selling: 6180,
    change: 0.15,
  },
  {
    id: "gram",
    label: "Gram Altın",
    buying: 6705,
    selling: 6735,
    change: 0.18,
  },
  {
    id: "ceyrek_yeni",
    label: "Yeni Çeyrek",
    buying: 10890,
    selling: 11020,
    change: 0.1,
  },
  {
    id: "ceyrek_eski",
    label: "Eski Çeyrek",
    buying: 10720,
    selling: 10820,
    change: 0.08,
  },
  {
    id: "yarim_yeni",
    label: "Yeni Yarım",
    buying: 21800,
    selling: 22030,
    change: 0.1,
  },
  {
    id: "yarim_eski",
    label: "Eski Yarım",
    buying: 21440,
    selling: 21610,
    change: 0.08,
  },
  {
    id: "tam_yeni",
    label: "Yeni Tam",
    buying: 43400,
    selling: 43920,
    change: 0.12,
  },
  {
    id: "tam_eski",
    label: "Eski Tam",
    buying: 42890,
    selling: 43280,
    change: 0.1,
  },
  {
    id: "ata_yeni",
    label: "Yeni Ata",
    buying: 44390,
    selling: 45520,
    change: 0.05,
  },
  {
    id: "ata_eski",
    label: "Eski Ata",
    buying: 43980,
    selling: 45010,
    change: 0.04,
  },
  {
    id: "ata5_yeni",
    label: "Yeni Ata5",
    buying: 221900,
    selling: 227600,
    change: 0.05,
  },
  {
    id: "ata5_eski",
    label: "Eski Ata5",
    buying: 219800,
    selling: 225000,
    change: 0.04,
  },
  {
    id: "gremse_yeni",
    label: "Yeni Gremse",
    buying: 107600,
    selling: 110100,
    change: 0.05,
  },
  {
    id: "gremse_eski",
    label: "Eski Gremse",
    buying: 106400,
    selling: 108900,
    change: 0.04,
  },
  {
    id: "ayar14",
    label: "14 Ayar",
    buying: 3910,
    selling: 4040,
    change: 0.12,
  },
];

export const MOCK_FX_QUOTES: FxQuote[] = [
  { id: "ons", code: "ONS", buying: 4082.5, selling: 4084.0 },
  { id: "usd", code: "USD", buying: 42.85, selling: 42.95 },
  { id: "eur", code: "EUR", buying: 46.1, selling: 46.35 },
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
    return Number(
      (((selling - previousSelling) / previousSelling) * 100).toFixed(2)
    );
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
  const quotes: GoldQuote[] = [];

  for (const { keys, label, id, required = true } of HAREM_GOLD_ITEMS) {
    const row = pickRow(data, keys);
    if (!row) {
      if (required) {
        throw new Error(`Eksik Harem verisi: ${keys.join("|")}`);
      }
      continue;
    }

    const buying = toNumber(row.alis ?? row.buying);
    const selling = toNumber(row.satis ?? row.selling);

    if (buying == null || selling == null) {
      if (required) {
        throw new Error(`Geçersiz Harem fiyatı: ${keys[0]}`);
      }
      continue;
    }

    quotes.push({
      id,
      label,
      buying,
      selling,
      change: changeFromRow(row, prevMap.get(id)),
    });
  }

  if (quotes.length < 4) {
    throw new Error("Yetersiz Harem fiyat listesi");
  }

  return quotes;
}

/** USDTRY / EURTRY / ONS — eksik olanlar atlanır */
export const parseHaremFxQuotes = (
  data: Record<string, unknown>
): FxQuote[] => {
  const fx: FxQuote[] = [];

  for (const { keys, id, code } of HAREM_FX_ITEMS) {
    const row = pickRow(data, keys);
    if (!row) continue;

    const buying = toNumber(row.alis ?? row.buying);
    const selling = toNumber(row.satis ?? row.selling);
    if (buying == null || selling == null) continue;

    fx.push({ id, code, buying, selling });
  }

  // Hiçbiri yoksa mock ile TV header boş kalmasın
  return fx.length > 0 ? fx : [...MOCK_FX_QUOTES];
};

export function getMockGoldResponse(): GoldApiResponse {
  return {
    source: "fallback",
    updatedAt: new Date().toLocaleString("tr-TR"),
    quotes: MOCK_GOLD_QUOTES,
    fx: MOCK_FX_QUOTES,
  };
}
