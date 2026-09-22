import { siteConfig } from "@/lib/site";

/**
 * schema.org JewelryStore + LocalBusiness
 * Adres / telefon / saatler siteConfig.contact üzerinden gelir — gerçek değerlerle güncelle.
 */
export function getJewelryStoreJsonLd() {
  const { contact, social } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": `${siteConfig.url}/#jewelry-store`,
    name: siteConfig.name,
    alternateName: "Selviler Kuyumculuk Altın & Mücevherat",
    description: siteConfig.description,
    url: siteConfig.url,
    image: [siteConfig.ogImage],
    logo: siteConfig.ogImage,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.streetAddress,
      addressLocality: contact.addressLocality,
      addressRegion: contact.addressRegion,
      postalCode: contact.postalCode,
      addressCountry: contact.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    hasMap: contact.mapEmbedUrl,
    openingHoursSpecification: contact.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [social.instagram, social.facebook].filter(
      (url) => Boolean(url) && !url.endsWith("facebook.com/")
    ),
    priceRange: "$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card",
    areaServed: {
      "@type": "City",
      name: contact.addressLocality,
    },
  };
}

/** Ana sayfa için WebSite şeması — marka + arama hedefi */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "tr-TR",
    publisher: {
      "@id": `${siteConfig.url}/#jewelry-store`,
    },
  };
}

export function getHomeJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [getJewelryStoreJsonLd(), getWebSiteJsonLd()],
  };
}
