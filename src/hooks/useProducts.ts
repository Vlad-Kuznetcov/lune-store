import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Не вдалося завантажити товари");
      setProducts([]);
    } else {
      const mappedProducts: Product[] = (data ?? []).map((product) => ({
        ...product,
        isNew: product.is_new ?? false,
        isPopular: product.is_popular ?? false,
      }));

      setProducts(mappedProducts);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};
