import type { Metadata } from "next";
import { TvGoldBoard } from "@/components/tv/TvGoldBoard";

export const metadata: Metadata = {
  title: "Canlı Piyasa Ekranı",
  description: "Selviler Kuyumculuk Smart TV canlı altın fiyatları",
  robots: { index: false, follow: false },
};

export default function EkranPage() {
  return <TvGoldBoard />;
}
