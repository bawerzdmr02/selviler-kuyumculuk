import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/category/CategoryCatalog";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: "Kategori",
      description: "Selviler Kuyumculuk altın koleksiyonları",
      path: `/kategori/${slug}`,
    });
  }

  return createPageMetadata({
    title: category.name,
    description: category.description,
    path: `/kategori/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);
  const categories = getCategories();

  return (
    <CategoryCatalog
      category={category}
      categories={categories}
      products={products}
    />
  );
}
