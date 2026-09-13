import productsData from "@/data/products.json";
import type { Category, Product, ProductsData } from "@/types/product";

const data = productsData as ProductsData;

export function getProducts(): Product[] {
  return data.products;
}

export function getFeaturedProducts(): Product[] {
  return data.products.filter((product) => product.featured);
}

export function getCategories(): Category[] {
  return data.categories;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return data.products.filter((product) => product.categoryId === categoryId);
}

export function getCategoryById(categoryId: string): Category | undefined {
  return data.categories.find((category) => category.id === categoryId);
}
