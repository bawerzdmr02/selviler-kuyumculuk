import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    "/",
    "/koleksiyonlar",
    "/hakkimizda",
    "/iletisim",
    "/gizlilik-politikasi",
    "/kvkk",
  ];

  return routes.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/gizlilik") || path === "/kvkk" ? 0.3 : 0.7,
  }));
}
