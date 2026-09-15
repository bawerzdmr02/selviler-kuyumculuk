export type GoldColor = "sari" | "beyaz" | "rose";
export type GoldKarat = 14 | 18 | 22 | 24;

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  featured: boolean;
  shortDescription: string;
  image: string;
  /** Hover’da / galeride gösterilecek ikinci görsel */
  imageHover?: string;
  /** TRY satış fiyatı */
  price: number;
  color: GoldColor;
  karat: GoldKarat;
  /** Opsiyonel metal gramajı */
  weightGrams?: number;
  /** Opsiyonel ölçü (cm) */
  lengthCm?: number;
  /** Ürün özellik maddeleri */
  details?: string[];
};

export type ProductsData = {
  categories: Category[];
  products: Product[];
};

export const GOLD_COLOR_LABELS: Record<GoldColor, string> = {
  sari: "Sarı Altın",
  beyaz: "Beyaz Altın",
  rose: "Rose Altın",
};

export const GOLD_COLOR_SWATCH: Record<GoldColor, string> = {
  sari: "#E5BF27",
  rose: "#E5A0D2",
  beyaz: "#FFFFFF",
};

export const GOLD_KARAT_OPTIONS: GoldKarat[] = [14, 22, 24];

export const KARAT_STAMP: Record<GoldKarat, string> = {
  14: "14 Ayar (585k)",
  18: "18 Ayar (750k)",
  22: "22 Ayar (916k)",
  24: "24 Ayar (995k)",
};
