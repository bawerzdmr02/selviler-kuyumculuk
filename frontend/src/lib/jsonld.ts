import { siteConfig } from "@/lib/site";

export function getJewelryStoreJsonLd() {
  const { contact, social } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["JewelryStore", "LocalBusiness"],
    "@id": `${siteConfig.url}/#jewelry-store`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.ogImage,
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
    openingHoursSpecification: contact.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [social.instagram, social.facebook].filter(Boolean),
    priceRange: "$$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card",
  };
}
