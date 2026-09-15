import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import {
  getCategoryById,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
} from "@/lib/products";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createPageMetadata({
      title: "Ürün",
      description: "Selviler Kuyumculuk altın koleksiyonu",
      path: `/urun/${slug}`,
    });
  }

  return createPageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/urun/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);
  if (!category) {
    notFound();
  }

  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailView
      product={product}
      category={category}
      related={related}
    />
  );
}
