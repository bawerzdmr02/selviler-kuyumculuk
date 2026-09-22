import { getHomeJsonLdGraph } from "@/lib/jsonld";

/**
 * Ana sayfa JewelryStore / LocalBusiness + WebSite JSON-LD.
 * Adres ve koordinatlar siteConfig'te; canlıya alınca gerçekleriyle güncelle.
 */
export function HomeJsonLd() {
  const data = getHomeJsonLdGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
