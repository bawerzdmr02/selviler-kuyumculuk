import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LiveGoldPrices } from "@/components/LiveGoldPrices";
import { CategoryShop } from "@/components/home/CategoryShop";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { BrandStoryTeaser } from "@/components/home/BrandStoryTeaser";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ContactCTA } from "@/components/home/ContactCTA";
import {
  getProductsByCategory,
  getShowcaseByCategory,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  });
}

export default function HomePage() {
  const showcase = getShowcaseByCategory();
  const bilezikler = getProductsByCategory("bilezik");
  const kupeler = getProductsByCategory("kupe");
  const kolyeler = getProductsByCategory("kolye");
  const zincirler = getProductsByCategory("zincir");
  const yuzukler = getProductsByCategory("yuzukler");

  return (
    <>
      <Hero />
      <LiveGoldPrices />
      <CategoryShop />
      <ProductShowcase
        title="Öne çıkan altınlar"
        subtitle="Bilezik, küpe, kolye, zincir ve yüzük — her kategoriden bir seçki."
        products={showcase}
      />
      <ProductShowcase
        title="Bilezikler"
        subtitle="22 ve 14 ayar saf altın bilezik modelleri."
        products={bilezikler}
        href="/kategori/bilezikler"
      />
      <ProductShowcase
        title="Küpeler"
        subtitle="Halka ve sallantılı saf altın küpeler."
        products={kupeler}
        href="/kategori/kupeler"
      />
      <ProductShowcase
        title="Kolyeler"
        subtitle="Ustalıkla işlenmiş saf altın kolyeler."
        products={kolyeler}
        href="/kategori/kolyeler"
      />
      <ProductShowcase
        title="Zincirler"
        subtitle="Figaro, Singapur ve klasik altın zincirler."
        products={zincirler}
        href="/kategori/zincirler"
      />
      <ProductShowcase
        title="Yüzükler"
        subtitle="22 ve 14 ayar saf altın alyans ve yüzük modelleri."
        products={yuzukler}
        href="/kategori/yuzukler"
      />
      <BrandStoryTeaser />
      <TrustBadges />
      <ContactCTA />
    </>
  );
}
