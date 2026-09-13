import { getJewelryStoreJsonLd } from "@/lib/jsonld";

/**
 * schema.org JewelryStore / LocalBusiness — site genelinde geçerli.
 * Adres ve koordinatlar siteConfig'te taslak; canlıya alınca güncellenecek.
 */
export function JsonLd() {
  const data = getJewelryStoreJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
