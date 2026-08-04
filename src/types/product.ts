import type { ProductCategory } from "./category";

export interface ProductDetail {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  article: string;
  name: string;

  category: ProductCategory;

  price: number;
  image: string;

  available: boolean;

  description?: string;
  details?: ProductDetail[];

  oldPrice?: number;

  isNew?: boolean;
  isPopular?: boolean;
}
