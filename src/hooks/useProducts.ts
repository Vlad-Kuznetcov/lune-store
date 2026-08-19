import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase products error:", error);
        setProducts([]);
        setError("Не вдалося завантажити товари");
      } else {
        setProducts((data ?? []) as Product[]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
};
