import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { Libre_Caslon_Text, Montserrat } from "next/font/google";
import "./globals.css";

/** ESA: Futura-benzeri geometrik sans (nav / gövde) */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

/** ESA: Adobe Caslon-benzeri serif (başlık / marka) */
const caslon = Libre_Caslon_Text({
  variable: "--font-caslon",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Selviler Kuyumculuk",
    "altın",
    "kuyumcu",
    "canlı altın fiyatları",
    "14 ayar altın",
    "22 ayar altın",
    "24 ayar altın",
    "Sultangazi kuyumcu",
    "İstanbul altın",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${montserrat.variable} ${caslon.variable} h-full antialiased`}
    >
      <body className="flex min-h-full max-w-full flex-col overflow-x-hidden bg-ivory font-sans text-noir">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
