export const siteConfig = {
  name: "Selviler Kuyumculuk",
  tagline: "Zamanın ötesinde zarafet",
  description:
    "Ustalıkla işlenen altın ve mücevherlerle unutulmaz anlarınıza eşlik ediyoruz.",
  /** Canlı domain — production'da NEXT_PUBLIC_SITE_URL ile override edilir */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://selvilerkuyumculuk.com",
  ogImage:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  locale: "tr_TR",
  contact: {
    address: "Kuyumcular Çarşısı No: — , Türkiye",
    streetAddress: "Kuyumcular Çarşısı No: —",
    addressLocality: "İstanbul",
    addressRegion: "İstanbul",
    postalCode: "34000",
    addressCountry: "TR",
    phone: "+90 555 000 00 00",
    phoneHref: "tel:+905550000000",
    email: "info@selvilerkuyumculuk.com",
    whatsapp: "https://wa.me/905550000000",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed",
    /** Taslak koordinat — gerçek mağaza pin'i ile güncellenecek */
    geo: {
      latitude: 41.0082,
      longitude: 28.9784,
    },
    hours: [
      { days: "Pazartesi – Cumartesi", time: "10:00 – 19:00" },
      { days: "Pazar", time: "Kapalı" },
    ],
    /** schema.org OpeningHoursSpecification */
    openingHours: [
      {
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
  },
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
  nav: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/koleksiyonlar", label: "Koleksiyonlar" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/iletisim", label: "İletişim" },
  ],
  legal: [
    { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
    { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  ],
} as const;
