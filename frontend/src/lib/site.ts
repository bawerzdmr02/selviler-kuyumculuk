export const siteConfig = {
  name: "Selviler Kuyumculuk",
  tagline: "Değerini hiç kaybetmeyen altın koleksiyonları",
  description:
    "Yatırımlık ve şık altın takılar — ustalıkla işlenmiş saf altın.",
  /** Canlı domain — production'da NEXT_PUBLIC_SITE_URL ile override edilir */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://selvilerkuyumculuk.com",
  ogImage:
    "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
  locale: "tr_TR",
  contact: {
    address:
      "Uğur Mumcu Mah. Muhsin Yazıcıoğlu Cad. No:11/A SULTANGAZİ/İSTANBUL",
    streetAddress: "Uğur Mumcu Mah. Muhsin Yazıcıoğlu Cad. No:11/A",
    addressLocality: "Sultangazi",
    addressRegion: "İstanbul",
    postalCode: "34270",
    addressCountry: "TR",
    phone: "0538 064 37 71",
    phoneHref: "tel:+905380643771",
    email: "info@selvilerkuyumculuk.com",
    whatsapp: "https://wa.me/905380643771",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Selviler%20Kuyumculuk,%20Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed",
    geo: {
      latitude: 41.1064,
      longitude: 28.8681,
    },
    hours: [
      { days: "Pazartesi – Cumartesi", time: "10:00 – 19:00" },
      { days: "Pazar", time: "Kapalı" },
    ],
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
    instagram: "https://www.instagram.com/selvilerkuyumculuk",
    facebook: "https://facebook.com/",
  },
  /** Ana kategoriler: Bilezikler, Küpeler, Kolyeler, Zincirler, Yüzükler */
  productNav: [
    { href: "/kategori/bilezikler", label: "Bilezikler", slug: "bilezikler" },
    { href: "/kategori/kupeler", label: "Küpeler", slug: "kupeler" },
    { href: "/kategori/kolyeler", label: "Kolyeler", slug: "kolyeler" },
    { href: "/kategori/zincirler", label: "Zincirler", slug: "zincirler" },
    { href: "/kategori/yuzukler", label: "Yüzükler", slug: "yuzukler" },
  ],
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
