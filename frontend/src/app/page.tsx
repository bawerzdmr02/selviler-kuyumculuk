import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { BrandStoryTeaser } from "@/components/home/BrandStoryTeaser";
import { SocialFeed } from "@/components/home/SocialFeed";
import { ContactCTA } from "@/components/home/ContactCTA";
import { getFeaturedProducts } from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  });
}

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <>
      <Hero />
      <FeaturedCollections products={featured} />
      <BrandStoryTeaser />
      <SocialFeed />
      <ContactCTA />
    </>
  );
}
