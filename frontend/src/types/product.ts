export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  featured: boolean;
  shortDescription: string;
  image: string;
};

export type ProductsData = {
  categories: Category[];
  products: Product[];
};
