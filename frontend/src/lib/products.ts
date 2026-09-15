import productsData from "@/data/products.json";
import type { Category, Product, ProductsData } from "@/types/product";
import { KARAT_STAMP } from "@/types/product";

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

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return data.products.find((product) => product.slug === slug);
}

/** Her kategoriden bir temsilî ürün (öne çıkan vitrin için) */
export function getShowcaseByCategory(): Product[] {
  return data.categories
    .map((category) => {
      const inCategory = data.products.filter(
        (product) => product.categoryId === category.id
      );
      return (
        inCategory.find((product) => product.featured) ?? inCategory[0]
      );
    })
    .filter((product): product is Product => Boolean(product));
}

export function formatTryPrice(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function getProductGallery(product: Product): string[] {
  const images = [product.image];
  if (product.imageHover && product.imageHover !== product.image) {
    images.push(product.imageHover);
  }
  return images;
}

/** ESA tarzı ürün özellik maddeleri — veri yoksa üret */
export function getProductDetails(product: Product): string[] {
  if (product.details && product.details.length > 0) {
    return product.details;
  }

  const stamp = KARAT_STAMP[product.karat];
  const weight =
    product.weightGrams ??
    Number((3.5 + (product.price % 17) / 10).toFixed(2));

  const lines = [
    "Rose - Beyaz - Açık Sarı renk stokta mevcuttur",
    "Sipariş oluşturduktan sonra istediğiniz renk yapılmasını talep edebilirsiniz",
    "Ürün Faturası, Garanti Belgesi, Kutusu ve Hediye Paketi İle Gönderilecektir",
    `Ürünümüz %100 gerçek ${product.karat} ayar altındır.`,
    `Ürünlerde ${stamp} altın damga ve patenti bulunmaktadır.`,
    `Ürünün altın metal ağırlığı ${weight.toLocaleString("tr-TR")} gramdır. (+/-) %10 sapma oluşabilmektedir`,
  ];

  if (product.lengthCm) {
    lines.push(`Standart uzunluk: ${product.lengthCm} cm'dir.`);
  }

  lines.push(
    "Ürün size ulaşana kadar çalınmaya ve kaybolmaya karşı kargo firması tarafından sigortalıdır."
  );

  return lines;
}
