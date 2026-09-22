import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageSeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const pageTitle = isHome ? siteConfig.seoTitle : title;
  const ogTitle = isHome ? siteConfig.seoTitle : `${title} · ${siteConfig.name}`;

  return {
    title: isHome ? { absolute: pageTitle } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
