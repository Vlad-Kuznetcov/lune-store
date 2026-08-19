import { supabase } from "./supabase";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Помилка завантаження товарів:", error);
    throw error;
  }

  return data as Product[];
};
