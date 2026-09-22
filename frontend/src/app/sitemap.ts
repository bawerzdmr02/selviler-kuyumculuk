import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/koleksiyonlar`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/hakkimizda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/iletisim`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/gizlilik-politikasi`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/kvkk`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map(
    (category) => ({
      url: `${siteConfig.url}/kategori/${category.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((product) => ({
    url: `${siteConfig.url}/urun/${product.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
