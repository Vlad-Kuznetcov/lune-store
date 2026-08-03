export interface Product {
  id: number;
  article: string;

  name: string;

  category: "rings" | "earrings" | "bracelets" | "chains" | "pendants";

  price: number;

  image: string;

  available: boolean;

  isNew?: boolean;

  isPopular?: boolean;
}
